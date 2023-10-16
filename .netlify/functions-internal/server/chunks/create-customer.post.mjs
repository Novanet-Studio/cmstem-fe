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

const createCustomer_post = defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    const body = {
      idempotency_key: data.idempotencyKey,
      given_name: data.givenName,
      email_address: data.emailAddress
    };
    const response = await $fetch(
      "https://connect.squareupsandbox.com/v2/customers",
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
    const { version, ...customer } = response.customer;
    return {
      data: customer
    };
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: "Error creando el customer"
    });
  }
});

export { createCustomer_post as default };
//# sourceMappingURL=create-customer.post.mjs.map
