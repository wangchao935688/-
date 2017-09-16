import {Component, OnInit, OnDestroy, ElementRef, AfterViewInit} from '@angular/core';
import {ICustomizeSlider, CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {Router, ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {SmsService} from '../../../../core/service/sms.service';
import {SendListRequest, SendListResponse} from '../../../../core/messages/sms-request-response';

@Component({
  selector: 'app-sms-record-list',
  templateUrl: './sms-record-list.component.html',
  styleUrls: ['./sms-record-list.component.scss']
})
export class SmsRecordListComponent implements OnInit , AfterViewInit, OnDestroy, IQiezziCenterHeaderComponent {
  /*
  * 参数设置
  * */
  sendListRequest: SendListRequest = new SendListRequest();
  sendListResponse: SendListResponse;
  isBorder: boolean;

  selectIndex: number;  // 当前选中项

  showEmptyState = false; // 是否显示没有数据

  showOrHide: any = {}; // 分页显示

  dataLoading: string; // 数据加载中状态

  mainShowLoading = 'hide'; // 全屏的加载状态

  displayStatus: string;  // 侧滑显示隐藏
// 搜索关键词
  keyword: string;
  items: number[] = [];
  scrollbarOptions = { axis: 'y', theme: 'minimal-dark'};
  constructor(private el: ElementRef,
              private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService,
              private smsService: SmsService) {
  }

  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
    this.sendList();
  }
  ngAfterViewInit() {
    this.dataLoading = 'show';
  }
  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
/*
* TODO 时间插件
* */
  selectLeft(evt) {
    if (evt) {
      this.sendListRequest.beginTime = evt;
    }
  }
  selectRight(evt) {
    if (evt) {
      this.sendListRequest.endTime = evt;
    }
  }
  /*
  * TODO 点击 请求列表
  * */
  clickSendList() {
    this.dataLoading = 'show';
    this.sendList();
  }
  /*
  * TODO 请求列表
  * */
  sendList() {
    this.smsService.sendList(this.sendListRequest).subscribe(val => {
      // 请求成功后
      this.dataLoading = 'hide';
      console.log(val);
      if (val && val.Items && val.Items.length > 0) { // or  val && val.length
        this.sendListResponse = val;
      }else {
        // 状态为空数据
        this.showEmptyState = true;
      }
    }, error => {
      // 请求失败
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
/*
* TODO 侧滑 详情
* */
  openDetail(evt, id, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1) {
      evt.stopPropagation();
    }
    this.selectIndex = i;
    this.router.navigate(['record', id], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
/*
* TODO 点击，根据筛选条件，查询
* */
  search() {
    if (this.keyword) {
      this.sendListRequest.keyword = this.keyword;
    }
    this.clickSendList();
  }
  /*
  * TODO 分页显示
  * */
  onPageChange(evt) {
    this.sendListRequest.PageIndex = evt.page;
    this.sendListRequest.PageSize = evt.rows;
    this.clickSendList();
  }
  onSearch(val: any): void {
  }

  onShowFilter(val: any): void {
  }

  onControl(val: any): void {
  }

  onOptions(val: any): void {
  }
}
