declare module "midtrans-client" {
  export interface SnapParam {
    item_details: {
      id?: string;
      name: string;
      price: number;
      quantity: number;
    };
    transaction_details: {
      order_id: string;
      gross_amount: number;
    };
    callbacks?: {
      finish?: string;
      error?: string;
      pending?: string;
    };
  }

  export class Snap {
    constructor(config: {
      isProduction: boolean;
      serverKey?: string;
      clientKey?: string;
    });
    createTransactionToken(param: SnapParam): Promise<string>;
  }

  const Midtrans: {
    Snap: typeof Snap;
  };

  export default Midtrans;
}
