import { Routes } from '@ray-js/types';

export const routes: Routes = [
    {
        route: '/',
        path: '/pages/home/index',
        name: 'Home',
    },
    {
        route: '/settings',
        path: '/pages/settings/index',
        name: 'Settings',
    },
    {
        route: '/counters',
        path: '/pages/counters/index',
        name: 'Counters',
    },
    // {
    //     route: '/radio-sensors',
    //     path: '/pages/radio-sensors/index',
    //     name: 'Counters',
    // },
];
