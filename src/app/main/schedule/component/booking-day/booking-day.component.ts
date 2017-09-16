import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostListener, OnInit, Output,
  ViewChild
} from '@angular/core';
import * as moment from "moment";
import {WorkerService} from "../../../../core/service/worker.service";
import {WorkerSimple} from "../../../../core/messages/model/worker_simple";
import {ApplicationService} from "../../../../core/service/application.service";
import {BookingService} from "../../../../core/service/booking.service";
import {
  BookingScheduleListRequest,
  SaveBookingRequest,
  Schedule_Add
} from "../../../../core/messages/booking-request-response";
import {BookingSchedule_AimModel} from "../../../../core/messages/model/booking.model";
import {CreateEditBookingComponent} from "../create-edit-booking/create-edit-booking.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {ActivatedRoute, Router} from "@angular/router";
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";


@Component({
  selector: 'app-booking-day',
  templateUrl: './booking-day.component.html',
  styleUrls: ['./booking-day.component.scss']
})
export class BookingDayComponent implements OnInit, AfterViewInit {
  DayMilliseconds = 1000 * 60 * 60 * 24;
  TimeZoneMilliseconds = 1000 * 60 * 60 * 8;
  OneMinuteMilliseconds = 1000 * 60;

  @ViewChild('doctorListContainer')
  doctorListContainer: ElementRef;
  @ViewChild('doctorDataContainer')
  doctorDataContainer: ElementRef;
  @ViewChild('noDoctorDataContainer')
  noDoctorDataContainer: ElementRef;

  @ViewChild('doctorScrollList')
  doctorScrollList: ElementRef;

  @ViewChild('noDoctorItemContainer')
  noDoctorItemContainer: ElementRef;

  @ViewChild('itemContainer')
  itemContainer: ElementRef;
  bookingScheduleType: SelectItem[] = [{label: '全部类型', value: 0}, {label: '预约', value: 1}, {label: '日程', value: 2}];

  showLeftAndRight: boolean;
  timeRows: string[];
  doctorList: WorkerSimple[];
  doctorCodeList: { [key: string]: number };

  hasRight: boolean;
  hasLeft: boolean;
  totalWidth: number;
  colsCount: number;
  fixedWidthNumber: number;
  fixedWidth: any;

  scrollWidth: any;
  itemWidth: any;
  timeLineBottom: any;

  selectDoctor: WorkerSimple;
  selectStartTime: string;

  isToday: boolean;
  currentTime: string;
  currentDate: string;
  currentDateModel: any;

  handlers: { [key: string]: EventListener };

  dragItem: any;

  data: any;
  listData: BookingSchedule_AimModel[];

  dataType: number = 0;

  @Output()
  onSliderOpen: EventEmitter<string[]> = new EventEmitter();

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.getDoctorListContainerWidth();
  }

  downElement: any;

  currentColumn: number = 0;

  constructor(private workerService: WorkerService,
              private application: ApplicationService,
              private bookingService: BookingService) {
  }

  onTypeChange(index) {
    this.dataType = index;
    this.checkTimeLine();
    this.clearBookingScheduleItem();
    this.getBookingScheduleList(this.dataType, this.currentDateModel.start, this.currentDateModel.end);
  }

  onDateChange(event) {
    this.currentDateModel = event;
    this.currentDate = moment(event.start).format('YYYY-MM-DD');
    if (!event.first) {
      this.checkTimeLine();
      this.clearBookingScheduleItem();
      this.getBookingScheduleList(this.dataType, event.start, event.end);
    }
  }

  clearBookingScheduleItem() {
    let doctorCol;
    for (let i = 0; i < this.doctorList.length; i++) {
      doctorCol = this.itemContainer.nativeElement.querySelector('#item-container-col' + i);
      if (doctorCol.childNodes.length > 0) {
        for (let k = 0; k < doctorCol.childNodes.length; k++) {
          let item: HTMLDivElement = doctorCol.childNodes[k];
          item.onclick = null;
          item.ondragstart = null;
          item.ondragend = null;
          item.parentNode.removeChild(item);
        }
      }
    }

    doctorCol = this.noDoctorItemContainer.nativeElement;
    if (doctorCol.childNodes.length > 0) {
      for (let k = 0; k < doctorCol.childNodes.length; k++) {
        let item: HTMLDivElement = doctorCol.childNodes[k];
        item.onclick = null;
        item.ondragstart = null;
        item.ondragend = null;
        item.parentNode.removeChild(item);
      }
    }
  }

  createBookingScheduleItem(aimModel: BookingSchedule_AimModel) {
    let self = this;

    let timeSpan = moment(aimModel.EndTime).diff(moment(aimModel.StartTime), 'minute') / 30;
    let timeStartString = moment(aimModel.StartTime).format('YYYY-MM-DD') + 'T00:00:00.000';
    let timeStartRow = moment(aimModel.StartTime).diff(moment(new Date(timeStartString)), 'minute') / 30;

    let divBookingScheduleTmp = document.createElement('div');

    divBookingScheduleTmp.onclick = function (event: MouseEvent) {
      event.stopImmediatePropagation();
      event.stopPropagation();
      event.preventDefault();
      let ele: HTMLDivElement = (<HTMLDivElement>(event.srcElement || event['originalTarget']));
      self.onSliderOpen.emit([(event.srcElement || event['originalTarget']).getAttribute('bind-type') + '-detail', ele.getAttribute('bind-src')]);
    };

    divBookingScheduleTmp.draggable = ((aimModel.Status !== 3) && (aimModel.Status !== -1));
    divBookingScheduleTmp.style.position = 'absolute';
    divBookingScheduleTmp.style.left = '0';
    divBookingScheduleTmp.style.top = (timeStartRow * 60) + 'px';
    divBookingScheduleTmp.style.height = (timeSpan * 60 - 1) + 'px';
    divBookingScheduleTmp.style.lineHeight = (timeSpan * 60) + 'px';
    divBookingScheduleTmp.style.textAlign = 'center';
    divBookingScheduleTmp.innerText = (aimModel.Type === 1 ? aimModel.Patient.PatientName : aimModel.Name);

    divBookingScheduleTmp.setAttribute('id', (aimModel.Type === 1 ? 'booking-' : 'schedule-') + aimModel.Id);
    divBookingScheduleTmp.setAttribute('bind-src', aimModel.Id);
    divBookingScheduleTmp.setAttribute('bind-type', aimModel.Type === 1 ? 'booking' : 'schedule');

    if (aimModel.Type === 1) {
      divBookingScheduleTmp.setAttribute('bind-patient', aimModel.Patient.Id);
      divBookingScheduleTmp.setAttribute('bind-doctor', aimModel.DoctorCode);
    }

    if (aimModel.DoctorCode) {
      let doctorColIndex = this.doctorCodeList[aimModel.DoctorCode];
      let itemColContainer = this.itemContainer.nativeElement.querySelector('#item-container-col' + doctorColIndex);

      divBookingScheduleTmp.ondragstart = function (event: DragEvent) {
        event.stopPropagation();
        //event.preventDefault();
        self.dragItem = {
          ele: (event.srcElement || event['originalTarget']),
          type: (event.srcElement || event['originalTarget']).getAttribute('bind-type'),
          id: (event.srcElement || event['originalTarget']).getAttribute('bind-src'),
          patient: (event.srcElement || event['originalTarget']).getAttribute('bind-patient'),
          doctor: (event.srcElement || event['originalTarget']).getAttribute('bind-doctor'),
          timeSpan: timeSpan
        };
        event.dataTransfer.setData('Text', (event.srcElement || event['originalTarget']).getAttribute('id'));
        event.dataTransfer.effectAllowed = 'move';

        itemColContainer.ondragover = function (event3: DragEvent) {
          event3.stopPropagation();
          event3.preventDefault();
        };
        itemColContainer.ondrop = function (event4: DragEvent) {
          event4.stopPropagation();
          event4.preventDefault();

          let temp1 = moment(self.currentDate + ' 00:00:00.000');
          temp1.add(Math.ceil(event4.offsetY / 60) * 30, 'minutes');
          let num1 = temp1.diff(new Date(), 'minutes');
          if (num1 < 1) {
            console.log('过时');
            return;
          }
          temp1.add(-30, 'minutes');
          if (self.dragItem.type === 'booking') {
            let request: SaveBookingRequest = new SaveBookingRequest();
            request.Id = self.dragItem.id;
            request.PatientID = self.dragItem.patient;
            request.TableType = 1;
            request.DoctorCode = self.dragItem.doctor;
            request.StartTime = self.currentDate + 'T' + moment(temp1).format('HH:mm');
            request.EndTime = self.currentDate + 'T' + moment(temp1).add(self.dragItem.timeSpan * 30, 'minutes').format('HH:mm');
            self.bookingService.postBookingSaveBooking(request).subscribe(t => {
              self.dragItem.ele.style.top = (Math.floor(event4.offsetY / 60) * 60) + 'px';
              self.dragItem.ele.style.transition = 'top 0.2s';
              self.dragItem = null;
              self.application.main.openPromptMessage('保存成功！');
            })
          } else {
            let request: Schedule_Add = new Schedule_Add();
          }
          itemColContainer.ondragover = null;
          itemColContainer.ondrop = null;
        };
      };
      divBookingScheduleTmp.ondragend = function (event5: DragEvent) {
        event5.stopPropagation();
        event5.preventDefault();
      };

      divBookingScheduleTmp.style.zIndex = '10000';
      itemColContainer.appendChild(divBookingScheduleTmp);
    } else {
      divBookingScheduleTmp.ondragstart = function (event: DragEvent) {
        event.stopPropagation();
       // event.preventDefault();
        self.dragItem = {
          ele: (event.srcElement || event['originalTarget']),
          type: (event.srcElement || event['originalTarget']).getAttribute('bind-type'),
          id: (event.srcElement || event['originalTarget']).getAttribute('bind-src'),
          patient: (event.srcElement || event['originalTarget']).getAttribute('bind-patient'),
          doctor: (event.srcElement || event['originalTarget']).getAttribute('bind-doctor'),
          timeSpan: timeSpan
        };
        event.dataTransfer.setData('Text', (event.srcElement || event['originalTarget']).getAttribute('id'));
        event.dataTransfer.effectAllowed = 'move';

        self.noDoctorItemContainer.nativeElement.ondragover = function (event3: DragEvent) {
          event3.stopPropagation();
          event3.preventDefault();
        };
        self.noDoctorItemContainer.nativeElement.ondrop = function (event4: DragEvent) {
          event4.stopPropagation();
          event4.preventDefault();
          let temp1 = moment(self.currentDate + ' 00:00:00.000');
          temp1.add(Math.ceil(event4.offsetY / 60) * 30, 'minutes');
          let num1 = temp1.diff(new Date(), 'minutes');
          if (num1 < 1) {
            console.log('过时');
            return;
          }
          temp1.add(-30, 'minutes');
          if (self.dragItem.type === 'booking') {
            let request: SaveBookingRequest = new SaveBookingRequest();
            request.Id = self.dragItem.id;
            request.PatientID = self.dragItem.patient;
            request.TableType = 1;
            request.DoctorCode = (event.srcElement || event['originalTarget']).getAttribute('doctor-code');
            request.StartTime = self.currentDate + 'T' + moment(temp1).format('HH:mm');
            request.EndTime = self.currentDate + 'T' + moment(temp1).add(self.dragItem.timeSpan * 30, 'minutes').format('HH:mm');
            self.bookingService.postBookingSaveBooking(request).subscribe(t => {
              self.dragItem.ele.style.top = (Math.floor(event4.offsetY / 60) * 60) + 'px';
              self.dragItem.ele.style.transition = 'top 0.2s';
              self.dragItem = null;
              self.application.main.openPromptMessage('保存成功！');
            })
          } else {
            let request: Schedule_Add = new Schedule_Add();
          }
          self.noDoctorItemContainer.nativeElement.ondragover = null;
          self.noDoctorItemContainer.nativeElement.ondrop = null;
        };
      };
      divBookingScheduleTmp.ondragend = function (event5: DragEvent) {
        event5.stopPropagation();
        event5.preventDefault();
      };

      divBookingScheduleTmp.style.zIndex = '10000';
      this.noDoctorItemContainer.nativeElement.appendChild(divBookingScheduleTmp);
    }
  }

  getBookingScheduleList(type: number, start: string, end: string) {
    let request: BookingScheduleListRequest = new BookingScheduleListRequest();
    request.type = type;
    request.pageSize = 9999;
    request.pageIndex = 1;
    request.start = start;
    request.end = end;
    this.bookingService.getBookingScheduleList(request).subscribe(t => {
      this.data = t;
      this.listData = this.data.Items;
      for (let i = 0; i < this.listData.length; i++) {
        this.createBookingScheduleItem(this.listData[i]);
      }
    })
  }

  onCellDrop(event: DragEvent) {
    let regExec: RegExp = /-col(\d{1,3})-time-row(\d{1,2})/;
    let regMatch: RegExp = /-col\d{1,3}-time-row\d{1,2}/;
    if (regMatch.test((event.srcElement || event['originalTarget']).id)) {
      let arr = regExec.exec((event.srcElement || event['originalTarget']).id);
      if (arr.length != 3)
        return;
      if (this.dragItem.type === 'booking') {
        let request: SaveBookingRequest = new SaveBookingRequest();
        request.Id = this.dragItem.id;
        request.PatientID = this.dragItem.patient;
        request.TableType = 1;
        request.DoctorCode = (event.srcElement || event['originalTarget']).id.indexOf('end-col') === 0 ? null : this.doctorList[parseInt(arr[1], 10)].WorkerCode;
        request.StartTime = this.currentDate + 'T' + this.timeRows[arr[2]];
        request.EndTime = this.currentDate + 'T' + this.timeRows[parseInt(arr[2]) + this.dragItem.timeSpan];
        this.bookingService.postBookingSaveBooking(request).subscribe(t => {
          (event.srcElement || event['originalTarget']).appendChild(this.dragItem.ele);
          this.dragItem = null;
          this.application.main.openPromptMessage('保存成功！');

        })
      } else {
        let request: Schedule_Add = new Schedule_Add();
      }
    }
  }

  checkTimeLine() {
    let time = new Date(), daySpan, date;

    date = moment(time).format('YYYY-MM-DD');
    daySpan = moment(date).diff(moment(this.currentDate), 'days');
    if (daySpan > 0) {
      this.isToday = false;
      this.timeLineBottom['bottom'] = '0';
    } else if (daySpan == 0) {
      this.isToday = true;
      this.currentTime = moment(time).format('HH:mm');
      this.timeLineBottom['bottom'] = (((this.DayMilliseconds - ((time.getTime() + this.TimeZoneMilliseconds) % this.DayMilliseconds)) / this.DayMilliseconds) * 100) + '%';
    } else {
      this.isToday = false;
      this.timeLineBottom['bottom'] = '100%';
    }
  }

  ngOnInit() {
    this.handlers = {};
    this.doctorCodeList = {};
    this.fixedWidth = {width: '100%'};
    this.scrollWidth = {};
    this.itemWidth = {};
    this.timeLineBottom = {};
    this.timeRows = ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30", "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30", "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"];
    this.workerService.getGetList({workerTypeArray: [0]}).subscribe(t => {
      this.doctorList = t;

      for (let i = 0; i < this.doctorList.length; i++) {
        this.doctorCodeList[this.doctorList[i].WorkerCode] = i;
      }
      this.getDoctorListContainerWidth();
      this.getBookingScheduleList(0, moment(new Date()).format('YYYY-MM-DD') + 'T00:00:00.000', moment(new Date()).add(1, 'days').format('YYYY-MM-DD') + 'T23:59:59.999');
    });
    this.checkTimeLine();
    setInterval(() => {
      this.checkTimeLine()
    }, this.OneMinuteMilliseconds);
  }

  ngAfterViewInit(): void {
    this.getDoctorListContainerWidth();
  }

  getDoctorListContainerWidth() {
    if (!this.doctorList || this.doctorList.length === 0)
      return;
    this.totalWidth = parseInt(window.getComputedStyle(this.doctorListContainer.nativeElement, null).width.replace('px', ''), 10);
    this.colsCount = Math.floor(this.totalWidth / 200);
    if (this.colsCount > this.doctorList.length + 1) {
      this.showLeftAndRight = false;
      this.fixedWidth['width'] = (100 / (this.doctorList.length + 1)) + '%';
      this.scrollWidth['width'] = ((100 / (this.doctorList.length + 1)) * this.doctorList.length) + '%';
      this.itemWidth['width'] = (100 / this.doctorList.length) + '%';
    } else {
      this.hasRight = true;
      this.showLeftAndRight = true;
      this.fixedWidthNumber = (100 / this.colsCount);
      this.fixedWidth['width'] = this.fixedWidthNumber + '%';
      this.scrollWidth['width'] = (this.fixedWidthNumber * (this.colsCount - 1)) + '%';
      this.itemWidth['width'] = (100 / (this.colsCount - 1)) + '%';
      this.fixedWidthNumber = 100 / (this.colsCount - 1);
    }
  }

  onCellDown(event: MouseEvent, doctorCode: string) {
    if ((event.srcElement || event['originalTarget']) !== event.currentTarget)
      return;
    let startPos = Math.floor(event.offsetY / 60);

    let date = new Date(), begin = moment(date).format('YYYY-MM-DD') + 'T' + this.timeRows[startPos];
    let time1 = Date.parse(begin), time2 = date.getTime();

    if (time1 < time2) {
      console.log('时间已过');
      return;
    }
    let
      self = this,
      offsetY,
      startY = event.offsetY,
      divBookingTmp = this.createTempItemBlock(),
      startOffsetY = event.clientY;

    divBookingTmp.style.top = (startPos * 60) + 'px';

    (event.srcElement || event['originalTarget']).appendChild(divBookingTmp);

    function clearMouseUp(bool) {
      if (bool) {
        let timeSpan = parseInt(divBookingTmp.style.height.replace('px', ''), 10) / 60;
        console.log(self.timeRows[startPos], self.timeRows[startPos + timeSpan] || '23:59');
        self.application.frontLayer.openPopupWindow(CreateEditBookingComponent, '新增预约', PopupWindowSize.MIDDLE, 810, {
          model: {
            StartTime: self.timeRows[startPos],
            EndTime: self.timeRows[startPos + timeSpan] || '23:59',
            VisitDate: self.currentDate,
            DoctorCode: doctorCode
          }
        }).subscribe(t => {
          console.log(t);
        });
      }

      document.onmousemove = null;
      document.onmouseup = null;
      divBookingTmp.onmouseup = null;
      (event.srcElement || event['originalTarget'])['onmouseup'] = null;
      (event.srcElement || event['originalTarget']).removeChild(divBookingTmp);
    }

    (event.srcElement || event['originalTarget'])['onmouseup'] = function (event1: MouseEvent) {
      clearMouseUp(true);
    };
    divBookingTmp.onmouseup = function (event1: MouseEvent) {
      clearMouseUp(true);
    };
    document.onmouseup = function (event1: MouseEvent) {
      clearMouseUp(true);
    };
    document.onmousemove = function (event1: MouseEvent) {
      let currentOffsetY = event1.clientY;
      offsetY = currentOffsetY - startOffsetY;
      if (offsetY < -5) {
        clearMouseUp(false);
        return;
      }

      divBookingTmp.style.height = ((Math.ceil((offsetY + startY ) / 60) - startPos) * 60) + 'px';
    };

  }

  createTempItemBlock() {
    let divBookingTmp = document.createElement('div');
    divBookingTmp.style.width = '100%';
    divBookingTmp.style.position = 'absolute';
    divBookingTmp.style.backgroundColor = '#9599FB';
    divBookingTmp.style.opacity = '0.5';
    return divBookingTmp;
  }

  // this.selectDoctor = this.doctorList[selectDocIndex];
  // this.selectStartTime = time;

  onScrollLeft() {
    this.currentColumn++;
    if (this.currentColumn > 0) {
      this.currentColumn--;
      return;
    }
    this.hasRight = true;

    let nodeList1 = this.doctorScrollList.nativeElement.querySelectorAll('div');
    let nodeList2 = this.doctorDataContainer.nativeElement.querySelectorAll('.doctor-col');
    let nodeList3 = this.itemContainer.nativeElement.querySelectorAll('.item-container-col');
    if (nodeList1 && nodeList1.length > 0) {
      nodeList1[0].style.marginLeft = (this.currentColumn * this.fixedWidthNumber) + '%';
      nodeList1[0].style.transition = 'margin-left 0.2s';
      nodeList2[0].style.marginLeft = (this.currentColumn * this.fixedWidthNumber) + '%';
      nodeList2[0].style.transition = 'margin-left 0.2s';
      nodeList3[0].style.marginLeft = (this.currentColumn * this.fixedWidthNumber) + '%';
      nodeList3[0].style.transition = 'margin-left 0.2s';
    }
    if (this.currentColumn === 0) {
      this.hasLeft = false;
    }
  }

  onScrollRight() {
    this.currentColumn--;
    if (this.currentColumn < this.colsCount - 1 - this.doctorList.length) {
      this.currentColumn++;
      return;
    }
    this.hasLeft = true;

    let nodeList1 = this.doctorScrollList.nativeElement.querySelectorAll('div');
    let nodeList2 = this.doctorDataContainer.nativeElement.querySelectorAll('.doctor-col');
    let nodeList3 = this.itemContainer.nativeElement.querySelectorAll('.item-container-col');
    if (nodeList1 && nodeList1.length > 0) {
      nodeList1[0].style.marginLeft = (this.currentColumn * this.fixedWidthNumber) + '%';
      nodeList1[0].style.transition = 'margin-left 0.2s';
      nodeList2[0].style.marginLeft = (this.currentColumn * this.fixedWidthNumber) + '%';
      nodeList2[0].style.transition = 'margin-left 0.2s';
      nodeList3[0].style.marginLeft = (this.currentColumn * this.fixedWidthNumber) + '%';
      nodeList3[0].style.transition = 'margin-left 0.2s';
    }
    if (this.currentColumn === this.colsCount - 1 - this.doctorList.length) {
      this.hasRight = false;
    }
  }
}
