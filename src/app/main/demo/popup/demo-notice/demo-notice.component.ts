import {AfterViewInit, Component, OnInit} from '@angular/core';

import {DemoHasButtonPopupComponent} from "../demo-has-button-popup/demo-has-button-popup.component";
import {DemoNoButtonPopupComponent} from "../demo-no-button-popup/demo-no-button-popup.component";
import {DemoTextPopupComponent} from "../demo-text-popup/demo-text-popup.component";
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {ApplicationService} from "../../../../core/service/application.service";

@Component({
  selector: 'app-demo-notice',
  templateUrl: './demo-notice.component.html',
  styleUrls: ['./demo-notice.component.css']
})
export class DemoNoticeComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {


  constructor(private application: ApplicationService) {
    super();
  }

  ngAfterViewInit(): void {
  }

  ngOnInit() {
  }

  clickPopupConfirm() {
    this.openChild();
    this.application.frontLayer.openConfirmDialog('我是测试信息，确认删除吗').subscribe(t => {
      if (t != null && t) {
        console.log('删除');
      } else if (t != null && !t) {
        console.log('不删除');
      } else {
        console.log('关闭');
      }
      this.closeChild();
    })
  }

  clickNoButton() {
    this.openChild();
    this.application.frontLayer.openPopupWindow(DemoNoButtonPopupComponent, '弹窗无按钮', 480, 300, null, false).subscribe(t => {
      if (t && t.type === 'close')
        this.closeChild();
      console.log(t);
    })
  }

  clickHasButton() {
    this.openChild();
    this.application.frontLayer.openPopupWindow(DemoHasButtonPopupComponent, '弹窗测试1', 480, 'auto', null, false).subscribe(t => {
      if (t && t.type === 'close')
        this.closeChild();
      console.log(t);
    })
  }

  clickTextPopup() {
    this.openChild();
    this.application.frontLayer.openPopupWindow(DemoTextPopupComponent, '弹窗测试1', 480, 'auto', null, false).subscribe(t => {
      if (t && t.type === 'close')
        this.closeChild();
      console.log(t);
    })
  }
}
