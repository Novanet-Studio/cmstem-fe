import sgMail from '@sendgrid/mail';
import { config } from 'vue-email/compiler';
import { resolve } from 'node:path';

const vuemail = config(resolve('./emails'));

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    const { sendgrid } = useRuntimeConfig();

    const template = await vuemail.render('receipt.vue', {
      props: {
        body: {
          ...data,
        },
      },
    });

    sgMail.setApiKey(sendgrid.apiKey);

    const payload = {
      to: data.email,
      from: sendgrid.senderEmail,
      subject: `CCS MultiSport recibo de compra ${data.orderId}`,
      text: 'CCS MultiSport recibo de compra',
      html: template,
    };

    await sgMail.send(payload);

    return {
      message: 'Email enviado',
      status: 200,
    };
  } catch (error) {
    console.log(error);
    return createError({
      statusCode: 500,
      statusMessage: 'Error enviando el email del recibo',
    });
  }
});
