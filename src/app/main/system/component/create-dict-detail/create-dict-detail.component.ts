import {Component, OnInit} from '@angular/core';
import {CreateDictDetailForm} from '../../../../core/forms/system/create-dict-detail-form';
import {SystemService} from '../../../../core/service/system.service';
import {LoginForm} from '../../../../core/forms/user/login-form';
import {UserService} from '../../../../core/service/user.service';
import {HttpStatusCode} from "../../../../core/enums/httpStatusCode";
import {GeneralService} from '../../../../core/service/general.service';

@Component({
  selector: 'app-create-dict-detail',
  templateUrl: 'create-dict-detail.component.html',
  styleUrls: ['create-dict-detail.component.scss']
})
export class CreateDictDetailComponent  implements OnInit {

  constructor(private systemService: SystemService, private  userService: UserService, public generalService: GeneralService) {
  }


  //登录模型
  loginForm:LoginForm=new LoginForm();

  //错误提示

  errorTip:string="";

  //登录
login(){
  this.loginForm.autosign=true;
    this.userService.login(this.loginForm.username,this.loginForm.password,this.loginForm.autosign).subscribe(t=>{
this.errorTip="登录成功";
    },t=>{
      this.errorTip=t.errorMessage;
    });
}
  ngOnInit() {

  }

}
