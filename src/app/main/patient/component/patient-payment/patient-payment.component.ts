import {Component, ElementRef, OnInit} from '@angular/core';
import {GetPatientBillRequest, GetPatientBillResponse} from '../../../../core/messages/bill-request-response';
import {ActivatedRoute, Router} from '@angular/router';
import {
  RechargeAccountChangeRecordRequest,
  RechargeAccountChangeRecordResponse
} from '../../../../core/messages/recharge-request-response';
import {RechargeService} from '../../../../core/service/recharge.service';
import {ChargeService} from '../../../../core/service/charge.service';
@Component({
  selector: 'app-patient-payment',
  templateUrl: './patient-payment.component.html',
  styleUrls: ['./patient-payment.component.scss']
})
export class PatientPaymentComponent implements OnInit {
  /*
   * TODO 参数设置
   * */
  billData: Array<GetPatientBillResponse>;
  getPatientBillRequest: GetPatientBillRequest;
  rechargeAccountChangeRecordRequest: RechargeAccountChangeRecordRequest;
  rechargeData: RechargeAccountChangeRecordResponse;
  patientId: string;
  /*
   * TODO 设置tab选项
   * */
  tabData = {
    data: ['收费', '预存款'],
    defaultIndex: 0,
    changeTab: (index) => {
      this.changeTab(index.index);
    }
  };
  dataLoading= 'hide';
  showEmpty= false;
  selectIndex = 0;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private rechargeService: RechargeService,
  private chargeService: ChargeService) { }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t);
      this.patientId = t['patientId'];
      this.GetPatientBill(); // 获取患者收费列表
    });
  }
  changeTab(index) {
    this.selectIndex = index.index;
    if (this.selectIndex === 0) {
      this.GetPatientBill(); // 获取患者收费列表
    }else if (this.selectIndex === 1) {
      this.getRechargeAccountChangeRecord(); // 获取预付款列表
    }else { // 退款，后台缺少API

    }
  }
  /*
  * 获取患者收费列表
  * */
  GetPatientBill() {
    this.dataLoading = 'show';
    this.getPatientBillRequest = { patientID : this.patientId};
    this.chargeService.GetPatientBill(this.getPatientBillRequest).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val) {
        this.billData = val;
      }else {
        this.showEmpty = true;
      }
    });
  }
  /*
  * 获取患者预存款列表
  * */
  getRechargeAccountChangeRecord() {
    this.dataLoading = 'show';
    this.rechargeAccountChangeRecordRequest = {patientID: this.patientId};
    this.rechargeService.getRechargeAccountChangeRecord(this.rechargeAccountChangeRecordRequest).subscribe(val => {
      this.dataLoading = 'hide';
      console.log(val);
      if (val) {
        this.rechargeData = val;
      }else {
        this.showEmpty = true;
      }
    });
  }
  /*
  * TODO 分页
  * */
  pageChange(evt) {}
  /*
  * TODO 获取收费详情
  * */
  getBillDetail (id) {
    console.log(id);
  }
  /*
  * 添加付款
  * */
  addPayment() {

  }
}
