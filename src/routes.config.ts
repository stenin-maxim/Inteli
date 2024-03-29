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
        route: '/wired-sensors',
        path: '/pages/wired-sensors/index',
        name: 'Wired sensors',
    },
    {
        route: '/radio-sensors',
        path: '/pages/radio-sensors/index',
        name: 'Radio sensors',
    },
    {
        route: '/counter-1',
        path: '/pages/counter-1/index',
        name: 'Counter 1',
    },
    {
        route: '/counter-2',
        path: '/pages/counter-2/index',
        name: 'Counter 2',
    },
];
