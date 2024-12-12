import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../auth.service';


@Component({
  selector: 'app-register',
  // standalone:true,
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit {
  formGroup: FormGroup;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private formBuilder: FormBuilder
  ) { }


  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.formGroup = this.formBuilder.group({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required]),
    });
  }

  async registerProcess() {
    if (this.formGroup.valid) {
      console.log(this.formGroup);

      let result: any = await this.authService.register(this.formGroup.value);
      (result?.success) && this.router.navigateByUrl('/login');
      // if (this.formGroup.valid) {
      //   this.authService.register(this.formGroup.value).subscribe(result => {
      //     if (result.success) {
      //       console.log(result);
      //       alert(result.message);
      //       this.router.navigate(['/login']);
      //     } else {
      //       alert(result.message);
      //     }
      //   });
    }
  }

  navigateToLogin(): void {
    this.router.navigate(['/login']);
  }

}
