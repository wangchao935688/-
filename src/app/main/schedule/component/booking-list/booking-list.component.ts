import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {
  BookingScheduleListRequest,
  BookingScheduleListResponse
} from "../../../../core/messages/booking-request-response";
import {BookingService} from "../../../../core/service/booking.service";
import {BookingSchedule_AimModel} from "../../../../core/messages/model/booking.model";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {
  data: BookingScheduleListResponse;
  listData: BookingSchedule_AimModel[];

  @Output()
  onSliderOpen: EventEmitter<string[]> = new EventEmitter();

  constructor(private bookingService: BookingService) {
  }

  ngOnInit() {
    this.getBookingList(1)
  }

  getBookingList(pageIndex: number) {
    this.listData = null;
    let request: BookingScheduleListRequest = new BookingScheduleListRequest();
    request.type = 1;
    request.pageSize = 10;
    request.pageIndex = pageIndex;
    this.bookingService.getBookingScheduleList(request).subscribe(t => {
      this.data = t;
      this.listData = this.data.Items;
    })
  }

  openDetail(evt: Event, id: string, index: number) {
    this.onSliderOpen.emit(['booking-detail', id]);
  }

  pageChange(index) {
    this.getBookingList(index.page);
  }
}
