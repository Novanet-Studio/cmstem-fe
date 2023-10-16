import { a as defineEventHandler, r as readBody, c as createError } from './nitro/netlify-builder.mjs';
import '@netlify/functions';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';
import 'ipx';

const payment_post = defineEventHandler(async (event) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  try {
    const data = await readBody(event);
    const body = {
      idempotency_key: data.idempotencyKey,
      location_id: data.locationId,
      source_id: data.sourceId,
      customer_id: data.customerId,
      amount_money: {
        amount: (_a = data.amountMoney) == null ? void 0 : _a.amount,
        currency: (_b = data.amountMoney) == null ? void 0 : _b.currency
      },
      buyer_email_address: data.buyerEmailAddress,
      shipping_address: {
        address_line1: (_c = data.shippingAddress) == null ? void 0 : _c.addressLine1,
        locality: (_d = data.shippingAddress) == null ? void 0 : _d.locality,
        postal_code: (_e = data.shippingAddress) == null ? void 0 : _e.postalCode,
        country: (_f = data.shippingAddress) == null ? void 0 : _f.country
      },
      billing_address: {
        address_line1: (_g = data.billingAddress) == null ? void 0 : _g.addressLine1,
        locality: (_h = data.billingAddress) == null ? void 0 : _h.locality,
        postal_code: (_i = data.billingAddress) == null ? void 0 : _i.postalCode,
        country: (_j = data.billingAddress) == null ? void 0 : _j.country
      },
      note: data.note
    };
    const response = await $fetch(
      "https://connect.squareupsandbox.com/v2/payments",
      {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
          "Square-Version": "2023-08-16",
          Authorization: "Bearer EAAAEJyncqd3OPpoDxFbqfbNjmfeDnM_8OZmPxgUfk-ifWbwexuPqMaAUACyfdbs"
        }
      }
    );
    const parsedResponse = JSON.stringify(
      response,
      (_, value) => typeof value === "bigint" ? value.toString() : value
    );
    const { payment } = JSON.parse(parsedResponse);
    return {
      data: payment
    };
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: "Error procesando el pago"
    });
  }
});

export { payment_post as default };
//# sourceMappingURL=payment.post.mjs.map
