import {Component, OnInit, ElementRef, OnDestroy, AfterViewInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';
import {SelectReceiverComponent} from '../select-receiver/select-receiver.component';
import {RechargeSmsStepComponent} from '../recharge-sms-step/recharge-sms-step.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {HospitalService} from '../../../../core/service/hospital.service';
import {GetAuthenticationStateResponse} from '../../../../core/messages/hospital-account-request-response';
import {SmsService} from '../../../../core/service/sms.service';
import {
  GetTemplateListResponse, SendGroupSMSRequest,
  SMSStatisticsResponse
} from '../../../../core/messages/sms-request-response';
import {CreateEditSmsTemplateComponent} from '../create-edit-sms-template/create-edit-sms-template.component';
import {HospitalAuthenticateComponent} from '../../../hospital/component/hospital-authenticate/hospital-authenticate.component';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.scss']
})


export class SendSmsComponent implements OnInit, AfterViewInit, IQiezziCenterHeaderComponent, OnDestroy {
  /*
  * 参数设置
  * */
  sendGroupSMSRequest: SendGroupSMSRequest = new SendGroupSMSRequest();
  tempIndex = 0; // 选择模板
  getTemplateListResponse: GetTemplateListResponse;
  sendMess = ''; // 短信内容
  numCount = 1; // 根据短信内容长度，判断发送短信数量
  personNum = 0; // 发送人数量
  sMSStatisticsResponse: SMSStatisticsResponse; // 短信统计
  tagValues = []; // 默认联系人列表为空
  moduleName = '发短信';
  mainShowLoading = 'hide';
  centerLoadReady: boolean; // 滚动条内部内容，默认隐藏，设置2秒后显示
  isBorder: boolean; // 顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  isShows = false;
  isShowH = false;
  isShowHs = false;
  scrollbarOptions = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  /*
  * 数据类型
  * */
  authenticationState: GetAuthenticationStateResponse = new GetAuthenticationStateResponse(); // 认证状态
  constructor(private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private hospitalService: HospitalService,
              private smsService: SmsService) {
  }

  ngOnInit() {

    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;

    this.getAuthenticationState(); // 请求认证状态
    this.getSMSStatistics(); // 获取短信包
    this.getTemplateList(); // 请求模板
  }
  ngAfterViewInit() {

  }
  ngOnDestroy(): void {
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  /*
  * TODO 气泡点击事件
  * */
  clickListIndex(index) {
    console.log(index);
  }
  /**
   *  TODO 弹框选择收件人
   */
  selectReceiver() {
    this.application.frontLayer.openPopupWindow(SelectReceiverComponent, '选择收信人', PopupWindowSize.MIDDLE, 480, null, true).subscribe(t => {
        if (t && t.data && t.data.data.length > 0) {
          console.log(JSON.stringify(t));
          this.tagValues = t.data.data;
        }
      });
  }
  /*
  * TODO  充值    弹框
  * */
  buySmsbag() {
    this.application.frontLayer.openPopupWindow(RechargeSmsStepComponent, '购买短信包', PopupWindowSize.MIDDLE, 520, null, true).subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  /*
  * TODO 请求认证状态
  * */
  getAuthenticationState() {
    this.hospitalService.getAuthenticationState(null).subscribe(val => {
      console.log(val);
      if (val) {
        this.authenticationState = val;
      }
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 短信数量统计
  * */
  getSMSStatistics() {
    this.smsService.getSMSStatistics(null).subscribe(val => {
      console.log(val);
      if (val) {
        this.sMSStatisticsResponse = val;
      }
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
   * TODO 监听短信内容输入,计算短信条数
   * */
  sendMessCount() {
    this.numCount = Math.ceil( this.sendMess.length / 70.1 );
    if (this.sendMess.length > 350) {
      // this.sendMess.length = 350;
      this.sendMess = this.sendMess.slice(0, 350);
    }
  }
  /*
  * TODO 短信模板 tab切换
  * */
  selectTab(ev) {
    console.log(ev);
      this.tempIndex = ev.index;
  }
  /*
  * TODO 请求模板
  * */
  getTemplateList() {
    this.smsService.getTemplateList(null).subscribe(value => {
      console.log(value);
      if (value) {
        this.getTemplateListResponse = value;
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
   * TODO 发送消息
   * */
  sendMessage () {
    this.sendGroupSMSRequest.Content = this.sendMess;
    if (this.tagValues.length > 0) {
      this.tagValues.forEach(item => {
        this.sendGroupSMSRequest.PatientId.push(item.value);
      });
    }else {
      return false;
    }
    if (!this.sendGroupSMSRequest.Content || this.sendGroupSMSRequest.PatientId.length === 0) { // 必填判断
      return false;
    }
    console.log(this.sendGroupSMSRequest);
    this.smsService.sendGroupSMS(this.sendGroupSMSRequest).subscribe(val => {
      console.log(val);
      if (val) {
        this.application.main.openPromptMessage('发送成功！', 3000);
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 另存短信模板
  * */
  saveTemplate() {
    if (this.sendMess) {
      this.application.frontLayer.openPopupWindow(CreateEditSmsTemplateComponent, '新增短信模板', PopupWindowSize.MIDDLE, 'auto', {content: this.sendMess}, true).subscribe(t => {
        console.log(JSON.stringify(t));
        if (t && t.data) {

        }
      });
    }else {
      this.application.main.openErrorMessage('请填写短信内容');
    }
  }
  /*
   * TODO 立即认证
   * */
  SetAuthenticationState() {
    this.application.frontLayer.openPopupWindow( HospitalAuthenticateComponent, '安全验证', PopupWindowSize.SMALL, 'auto', null, false).subscribe(t => {
      console.log(t);
      if (t && t.data) {
        console.log(t.data);
        this.getAuthenticationState(); // 请求认证状态
        this.getSMSStatistics(); // 请求短信数量
      }
    });
  }
  /*
   * TODO 短信模板  展开、收起
   * */
  unfoldingClosure(evs) {
    this.isShowH = true;
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
