import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookingService} from "../../../../core/service/booking.service";
import {
  BookingScheduleListRequest,
  BookingScheduleListResponse
} from "../../../../core/messages/booking-request-response";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";

@Component({
  selector: 'app-schedule-list',
  templateUrl: './schedule-list.component.html',
  styleUrls: ['./schedule-list.component.scss']
})
export class ScheduleListComponent implements OnInit {
  data: BookingScheduleListResponse;

  @Output()
  onSliderOpen: EventEmitter<string[]> = new EventEmitter();

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.getScheduleList(1)
  }

  getScheduleList(pageIndex: number) {
    let request: BookingScheduleListRequest = new BookingScheduleListRequest();
    request.type = 2;
    request.pageSize = 10;
    request.pageIndex = pageIndex;
    this.bookingService.getAllSchedule(request).subscribe(t => {
      this.data = t;
    })
  }

  openDetail(event: Event, id: string, index: number) {
    this.onSliderOpen.emit(['schedule-detail', id]);
  }

  pageChange(index) {
    this.getScheduleList(index.page);
  }

}
