// src/attendance/attendance.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { NotificationsService } from '../notif/notif.service';
import { Cron } from '@nestjs/schedule';
import { User } from '../user/schema/user.schema';

@Injectable()
export class CheckService {
  constructor(
    private readonly userService: UserService,
    private readonly notificationsService: NotificationsService
  ) { }

  // Fonction pour vérifier les arrivées des employés toutes les 10 minutes
  @Cron('*/10 * * * *') // Ce cron job s'exécute toutes les 10 minutes
  async checkEmployeeArrival() {
    const currentTime = new Date();

    // Obtenez tous les employés
    const employees = await this.userService.getUsersByRole('employee');

    // Parcourir chaque employé pour vérifier l'heure d'arrivée
    employees.forEach(employee => {
      const arrivalTime = new Date(employee.arrivalTime); // Assurez-vous que l'heure d'arrivée est bien enregistrée

      // Si l'employé arrive après 9h du matin
      // if (arrivalTime.getHours() > 9 || (arrivalTime.getHours() === 9 && arrivalTime.getMinutes() > 0)) {
      //   // Créer et enregistrer la notification
      //   this.notificationsService.createNotification(
      //     employee.id,
      //     `L'employé ${employee.fullName} est en retard.`,
      //     `L'employé ${employee.fullName} est arrivé à ${arrivalTime.toLocaleTimeString()}.`,
      //     false
      //   );

      // }
    });
  }
}
