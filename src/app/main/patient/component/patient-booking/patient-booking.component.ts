import {Component, ElementRef, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GetPatlogNotesRequest, GetPatlogNotesResponse} from '../../../../core/messages/patient-request-response';
import {BookingService} from '../../../../core/service/booking.service';
import {
  PatientBookingListRequest,
  PatientBookingListResponse
} from "../../../../core/messages/booking-request-response";

@Component({
  selector: 'app-patient-booking',
  templateUrl: './patient-booking.component.html',
  styleUrls: ['./patient-booking.component.scss']
})
export class PatientBookingComponent implements OnInit {
  /*
   * TODO 设置参数
   * */
  responseData: PatientBookingListResponse;
  PatientCode: string; // 患者编码
  PatientBookingListRequest: PatientBookingListRequest;

  showEmpty = false; // 空数据提示框隐藏
  dataLoading= 'hide'; // 加载框隐藏
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private BookingService: BookingService) { }

  ngOnInit() {
    this.PatientBookingListRequest = {
      StartTime: null,
      EndTime: null,
      DoctorCode: null,
      PatlogType: null,
      TableType: null,
      Status: null,
      KeyWord: null,
      PatientCode: null,
      PageIndex: 1,
      PageSize: 10
    };
    this.route.params.subscribe(t => {
      console.log(t);
      this.PatientCode = t.PatientCode;
      this.getPatientBookingList(); // 获取个人信息
    });
  }
/*
* 预约列表
* */
  getPatientBookingList() {
    /*
    * TODO 添加页码
    * */
    this.dataLoading = 'show';
    this.PatientBookingListRequest.PatientCode = this.PatientCode;
    this.BookingService.getPatientBookingList(this.PatientBookingListRequest).subscribe(val => {
      console.log(val);
      this.dataLoading = 'hide';
      if (val && val.Items.length > 0) {
        this.responseData = val;
      } else {
        this.showEmpty = true;
      }
    });
  }
  pageChange(evt) {
    console.log(evt);
  }
  /*
  * TODO 查看预约详情
  * */
  getBookingDatail(id) {
    console.log(id);
  }
  /*
  * TODO 添加预约
  * */
  addBooking() {

  }
}
