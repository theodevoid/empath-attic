import {
  checkDonationPaymentStatus,
  donateToCampaign,
  getAll,
  getCampaignById,
  getCampaignDonations,
} from "../actions/campaign";
import { router } from "../trpc";

export const campaignRouter = router({
  getAll,
  donateToCampaign,
  checkDonationPaymentStatus,
  getCampaignById,
  getCampaignDonations,
});
