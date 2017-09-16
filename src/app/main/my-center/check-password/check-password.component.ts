import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ApplicationService} from '../../../core/service/application.service';
import {PopupWindowSize} from "../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {BindMobileComponent} from "../bind-mobile/bind-mobile.component";

@Component({
  selector: 'app-check-password',
  templateUrl: './check-password.component.html',
  styleUrls: ['./check-password.component.scss']
})
export class CheckPasswordComponent extends PopupWindowBaseComponent implements OnInit {

  constructor(private application: ApplicationService) {
    super();
  }

  ngOnInit() {
  }
/*
* 保存
* */
ok() {
  this.application.frontLayer.openPopupWindow( BindMobileComponent, '绑定手机', PopupWindowSize.SMALL, 320, null, true).subscribe( t => {
    if (t && t.data) {
      console.log(t.data);
    }
  });
}
/*
* 取消
* */
cancel() {
  this.close();
}
}
