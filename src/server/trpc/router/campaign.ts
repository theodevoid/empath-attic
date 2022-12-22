import { createXenditInvoice } from "server/lib/xendit";
import { z } from "zod";
import { router, publicProcedure, protectedProcedure } from "../trpc";

export const campaignRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    const findAllCampaigns = ctx.prisma.campaign.findMany({
      include: {
        category: true,
      },
    });

    return findAllCampaigns;
  }),
  donateToCampaign: protectedProcedure
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
    }),
});
