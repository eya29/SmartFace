
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/core.service';
import { UnknownService } from 'app/services/unknown.service';
import { VisitorService } from 'app/services/visitor.service';

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'add-unknown.component.html',


})

export class addUnknownComponent implements OnInit {
  unknownForm: FormGroup;
  imagePreview: string | ArrayBuffer;

  constructor(
    private _fb: FormBuilder,
    private _unknownService: UnknownService,
    private _dialogRef: MatDialogRef<addUnknownComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,

  ) {
    this.unknownForm = this._fb.group({
      picture: null,
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl(''),
      role: "unknown",
      email: new FormControl('', [Validators.email]),


    })
  }

  ngOnInit(): void {
    this.unknownForm.patchValue(this.data);
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
    if (this.unknownForm.valid) {
      const formData = this.unknownForm.value;
      console.log('Form Data:', formData);
      if (this.data) {
        this._unknownService.updateUnknown(this.data.id, this.unknownForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee details updated!');
            this._coreService.openSnackBar('Unknown details updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error(err);
          }
        })
      } else {
        this._unknownService.addUnknown(this.unknownForm.value).subscribe({
          next: (val: any) => {
            // alert('Employee added successfully');
            this._coreService.openSnackBar('Unknown added successfully');
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
