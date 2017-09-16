import {Component, Input, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {WorkerService} from "../../../../core/service/worker.service";

@Component({
  selector: 'app-booking-select-doctor',
  templateUrl: './booking-select-doctor.component.html',
  styleUrls: ['./booking-select-doctor.component.scss']
})
export class BookingSelectDoctorComponent extends PopupWindowBaseComponent implements OnInit {
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  doctorListDataSource: SelectItem[];

  selectedDoctorCode: string;
  @Input()
  data: any;

  constructor(private workerService: WorkerService) {
    super();
  }

  ngOnInit() {
    let tmp: SelectItem[] = [];
    this.workerService.getGetList({workerTypeArray: [0]}).subscribe(t => {
      for (let i = 0; i < t.length; i++) {
        tmp.push({label: t[i].WorkerName, value: t[i].WorkerCode})
      }
      this.doctorListDataSource = tmp;
    });
  }

  onDoctorSelectChange(index) {
    this.selectedDoctorCode = this.doctorListDataSource[index].value
  }

  save() {
    this.sendMessage(this.doctorListDataSource[1].value);
    this.close();
  }
}
