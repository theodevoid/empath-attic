import {
  checkDonationPaymentStatus,
  donateToCampaign,
  getAll,
  getCampaignById,
} from "../actions/campaign";
import { router } from "../trpc";

export const campaignRouter = router({
  getAll,
  donateToCampaign,
  checkDonationPaymentStatus,
  getCampaignById,
});
