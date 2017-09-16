import {Component, OnInit, ElementRef, OnDestroy, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {ApplicationService} from "../../../../core/service/application.service";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {SelectReceiverComponent} from "../select-receiver/select-receiver.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {SmsService} from "app/core/service/sms.service";
import {ReplyListRequest, ReplyListResponse} from "../../../../core/messages/sms-request-response";

@Component({
  selector: 'app-reply-sms',
  templateUrl: './reply-sms.component.html',
  styleUrls: ['./reply-sms.component.scss']
})
export class ReplySmsComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
  /*
  * 参数设置
  * */
  replyListRequest: ReplyListRequest = new ReplyListRequest(); // 短信回复列表请求
  replyListResponse: ReplyListResponse; // 短信回复列表响应
  showEmptyState = false; // 初始化时，隐藏空数据
  centerLoadReady: boolean; // 滚动条内部内容，默认隐藏，设置2秒后显示
  isBorder: boolean; // 顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  dataLoading = 'hide';
  isShows = 0;

 tabData = {
    data: ['全部', '已读', '未读'],
    defaultIndex: 0
  };
  constructor(private router: Router,
              private slider: CustomizeSliderService,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private smsService: SmsService) { }


  ngOnInit() {
    this.centerLoadReady = true;
    this.getReplyList();
  }
  ngAfterViewInit() {
    this.dataLoading = 'show';
  }
  /*
  * TODO 点击请求回复列表
  * */
  clickGetReplyList() {
    this.dataLoading = 'show';
    this.getReplyList();
  }
  /*
  * TODO 请求回复列表
  * */
  getReplyList() {
    // readStatus 0 未读 1已读
    this.smsService.getReplyList(this.replyListRequest).subscribe(val => {
      // 请求成功后
      this.dataLoading = 'hide';
      // 暂时做分页
      console.log(val);
      if (val && val.Items && val.Items.length > 0) { // or  val && val.length
        // 赋值
        this.replyListResponse = val;
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
  * TODO 切换tab
  * */
  changeTab(ev) {
    console.log(ev);
    if (ev.index === 0) {

    }else if (ev.index === 1) {
      this.replyListRequest.readStatus = 0;
    }else {
      this.replyListRequest.readStatus = 1;
    }
    this.clickGetReplyList();
  }





  onSearch(val: any): void {
  }

  onShowFilter(val: any): void {
  }

  onControl(val: any): void {
  }

  onOptions(val: any) {
  }

}
