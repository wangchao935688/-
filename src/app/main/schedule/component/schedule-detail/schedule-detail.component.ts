import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {BookingService} from "../../../../core/service/booking.service";
import {Schedule_FullDetailsResponse} from "../../../../core/messages/booking-request-response";
import {bookingScheduleTimeType} from "../../../../core/global_dic";
import {ActivatedRoute, Router} from "@angular/router";
import {CreateEditScheduleComponent} from "../create-edit-schedule/create-edit-schedule.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {ApplicationService} from "app/core/service/application.service";
import * as moment from "moment";

@Component({
  selector: 'app-schedule-detail',
  templateUrl: './schedule-detail.component.html',
  styleUrls: ['./schedule-detail.component.scss']
})
export class ScheduleDetailComponent implements OnInit {
  compName: string;
  ctrlList: string[];
  scrollbarOptions: any;

  @Input()
  detailId: string;
  @Output()
  onDetailReady: EventEmitter<Schedule_FullDetailsResponse> = new EventEmitter<Schedule_FullDetailsResponse>();

  data: any;

  timeType: any = bookingScheduleTimeType;

  constructor(private router: Router, private route: ActivatedRoute, private application: ApplicationService, private bookingService: BookingService) {
  }

  ngOnInit() {
    this.scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};

    this.route.params.subscribe(t => {
      this.detailId = t['detailId'];
      this.compName = '日程详情';
      this.ctrlList = ['修改', '删除'];
      this.bookingService.getScheduleDetail({Id: this.detailId}).subscribe(t => {
        this.data = t;
        this.onDetailReady.emit(this.data);
      })
    })
  }

  onControlListClick(index) {
    if (index === 0) {
      this.application.frontLayer.openPopupWindow(CreateEditScheduleComponent, '编辑日程', PopupWindowSize.MIDDLE, 515, this.data).subscribe(t => {
        console.log(t);
      });
    } else if (index === 1) {
      this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
        if (t != null && t) {
          console.log('删除');
          this.bookingService.postScheduleDelSchedule({Id: this.detailId}).subscribe(val => {
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
  }

  convertDateFormat(str){
    if(!str){
      return null;
    }
    return moment(str).format('YYYY-MM-DD HH:mm')
  }
}

