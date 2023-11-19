import i from './i.json';

const NAVIGATION = {
  STUDIO: {
    title: i.studio.title,
    items: [
      {
        href: '/studio',
        icon: 'i-solar-shop-bold',
        label: i.studio.profile,
      },
      {
        href: '/studio/takeleave',
        icon: 'i-solar-moon-sleep-bold',
        label: i.studio.takeleave,
      },
    ],
  },
  ORDERS: {
    title: i.orders.title,
    items: [
      {
        href: '/orders',
        icon: 'i-solar-bag-bold',
        label: i.orders.mine,
      },
    ],
  },
  ACCOUNT: {
    title: i.account.title,
    items: [
      {
        href: '/setting',
        icon: 'i-solar-user-rounded-bold',
        label: i.account.setting,
      },
    ],
  },
  LOGOUT: {
    title: '',
    items: [
      {
        href: '/booking',
        icon: 'i-solar-logout-2-bold',
        label: i.logout,
      },
    ],
  },
} as const;

export const PROVIDER_NAVIGATION = [
  NAVIGATION.STUDIO,
  NAVIGATION.ORDERS,
  NAVIGATION.ACCOUNT,
  NAVIGATION.LOGOUT,
];

export const CONSUMER_NAVIGATION = [
  NAVIGATION.ORDERS,
  NAVIGATION.ACCOUNT,
  NAVIGATION.LOGOUT,
];
