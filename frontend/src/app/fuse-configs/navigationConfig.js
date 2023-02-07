import i18next from 'i18next';


import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
  {
    id: 'applications',
    title: 'Applications',
    translate: 'APPLICATIONS',
    type: 'group',
    icon: 'apps',
    children: [
      {
        id: 'mail',
        title: 'Mail',
        translate: 'MAIL',
        type: 'item',
        icon: 'email',
        url: '/apps/mail',
        badge: {
          title: 25,
          bg: '#F44336',
          fg: '#FFFFFF',
        },
      },
      {
        id: 'file-manager',
        title: 'File Manager',
        translate: 'FILE_MANAGER',
        type: 'item',
        icon: 'folder',
        url: '/apps/file-manager',
      },
      {
        id: 'contacts',
        title: 'Contacts',
        translate: 'CONTACTS',
        type: 'item',
        icon: 'account_box',
        url: '/apps/contacts/all',
      },
      {
        id: 'chat',
        title: 'Chat',
        translate: 'CHAT',
        type: 'item',
        icon: 'chat',
        url: '/apps/chat',
        badge: {
          title: 13,
          bg: 'rgb(9, 210, 97)',
          fg: '#FFFFFF',
        },
      },
      {
        id: 'rephrase',
        title: 'Rephrase',
        translate: 'Rephrase',
        type: 'item',
        icon: 'chat',
        url: '/apps/rephrase',
        badge: {
          title: 13,
          bg: 'rgb(9, 210, 97)',
          fg: '#FFFFFF',
        },
      },
    ],
  },
  {
    type: 'divider',
    id: 'divider-1',
  },
];

export default navigationConfig;
