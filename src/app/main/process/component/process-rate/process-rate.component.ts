import {Component, Input} from "@angular/core";
import {OutsideProcessGetResponse} from "../../../../core/messages/process-request-response";
import * as dic from "../../../../core/global_dic";
/**
 * 外加工进度
 */
@Component({
  selector: 'process-rate',
  templateUrl: 'process-rate.component.html',
  styleUrls: ['process-rate.component.scss']
})
export class ProcessRateComponent {

  processStatus = dic.processStatus;

  @Input()
  rateData: OutsideProcessGetResponse;
}
