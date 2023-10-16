import sgMail from '@sendgrid/mail';

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);
    const { sendgrid, emailUrl } = useRuntimeConfig();
    const MERCHANT_EMAIL_URL = `${emailUrl}/api/merchant-email`;

    const template = await $fetch<string>(MERCHANT_EMAIL_URL, {
      method: 'post',
      body: {
        props: {
          body: {
            ...data,
          },
        },
      },
    });

    if (!template) {
      return createError({
        statusCode: 500,
        statusMessage: 'Error enviando el email del recibo',
      });
    }

    sgMail.setApiKey(sendgrid.apiKey);

    const payload = {
      to: sendgrid.receiverEmail,
      from: sendgrid.senderEmail,
      subject: `CCS MultiSport nueva orden ${data.orderId}`,
      text: 'CCS MultiSport nueva orden',
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
