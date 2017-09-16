import {Component, OnInit} from '@angular/core';
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {Schedule_Add} from "../../../../core/messages/booking-request-response";
import {ApplicationService} from "../../../../core/service/application.service";
import {QiezziSelectPartakerComponent} from "../../../../shared/component/qiezzi-select-partaker/qiezzi-select-partaker.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {CreateScheduleForm} from "../../../../core/forms/booking/create-schedule-form";
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {BookingService} from "../../../../core/service/booking.service";
import {GeneralService} from "../../../../core/service/general.service";
import * as moment from "moment";

@Component({
  selector: 'app-create-edit-schedule',
  templateUrl: './create-edit-schedule.component.html',
  styleUrls: ['./create-edit-schedule.component.scss']
})
export class CreateEditScheduleComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  OneDayMillsSecond = 1000 * 60 * 60 * 24;
  ThirtyMinutesMillsSecond = 1000 * 60 * 30;

  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  scrollbarOptions: any;

  data: any;

  selectedWorkers: any[];

  startTimeSelectedIndex: number;
  endTimeSelectedIndex: number;

  timeRows: { [key: string]: string }[];
  startTimeRow: { [key: string]: string }[];
  endTimeRow: { [key: string]: string }[];

  timeAlertData: { [key: string]: string[] };

  constructor(private formService: CustomizeFormValidateService,
              private application: ApplicationService,
              private bookingService: BookingService,
              private general: GeneralService) {
    super();
  }

  ngOnInit() {
    this.timeAlertData = {
      '永不': [],
      '分钟': ['1分钟', '2分钟', '3分钟', '4分钟', '5分钟', '6分钟', '7分钟', '8分钟', '9分钟', '10分钟','11分钟', '12分钟', '13分钟', '14分钟', '15分钟', '16分钟', '17分钟', '18分钟', '19分钟', '20分钟','21分钟', '22分钟', '23分钟', '24分钟', '25分钟', '26分钟', '27分钟', '28分钟', '29分钟', '30分钟','31分钟', '32分钟', '33分钟', '34分钟', '35分钟', '36分钟', '37分钟', '38分钟', '39分钟', '30分钟','41分钟', '42分钟', '43分钟', '44分钟', '45分钟', '46分钟', '47分钟', '48分钟', '49分钟', '50分钟','51分钟', '52分钟', '53分钟', '54分钟', '55分钟', '56分钟', '57分钟', '58分钟', '59分钟'],
      '小时': ['1小时', '2小时', '3小时', '4小时', '5小时', '6小时', '7小时', '8小时', '9小时', '10小时','11小时', '12小时', '13小时', '14小时', '15小时', '16小时', '17小时', '18小时', '19小时', '20小时','21小时', '22小时', '23小时'],
      '天': ['1天', '2天', '3天', '4天', '5天', '6天', '7天', '8天', '9天', '10天','11天', '12天', '13天', '14天', '15天', '16天', '17天', '18天', '19天', '20天','21天', '22天', '23天', '24天', '25天', '26天', '27天', '28天', '29天', '30天']
    };

    this.timeRows = [
      {label: "00:00", value: "00:00"},
      {label: "00:30", value: "00:30"},
      {label: "01:00", value: "01:00"},
      {label: "01:30", value: "01:30"},
      {label: "02:00", value: "02:00"},
      {label: "02:30", value: "02:30"},
      {label: "03:00", value: "03:00"},
      {label: "03:30", value: "03:30"},
      {label: "04:00", value: "04:00"},
      {label: "04:30", value: "04:30"},
      {label: "05:00", value: "05:00"},
      {label: "05:30", value: "05:30"},
      {label: "06:00", value: "06:00"},
      {label: "06:30", value: "06:30"},
      {label: "07:00", value: "07:00"},
      {label: "07:30", value: "07:30"},
      {label: "08:00", value: "08:00"},
      {label: "08:30", value: "08:30"},
      {label: "09:00", value: "09:00"},
      {label: "09:30", value: "09:30"},
      {label: "10:00", value: "10:00"},
      {label: "10:30", value: "10:30"},
      {label: "11:00", value: "11:00"},
      {label: "11:30", value: "11:30"},
      {label: "12:00", value: "12:00"},
      {label: "12:30", value: "12:30"},
      {label: "13:00", value: "13:00"},
      {label: "13:30", value: "13:30"},
      {label: "14:00", value: "14:00"},
      {label: "14:30", value: "14:30"},
      {label: "15:00", value: "15:00"},
      {label: "15:30", value: "15:30"},
      {label: "16:00", value: "16:00"},
      {label: "16:30", value: "16:30"},
      {label: "17:00", value: "17:00"},
      {label: "17:30", value: "17:30"},
      {label: "18:00", value: "18:00"},
      {label: "18:30", value: "18:30"},
      {label: "19:00", value: "19:00"},
      {label: "19:30", value: "19:30"},
      {label: "20:00", value: "20:00"},
      {label: "20:30", value: "20:30"},
      {label: "21:00", value: "21:00"},
      {label: "21:30", value: "21:30"},
      {label: "22:00", value: "22:00"},
      {label: "22:30", value: "22:30"},
      {label: "23:00", value: "23:00"},
      {label: "23:30", value: "23:30"}];

    this.scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

    this.formName = 'Schedule';
    this.formModel = new CreateScheduleForm();
    this.formModel

    this.formService.buildForm(this);

    if (this.data) {
      let tmp = [];
      for (let i = 0; i < this.data.Players.length; i++) {
        tmp.push({title: this.data.Players[i].WorkerName, value: this.data.Players[i].WorkerId})
      }
      this.formModel['Players'] = this.selectedWorkers = tmp;
      this.formModel['Name'] = this.data.Name;
    }

    let current = new Date(this.general.getServerTime());
    let timeRowIndex = Math.ceil((current.getTime() % this.OneDayMillsSecond) / this.ThirtyMinutesMillsSecond);

    this.startTimeRow = this.timeRows.slice(timeRowIndex, this.timeRows.length);
    this.endTimeRow = this.timeRows.slice(timeRowIndex + 1, this.timeRows.length);
  }

  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

  save() {
    let PlayerID =[];

    this.formModel.Players.forEach(item=>{
      PlayerID.push(item.value)
    });

    let request: Schedule_Add = new Schedule_Add();
    request.Name = this.formModel.Name;
    request.StartTime = this.formModel.StartDate + 'T' + this.formModel.StartTime;
    request.EndTime = this.formModel.EndDate + 'T' + this.formModel.EndTime;
    request.PlayerID = PlayerID;
    request.Note = this.formModel.Note;
    request.Time = this.formModel.TimeAlert.RightValue;
    request.TimeType = this.formModel.TimeAlert.LeftValue;
    this.bookingService.postScheduleSaveSchedule(request).subscribe(t => {
      this.application.main.openPromptMessage('保存成功！');
    })
  }

  onAddPartakerClick() {
    this.application.frontLayer.openPopupWindow(QiezziSelectPartakerComponent, '选择参与人', PopupWindowSize.SMALL, 463, Array.from(this.selectedWorkers || [])).subscribe(t => {
      if (t && t.type === 'send') {
        this.formModel['Players'] = t.data;
        this.formGroup.setValue(this.formModel);
      }
    });
  }

  onEndTimeChange(index) {
    if (index === 0)
      this.formErrors['EndTime'] = '结束时间不能是零点';
    if (index < this.endTimeSelectedIndex)
      this.endTimeSelectedIndex = index + 1;
  }

  onStartTimeChange(index) {
    if (index > this.endTimeSelectedIndex)
      this.endTimeSelectedIndex = index + 1;
  }

}
