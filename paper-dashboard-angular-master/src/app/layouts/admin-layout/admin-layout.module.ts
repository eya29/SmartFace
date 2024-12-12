import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { ProfileComponent } from '../../pages/profile/profile.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { NotificationsComponent } from '../../pages/notif/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import { EmployeeComponent } from 'app/pages/employees/employee.component';
import { UnknownComponent } from 'app/pages/unknown/unknown.component';
import { VisitorComponent } from 'app/pages/visitors/visitor.component';
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { EmpAddEditComponent } from 'app/pages/employees/emp-add-edit.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { RegisterComponent } from 'app/auth/register/register.component';
import { addVisitorComponent } from 'app/pages/visitors/visitor-add.component';
import { addUnknownComponent } from 'app/pages/unknown/add-unknown.component';
import { NotificationsService } from 'app/pages/notif/notif.service';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
    TableComponent,
    UpgradeComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    EmployeeComponent,
    UnknownComponent,
    VisitorComponent,
    EmpAddEditComponent,
    addVisitorComponent,
    addUnknownComponent,
    NotificationsComponent,
  ],
  entryComponents: [EmpAddEditComponent, addVisitorComponent, addUnknownComponent],
})

export class AdminLayoutModule { }
