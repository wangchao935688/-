import {Component, OnInit, Input, AfterViewInit} from '@angular/core';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';

import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SmsService} from '../../../../core/service/sms.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {GetRechargerListRequest, GetRechargerListResponse} from "../../../../core/messages/sms-request-response";
import {promise} from "selenium-webdriver";
@Component({
  selector: 'app-recharge-sms-list',
  templateUrl: './recharge-sms-list.component.html',
  styleUrls: ['./recharge-sms-list.component.scss']
})
export class RechargeSmsListComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
  /*
  * 设置参数
  * */
  getRechargerListRequest: GetRechargerListRequest = new GetRechargerListRequest(); // 充值列表请求参数
  getRechargerListResponse: GetRechargerListResponse; //  充值列表相应参数
  isBorder = false; // 滚动条上边框
  selectIndex: number; // 列表选中边框
  displayStatus = ''; // 侧滑框
  scrollbarOptions = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'};
  showEmptyState = false; // 空数据默认隐藏
  showOrHide: any = {}; // 分页组件
  dataLoading = 'hide'; // loading加载默认隐藏
  constructor( private router: Router,
               private slider: CustomizeSliderService,
               private route: ActivatedRoute,
               private application: ApplicationService,
               private smsService: SmsService) { }

  ngOnInit() {
    this.getRechargerListRequest.PageIndex = 1;
    this.getRechargerListRequest.PageSize = 10;
    this.getRechargerList();
  }
  ngAfterViewInit() {
    this.dataLoading = 'show';
  }
  /*
  * TODO 点击查看充值列表,主要为实现loading正常显示
  * */
  clickGetRechargerList() {
    this.dataLoading = 'show';
    this.getRechargerList();
  }
  /*
  * TODO 请求充值列表
  * */
  getRechargerList() {
    this.smsService.getRechargerList(this.getRechargerListRequest).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val && val.Items && val.Items.length > 0) {
        this.getRechargerListResponse = val;
      }else {
        this.showEmptyState = true;
      }
    }, error => {
      // 请求失败
      this.dataLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }

  /*
  * TODO 添加充值记录 弹框
  * */
  onControl(val: any): void {

  }
  onOptions(val: any) {
    this.router.navigate(['process-list/process-options']);
  }

  onChange(evt) {
    console.log(evt);
  }

  selectLeft($event) {

  }

  selectRight($event) {

  }
  searchProcessList() {}
  onSearch(val: any): void {
  }

  onShowFilter(val: any): void {
  }
  /*
  * TODO  分页
  * */
  onPageChange(evt: any) {
    this.getRechargerListRequest.PageIndex = evt.page;
    this.clickGetRechargerList();
  }
}
