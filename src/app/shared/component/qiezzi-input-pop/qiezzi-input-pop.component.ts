import {Component, OnInit, Input} from '@angular/core';
import {PopupWindowBaseComponent} from '../qiezzi-popup-window/popup-window-base/popup-window-base';
import {ICustomizeFormValidate, CustomizeFormValidateService} from '../../../core/service/customize-form.service';
import {FormGroup} from '@angular/forms';
import {InputForm} from '../../../core/forms/input.form';

@Component({
  selector: 'app-qiezzi-input-pop',
  templateUrl: './qiezzi-input-pop.component.html',
  styleUrls: ['./qiezzi-input-pop.component.scss']
})
export class QiezziInputPopComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate  {
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};
  formName: string;


// 从父窗口接收的数据
  @Input()
  data: InputPopData ;

  isProcessing = false;

  constructor( private formService: CustomizeFormValidateService) {
    super();
  }

  ngOnInit() {
    this.formName = this.data.formName;
    this.formModel = this.data.formModel || new InputForm();
    this.formService.buildForm(this, this.data.serverFormName || this.data.formName);
    this.data.closeHandler = (flag: boolean) => {
      if (flag) {
        super.close();
      }
      this.isProcessing = false;
    };
  }

  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

  /**
   * 确定
   * @param e
   */
  ok(evt) {
    this.isProcessing=true;
    this.data.okHandler(this.formModel);
  }

  /**
   * 取消
   * @param e
   */
  cancel(evt) {
    super.close();
  }
}
/**
 * 传入参数类型
 */
export class InputPopData {
  /**
   * 关闭时的回调,不用填写
   */
  closeHandler:(flag:boolean)=>void;
  /**
   * 输入框的名称
   */
  inputName: string;
  /**
   * 表单名称
   */
  formName: string;
  /**
   * 是否必填
   */
  required: boolean;
  /**
   * 点击ok的回调
   */
  okHandler: (formModel: InputForm) => void;

  /**
   * 带进来的formModel
   */
  formModel: InputForm;
  /**
   * 是否多行输入
   * @type {boolean}
   */
  isTextarea = false;

  /**
   *如果指定表单验证名称，则不用设置此值,此值会覆盖服务端的值
   */
  placeHolder:string;

  /**
   * 是否展示输入框名称
   * @type {boolean}
   */
  isShowInputName:boolean=true;
  /**
   * 服务端自定义表单的名称
   * @type {boolean}
   */
  serverFormName:string;
}
