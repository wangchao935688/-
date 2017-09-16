import {Component, ElementRef, OnDestroy, OnInit} from '@angular/core';
import {ApplicationService} from "../../../../core/service/application.service";
import {CreateEditBookingComponent} from "../create-edit-booking/create-edit-booking.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {CreateEditScheduleComponent} from "../create-edit-schedule/create-edit-schedule.component";
import {QiezziSelectPartakerComponent} from "../../../../shared/component/qiezzi-select-partaker/qiezzi-select-partaker.component";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";

@Component({
  selector: 'app-booking-index',
  templateUrl: './booking-index.component.html',
  styleUrls: ['./booking-index.component.scss']
})
export class BookingIndexComponent implements OnInit, OnDestroy {

  displayStatus: string;
  tabData: any;
  displayIndex: number;
  scrollbarOptions: any;

  constructor(private el: ElementRef,
              private application: ApplicationService,
              private slider: CustomizeSliderService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnDestroy(): void {
    this.application.workBoard = null;
  }

  ngOnInit() {
    this.application.workBoard = this.el.nativeElement;
    this.scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
    this.displayIndex = 0;
    this.tabData = {
      data: ['日', '周', '月', '列表', '日程'],
      defaultIndex: 0
    }
  }

  changeTab(value) {
    this.displayIndex = value.index;
  }

  onSliderOpen(param: string[]) {
    this.router.navigate(param, {relativeTo: this.route});
    this.slider.show(this, event);
  }

  onControlClick(evt) {
    if (evt === 0) {
      this.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '新增预约', PopupWindowSize.MIDDLE, 810, null).subscribe(t => {
        console.log(t);
      })
    } else if (evt === 1) {
      this.application.frontLayer.openPopupWindow(CreateEditScheduleComponent, '新增日程', PopupWindowSize.MIDDLE, 535, null).subscribe(t => {
        console.log(t);
      })
    } else {
    }
  }
}
