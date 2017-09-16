import { Component, OnInit } from '@angular/core';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {ApplicationService} from '../../../../core/service/application.service';
import {CreateEditHostpialAccountComponent} from '../create-edit-hostpial-account/create-edit-hostpial-account.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {CreateEditMedicalComponent} from "../create-edit-medical/create-edit-medical.component";
@Component({
  selector: 'basic-index',
  templateUrl: './basic-index.component.html',
  styleUrls: ['./basic-index.component.scss']
})
export class BasicIndexComponent implements OnInit {
  /*loading*/
  mainShowLoading = 'hide';
  /*侧滑出口*/
  displayStatus = '';
  // 当前tab切换项
  currentIdx = 0;
  /*滚动条*/
  scrollbarOptions = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  tabData = {
    data: ['病历规则设置', '短信发送设置', '收款账户设置', '就诊事项设置'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
    }
  };
  constructor(
    public application: ApplicationService,
  ) { }

  ngOnInit() {
  }
  /*tab切换导航条*/
  changeTab(evt) {
    // console.log(evt);
    this.currentIdx = evt.index;
  }
  /*  0 新增账户  1 新增就诊事项*/
  onControl(evt: any) {
    // console.log(evt);
    if (evt === 0) {
    this.application.frontLayer.openPopupWindow(CreateEditHostpialAccountComponent, '新增账户', PopupWindowSize.SMALL, 370, null, false).subscribe(t => {
      if (t && t.type === 'close') {
        console.log(t);
      }
    });
  } else if (evt === 1) {
      this.application.frontLayer.openPopupWindow(CreateEditMedicalComponent, '新增就诊事项', PopupWindowSize.SMALL, 320, null, false).subscribe(t => {
        if (t && t.type === 'close') {
          console.log(t);
        }
      });
    }
  }
}
