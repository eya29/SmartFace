import { Time } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CoreService } from 'app/core/core.service';
import { ChecklistService } from 'app/services/checklist.service';
import { EmpAddEditComponent } from '../employees/emp-add-edit.component';

declare interface Checklist {
    id: string;
    picture: null,
    fullName: string;
    date: Date;
    status: string;
}

@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'checklist.component.html'
})

export class ChecklistComponent implements OnInit {
    displayedColumns: string[] = ['id', 'picture', 'fullName', 'date', 'status', 'actions'];
    dataSource = new MatTableDataSource<Checklist>();

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private _dialog: MatDialog,
        private _checklistService: ChecklistService,
        private _coreService: CoreService

    ) { }
    ngOnInit(): void {
        this.getEmployeeList();
    }


    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    getEmployeeList(): void {
        this._checklistService.getEmployee().subscribe({
            next: (res) => {
                this.dataSource.data = res;
                this.dataSource.sort = this.sort;
                this.dataSource.paginator = this.paginator;
            },
            error: console.error
        });
    }



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
