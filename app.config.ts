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
        text: '@cms',
      },
      {
        link: '#',
        icon: 'whatsapp',
        text: '+58 412-12315654',
      },
      {
        link: '#',
        icon: 'email',
        text: 'cms@gmal.com',
      },
    ],
  },
  home: {
    slider: ['/img/home/1.jpg', '/img/home/2.jpg'],
    promotions: ['/img/home/promotion-1.jpeg'],
  },
  about: {
    slider: ['/img/home/3.jpg', '/img/home/2.jpg'],
  },
});
