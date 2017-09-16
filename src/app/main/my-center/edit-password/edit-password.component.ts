import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ApplicationService} from '../../../core/service/application.service';
import {ChangePasswordRequest} from "../../../core/messages/user-request-response";
import {UserService} from "../../../core/service/user.service";

@Component({
  selector: 'app-edit-password',
  templateUrl: './edit-password.component.html',
  styleUrls: ['./edit-password.component.scss']
})
export class EditPasswordComponent  extends PopupWindowBaseComponent implements OnInit {
  changePasswordRequest: ChangePasswordRequest;
  renewPassword: string;
  constructor(private application: ApplicationService,
              private userService: UserService) {
    super();
  }
  ngOnInit() {
    this.changePasswordRequest = new ChangePasswordRequest();
  }
  /*
   * 保存
   * */
  ok() {
    if (this.renewPassword === this.changePasswordRequest.NewPassword) {
      this.userService.changePassword( this.changePasswordRequest ).subscribe(val => {
        console.log(val);
        this.application.main.openPromptMessage('修改密码成功！');
        this.close(val);
      }, error => {
        this.application.main.openErrorMessage(error.errorMessage);
      });
    }else {
      this.application.main.openErrorMessage('密码输入不一致，请重新输入');
      this.renewPassword = '';
    }
  }
  /*
   * 取消
   * */
  cancel() {
    this.close(null);
  }
}
