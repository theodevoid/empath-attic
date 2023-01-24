import { CampaignDonationStatus } from "@prisma/client";
import { createXenditInvoice, getXenditInvoice } from "server/lib/xendit";
import { z } from "zod";
import { publicProcedure, protectedProcedure } from "../trpc";

export const getAll = publicProcedure.query(({ ctx }) => {
  const findAllCampaigns = ctx.prisma.campaign.findMany({
    include: {
      category: true,
    },
  });

  return findAllCampaigns;
});

export const donateToCampaign = protectedProcedure
  .input(
    z.object({
      campaignId: z.string(),
      amount: z.number(),
      message: z.string().nullish(),
      isAnonymous: z.boolean().nullish(),
    }),
  )
  .mutation(async ({ ctx, input }) => {
    // 1. create CampaignDonation
    // 2. create xendit invoice
    // 3. update CampaignDonation with xendit invoice ID
    const { prisma, session } = ctx;
    const { amount, campaignId, message, isAnonymous } = input;
    const { user } = session;

    const donationTransaction = await prisma.$transaction(async tx => {
      const createDonation = await tx.campaignDonation.create({
        data: {
          amount,
          campaign_id: campaignId,
          message,
          is_anon: isAnonymous ?? false,
          user_id: user.id,
        },
      });

      const xenditInvoice = await createXenditInvoice(
        createDonation.id,
        amount,
      );

      console.log(xenditInvoice);

      if (!xenditInvoice?.invoiceId) {
        throw new Error("Failed to create Xendit invoice");
      }

      const updatedDonation = await tx.campaignDonation.update({
        data: {
          payment_gateway_invoice_id: xenditInvoice.invoiceId,
          payment_gateway_invoice_url: xenditInvoice.invoiceUrl,
        },
        where: {
          id: createDonation.id,
        },
      });

      return updatedDonation;
    });

    return donationTransaction;
  });

export const checkDonationPaymentStatus = protectedProcedure
  .input(
    z.object({
      campaignDonationId: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { prisma } = ctx;
    const { campaignDonationId } = input;

    const findCampaignDonation = await prisma.campaignDonation.findUnique({
      where: {
        id: campaignDonationId,
      },
    });

    if (findCampaignDonation?.status == "PAID") {
      return findCampaignDonation;
    }

    if (!findCampaignDonation) {
      throw new Error("Campaign donation does not exist");
    }

    const findXenditInvoice = await getXenditInvoice(
      findCampaignDonation.payment_gateway_invoice_id as string,
    );

    const updateCampaignObj: {
      status: CampaignDonationStatus;
      paid_at: Date | null;
    } = {
      status: CampaignDonationStatus.PENDING,
      paid_at: null,
    };

    switch (findXenditInvoice?.status) {
      case "EXPIRED":
        updateCampaignObj.status = CampaignDonationStatus.CANCELLED;
        break;
      case "PAID":
      case "SETTLED":
        updateCampaignObj.status = CampaignDonationStatus.PAID;
        updateCampaignObj.paid_at = findXenditInvoice.paidAt;
        break;
    }

    // change campaign donation status to PAID
    const updateCampaignDonation = await prisma.campaignDonation.update({
      data: {
        status: updateCampaignObj.status,
      },
      where: {
        id: campaignDonationId,
      },
    });

    // add funds to campaign if donation is paid
    if (updateCampaignDonation.status == "PAID") {
      await prisma.campaign.update({
        data: {
          funds_available: {
            increment: updateCampaignDonation.amount,
          },
          total_accumulated: {
            increment: updateCampaignDonation.amount,
          },
        },
        where: {
          id: updateCampaignDonation.campaign_id,
        },
      });
    }

    return updateCampaignDonation;
  });

export const getCampaignById = publicProcedure
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { id } = input;

    const findCampaignById = await ctx.prisma.campaign.findUnique({
      where: {
        id,
      },
      include: {
        category: true,
      },
    });

    return findCampaignById;
  });

export const getCampaignDonations = publicProcedure
  .input(
    z.object({
      campaignId: z.string(),
      page: z.number().optional().default(1),
    }),
  )
  .query(async ({ ctx, input }) => {
    const { campaignId, page } = input;

    let hasNext = false;
    const itemPerPage = 5;

    const getDonationsByCampaignId = await ctx.prisma.campaignDonation.findMany(
      {
        where: {
          campaign_id: campaignId,
          status: "PAID"
        },
        skip: itemPerPage * (page - 1),
        take: itemPerPage + 1,
        include: {
          user: true,
        },
        orderBy: {
          created_at: "desc",
        },
      },
    );

    if (getDonationsByCampaignId.length > itemPerPage) {
      getDonationsByCampaignId.pop();
      hasNext = true;
    }

    return {
      data: getDonationsByCampaignId,
      hasNext,
    };
  });
