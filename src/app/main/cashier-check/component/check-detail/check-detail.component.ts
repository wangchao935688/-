import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as dic from "../../../../core/global_dic";
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {AccountService} from '../../../../core/service/account.service';
import {ChargeService} from '../../../../core/service/charge.service';
import {GetResponse, Handler,CancelRequest} from '../../../../core/messages/income-and-expenses-request-response';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {GetCashFlowDetailRequest} from '../../../../core/messages/capital-cashier-request-response';
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
@Component({
  selector: 'check-detail',
  templateUrl: 'check-detail.component.html',
  styleUrls: ['check-detail.component.scss']
})
export class CheckDetailComponent implements OnInit, AfterViewInit {
  compName = '收支详情';
  detailLoading: string;
  list: any[] = ['', '', ''];
  Type = dic.tradetypeStatus;
  ExpenseDetail: GetCashFlowDetailRequest;
  cancelExpenseRequest: CancelRequest;
  response: BillRequestResponse.DetailsResponse;
  displayStatus: string;
  selectIndex: number;
  @Input()
  data: any = null;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};


  constructor(private slider: CustomizeSliderService, private el: ElementRef, private router: Router, private route: ActivatedRoute,private chargeService: ChargeService, private dailyExpenseService: DailyExpenseService, private AccountService: AccountService) {
    /**
     * 初始化是没有数据 先new出来
     * @type {ExpenseResponse}
     */
    this.ExpenseDetail = new  GetResponse();
    this.cancelExpenseRequest = new CancelRequest();
    // this.ExpenseDetail.HandlerModel = new Handler()
  }
  clickSecondRouter(evt, orderId: string, i) {
    if (evt.currentTarget.className.indexOf('list-table-item') > -1)
      evt.stopPropagation();
    this.selectIndex = i;
    // this.router.navigate(['fee'], {queryParams: {'feeId': fee}, relativeTo: this.route}).then(()=>{
    //   this.slider.show(this,evt);
    // });
    this.router.navigate(['fee', orderId], { relativeTo: this.route});
    this.slider.show(this, evt);

    // this.showSlider();
  };
  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  ngAfterViewInit(): void {
  }

  /**
   * 点击列表时传递ID值以找到相应的详情
   */
   ngOnInit(): void {
     this.detailLoading = 'show';
    this.route.params.subscribe(t => {
      this.AccountService.getCapitalFlowDetail(t['checkId']).subscribe((val) => {
        console.log(t);
        this.detailLoading = 'hide';
        this.ExpenseDetail = val;
        // console.log(this.ExpenseDetail);
        // this.cancelExpenseRequest.ID = val.ID;
        // this.cancelExpenseRequest.LastOperationTime = val.LastOperationTime;
        // if(val.Type === 0) {
        //   this.compName = '收支详情'
        // }else{
        //   this.compName = '支出单详情'
        // }
      });
      this.chargeService.getBill({ID: t['checkId']}). subscribe(p => {
        this.response = p;
    });
    });
   }
  onClose(evt: any ) {
  };
  onControlListClick(evt: any) {
  };
}
