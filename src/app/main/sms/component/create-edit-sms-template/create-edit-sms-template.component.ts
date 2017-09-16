import {Component, ElementRef, Input, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ActivatedRoute, Router} from "@angular/router";
import {ApplicationService} from "../../../../core/service/application.service";
import {HospitalService} from "../../../../core/service/hospital.service";
import {SmsService} from "../../../../core/service/sms.service";
import {AddTemplateRequest, TemplateTypeListResponse} from "../../../../core/messages/sms-request-response";
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-create-edit-sms-template',
  templateUrl: './create-edit-sms-template.component.html',
  styleUrls: ['./create-edit-sms-template.component.scss']
})
export class CreateEditSmsTemplateComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  /*
  * 参数设置
  * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};

  @Input()
    data: any;
  addTemplateRequest: AddTemplateRequest = new AddTemplateRequest();
  templateTypeListResponse: Array<TemplateTypeListResponse>;
  templateTypeList = [];
  tempIndex = 0; // 下拉框列表index
  isProcessing = false; // 点击后禁止重复点击
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};

  constructor(private application: ApplicationService,
              private smsService: SmsService,
              private form: CustomizeFormValidateService) {
    super();
  }

  ngOnInit() {
    this.formName = 'MessageTemplate';
    this.formModel = new TemplateTypeListForm();
    if (this.data) {
      if (this.data.content) {
        this.formModel.SMSContent = this.data.content;
      }else if (this.data.Id) {
        this.formModel.SMSContent = this.data.SMSContext;
        this.formModel.SMSName = this.data.SMSName;
        this.formModel.TypeCode = this.data.TypeCode;
      }
    }
    this.form.buildForm(this);
    this.getTemplateTypeList(); // 加载短信类型列表
  }
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  /*
  * TODO 请求短信类型列表
  * */
  getTemplateTypeList() {
    this.smsService.getTemplateTypeList(null).subscribe(val => {
      console.log(val);
      if (val && val.length > 0) {
        this.templateTypeListResponse = val;
        val.forEach(value => {
          this.templateTypeList.push({label: value.Name, value: value.Code});
        });
      }
    }, error => {
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 选择下拉框选项
  * */
  chooseTemp(evt) {
    console.log(evt);
  }
  /**
   * 确定
   */
  ok() {
    this.isProcessing = true;
    this.smsService.addTemplate(this.formModel).subscribe(val => {
      this.isProcessing = false;
      console.log(val);
      this.application.main.openPromptMessage('保存成功！', 3000);
      this.close(val);
    }, error => {
      this.isProcessing = false;
      // 请求失败
      this.application.main.openErrorMessage(error.errorMessage);
      this.close(error.errorMessage);
    });

  }

  /**
   * 取消
   */
  cancel() {
   this.close();
  }
}
export class TemplateTypeListForm {
  // 类别ID
  TypeCode: string = null;
  // 模板名称
  SMSName: string = null;
  // 模板内容
  SMSContent: string = null;
}
