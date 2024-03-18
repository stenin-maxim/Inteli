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
    {
        route: '/counter-1',
        path: '/pages/counter-1/index',
        name: 'Counter 1',
    },
    {
        route: '/wired-sensors',
        path: '/pages/wired-sensors/index',
        name: 'Counters',
    },
];
