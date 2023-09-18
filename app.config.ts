export default defineAppConfig({
  header: {
    logo: 'logo.png',
  },
  footer: {
    copyright: {
      site: 'ccsmultisport.com',
    },
    widgets: [
      {
        link: 'https://www.instagram.com/cms/',
        icon: 'instagram',
        text: '@ccsmultisport',
      },
      {
        link: 'https://wa.me/message/XTA7RUDHZKT4C1',
        icon: 'whatsapp',
        text: '+58 424-154-8330',
      },
      {
        link: 'https://www.facebook.com/CcsMultiSport',
        icon: 'facebook',
        text: 'CcsMultiSport',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.jpg', '/img/home/2.jpg'],
    promotions: ['/img/home/promotion-1.jpeg'],
  },
});
