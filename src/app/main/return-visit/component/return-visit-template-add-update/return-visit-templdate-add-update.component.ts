import {Component, Input, OnInit} from '@angular/core';
import {FollowUpAddTemplateRequest} from '../../../../core/messages/return-visit-request-response';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {FormGroup} from '@angular/forms';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {CreateReturnVisit} from '../../../../core/forms/return-visit/create-return-visit-form';
@Component({
  selector: 'return-visit-template-add-update',
  templateUrl: 'return-visit-template-add-update.component.html',
  styleUrls: ['return-visit-template-add-update.component.scss']
})
export class ReturnVisitTemplateAddUpdateComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  /*
   * TODO 设置表单验证参数
   * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};
  @Input()
  data: any;
  template: FollowUpAddTemplateRequest;

  onParentClose: Function;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};
  constructor(
    private returnVisitService: ReturnVisitService,
    private form: CustomizeFormValidateService,
  ) {
    super();
    this.template = new FollowUpAddTemplateRequest();
  }

  ngOnInit() {
    // 表单验证相关
    this.formName = 'Interview';
    /*
    * TODO 待后台API添加完成，判断传参是修改还是新增
    * */
    if (this.data.type) {
      this.formModel = new CreateReturnVisitContentForm();
      this.formModel.Type = this.data.type;
    }
    this.form.buildForm(this);
  }
  /*
   * 失去焦点
   * */
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  ok() {
    this.returnVisitService.saveReturnVisitTemplateAdd(this.template).subscribe(val => {

      }, error => {

    });
  }
  accountTransfer() {
    this.close();
  }
  cancel() {
    this.close();
  }
}
export class CreateReturnVisitContentForm {
  Id?: string;
  Type?: number;
  Name: string;
  Content: string;
}
export class CreateReturnVisitResultForm {

}
