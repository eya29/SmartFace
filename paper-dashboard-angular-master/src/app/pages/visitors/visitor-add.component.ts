
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/core.service';
import { VisitorService } from 'app/services/visitor.service';

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'visitor-add.component.html',


})

export class addVisitorComponent implements OnInit {
  visitorForm: FormGroup;
  imagePreview: string | ArrayBuffer;

  constructor(
    private _fb: FormBuilder,
    private _visitorService: VisitorService,
    private _dialogRef: MatDialogRef<addVisitorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,

  ) {
    this.visitorForm = this._fb.group({
      picture: new FormControl(''),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      but: new FormControl(''),
      role: "visitor",
      date_hour: new FormControl('', Validators.required),

    })
  }

  ngOnInit(): void {
    this.visitorForm.patchValue(this.data);
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onFormSubmit() {
    if (this.visitorForm.valid) {
      if (this.data) {
        this._visitorService.updateVisitor(this.data.id, this.visitorForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee details updated!');
            this._coreService.openSnackBar('Visitor details updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._visitorService.addVisitor(this.visitorForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee added successfully');
            this._coreService.openSnackBar('Visitor added successfully');

            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      }

    }
  }
}
