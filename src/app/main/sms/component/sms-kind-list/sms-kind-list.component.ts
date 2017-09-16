import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CreateDemoForm} from '../../../../core/forms/demo/create-demo-form';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {SmsService} from '../../../../core/service/sms.service';
import {AddTemplateTypeRequest, TemplateTypeListResponse} from '../../../../core/messages/sms-request-response';
import {PopupWindowSize} from "../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component";
import {QiezziInputPopComponent} from "../../../../shared/component/qiezzi-input-pop/qiezzi-input-pop.component";

@Component({
  selector: 'app-sms-kind-list',
  templateUrl: './sms-kind-list.component.html',
  styleUrls: ['./sms-kind-list.component.scss']
})
export class SmsKindListComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {
/*
* 参数设置
* */
  templateTypeListResponse: Array<TemplateTypeListResponse>; // 模板类型列表
  addTemplateTypeRequest: AddTemplateTypeRequest = new AddTemplateTypeRequest();
  mainShowLoading = 'hide';
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  isProcessing = false; // 点击后禁止重复点击
  constructor(private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private smsService: SmsService) {
    super();
  }

  ngOnInit() {
    this.getTemplateTypeList();
  }
  ngAfterViewInit() {
    this.mainShowLoading = 'show';
  }
/*
* TODO 加载短信类别列表
* */
  getTemplateTypeList() {
    this.smsService.getTemplateTypeList(null).subscribe(value => {
      this.mainShowLoading = 'hide';
      this.templateTypeListResponse = value;
      console.log(value);
    }, error => {
      this.mainShowLoading = 'hide';
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 添加模板类别
  * */
  addTemplateType() {
    this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, '添加模板类别', PopupWindowSize.SMALL, 'auto', null, true).subscribe(t => {
      console.log(JSON.stringify(t));
      if (t && t.data) {
        this.smsService.addTemplateType(this.addTemplateTypeRequest).subscribe(value => {
          console.log(value);
          this.application.main.openPromptMessage('添加成功！', 3000);
        }, error => {
          this.application.main.openErrorMessage(error.errorMessage);
        });
      }
    });
  }
  /**
   * 删除模板类别 POST api/SMS/DelTemplateType
   */
  delTemplateType(code) {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        this.smsService.delTemplateType({TypeCode: code}).subscribe(value => {
          console.log(value);
          this.application.main.openPromptMessage('添加成功！', 3000);
        }, error => {
          this.application.main.openErrorMessage(error.errorMessage);
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }
  /**
   * 确定
   */
  ok() {
    this.close({msg: 'succ'});
  }

  /**
   * 取消
   */
  cancel() {
    this.close();
  }

}
