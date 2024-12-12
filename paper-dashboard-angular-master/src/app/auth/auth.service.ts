import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    private apiUrl = `http://localhost:3001/auth`;

    constructor(
        private http: HttpClient,
        private router: Router
    ) { }


    async login(credentials: any): Promise<any> {
        try {
            console.log(credentials);

            return await this.http.post(`${this.apiUrl}/login`, credentials).toPromise();
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async register(userDetails: any): Promise<any> {
        try {
            console.log(userDetails);
            return await this.http.post(`${this.apiUrl}/register`, userDetails).toPromise();;
        }
        catch (error) {
            console.log(error);
            return null;
        }
    }

    isAuthenticated(): boolean {
        return !!localStorage.getItem('access_token');
    }

    logout() {
        localStorage.removeItem('access_token');
    }

    // logout(): void {
    //     // Clear any stored authentication tokens (if applicable)
    //     localStorage.removeItem('authToken'); // Example: Removing token from local storage

    //     // Optionally, clear other user-related data from storage
    //     localStorage.removeItem('user');

    //     // Redirect to the login page
    //     this.router.navigate(['/login']);
    // }
}