import {Component, OnInit, AfterViewInit, Input, ElementRef, HostListener} from '@angular/core';
import {ChargeService} from '../../../../core/service/charge.service';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import * as GlobalDic from '../../../../core/global_dic';
import {ActivatedRoute, Router} from '@angular/router';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {QiezziInvalidComponent} from '../../../../shared/component/qiezzi-invalid/qiezzi-invalid.component';
import {ChargeComponent} from '../charge/charge.component';
import {CreateFeeComponent} from '../create-fee/create-fee.component';
import {RefundComponent} from '../refund/refund.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {IQiezziRightHeaderComponent} from '../../../../shared/component/qiezzi-right-header/qiezzi-right-header.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {QiezziInputPopComponent} from '../../../../shared/component/qiezzi-input-pop/qiezzi-input-pop.component';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'fee',
  templateUrl: './fee.component.html',
  styleUrls: ['./fee.component.scss']
})
export class FeeComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, IQiezziRightHeaderComponent {
  rightComponentName = '收费单详情';
  controlList = [];
  // 0.待收费 1.已付清 2.欠费 3.退费
  ctrlListAll = {
    '0': ['修改', '收费', '打印', '作废'],
    '1': ['退费', '打印', '作废'],
    '2': [],
    '3': ['修改', '收费', '退费', '打印', '作废']
  };
  // 当前收费状态索引映射
  ctrlListIndexAll = {
    '0': [0, 1, 4, 2],
    '1': [3, 4, 2],
    '2': [],
    '3': [0, 1, 3, 4, 2]
  };


  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  scrollbarOptionsRight = {axis: 'y', theme: 'minimal-dark'};
  isBorders = false;
  response: BillRequestResponse.DetailsResponse;

  // loading
  mainShowLoading = false;
  // 性别字典
  genderDic = GlobalDic.gender;
  // 订单状态
  billStatusDic = GlobalDic.billStatus;

  constructor(private el: ElementRef, private chargeService: ChargeService,
              private router: Router,
              private route: ActivatedRoute, private mScrollbarService: MalihuScrollbarService,
              private application: ApplicationService) {
    super();
  }

  ngOnInit() {
    this.route.params.subscribe(t => {
      // alert(t.feeId); // 获取到参数后，去数据库查询数据，并绑定展示·
      this.chargeService.getBill(t['feeId']).subscribe(p => {
        this.response = p;
        this.controlList = this.ctrlListAll[this.response.Bill.BillStatus];
        if (typeof (this.controlList) === 'undefined') {
          this.controlList = [];
        }
      });
    });
  }

  ngAfterViewInit(): void {
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  /**
   * 点击右上角控制按钮
   * @param index
   */
  onControl(index: number) {
    index = this.ctrlListIndexAll[this.response.Bill.BillStatus][index];
    switch (index) {
      case 0: // 修改
       this.application.frontLayer.openPopupWindow(CreateFeeComponent, '编辑收费单', PopupWindowSize.LARGE, 660, {'feeId': this.response.Bill.ID}, false)
          .subscribe(t => {
            console.log('刷新列表了');
          });
        console.log(index);
        break;
      case 1: // 收费
        this.application.frontLayer.openPopupWindow(ChargeComponent, '收费', PopupWindowSize.LARGE, 580, {'feeId': this.response.Bill.ID}, false)
          .subscribe(t => {
            console.log('刷新列表了');
          });
        break;
      case 2: // 作废
        this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, '作废', PopupWindowSize.SMALL, 280, null, false).subscribe(t => {
          console.log(t);
          /*let request = new BillRequestResponse.CancelRequest();
           if (!t.data.result) {
           return false;
           }
           let fee = this.response.Bill;
           request.CancelReason = t.data.reason;
           request.BillID = fee.ID;
           request.Time = fee.LastOperationTime;
           if (!fee.LastPayTime && fee.LastPayTime > fee.LastOperationTime) {
           request.Time = fee.LastPayTime;
           }
           this.chargeService.invalid(request).subscribe();*/
        })
        break;
      case 3: // 退费
        this.application.frontLayer.openPopupWindow(RefundComponent, '退费', PopupWindowSize.SMALL, 390, {'feeId': this.response.Bill.ID}, false)
          .subscribe(t => {
            console.log('刷新列表了');
          });
        break;
      case 4: // 打印
        this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, '作废', PopupWindowSize.SMALL, 280, null, false).subscribe(t => {
          console.log(t);
        });
        break;

      default:
    }
  }

  /**
   * 后退
   * @param e
   */
  onBack(e) {
// 返回仅限于1000以内尺寸，模拟移动端返回
    this.mScrollbarService.destroy('#rightContentScroll');
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  /**
   * 关闭
   * @param e
   */
  shutoff(e) {
    // 关闭特殊一点，会删除掉当前子路由，跳回上一级
    this.mScrollbarService.destroy('#rightContentScroll');
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
