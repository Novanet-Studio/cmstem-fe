interface EmailObjectParams {
  customer?: string;
  email?: string;
  date: string;
  orderId: string;
  payed: string;
  tableData: {
    name: string;
    price: string;
    quantity: string;
  }[];
}

interface PaymentStrapi {
  name: string;
  lastname: string;
  confirmation: string;
  amount: number;
  payment_date: string;
  email: string;
}

interface PaymentObject {
  orderId?: string;
  name: string;
  lastname: string;
  confirmation: string;
  amount: string;
  paymentDate: string;
  /**
   * If this field is set, it means that the payment method is 'pago movil'
   */
  amountRate?: number;
}
