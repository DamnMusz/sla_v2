import {  RouteInfo } from './sidebar.metadata';

export const ROUTES: RouteInfo[] = [
    { path: 'home', title: 'Inicio',  icon: 'dashboard', class: '' },
    { path: 'table', title: 'SLA Aseguradoras',  icon:'trending_up', class: '' },
    { path: '', title: '',  icon:'', class: 'inactiveLink' },
    { path: 'typography', title: 'Resumen Ejecutivo',  icon:'view_headline', class: '' },
    { path: 'icons', title: 'Semestral Aseguradoras',  icon:'work', class: '' },
    { path: 'maps', title: 'Semestral Inspectores',  icon:'group', class: '' },
    { path: 'notifications', title: 'Semestral Centros',  icon:'location_city', class: '' },
    { path: '', title: '',  icon:'', class: 'inactiveLink' },
    { path: 'user', title: 'Liquidación Siniestros',  icon:'file_upload', class: '' },
    { path: 'user', title: 'Liquidación Inspectores',  icon:'person', class: '' },
    { path: 'user', title: 'Liquidación Centros',  icon:'store_mall_directory', class: '' }
];
