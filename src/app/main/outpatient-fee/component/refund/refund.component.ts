import {Component, OnInit, Input} from '@angular/core';
import {ChargeService} from '../../../../core/service/charge.service';
import {RefundRequest,DetailsResponse} from '../../../../core/messages/bill-request-response';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: 'app-refund',
  templateUrl: './refund.component.html',
  styleUrls: ['./refund.component.scss']
})
export class RefundComponent extends PopupWindowBaseComponent implements OnInit {

  // 退费原因
  reason: string;
  // 从父窗口接收的数据
  @Input()
  data: any;
  response: DetailsResponse;
  constructor(private chargeService: ChargeService) {
    super();
  }

  ngOnInit() {
    if (this.data) {
      this.chargeService.getBill(this.data.id). subscribe(p => {
        this.response = p;
      });
    }
  }

  /**
   * 确定
   */
  ok() {
    let request = new RefundRequest();
    request.Time = this.response.Bill.LastOperationTime;
    if (!this.response.Bill.LastPayTime && this.response.Bill.LastPayTime > this.response.Bill.LastOperationTime) {
      request.Time = this.response.Bill.LastPayTime;
    }
    request.BillID = this.response.Bill.ID;
    request.Note = this.reason;

    this.chargeService.refund(request).subscribe(t => {
      super.close();
    },
    e => {
      console.log(e.errorMessage);
      super.close();
    });
  }

  /**
   * 取消
   */
  cancel() {
super.close();
  }

}
