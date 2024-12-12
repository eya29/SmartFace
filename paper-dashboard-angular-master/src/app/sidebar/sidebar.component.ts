import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'',       class: '' },
    { path: '/employeeList',         title: 'List of employees',             icon:'',    class: '' },
    { path: '/visitorList',          title: 'List of visitors',              icon:'',      class: '' },
    { path: '/unknownList', title: 'Unknown list',     icon:'',    class: '' },
   // { path: '/user',          title: 'User Profile',      icon:'',  class: '' },
    { path: '/checkList',         title: 'CheckList',        icon:'',    class: '' },
    { path: '/notifications',         title: 'notif',        icon:'',    class: '' },
    
    { path: '/login',         title: 'login',        icon:'',    class: '' },
  { path: '/register',    title: 'register',        icon:'', class: '' },
    
    { path: '/login',       title: '',    icon:'nc-button-power',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
}
