import {Component, Input, OnInit} from "@angular/core";
import {ProcessItemFullModel} from "../../../../core/messages/model/processItem-full.model";
/**
 * 加工单详情
 */
@Component({
  selector: 'process-detail',
  templateUrl: 'process-detail.component.html',
  styleUrls: ['process-detail.component.scss']
})
export class ProcessDetailComponent implements OnInit {
  @Input()
  processItemFull: ProcessItemFullModel[];

  @Input()
  note: string;

  @Input()
  price: number;

  @Input()
  processNum: string;

  toothes: Map<number,Map<number,number>>;

  ngOnInit() {
    this.toothes = new Map();
    this.processItemFull.forEach((item, index) => {
      let tooths = new Map();

      for (let it of item.ToothPlace) {

      }

      this.toothes.set(index, tooths);
    });


  }

}
