import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { addVisitorComponent } from './visitor-add.component';
import { VisitorService } from 'app/services/visitor.service';
import { CoreService } from 'app/core/core.service';
declare interface visitorData {
  // headerRow: string[];
  // dataRows: string[][];
  id: string;
  picture: null,
  fullName: string;
  phoneNumber: string;
  email: string;
  but: string;
  date_hour: Date;
}

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'visitor.component.html'
})

export class VisitorComponent implements OnInit {
  displayedColumns: string[] = ['id', 'picture', 'fullName', 'phoneNumber', 'email', 'but', 'date_hour', 'actions'];
  dataSource = new MatTableDataSource<visitorData>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private _dialog: MatDialog,
    private _visitorservice: VisitorService,
    private _coreService: CoreService

  ) { }

  ngOnInit(): void {
    this.getVisitorList();
  }

  AddVisitor(): void {
    const dialogRef = this._dialog.open(addVisitorComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVisitorList();
        }
      }
    });
  }


  getVisitorList(): void {
    this._visitorservice.getVisitor().subscribe({
      next: (res) => {
        this.dataSource.data = res;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.error
    });
  }

  deleteVisitor(id: string): void {
    this._visitorservice.deleteVisitor(id).subscribe({
      next: () => {
        this._coreService.openSnackBar('Visitor deleted!', 'done');
        this.getVisitorList();
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


  UpdateVisitor(data: any) {
    const dialogRef = this._dialog.open(addVisitorComponent, {
      data,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getVisitorList();
        }
      }
    });
  }

}
