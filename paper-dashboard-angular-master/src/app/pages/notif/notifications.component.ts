import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { NotificationsService } from './notif.service'; 
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',

})
export class NotificationsComponent implements OnInit {
  displayedColumns: string[] = ['id', 'message', 'description', 'isRead', 'actions'];
  dataSource = new MatTableDataSource<Notification>();
  notifications: Notification[] = []; // Définit la liste des notifications
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private notificationsService: NotificationsService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadNotifications();
  }

  // Charge les notifications depuis le service
  loadNotifications(): void {
    this.notificationsService.getNotifications().subscribe({
      next: (data: Notification[]) => {
        this.notifications = data;
        this.dataSource.data = this.notifications;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des notifications', err);
        this.snackBar.open('Erreur lors du chargement des notifications', 'Fermer', {
          duration: 3000
        });
      }
    });
  }


  markAsRead(id: string): void {
    this.notificationsService.toggleReadStatus(id).subscribe({
      next: () => {
        this.snackBar.open('Notification marquée comme lue', 'Fermer', {
          duration: 3000
        });
        this.loadNotifications(); 
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la notification', err);
        this.snackBar.open('Erreur lors de la mise à jour de la notification', 'Fermer', {
          duration: 3000
        });
      }
    });
  }

  
 
  deleteNotification(id: string): void {
    this.notificationsService.deleteNotification(id).subscribe({
      next: () => {
        this.snackBar.open('Notification supprimée', 'Fermer', {
          duration: 3000
        });
        this.loadNotifications(); // Recharge les notifications après la suppression
      },
      error: (err) => {
        console.error('Erreur lors de la suppression de la notification', err);
        this.snackBar.open('Erreur lors de la suppression de la notification', 'Fermer', {
          duration: 3000
        });
      }
    });
  }
}
