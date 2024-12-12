import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/core.service';
import { UserService } from 'app/services/user.service';
import { addUnknownComponent } from './add-unknown.component';
import { UnknownService } from 'app/services/unknown.service';

declare interface UnknownData {
  id: number;
  picture: null,
  fullName: string;
  phoneNumber: string;
  email: string;
  date_hour: string;
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'unknown.component.html'
})

export class UnknownComponent implements OnInit {
  displayedColumns: string[] = ['id', 'picture', 'fullName', 'phoneNumber', 'email', 'actions'];
  dataSource = new MatTableDataSource<UnknownData>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _unknownService: UnknownService,
    private _coreService: CoreService

  ) { }

  ngOnInit(): void {
    this.getUnknownList();
  }

  AddUnknown(): void {
    const dialogRef = this._dialog.open(addUnknownComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUnknownList();
        }
      }
    });
  }


  getUnknownList(): void {
    this._unknownService.getUnknown().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    });
  }

  deleteUnknown(_id: string): void {
    this._unknownService.deleteUnknown(_id).subscribe({
      next: () => {
        this._coreService.openSnackBar('Unknown deleted!', 'done');
        this.getUnknownList();
      },
      error: console.error
    });
  }

  // if (confirm('Are you sure you want to delete this employee?')) {
  //     this._empService.deleteEmployee(id).subscribe(() => {
  //       // Remove the employee from the dataSource
  //       this.dataSource = this.dataSource.filter(emp => emp.id !== employeeId);
  //       this.snackBar.open('Employee deleted successfully!', '', { duration: 2000 });
  //     }, error => {
  //       this.snackBar.open('Failed to delete employee.', '', { duration: 2000 });
  //     });
  //   }
  // };

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  };


  UpdateUnknown(data: any) {
    const dialogRef = this._dialog.open(addUnknownComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getUnknownList();
        }
      }
    });
  }

}
