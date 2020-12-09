import { Component, OnInit } from '@angular/core';
import { Appointment } from 'src/app/appointment';
import { AppointmentService } from 'src/app/appointment.service';
import { mergeMap } from 'rxjs/operators'; 
import { MatToolbarModule } from '@angular/material/toolbar'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
  selector: 'app-appointment-list',
  templateUrl: './appointment-list.component.html',
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent implements OnInit {

  public loading = true;
  public errorMsg: string = '';
  public successMsg: string = '';
  public appointments: Appointment[] = [];
  public columns = ['appointmentDate', 'name', 'email', 'cancel'];

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.appointmentService.getAppointments()
      .subscribe((appointments: Appointment[]) => {
        this.appointments = appointments;
        this.loading = false;
      },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
      this.loading = false;
    });
  }

  cancelAppointment(id: string) {
    this.appointmentService.cancelAppointment(id)
    .pipe(
      mergeMap(() => this.appointmentService.getAppointments())
    )
    .subscribe((appointments: Appointment[]) => {
      this.appointments = appointments;
      this. successMsg = 'Successfully cancelled the appointment'
    },
    (error: ErrorEvent) => {
      this.errorMsg = error.error.message;
    });
  }
}
