import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class VisitorService {
    private apiUrl = 'http://localhost:3001/users/visitor';

    constructor(private _http: HttpClient) { }

    addVisitor(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}`, data, {
            headers: { 'Content-Type': 'application/json' },
        });
    }

    updateVisitor(id: number, data: any): Observable<any> {
        return this._http.put(`${this.apiUrl}/${id}`, data);
    }


    getVisitor(): Observable<any> {
        return this._http.get(`${this.apiUrl}`);
    }

    deleteVisitor(_id: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${_id}`);
    }


}
