import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'app/auth/auth.service';


@Component({
    selector: 'app-login',
    // standalone:true,
    templateUrl: './login.component.html',

})

export class LoginComponent implements OnInit {
    formGroup: FormGroup;

    constructor(
        private router: Router,
        private authService: AuthenticationService,) { }

    ngOnInit() {
        this.initForm();
    }
    initForm() {
        this.formGroup = new FormGroup({
            email: new FormControl('', [Validators.required]),
            password: new FormControl('', [Validators.required]),

        });
    }

    async loginProcess() {
        if (this.formGroup.valid) {
            console.log(this.formGroup);

            let result: any = await this.authService.login(this.formGroup.value);
            (result?.accessToken) && this.router.navigateByUrl('/dashboard');
            // this.authService.login(this.formGroup.value).subscribe(result => {
            //     if (result.success){
            //         console.log(result);
            //         alert(result.message);
            //         this.router.navigate(['/dashboard']); 
            //     }else{
            //         alert(result.message)
            //     }
            // });
        }
    }

    // navigateToDashboard(): void {
    //     this.router.navigate(['/dashboard']); }


    navigateToRegister(): void {
        this.router.navigate(['/register']);
    }

}
