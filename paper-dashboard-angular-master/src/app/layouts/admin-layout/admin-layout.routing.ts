import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { EmployeeComponent } from 'app/pages/employees/employee.component';
import { VisitorComponent } from 'app/pages/visitors/visitor.component';
import { UnknownComponent } from 'app/pages/unknown/unknown.component';
import { NotificationsComponent } from 'app/pages/notif/notifications.component';
import { ChecklistComponent } from 'app/pages/checklist/checklist.component';
import { LoginComponent } from 'app/auth/login/login.component';
import { RegisterComponent } from 'app/auth/register/register.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'profile',           component: ProfileComponent },
     { path: 'employeeList', component: EmployeeComponent },
    { path: 'visitorList',           component: VisitorComponent },
    { path: 'unknownList',  component: UnknownComponent },
    { path: 'checkList',  component: ChecklistComponent },
    { path: 'employee/:id', component: EmployeeComponent},
    // { path: 'register', component: RegisterComponent },

    
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
