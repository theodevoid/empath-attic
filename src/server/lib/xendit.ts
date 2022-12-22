import Xendit from "xendit-node";
import { env } from "env/server.mjs";

const x = new Xendit({
  secretKey: env.XENDIT_SERVER_KEY,
});
const i = new x.Invoice({});

export const createXenditInvoice = async (
  paymentId: string,
  amount: number,
) => {
  try {
    const res: any = await i.createInvoice({
      externalID: paymentId,
      amount,
      invoiceDuration: 3600, // 1 hour
    });

    return {
      amount,
      invoiceUrl: res.invoice_url,
      invoiceId: res.id,
    };
  } catch (error) {
    console.log(error);
  }
};
