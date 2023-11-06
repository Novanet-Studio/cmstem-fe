import { merchantTemplateConfig, receiptTemplateConfig } from '~/config/email';

const servicesUrl = import.meta.env.VITE_SERVICES_URL;

if (!servicesUrl) {
  throw new Error('Missing services url');
}

interface CreateCustomerPayload {
  idempotencyKey: string;
  givenName: string;
  emailAddress: string;
}

async function createCustomer(payload: CreateCustomerPayload) {
  return useFetch(`${servicesUrl}/api/create-customer`, {
    method: 'post',
    body: payload,
  });
}

async function generatePayment(payload: any) {
  return useFetch(`${servicesUrl}/api/payment`, {
    method: 'post',
    body: payload,
  });
}

async function sendReceiptEmail(payload: any, rawTemplate: boolean = false) {
  return useFetch(
    `${servicesUrl}/api/receipt-email${rawTemplate ? '?rawTemplate=true' : ''}`,
    {
      method: 'post',
      body: {
        ...payload,
        email: receiptTemplateConfig(),
      },
    }
  );
}

async function sendMerchantEmail(payload: any, rawTemplate: boolean = false) {
  return useFetch(
    `${servicesUrl}/api/merchant-email${
      rawTemplate ? '?rawTemplate=true' : ''
    }`,
    {
      method: 'post',
      body: {
        ...payload,
        email: merchantTemplateConfig(),
      },
    }
  );
}

export default {
  createCustomer,
  generatePayment,
  sendReceiptEmail,
  sendMerchantEmail,
};
