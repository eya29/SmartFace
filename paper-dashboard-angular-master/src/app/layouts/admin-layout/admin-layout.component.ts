import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'app/pages/notif/notif.service';


@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  constructor(
    private notificationService: NotificationsService
  ) { }

  ngOnInit() {

    this.getNotifications();


  }

  getNotifications() {
    this.notificationService.getNotifications().subscribe(notifications => {
      // Check for unviewed notifications
      const unviewedNotifications = notifications.filter((notification: any) => !notification.viewed);

      // Show notifications using the Service Worker
      unviewedNotifications.forEach((notification: any) => {
        this.showNotification(notification);
      });
    });
  }

  // Function to show a notification
  showNotification(notification: any) {
    if (Notification.permission === 'granted') {
      // Display the notification
      new Notification(notification.title, {
        body: notification.message,
      });

      // After showing the notification, mark it as viewed
      this.notificationService.markAsViewed(notification._id).subscribe(
        () => console.log(`Notification ${notification._id} marked as viewed`),
        (error) => console.error('Failed to update notification as viewed:', error)
      );
    } else {
      console.log('Notification permissions not granted');
    }
  }

}


// // Register the Service Worker
// if ('serviceWorker' in navigator && 'PushManager' in window) {
//   navigator.serviceWorker.register('/service-worker.js')
//     .then(function (registration) {
//       console.log('Service Worker registered with scope:', registration.scope);
//     })
//     .catch(function (error) {
//       console.error('Service Worker registration failed:', error);
//     });
// }

// // Function to request notification permission from the user
// async function requestNotificationPermission() {
//   const permission = await Notification.requestPermission();
//   if (permission === 'granted') {
//     console.log('Notification permission granted.');
//   } else {
//     console.warn('Notification permission not granted.');
//   }
// }

// // Call the function to request permission
// requestNotificationPermission();

// setInterval(async () => {
//   try {
//     // Step 1: Call the API to get notifications
//     const response = await fetch('/api/notifications'); // Replace with your API endpoint
//     const notifications = await response.json();

//     // Step 2: Check for notifications that are not viewed
//     const unseenNotifications = notifications.filter(notif => !notif.viewed);

//     // Step 3: Push notifications for each unseen notification
//     unseenNotifications.forEach(async (notif) => {
//       const registration = await navigator.serviceWorker.ready;
//       registration.showNotification(notif.title, {
//         body: notif.message,
//         icon: notif.icon || '/default-icon.png',
//         badge: notif.badge || '/badge-icon.png'
//       });

//       // Step 4: After pushing notification, mark it as viewed
//       await fetch(`/api/notifications/${notif.id}/viewed`, {
//         method: 'PUT'
//       });
//     });
//   } catch (error) {
//     console.error('Error fetching or displaying notifications:', error);
//   }
// }, 3000);

//   () => {
//   //call api get notifs
//   // check sur la notif not viewed
//   // show notif ( service worker .js) push notif , after pushing notif, notif update viewed true
// }, 3000);


