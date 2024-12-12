import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'app/auth/auth.service';
import { EmployeeService } from 'app/services/employee.service';
import Chart from 'chart.js';


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{
  employees: string [] = [];
  selectedEmployee: string | null = null;

  onEmployeeChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.selectedEmployee = selectElement.value;
  }

  constructor(
    private authService: AuthenticationService,
    private employeeService: EmployeeService
  ) { }

  onLogout(): void {
    this.authService.logout();
  }



  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;
  public chartHours;

    ngOnInit(){

      this.initializeCharts();
      this.employeeService.getEmployee().subscribe(data => {
        this.employees = data.map(employee => employee.fullName);
      });
    }

    initializeCharts() {
      this.canvas = document.getElementById("chartEmail");
      this.ctx = this.canvas.getContext("2d");
      this.chartEmail = new Chart(this.ctx, {
        type: 'pie',
        data: {
          labels: ['Employees', 'Visitors', 'Unknown'],
          datasets: [{
            label: "People",
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: [
              '#4acccd', 
              '#fcc468', 
              '#ef8157' 
            ],
            borderWidth: 0,
            data: [600, 320, 220]
          }]
        },

        options: {

          legend: {
            display: false
          },

          pieceLabel: {
            render: 'percentage',
            fontColor: ['white'],
            precision: 2
          },

          tooltips: {
            enabled: false
          },

          scales: {
            yAxes: [{

              ticks: {
                display: false
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: "transparent",
                color: 'rgba(255,255,255,0.05)'
              }

            }],

            xAxes: [{
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: "transparent"
              },
              ticks: {
                display: false,
              }
            }]
          },
        }
      });

      var speedCanvas = document.getElementById("speedChart");
      
      var dataFirst = {
        label: 'Arrival Time',
        data: [
          {x: 'Mon', y: '08:30'},
          {x: 'Tue', y: '09:00'},
          {x: 'Wed', y: '09:00'},
          {x: 'Thu', y: '08:30'},
          {x: 'Fri', y: '10:00'}
        ],
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };


      var speedData = {
        labels: ["Mon", "Tues", "Wed", "Thur", "Fri"],
        datasets: [dataFirst]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        },
        scales: {
          // y: {
          //   type: 'category', // Utiliser une échelle de type 'category'
          //   labels: [ '08:00', '09:00', '10:00', '11:00', '12:00'], // Les valeurs sur l'axe des Y
          //   ticks: {
          //     autoSkip: false, 
          //     callback: function(value, index, values) {
          
          //       return value;
          //     }
          //   }
          // },
          x: {
            type: 'category', // Garder l'axe X en mode 'category'
            labels: ["Mon", "Tue", "Wed", "Thu", "Fri"], // Les jours de la semaine
            ticks: {
              autoSkip: true,
              maxTicksLimit: 5
            }
          }
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
    }
   
}


