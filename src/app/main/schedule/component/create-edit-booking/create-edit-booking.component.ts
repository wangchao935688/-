import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {ApplicationService} from "../../../../core/service/application.service";
import {SaveBookingRequest} from "../../../../core/messages/booking-request-response";
import {CreateBookingForm} from "../../../../core/forms/booking/create-schedule-form";
import {GeneralService} from "../../../../core/service/general.service";
import {SelectButtonGroupComponent} from "../../../../shared/component/qiezzi-select-button-group/select-button-group.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {SavePatientRequest} from "../../../../core/messages/patient-request-response";
import {QiezziSelectPatientComponent} from "../../../../shared/component/qiezzi-select-patient/qiezzi-select-patient.component";
import {PatientModel} from "../../../../core/messages/model/patient.model";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {WorkerSimple} from "../../../../core/messages/model/worker_simple";
import {WorkerService} from "../../../../core/service/worker.service";
import {PatientService} from "../../../../core/service/patient.service";
import {BookingService} from "../../../../core/service/booking.service";
import * as moment from "moment";

@Component({
  selector: 'app-create-edit-booking',
  templateUrl: './create-edit-booking.component.html',
  styleUrls: ['./create-edit-booking.component.scss']
})
export class CreateEditBookingComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  OneDayMillsSecond = 1000 * 60 * 60 * 24;
  ThirtyMinutesMillsSecond = 1000 * 60 * 30;

  formName: string;
  formGroup: FormGroup;
  formModel: CreateBookingForm;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  doctorListDataSource: SelectItem[];

  startTimeSelectedIndex: number;
  endTimeSelectedIndex: number;
  timeRows: { [key: string]: string }[];

  leftTimeDropDownDataSource: { [key: string]: string }[];
  rightTimeDropDownDataSource: { [key: string]: string }[];

  isImportant: boolean = false;
  iconListData: any[];
  data: any;

  patientInfo: PatientModel;

  doctorList: WorkerSimple[];

  constructor(private formService: CustomizeFormValidateService,
              private application: ApplicationService,
              private general: GeneralService,
              private workerService: WorkerService,
              private patientService: PatientService,
              private bookingService: BookingService) {
    super();
  }

  ngOnInit() {
    let tmp: SelectItem[] = [];
    this.workerService.getGetList({workerTypeArray: [0]}).subscribe(t => {
      this.doctorList = t;

      for (let i = 0; i < this.doctorList.length; i++) {
        tmp.push({label: this.doctorList[i].WorkerName, value: this.doctorList[i].WorkerCode})
      }

      this.doctorListDataSource = tmp;
    });

    this.startTimeSelectedIndex = Math.ceil((new Date(this.general.getServerTime()).getTime() % this.OneDayMillsSecond) / this.ThirtyMinutesMillsSecond);
    this.iconListData = [{icon: 'important', color: '#cccccc'}, {icon: 'contacts', color: '#cccccc'}]
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
    this.formName = 'Booking';
    this.formModel = new CreateBookingForm();
    this.formModel.VisitDate = this.data;
    this.formService.buildForm(this);



    this.onVisitDateChange(this.formModel.VisitDate);

    this.leftTimeDropDownDataSource = this.timeRows;
    this.rightTimeDropDownDataSource = this.timeRows;
  }

  onBirthDateChange(date) {
    this.formModel.BirthDate = date;
    let age = moment(new Date()).diff(moment(date), 'years');
    this.formModel.Age = isNaN(age) ? null : age;
    this.formGroup.patchValue(this.formModel);
  }

  onVisitDateChange(date) {
    let current = new Date(this.general.getServerTime());

    let currentDay = moment(current).format('YYYY-MM-DD');
    let selectDay = moment(date).format('YYYY-MM-DD');

    if (currentDay === selectDay) {
      let index = Math.ceil(moment(current).diff(moment(currentDay + 'T00:00:00.000'), 'ms') / this.ThirtyMinutesMillsSecond);
      this.leftTimeDropDownDataSource = this.timeRows.slice(index, this.timeRows.length);
      this.rightTimeDropDownDataSource = this.timeRows.slice(index + 1, this.timeRows.length);
    } else {
      this.leftTimeDropDownDataSource = this.timeRows;
      this.rightTimeDropDownDataSource = this.timeRows;
    }
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
    let savePatientRequest: SavePatientRequest = new SavePatientRequest();
    savePatientRequest.PatientName = this.formModel.PatientName;
    savePatientRequest.PatientCode = this.formModel.PatientCode;
    savePatientRequest.IsImportant = this.isImportant;
    savePatientRequest.Id = (this.patientInfo ? this.patientInfo.Id : null);
    savePatientRequest.State = 1;

    this.patientService.createPatient(savePatientRequest).subscribe(t => {
      let bookingRequest: SaveBookingRequest = new SaveBookingRequest();
      bookingRequest.TableType = 1;
      bookingRequest.Id = this.data || null;
      bookingRequest.PatientID = t.PatientID;
      bookingRequest.IsImportant = this.isImportant;
      bookingRequest.Sex = this.formModel.Sex;
      bookingRequest.BirthDate = this.formModel.BirthDate;
      bookingRequest.Tel = this.formModel.Tel;
      bookingRequest.AreaCode = this.formModel.AreaCode;
      bookingRequest.Phone = this.formModel.Phone;
      bookingRequest.PatlogType = this.formModel.PatlogType;
      bookingRequest.DoctorCode = this.formModel.DoctorCode;
      bookingRequest.Aim = this.formModel.Aim;
      bookingRequest.StartTime = this.formModel.VisitDate + 'T' + this.formModel.StartTime;
      bookingRequest.EndTime = this.formModel.VisitDate + 'T' + this.formModel.EndTime;
      bookingRequest.Note = this.formModel.Note;

      bookingRequest.WXBookingId = null;
      bookingRequest.ProcessId = null;
      bookingRequest.IsSendSMS = null;

      this.bookingService.postBookingSaveBooking(bookingRequest).subscribe(t => {
        this.application.main.openPromptMessage('保存成功！');
        this.close();
      })
    })
  }

  onSelectPatient(item: PatientModel) {
    this.patientInfo = item || null;

    this.formModel.PatientCode = item.PatientCode;
    this.formModel.Tel = item.Tel;
    this.formModel.AreaCode = item.Phone && item.Phone.split('-', 2)[0];
    this.formModel.Phone = item.Phone && item.Phone.split('-', 2)[1];
    this.formModel.Tel = item.Tel;
    this.formModel.Age = item.Age;
    this.formModel.BirthDate = item.BirthDate;

    this.formGroup.patchValue(this.formModel);
  }

  onIconClick(index) {
    if (index === 0) {
      this.isImportant = !this.isImportant;
      this.iconListData[0].color = this.isImportant ? '#FEA356' : '#cccccc';
    } else {
      this.application.frontLayer.openPopupWindow(QiezziSelectPatientComponent, '选择患者', PopupWindowSize.SMALL, 810).subscribe(t => {
      });
    }
  }

  onEndTimeChange(index) {
    if (this.rightTimeDropDownDataSource[index].value === '00:00')
      this.formErrors['EndTime'] = '结束时间不能是零点';
    if (index < this.endTimeSelectedIndex)
      this.endTimeSelectedIndex = index + 1;
  }

  onStartTimeChange(index) {
    if(this.formModel.VisitDate) {
      let startTime = (this.formModel.VisitDate || moment(new Date()).format('YYYY-MM-DD')) + 'T' + this.formModel.StartTime;

      if (new Date(startTime) < new Date(this.general.getServerTime()))
        this.formErrors['StartTime'] = '预约开始时间不能早于当前时间';
    }
  }

  onAimClick() {
    this.application.frontLayer.openPopupWindow(SelectButtonGroupComponent, '选择就诊事项', PopupWindowSize.SMALL, 475).subscribe(t => {
    })
  }
}
