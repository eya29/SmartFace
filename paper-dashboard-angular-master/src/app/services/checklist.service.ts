import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class ChecklistService {
    private apiUrl = 'http://localhost:3001/users/employee';

    constructor(private _http: HttpClient) { }


    getEmployee(): Observable<any> {
        return this._http.get(`${this.apiUrl}`);
    }


}
