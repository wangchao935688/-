import {Component, OnInit} from '@angular/core';
import {WorkerSimple} from "../../../../core/messages/model/worker_simple";
import {WorkerService} from "../../../../core/service/worker.service";
import {BookingService} from "../../../../core/service/booking.service";
import {DoctorBookingModel} from "../../../../core/messages/worker-request-response";

@Component({
  selector: 'app-tile-today',
  templateUrl: './tile-today.component.html',
  styleUrls: ['./tile-today.component.scss']
})
export class TileTodayComponent implements OnInit {
  count: number;

  doctorList: DoctorBookingModel[];
  nurseList: WorkerSimple[];

  constructor(private workerService: WorkerService, private bookingService: BookingService) {
  }

  ngOnInit() {
    this.workerService.getGetList({workerTypeArray: [1]}).subscribe(t => {
      this.nurseList = t;
      console.log(t);
    });

    this.workerService.postWorkerDoctorBookingList().subscribe(t => this.doctorList = t.Items);
  }

  checkPassed() {
    return false
  }
}
