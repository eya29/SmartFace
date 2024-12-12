
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CoreService } from 'app/core/core.service';
import { EmployeeService } from 'app/services/employee.service';

@Component({
  selector: 'table-cmp',
  moduleId: module.id,
  templateUrl: 'emp-add-edit.component.html',
  // styleUrls: ['emp.component.css']

})

export class EmpAddEditComponent implements OnInit {
  empForm: FormGroup;
  imagePreview: string | ArrayBuffer;

  constructor(
    private _fb: FormBuilder,
    private _empService: EmployeeService,
    private _dialogRef: MatDialogRef<EmpAddEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _coreService: CoreService,

  ) {
    this.empForm = this._fb.group({
      picture: new FormControl(''),
      fullName: new FormControl('', Validators.required),
      phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      role: "employee",
      department: new FormControl(''),
      post: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    this.empForm.patchValue(this.data);
  }


  onFileSelected(event: Event): void {
    const file = (event.target as HTMLInputElement).files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;

        this.empForm.patchValue({
          picture: file
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onFormSubmit() {
    if (this.empForm.valid) {
      const formData = this.empForm.value;
      console.log("Form Data:", formData); // Log form data before sending

      if (this.data) {
        this._empService.updateEmployee(this.data.id, formData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Employee details updated!');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error updating employee:', err.response?.data || err.message || err);
            this._coreService.openSnackBar('Error updating employee');
          }
        });
      } else {
        this._empService.addEmployee(formData).subscribe({
          next: () => {
            this._coreService.openSnackBar('Employee added successfully');
            this._dialogRef.close(true);
          },
          error: (err: any) => {
            console.error('Error adding employee:', err.response?.data || err.message || err);
            this._coreService.openSnackBar('Error adding employee');
          }
        });
      }
    } else {
      this._coreService.openSnackBar('Form is invalid, please check your inputs.');
    }
  }
}
