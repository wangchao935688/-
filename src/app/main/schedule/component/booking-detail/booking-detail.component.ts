import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {BookingService} from "../../../../core/service/booking.service";
import {PatientService} from "../../../../core/service/patient.service";
import {bookingSchedulePatlogType, bookingStatus, gender} from "../../../../core/global_dic";
import * as moment from "moment";
import {BookingDetailsResponse, SetStatusRequest} from "../../../../core/messages/booking-request-response";
import {GetPatientResponse} from "../../../../core/messages/patient-request-response";
import {ApplicationService} from "../../../../core/service/application.service";
import {BookingSelectDoctorComponent} from "../booking-select-doctor/booking-select-doctor.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {CreateEditBookingComponent} from "../create-edit-booking/create-edit-booking.component";
import {ActivatedRoute, Router} from "@angular/router";
import {environment, PlatformType} from "../../../../../environments/environment";

@Component({
  selector: 'app-booking-detail',
  templateUrl: './booking-detail.component.html',
  styleUrls: ['./booking-detail.component.scss']
})
export class BookingDetailComponent implements OnInit {
  @Input()
  detailId: string;

  @Output()
  onDetailReady: EventEmitter<any> = new EventEmitter<any>();

  data: BookingDetailsResponse;
  patientData: GetPatientResponse;

  bookingStartTime: string;
  bookingEndTime: string;
  patlogType = bookingSchedulePatlogType;
  bookingState = bookingStatus;
  sex = gender

  buttonText: string;

  compName: string;
  type: string;
  ctrlList: string[];
  scrollbarOptions: any;

  constructor(private bookingService: BookingService,
              private patientService: PatientService,
              private application: ApplicationService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  onBookingButtonClick() {
    let request: SetStatusRequest = new SetStatusRequest();
    request.Id = this.data.Id;
    if (this.buttonText === '签到') {
      request.Status = 1;
      this.bookingService.postBookingSetStatus(request).subscribe(t => {
        this.data.Status = 1;
        this.buttonText = '接诊';
        if (environment.platform === PlatformType.MOBILE)
          this.ctrlList = ['取消'];
        else
          this.ctrlList = ['取消', '打印', '打印设置'];
      })
    } else if (this.buttonText === '接诊') {
      if (this.data.DoctorCode === null || this.data.DoctorCode === '') {
        this.application.frontLayer.openPopupWindow(BookingSelectDoctorComponent, '分诊', PopupWindowSize.SMALL, 300, this.patientData).subscribe(t => {
          if (t && t.type === 'send') {
            request.Status = 2;
            request.DoctorCode = t.data;
            this.bookingService.postBookingSetStatus(request).subscribe(t => {
              this.data.Status = 2;
              this.buttonText = '完成';
              if (environment.platform === PlatformType.MOBILE)
                this.ctrlList = [];
              else
                this.ctrlList = ['打印', '打印设置'];
            })
          }
        })
      } else {
        request.Status = 2;
        this.bookingService.postBookingSetStatus(request).subscribe(t => {
          this.data.Status = 2;
          this.buttonText = '完成';
          if (environment.platform === PlatformType.MOBILE)
            this.ctrlList = [];
          else
            this.ctrlList = ['打印', '打印设置'];
        })
      }
    } else if (this.buttonText === '完成') {
      request.Status = 3;
      this.bookingService.postBookingSetStatus(request).subscribe(t => {
        this.data.Status = 3;
        this.buttonText = '预约复诊';
        if (environment.platform === PlatformType.MOBILE)
          this.ctrlList = [];
        else
          this.ctrlList = ['打印', '打印设置'];
      })
    } else if (this.buttonText === '预约复诊') {
      this.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '预约', PopupWindowSize.MIDDLE, 810, {
        patient: this.patientData,
        model: {PatlogType: 1}
      }).subscribe(t => {
      })
    }
  }

  ngOnInit() {
    this.scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};

    this.route.params.subscribe(t => {
      this.detailId = t['detailId'];

      this.compName = '预约详情';
      this.bookingService.getBookingDetail({Id: this.detailId}).subscribe(t => {
        switch (t.Status) {
          case 0:
            if (environment.platform === PlatformType.MOBILE)
              this.ctrlList = ['修改', '取消'];
            else
              this.ctrlList = ['修改', '取消', '打印', '打印设置'];
            this.buttonText = '签到';
            break;
          case 1:
            if (environment.platform === PlatformType.MOBILE)
              this.ctrlList = ['取消'];
            else
              this.ctrlList = ['取消', '打印', '打印设置'];
            this.buttonText = '接诊';
            break;
          case 2:
            if (environment.platform === PlatformType.MOBILE)
              this.ctrlList = [];
            else
              this.ctrlList = ['打印', '打印设置'];
            this.buttonText = '完成';
            break;
          case 3:
            if (environment.platform === PlatformType.MOBILE)
              this.ctrlList = [];
            else
              this.ctrlList = ['打印', '打印设置'];
            this.buttonText = '预约复诊';
            break;
        }
        this.data = t;
        this.bookingStartTime = this.converTimeFormat(this.data.Date, this.data.Time, this.data.Minute);
        this.bookingEndTime = this.converTimeFormat(this.data.Date, this.data.Time2, this.data.Minute2);
        this.patientService.getPatient({Id: t.PatientId}).subscribe(tt => {
          this.patientData = tt;
          this.onDetailReady.emit({booking: this.data, patient: this.patientData});
        })
      })
    })
  }

  converTimeFormat(date, time, minute): string {
    if (!date || !time || !minute)
      return '';
    return moment(date).format('YYYY-MM-DD') + ' ' + time + ':' + minute;
  }


  onControlListClick(index) {
    switch (this.data.Status) {
      case 0:
        switch (index) {
          case 0://修改
            this.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '编辑预约', PopupWindowSize.MIDDLE, 515, {
              patient: this.patientData,
              model: this.data
            }).subscribe(t => {
              console.log(t);
            });
            break;
          case 1://删除
            this.deleteConfirm();
            break;
          case 2://打印
          case 3://打印设置
        }
        break;
      case 1:
        switch (index) {
          case 0://取消
            this.openCancelPanel();
          case 1://打印
          case 2://打印设置
        }
        break;
      case 2:
      case 3:
        switch (index) {
          case 0://打印
          case 1://打印设置
        }
        break;
    }
  }

  deleteConfirm() {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        console.log('删除');
        this.bookingService.postBookingDelBooking({Id: this.detailId}).subscribe(val => {
          this.router.navigate(['../../../'], {relativeTo: this.route});
          // alert('删除成功');
        });
      } else if (t != null && !t) {
        console.log('不删除');
      } else {
        console.log('关闭');
      }
    })
  }

  openCancelPanel() {

  }

  openPatientInfoPanel() {
    this.router.navigate(['patient-detail', this.detailId], {relativeTo: this.route})
  }
}
