import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit} from "@angular/core";
import {RechargeService} from "../../../../core/service/recharge.service";
import * as Recharge from "../../../../core/messages/recharge-request-response";
import {ApplicationService} from "../../../../core/service/application.service";
import {ActivatedRoute, Router} from "@angular/router";
/**
 * 充值账户详情
 */
@Component({
  selector: 'recharge-account',
  templateUrl: './recharge-account.component.html',
  styleUrls: ['recharge-account.component.scss']
})
export class RechargeAccountComponent implements OnInit, AfterViewInit {
/*
* 设置参数
* */
  dataLoading = 'hide';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  compName = '预存款明细';
  ctrlList = ['&#xe6c5'];
  displayStatus = '';
  accountId: string;
  rechargeAccountState = false;
  isGetAccount = false;
  isGetRecord = false;

  // 充值账户
  rechargeAccountGet: Recharge.RechargeAccountGetResponse;
  // 充值账户变动记录
  rechargeAccountGetChangeRecord: Recharge.RechargeAccountChangeRecordResponse;

  constructor(private rechargeService: RechargeService,
              private el: ElementRef,
              private route: ActivatedRoute,
              private router: Router,
              private application: ApplicationService) {
  }
  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  ngOnInit() {
    this.dataLoading = 'show';
    this.route.params.subscribe(t => {
      console.log(t);
      this.rechargeAccountGetChangeRecord = new Recharge.RechargeAccountChangeRecordResponse();
      this.accountId = t['id'];
      this.getRechargeAccountGet();
      this.getRechargeAccountChangeRecord();
    });
    if (navigator.userAgent.match(/(iPhone|iPad|Android|ios)/i)) {
      this.ctrlList = [  ];
    }
  }
  ngAfterViewInit(): void {
    this.dataLoading = 'show';
  }
/*
* TODO 获取详情
* */
  getRechargeAccountGet() {
    this.dataLoading = 'show';
    this.rechargeService.getRechargeAccountGet({patientID: this.accountId}).subscribe(val => {
      if (this.isGetRecord) {
        this.dataLoading = 'hide';
      }
      if (val) {
        this.isGetAccount = true;
        this.rechargeAccountGet = val;
      }
    });
  }
  /*
  * TODO 变动记录
  * */
  getRechargeAccountChangeRecord() {
    this.dataLoading = 'show';
    this.rechargeAccountState = false;
   // this.rechargeAccountGetChangeRecord.Items = [];
    this.rechargeService.getRechargeAccountChangeRecord({
      patientID: this.accountId,
      pageIndex: 1,
      pageSize: 10
    }).subscribe(val => {
      if (this.isGetAccount) {
        this.dataLoading = 'hide';
      }
      if (val && val.Items && val.Items.length > 0) {
        this.isGetRecord = true;
        this.rechargeAccountGetChangeRecord = val;
      }else {
        this.rechargeAccountState = true;
      }
    });
  }
  /*
  * TODO 右上角操作选项
  * */
  onControlListClick(index) {
    console.log(index);
  }
  accountSort() {}
  rechargeSort() {}
}
