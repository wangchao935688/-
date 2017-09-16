import {AfterViewInit, Component, ElementRef, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import {TOP_ROLL_COMPONENT_COMPLETE} from '../../../../core/constants/global-subscriber-events';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {SystemGlobalHelper} from '../../../../core/uitls/system-global-helper';
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {GetResponse, Handler, CancelRequest} from '../../../../core/messages/income-and-expenses-request-response';
import {QiezziInvalidComponent} from '../../../../shared/component/qiezzi-invalid/qiezzi-invalid.component';
import {IQiezziCenterHeaderComponent} from '../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component';

@Component({
  selector: 'return-visit-detail',
  templateUrl: 'expense.component.html',
  styleUrls: ['./expense.component.scss']
})
export class ExpenseComponent implements OnInit, AfterViewInit {
  compName: any;
  expenseLoading = 'hide';
  ctrlList = ['作废'];
  list: any[] = ['', '', ''];
  ExpenseDetail: GetResponse;
  cancelExpenseRequest: CancelRequest;

  @Input()
  data: any = null;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  constructor(
    private el: ElementRef,
    private router: Router,
    private route: ActivatedRoute,
    private mScrollbarService: MalihuScrollbarService,
    private dailyExpenseService: DailyExpenseService) {
    /**
     * 初始化是没有数据 先new出来
     * @type {ExpenseResponse}
     */
    this.ExpenseDetail = new GetResponse();
    this.cancelExpenseRequest = new CancelRequest();
    this.ExpenseDetail.HandlerModel = new Handler();
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  ngAfterViewInit(): void {
    this.expenseLoading = 'show';
    GlobalSubscriber.fire(TOP_ROLL_COMPONENT_COMPLETE);
  }

  /**
   * 点击列表时传递ID值以找到相应的详情
   */
   ngOnInit(): void {
    this.route.queryParams.subscribe(t => {
      this.dailyExpenseService.GetExpenseDetail(t).subscribe((val) => {
        this.ExpenseDetail = val;
        this.cancelExpenseRequest.ID = val.ID;
        this.cancelExpenseRequest.LastOperationTime = val.LastOperationTime;
        if (val.Type == 0) {
          this.compName = '收入单详情';
        }else {
          this.compName = '支出单详情';
        }
      });
    });
    this.expenseLoading = 'hide';
   }

  onControlListClick(index) {
    switch (index) {
      case 0: // 修改
        SystemGlobalHelper.currentFrontLayer.openPopupWindow(QiezziInvalidComponent, '确认作废', 400, 300, {}, false).subscribe(t => {
          if (t.data.reason) {
            this.cancelExpenseRequest.CancelReason = t.data.reason;
            /**
             * 日常收支作废
             * @param cancelExpenseRequest
             */
            this.dailyExpenseService.cancelExpense(this.cancelExpenseRequest).subscribe(val => {
              console.log(val);
            });
          }
        });
        break;
 /*     case 1://删除
        this.doAnything(this.ctrlList[index]);
        break;
      default:*/
    }
  }

  doAnything(val) {
  }

  onBack(event) {
// 返回仅限于1000以内尺寸，模拟移动端返回
    this.mScrollbarService.destroy('#rightContentScroll');
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  onClose(event) {
    // 关闭特殊一点，会删除掉当前子路由，跳回上一级
    this.mScrollbarService.destroy('#rightContentScroll');
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
