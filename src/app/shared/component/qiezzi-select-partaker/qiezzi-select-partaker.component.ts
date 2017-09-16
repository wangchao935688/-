import {Component, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {WorkerService} from "../../../core/service/worker.service";
import {WorkerSimple, WorkerDetail} from "../../../core/messages/model/worker_simple";
import {PopupWindowBaseComponent} from "../qiezzi-popup-window/popup-window-base/popup-window-base";
import {MalihuScrollbarService} from "ngx-malihu-scrollbar";

import * as GlobalDic from '../../../core/global_dic';

@Component({
  selector: 'app-qiezzi-select-partaker',
  templateUrl: './qiezzi-select-partaker.component.html',
  styleUrls: ['./qiezzi-select-partaker.component.scss']
})
export class QiezziSelectPartakerComponent extends PopupWindowBaseComponent implements OnInit {
  data: any[];

  workerType = GlobalDic.workerType;

  listData: WorkerDetail[];
  list: { [key: string]: { [key: string]: any } };

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  constructor(private workerService: WorkerService,
              private mScrollbarService: MalihuScrollbarService) {
    super();
  }

  ngOnInit() {
    this.list = {};
    this.workerService.getWorkerList({WorkerType: null}).subscribe(t => {
      this.listData = t.Items;
      for (let i = 0; i < this.listData.length; i++) {
        this.list[this.listData[i].WorkerId] = {index: i, selected: false};
      }
      if (this.data) {
        for (let i = 0; i < this.data.length; i++) {
          this.list[this.data[i].value].selected = true
        }
      }
    });
  }

  save() {
    let tmp: { [key: string]: any }[] = [], worker;
    for (let id in this.list) {
      if (this.list[id].selected) {
        worker = this.listData[this.list[id].index];
        tmp.push({title: worker.WorkerName, value: worker.WorkerId});
      }
    }
    this.sendMessage(tmp);
    this.close();
  }
}
