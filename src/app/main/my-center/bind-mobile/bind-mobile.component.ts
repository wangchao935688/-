import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ApplicationService} from '../../../core/service/application.service';
import {UserService} from "../../../core/service/user.service";
import {
  ChangeTelRequest, CheckPasswordRequest, CheckVerificationCodeRequest,
  SendVerificationCodeRequest
} from "../../../core/messages/user-request-response";

@Component({
  selector: 'app-bind-mobile',
  templateUrl: './bind-mobile.component.html',
  styleUrls: ['./bind-mobile.component.scss']
})
export class BindMobileComponent extends PopupWindowBaseComponent implements OnInit {
  changeTelRequest: ChangeTelRequest; // 绑定手机（密码、手机号、验证码）
  sendVerificationCodeRequest: SendVerificationCodeRequest; // 获取验证码（手机号、验证码类型）
  checkVerificationCodeRequest: CheckVerificationCodeRequest; // 检查验证码（手机号、验证码类型、验证码）
  countTime: number; // 计时器
  constructor(private application: ApplicationService,
              private userService: UserService) {
    super();
  }

  ngOnInit() {
    let self = this;
    this.countTime = 60;
    setTimeout( () => {
      self.countTime--;
    }, 1000);
    this.verificationCode();
  }
  /*
  * TODO 获取验证码
  * */
  sendVerificationCode() {
    this.userService.sendVerificationCode(this.sendVerificationCodeRequest).subscribe(val => {
      console.log(val);
      if (val) {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /**
   * TODO 图形验证码
   */
  verificationCode() {
    this.userService.verificationCode(null).subscribe(val => {
      console.log(val);
      if (val) {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /**
   * TODO 绑定手机
   */
  changeTel() {
    this.userService.changeTel(this.changeTelRequest).subscribe(val => {
      console.log(val);
      if (val) {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 校验验证码
  * */
  checkVerificationCode() {
    this.userService.checkVerificationCode(this.checkVerificationCodeRequest).subscribe(val => {
      console.log(val);
      if (val) {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
   * 保存
   * */
  ok() {
    this.close({mag: 'succ'});
  }
  /*
   * 取消
   * */
  cancel() {
    this.close();
  }
}
