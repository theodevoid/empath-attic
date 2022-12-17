import { router, publicProcedure } from "../trpc";

export const campaignRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    const findAllCampaigns = ctx.prisma.campaign.findMany();

    return findAllCampaigns;
  }),
});
