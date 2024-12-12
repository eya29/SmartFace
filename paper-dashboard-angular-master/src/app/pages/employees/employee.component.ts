import { Component, OnInit, ViewChild } from '@angular/core';
import { EmpAddEditComponent } from './emp-add-edit.component';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from 'app/services/employee.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { CoreService } from 'app/core/core.service';

export declare interface EmployeeData {
  // headerRow: string[];
  // dataRows: string[][];
  id: string;
  picture: null,
  fullName: string;
  phoneNumber: string;
  email: string;
  department: string;
  post: string;
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'employee.component.html'
})

export class EmployeeComponent implements OnInit {
  displayedColumns: string[] = ['id', 'picture', 'fullName', 'phoneNumber', 'email', 'department', 'post', 'actions'];
  dataSource = new MatTableDataSource<EmployeeData>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _empService: EmployeeService,
    private _coreService: CoreService

  ) { }

  ngOnInit(): void {
    this.getEmployeeList();
  }

  openAddEditEmpForm(): void {
    const dialogRef = this._dialog.open(EmpAddEditComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

  getEmployeeList(): void {
    this._empService.getEmployee().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    });
  }

  deleteEmployee(_id: string): void {
    this._empService.deleteEmployee(_id).subscribe({
      next: () => {
        // alert('Employee deleted!');
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getEmployeeList();
      },
      error: console.error
    });

    // if (confirm('Are you sure you want to delete this employee?')) {
    //     this._empService.deleteEmployee(id).subscribe(() => {
    //       // Remove the employee from the dataSource
    //       this.dataSource = this.dataSource.filter(emp => emp.id !== employeeId);
    //       this.snackBar.open('Employee deleted successfully!', '', { duration: 2000 });
    //     }, error => {
    //       this.snackBar.open('Failed to delete employee.', '', { duration: 2000 });
    //     });
    //   }
  };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };


  UpdateEmployee(data: any) {
    const dialogRef = this._dialog.open(EmpAddEditComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getEmployeeList();
        }
      }
    });
  }

}