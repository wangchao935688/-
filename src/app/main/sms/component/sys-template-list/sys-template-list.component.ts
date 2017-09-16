import {Component, OnInit, ElementRef} from '@angular/core';
import {CreateEditSmsTemplateComponent} from "../create-edit-sms-template/create-edit-sms-template.component";
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {Router, ActivatedRoute} from "@angular/router";
import {ApplicationService} from "../../../../core/service/application.service";
import {SmsService} from "../../../../core/service/sms.service";
import {GetTemplateListResponse} from "../../../../core/messages/sms-request-response";

@Component({
  selector: 'app-sys-template-list',
  templateUrl: './sys-template-list.component.html',
  styleUrls: ['./sys-template-list.component.scss']
})
export class SysTemplateListComponent implements OnInit {
  /*
  * 参数设置
  * */
  templateList = []; // 短信模板
  getTemplateListResponse: GetTemplateListResponse;
  Indexs: number;
  dataLoading = 'hide';
  constructor(private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private smsService: SmsService) { }

  ngOnInit() {
    this.getTemplateList(); // 加载一级模板类型列表
  }
  /*
  * TODO 加载一级模板类型列表
  * */
  getTemplateList() {
    this.smsService.getTemplateList(null).subscribe(value => {
      if (value) {
        this.getTemplateListResponse = value;
        this.clickItem(-1); // 加载全部短信模板
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 弹框  类型管理
  * */
  selectReceiver() {
    this.application.frontLayer.openPopupWindow(CreateEditSmsTemplateComponent, '短信类别管理', PopupWindowSize.MIDDLE, 600, null, true)
      .subscribe(t => {
        console.log(JSON.stringify(t));
      });
  }
  /*
  * TODO 点击模板类型列表，加载二级模板列表
  * */
  clickItem(index) {
    this.Indexs = index;
    this.templateList = [];
    if (index === -1) {
      this.getTemplateListResponse.MyTemplateList.forEach( value => {
        this.templateList = this.templateList.concat(value.TemplateList);
      } );
    }else {
      this.templateList = this.getTemplateListResponse.MyTemplateList[index].TemplateList;
    }
  }
  /*
  * TODO 添加模板
  * */
  addTemp() {

  }
  /*
  * TODO 模板操作
  * */
  up(id) {
    console.log(id);
  }
  down(id) {
    console.log(id);
  }
  update(data) {
    console.log(data);
  }
  delete(id) {
    console.log(id);
  }
}
