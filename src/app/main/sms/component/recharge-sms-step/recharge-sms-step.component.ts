import {Component, ElementRef, OnInit} from '@angular/core';
import {isNumber} from 'util';
import {ApplicationService} from '../../../../core/service/application.service';
import {SmsService} from '../../../../core/service/sms.service';
import {
  CreateRechargerRecordRequest, SMSPackageListResponse,
  SMSRechargerRequest
} from '../../../../core/messages/sms-request-response';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-recharge-sms-step',
  templateUrl: './recharge-sms-step.component.html',
  styleUrls: ['./recharge-sms-step.component.scss']
})
export class RechargeSmsStepComponent extends PopupWindowBaseComponent implements OnInit {
  /*
  * TODO 设置参数
  * */
  weichat = ''; // 微信二维码值
  isPaying = false; // 默认显示短信列表页
  sMSPackageList: SMSPackageListResponse[]; // 短信包列表
  createRechargerRecordRequest: CreateRechargerRecordRequest = new CreateRechargerRecordRequest(); // 生成订单请求
  sMSRechargerRequest: SMSRechargerRequest = new SMSRechargerRequest();
  Indexs: number;
  paymethod: number;
  dataLoading = 'hide';
  constructor(
              private el: ElementRef,
              private application: ApplicationService,
              private smsService: SmsService) {
    super();
  }

  ngOnInit() {
    this.createRechargerRecordRequest.Money = 0;
    this.sMSRechargerRequest.Paymethod = null;
    this.getSMSPackageList();
  }
  /*
   * TODO 获取短信包
   * */
  getSMSPackageList() {
    this.smsService.getSMSPackageList(null).subscribe(val => {
      console.log(val);
      if (val) {
        this.sMSPackageList = val;
      }
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
/*
* TODO 点击选择短信包
* */
  clickItem(num, money, index) {
    this.Indexs = index;
    this.createRechargerRecordRequest.Money = money;
    this.createRechargerRecordRequest.Num = num;
  }
  /*
  * TODO 点击购买
  * */
  pay() {
    this.dataLoading = 'show';
    if (this.createRechargerRecordRequest.Num && this.paymethod) {
      this.smsService.createRechargerRecord(this.createRechargerRecordRequest).subscribe(val => {
        console.log(val);
        if (val) {
          this.sMSRechargerRequest.Id = val.Id;
          this.sMSRechargerRequest.Paymethod = this.paymethod;
          this.smsService.getSMSRecharger(this.sMSRechargerRequest).subscribe( value => {
            this.dataLoading = 'hide';
            this.isPaying = true;
            // app241 支付宝   244 微信   web支付宝PC：242   支付宝移动：225  微信二维码：245
            if (this.sMSRechargerRequest.Paymethod === 242) { // 支付宝
              document.write( value.ChargeSubmitForm);
            }else if (this.sMSRechargerRequest.Paymethod === 245) { // 微信
              this.weichat = value.ChargeSubmitForm;
            }
          }, error => {
            this.application.main.openErrorMessage(error.errorMessage);
          });
        }
      }, error => {
        // 请求失败
        this.application.main.openErrorMessage(error.errorMessage);
      });
    }else {
      this.application.main.openErrorMessage('请填写完整');
    }
  }
  cancel() {
    this.close();
  }
}
