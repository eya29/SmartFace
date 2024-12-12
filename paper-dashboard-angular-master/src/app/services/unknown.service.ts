import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })


export class UnknownService {
    private apiUrl = 'http://localhost:3001/users/unknown';

    constructor(private _http: HttpClient) { }

    addUnknown(data: any): Observable<any> {
        return this._http.post(`${this.apiUrl}`, data);
    }

    updateUnknown(_id: string, data: any): Observable<any> {
        return this._http.put(`${this.apiUrl}/${_id}`, data);
    }


    getUnknown(): Observable<any> {
        return this._http.get(`${this.apiUrl}`);
    }

    deleteUnknown(_id: string): Observable<any> {
        return this._http.delete(`${this.apiUrl}/${_id}`);
    }


}
