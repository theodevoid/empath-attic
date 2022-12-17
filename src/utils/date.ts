import { type Moment } from "moment";

export const getDaysLeftFromDate = (startDate: Moment, endDate: Moment) => {
  return endDate.diff(startDate, "days");
};
