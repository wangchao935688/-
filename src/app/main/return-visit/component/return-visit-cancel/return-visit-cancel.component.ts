import {Component, Input} from "@angular/core";
import {FollowUpCancelRequest} from "../../../../core/messages/return-visit-request-response";
import {ReturnVisitService} from "../../../../core/service/return-visit.service";
@Component({
  selector: 'return-visit-cancel',
  templateUrl: 'return-visit-cancel.component.html',
  styleUrls: ['return-visit-cacel.component.scss']
})
export class ReturnVisitCancelComponent {

  @Input()
  data: string;

  onParentClose: Function;

  // 取消原因
  reason: string;

  returnVisitCancel: FollowUpCancelRequest;

  constructor(private returnVisitService: ReturnVisitService) {

  }

  saveReturnVisitCancel() {
    this.returnVisitCancel = new FollowUpCancelRequest(this.data, this.reason);
    this.returnVisitService.saveReturnVisitCancel(this.returnVisitCancel).subscribe(val => {
      this.onParentClose && this.onParentClose();
    });
    this.onParentClose && this.onParentClose();
  }
}
