import { Component, OnInit } from '@angular/core';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
@Component({
  selector: 'app-charge-item-index',
  templateUrl: './charge-item-index.component.html',
  styleUrls: ['./charge-item-index.component.scss']
})
export class ChargeItemIndexComponent implements OnInit {
  displayStatus: string;
  mainShowLoading = 'hide';
  isShow= false;
  tabData = {
    data: ['收费项目', '收费组合'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
    }
  };
  scrollbarOptions = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  constructor() { }

  ngOnInit() {
  }
  changeTab(evt) {
    if (evt.index === 0) {
      this.isShow = false;
    }else if (evt.index === 1) {
      this.isShow = true;
    }
  }
}
