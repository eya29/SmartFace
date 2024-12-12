// src/app/services/notifications.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationsService {
  private apiUrl = 'http://localhost:3001/notifications';

  constructor(private http: HttpClient) { }

  getNotifications(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  createNotification(employeeId: string, message: string, description?: string): Observable<any> {
    return this.http.post(this.apiUrl, { employeeId, message, description });
  }

  markAsViewed(id: string): Observable<any> {
    return this.http.patch(`${this.apiUrl}/${id}/read`, {});
  }
  toggleReadStatus(id: string): Observable<Notification> {
    return this.http.patch<Notification>(`${this.apiUrl}/${id}/toggle-read`, {});
  }

  deleteNotification(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}