import { router } from "../trpc";
import { authRouter } from "./auth";
import { campaignRouter } from "./campaign";
import { exampleRouter } from "./example";

export const appRouter = router({
  example: exampleRouter,
  auth: authRouter,
  campaign: campaignRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
