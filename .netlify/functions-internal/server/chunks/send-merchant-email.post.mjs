import { a as defineEventHandler, r as readBody, u as useRuntimeConfig, c as createError } from './nitro/netlify-builder.mjs';
import sgMail from '@sendgrid/mail';
import { config } from 'vue-email/compiler';
import { resolve } from 'node:path';
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
import 'fs';
import 'path';
import 'ipx';

const vuemail = config(resolve("./emails"));
const sendMerchantEmail_post = defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    const { sendgrid } = useRuntimeConfig();
    const template = await vuemail.render("receipt.vue", {
      props: {
        body: {
          ...data
        }
      }
    });
    sgMail.setApiKey(sendgrid.apiKey);
    const payload = {
      to: sendgrid.receiverEmail,
      from: sendgrid.senderEmail,
      subject: `CCS MultiSport nueva orden ${data.orderId}`,
      text: "CCS MultiSport nueva orden",
      html: template
    };
    await sgMail.send(payload);
    return {
      message: "Email enviado",
      status: 200
    };
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: "Error enviando el email del recibo"
    });
  }
});

export { sendMerchantEmail_post as default };
//# sourceMappingURL=send-merchant-email.post.mjs.map
