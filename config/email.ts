export function receiptTemplateConfig() {
  return {
    subject: 'CCS MultiSport recibo de compra - Order ID: %orderId%',
    text: 'CCS MultiSport recibo de compra',
    template: {
      preview: 'Caracas Multisport - Recibo de compra',
      theme: {
        primary: '#001e61',
        primaryTop: '#193470',
        secondary: '#f18a00',
        secondaryInfo: '#ffffff',
        foreground: '#efeef1',
        info: '#acb5cb',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/main/static/favicon.png',
          alt: 'Caracas Multisport',
        },
        contact: {
          email: 'ccsmultisport@gmail.com',
          instagram: '@caracasmultisport',
          phone: '0412.203.1239',
        },
      },
      body: {},
      footer: {
        cta: {
          link: 'https://caracasmultisport.com/',
          text: 'Ir a la tienda',
        },
        social: [
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/x.png',
            link: '#',
          },
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/facebook.png',
            link: '#',
          },
          {
            icon: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/develop/static/email/whatsapp.png',
            link: '#',
          },
        ],
        copyright: {
          text: '© 2022 Caracas Multisport',
          location: 'Caracas, Venezuela',
        },
      },
    },
  };
}

export function merchantTemplateConfig() {
  return {
    subject: 'CCS MultiSport nueva orden - Order ID: %orderId%',
    text: 'CCS MultiSport nueva orden',
    template: {
      preview: 'Caracas Multisport - Nueva orden',
      theme: {
        primary: '#001e61',
        primaryTop: '#193470',
        secondary: '#f18a00',
        secondaryInfo: '#ffffff',
        foreground: '#efeef1',
        info: '#acb5cb',
      },
      header: {
        icon: {
          url: 'https://raw.githubusercontent.com/Novanet-Studio/cmstem-fe/main/static/favicon.png',
          alt: 'Caracas Multisport',
        },
      },
      body: {},
      footer: {
        cta: {
          link: 'https://caracasmultisport.com/',
          text: 'Ir a la tienda',
        },
        copyright: {
          text: '© 2022 Caracas Multisport',
          location: 'Caracas, Venezuela',
        },
      },
    },
  };
}
