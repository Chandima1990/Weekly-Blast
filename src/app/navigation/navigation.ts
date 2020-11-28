import { FuseNavigation } from '@fuse/types';

export const navigation: FuseNavigation[] = [
    {
        id: 'teams',
        title: 'Teams',
        type: 'item',
        icon: 'group',
        url: '/teams',
    }, 
    {
        id: 'game',
        title: 'Game on',
        type: 'item',
        icon: 'games',
        url: '/games',
    },
    {
        id: 'closing',
        title: 'Closing Ceremony',
        type: 'item',
        icon: 'flag',
        url: '/closing',
    },
];
