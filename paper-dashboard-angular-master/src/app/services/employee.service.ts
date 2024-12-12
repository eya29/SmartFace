import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class EmployeeService {
    private apiUrl = 'http://localhost:3001/users/employee';

    constructor(private _http: HttpClient) { }

    addEmployee(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    updateEmployee(id: string, data: any): Observable<any> {
        return this._http.put(`${this.apiUrl}/${id}`, data);
    }


    getEmployee(): Observable<any> {
        return this._http.get(`${this.apiUrl}`);
    }

    deleteEmployee(_id: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${_id}`);
    }


}
