import {AfterViewInit, Component, OnInit} from '@angular/core';
import {BindMobileComponent} from '../bind-mobile/bind-mobile.component';
import {PopupWindowSize} from '../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ApplicationService} from '../../../core/service/application.service';
import {EditPasswordComponent} from '../edit-password/edit-password.component';
import {CheckPasswordComponent} from "../check-password/check-password.component";

@Component({
  selector: 'app-account-security',
  templateUrl: './account-security.component.html',
  styleUrls: ['./account-security.component.scss']
})
export class AccountSecurityComponent implements OnInit, AfterViewInit {
  dataLoading = 'hide';
  constructor(private application: ApplicationService) { }

  ngOnInit() {
    this.dataLoading = 'show';
    let self = this;
    setTimeout( () => {
      self.dataLoading = 'hide';
    }, 1000);
  }
  ngAfterViewInit() {}
/*
* TODO 绑定手机
* */
  bindPhone() {
    this.application.frontLayer.openPopupWindow( CheckPasswordComponent, '安全验证', PopupWindowSize.SMALL, 250, null, false).subscribe(t => {
      if (t && t.data) {
        console.log(t.data);
      }
    });
  }
  /*
  * TODO 修改密码
  * */
  setPassword() {
    this.application.frontLayer.openPopupWindow( EditPasswordComponent, '更改密码', PopupWindowSize.SMALL, 320, null, false).subscribe(t => {
      if (t && t.data) {
        console.log(t.data);
      }
    });
  }
}
