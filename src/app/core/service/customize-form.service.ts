/**
 * Created by KingKong on 2017/6/29.
 */
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {AbstractControl, AsyncValidatorFn, FormBuilder, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {FormKeyDictionaryService} from "./form-key-dictionary.service";
import * as config from '../../../web-config';
import {HttpService} from "./http.service";
import {ApiMethod} from "../api-method";
import * as moment from "moment";

@Injectable()
export class CustomizeFormValidateService {
  constructor(private httpService: HttpService, private http: Http, private form: FormKeyDictionaryService) {
  }

  /**
   * 构建表单验证
   * @param component
   * @param serverFormName 不填默认serverFormName和formName一致
   */
  buildForm(component: any, serverFormName = null): void {
    if (!component.formName) {
      throw new Error('未指定表单名');
    }

    if (!component.formModel) {
      throw new Error('表单实体类未实例化');
    }

    let keyLink = this.form.getFormKeys(component.formName);
    if (!keyLink) {
      throw new Error('表单配置项列表不存在');
    }

    const formControlList: string[] = Object.keys(keyLink);

    const fb = new FormBuilder(), config = {};
    component.formErrors = {};
    component.formPlaceholder = {};
    component.validationMessages = {};

    formControlList.forEach(item => {
      if (!component.formModel[item]) {
        component.formModel[item] = null;
      }
      component.formErrors[item] = '';
      component.formPlaceholder[item] = '';
      component.validationMessages[item] = {};
      config[item] = [component.formModel[item], null];
    });

    component.formGroup = fb.group(config);

    this.httpService.get(ApiMethod.SysConfig_GetFormValidateList, {formCode: serverFormName || component.formName}).subscribe((ret: any) => {
      this.generateFormConfig(ret, component, keyLink);
    });
  }

  generateFormConfig(formConfig: FormValidatorVO[], component: any, keyLink) {
    if (!keyLink) {
      return;
    }
    formConfig.forEach((validateItem) => {
      const item: FormValidatorVO = <FormValidatorVO>validateItem;

      let controlName: string;
      for (let prop in keyLink) {
        if (keyLink[prop] == item.FieldCode) {
          controlName = prop;
          break;
        }
      }
      if (!controlName) {
        return;
      }
      // 添加placeholder
      if (item.PlaceHolder !== null) {
        component.formPlaceholder[controlName] = stringFormat(item.PlaceHolder, item.FieldName);
      }

      // 添加所有可能出现错误提示信息
      if (item.hasOwnProperty('RequiredMessage') && item.RequiredMessage !== null && item.RequiredMessage !== '') {
        component.validationMessages[controlName]['Required'] = stringFormat(item.RequiredMessage, item.FieldName);
      }
      if (item.hasOwnProperty('RegexMessage') && item.RegexMessage !== null && item.RegexMessage !== '') {
        component.validationMessages[controlName]['Regex'] = stringFormat(item.RegexMessage, item.FieldName);
      }
      if (item.hasOwnProperty('MaxMessage') && item.MaxMessage !== null && item.MaxMessage !== '') {
        let maxArr;
        if (item.MaxMessage.indexOf('|') > -1) {
          maxArr = item.MaxMessage.split('|');
        } else {
          maxArr = [item.MaxMessage];
        }

        for (let i = 0; i < maxArr.length; i++) {
          component.validationMessages[controlName]['Max' + i] = stringFormat(maxArr[i], item.FieldName, item.Max + '');
        }
      }
      if (item.hasOwnProperty('MinMessage') && item.MinMessage !== null && item.MinMessage !== '') {
        let minArr;
        if (item.MinMessage.indexOf('|') > -1) {
          minArr = item.MinMessage.split('|');
        } else {
          minArr = [item.MinMessage];
        }

        for (let i = 0; i < minArr.length; i++) {
          component.validationMessages[controlName]['Min' + i] = stringFormat(minArr[i], item.FieldName, item.Min + '');
        }
      }
      if (item.hasOwnProperty('MaxLengthMessage') && item.MaxLengthMessage !== null && item.MaxLengthMessage !== '') {
        component.validationMessages[controlName]['MaxLength'] = stringFormat(item.MaxLengthMessage, item.FieldName, item.MaxLength + '');
      }
      if (item.hasOwnProperty('MinLengthMessage') && item.MinLengthMessage !== null && item.MinLengthMessage !== '') {
        component.validationMessages[controlName]['MinLength'] = stringFormat(item.MinLengthMessage, item.FieldName, item.MinLength + '');
      }
      if (item.hasOwnProperty('EqualToMessage') && item.EqualToMessage !== null && item.EqualToMessage !== '') {
        component.validationMessages[controlName]['EqualTo'] = stringFormat(item.EqualToMessage, item.FieldName);
      }
      if (item.hasOwnProperty('RemoteMessage') && item.RemoteMessage !== null && item.RemoteMessage !== '') {
        component.validationMessages[controlName]['Remote'] = stringFormat(item.RemoteMessage, item.FieldName);
      }

      let validatorTypeList: { [key: string]: string } = {};

      if (item.hasOwnProperty('Required') && item.Required !== null && item.Required !== false) {
        validatorTypeList['Required'] = '';
      }
      if (item.hasOwnProperty('Regex') && item.Regex !== null) {
        validatorTypeList['Regex'] = '';
      }
      if (item.hasOwnProperty('MaxLength') && item.MaxLength !== null) {
        validatorTypeList['MaxLength'] = '';
      }
      if (item.hasOwnProperty('MinLength') && item.MinLength !== null) {
        validatorTypeList['MinLength'] = '';
      }
      if (item.hasOwnProperty('Max') && item.Max !== null) {
        validatorTypeList['Max'] = '';
      }
      if (item.hasOwnProperty('Min') && item.Min !== null) {
        validatorTypeList['Min'] = '';
      }
      if (item.hasOwnProperty('EqualTo') && item.EqualTo !== null) {
        validatorTypeList['EqualTo'] = '';
      }
      if (item.hasOwnProperty('Remote') && item.Remote !== null) {
        validatorTypeList['Remote'] = '';
      }
      // 声明验证规则列表
      const validatorList: ValidatorFn[] = [];
      const asyncValidatorList: AsyncValidatorFn[] = [];
      // 添加验证规则
      if (item.hasOwnProperty('Required') && item.Required !== null && item.Required !== false) {
        validatorList.push(customizeRequiredValidator(controlName, validatorTypeList, 'Required'));
      }
      if (item.hasOwnProperty('Regex') && item.Regex !== null) {
        validatorList.push(customizeRegexValidator(new RegExp(item.Regex), controlName, validatorTypeList, 'Regex'));
      }
      if (item.hasOwnProperty('MaxLength') && item.MaxLength !== null) {
        validatorList.push(customizeMaxLengthValidator(item.MaxLength, controlName, validatorTypeList, 'MaxLength'));
      }
      if (item.hasOwnProperty('MinLength') && item.MinLength !== null) {
        validatorList.push(customizeMinLengthValidator(item.MinLength, controlName, validatorTypeList, 'MinLength'));
      }
      if (item.hasOwnProperty('Max') && item.Max !== null) {
        let maxArr;
        if (item.Max.indexOf('|') > -1) {
          maxArr = item.Max.split('|');
        } else {
          maxArr = [item.Max];
        }

        for (let i = 0; i < maxArr.length; i++) {
          validatorList.push(customizeMaxValidator(maxArr[i], item.RangeType, controlName, component.formGroup, validatorTypeList, 'Max' + i));
        }
      }
      if (item.hasOwnProperty('Min') && item.Min !== null) {
        let minArr;
        if (item.Min.indexOf('|') > -1) {
          minArr = item.Min.split('|');
        } else {
          minArr = [item.Min];
        }

        for (let i = 0; i < minArr.length; i++) {
          validatorList.push(customizeMinValidator(minArr[i], item.RangeType, controlName, component.formGroup, validatorTypeList, 'Min' + i));
        }
      }
      if (item.hasOwnProperty('EqualTo') && item.EqualTo !== null) {
        validatorList.push(customizeEqualToValidator(item.EqualTo, controlName, validatorTypeList, 'EqualTo'));
      }
      if (item.hasOwnProperty('Remote') && item.Remote !== null) {
        asyncValidatorList.push(customizeRemoteValidator(item.Remote, this.http, component.formErrors, component.validationMessages, controlName, validatorTypeList, 'Remote'));
      }

      component.formGroup.get(controlName).setValidators(validatorList);
      component.formGroup.get(controlName).setAsyncValidators(asyncValidatorList);
    });

    const arr: string[] = Object.keys(component.formGroup.controls);
    for (const key of arr) {
      component.formGroup.get(key).valueChanges.subscribe(data => {
        component.formModel[key] = data;
        validatorMessageFn(component.formGroup, component.formErrors, component.validationMessages, key, data);
      });
    }

    component.formGroup.patchValue(component.formModel);
  }
}

export declare interface ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;

  formModel: any;
  formErrors: { [key: string]: string };
  formPlaceholder: { [key: string]: string };
  validationMessages: { [key: string]: { [key: string]: string } };

  onInputElementBlur(name);
}

export class FormValidatorVO {
  ID: number;
  FormCode: string;
  FieldCode: string;
  FieldName: string;
  Required: boolean;
  RequiredMessage: string;
  MaxLength: number;
  MaxLengthMessage: string;
  MinLength: number;
  MinLengthMessage: string;
  Max: string;
  MaxMessage: string;
  Min: string;
  MinMessage: string;
  EqualTo: string;
  EqualToMessage: string;
  Regex: string;
  RegexMessage: string;
  Remote: string;
  RemoteMessage: string;
  Inherit: boolean;
  RangeType: number;
  PlaceHolder: string;
}

function stringFormat(template: string, ...args: string[]): string {
  if (template == null || typeof template === 'undefined') {
    return '';
  }
  let ret = template;
  for (let i = 0; i < args.length; i++) {
    ret = ret.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i + 1]);
  }
  return ret;
}


// 自定义验证规则：最大长度
function customizeMaxLengthValidator(length: number, field: any, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let len = 0;
    if (control.value !== null) {
      len = control.value.length;
    }
    return len <= length ? null : {[key]: true};
  };
}

// 自定义验证规则：最小长度
function customizeMinLengthValidator(length: number, field: any, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    let len = 0;
    if (control.value !== null) {
      len = control.value.length;
    }
    return len >= length ? null : (!validators.hasOwnProperty('Required') && len === 0 ? null : {[key]: true});
  };
}

// 自定义验证规则：必填项
function customizeRequiredValidator(field: any, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    return (control.value === null
      || typeof control.value === 'undefined'
      || (Array.isArray(control.value) && control.value.length === 0)
      || (typeof control.value === 'object' && Object.keys(control.value).length === 0)
      || (typeof control.value === 'string' && control.value === '')
    )
      ? {[key]: true} : null;
  };
}

// 自定义验证规则：最大值
function customizeMaxValidator(max: string, rangeType: number, field: any, form: FormGroup, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    switch (rangeType) {
      case 0: {
        const reg: RegExp = /^[0-9]*$/;
        let ret, maxValue;
        if (max.indexOf('ValueOf:') > -1) {// 不能大于表单中另一项的值，ValueOf开头标识与另一属性比较
          maxValue = parseInt(form.get(max.replace('ValueOf:', '')).value, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            return ret <= maxValue ? null : {[key]: true};
          }
        } else {// 不能大于具体数值
          maxValue = parseInt(max, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            ret = isNaN(ret) ? 0 : ret;
            return ret <= maxValue ? null : {[key]: true};
          } else {
            return null;
          }
        }
      }
        break;
      case 1: {
        if (!validators.hasOwnProperty('Required') && (control.value === null || control.value === ''))
          return null;
        let ret, maxValue;

        if (max.indexOf('Now:') > -1) {
          let tmp = max.replace('Now:', '');
          if (tmp === 'yyyy-MM-dd') {
            maxValue = moment(moment(new Date()).format('YYYY-MM-DD')).toDate();
            ret = moment(control.value);
            ret = ret.toDate();
            return ret < maxValue ? null : {[key]: true};
          } else if (tmp === 'yyyy-MM-dd HH:mm') {
            maxValue = moment(moment(new Date()).format('YYYY-MM-DD HH:mm')).toDate();
            ret = moment(control.value);
            ret = ret.toDate();
            return ret < maxValue ? null : {[key]: true};
          } else
            return null;
        } else if (max.indexOf('ValueOf:') > -1) {
          maxValue = form.get(max.replace('ValueOf:', '')).value;

          ret = parseInt(control.value, 10);
          return ret <= maxValue ? null : {[key]: true};

        } else {
          return null;
        }

      }
    }
  };
}

// 自定义验证规则：最小值
function customizeMinValidator(min: string, rangeType: number, field: any, form: FormGroup, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (rangeType === 0) {
      const ls = min.split('|'), len = ls.length, reg: RegExp = /^[0-9]*$/;
      let i = 0, ret, minValue;
      for (; i < len; i++) {
        if (ls[i].indexOf('ValueOf:') > -1) {
          minValue = parseInt(form.get(ls[i].replace('ValueOf:', '')).value, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            return ret <= minValue ? null : {[key]: true};
          }
        } else {
          minValue = parseInt(min, 10);
          if (reg.test(control.value)) {
            ret = parseInt(control.value, 10);
            ret = isNaN(ret) ? 0 : ret;
            return ret >= minValue ? null : {[key]: true};
          } else {
            return {Regex: true};
          }
        }
      }
    } else if (rangeType === 1) {
      const ls = min.split('|'), len = ls.length;
      let i = 0, ret, minValue;
      for (; i < len; i++) {
        if (ls[i].indexOf('ValueOf:') > -1) {
          minValue = parseInt(min, 10);
          ret = parseInt(control.value, 10);
          return ret <= minValue ? null : {[key]: true};
        } else if (ls[i].indexOf('Now:') > -1) {
          let tmp = ls[i].replace('Now:', '');
          if (tmp === 'yyyy-MM-dd') {
            minValue = moment(moment(new Date()).format('YYYY-MM-DD')).toDate();
            ret = moment(control.value).toDate();
            return ret >= minValue ? null : {[key]: true};
          }
          else
            return null;
        } else {
          return {Regex: true};
        }
      }
    }
  };
}

// 自定义验证规则：与同一表单其他项比较
function customizeEqualToValidator(equalToField: string, field: any, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    const equalField = control.parent.get(equalToField);
    return control.value === equalField.value ? null : {[key]: true};
  };
}

// 自定义验证规则：正则匹配
function customizeRegexValidator(reg: RegExp, field: any, validators: { [key: string]: string }, key: string): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } => {
    if (!validators.hasOwnProperty('Required') && control.value === null || typeof control.value === 'undefined' || control.value === '')
      return null;
    else {
      const ret = reg.test(control.value);
      return ret ? null : {[key]: true};
    }
  };
}

// 自定义验证规则：远程匹配
function customizeRemoteValidator(url: string, http: Http, formErrors: any, validationMessages: any, field: any, validators: { [key: string]: string }, key: string): AsyncValidatorFn {
  return (control: AbstractControl): Promise<{ [key: string]: any } | null> => {
    return new Promise((resolve, reject) => {
      http.post(url, {value: control.value}).subscribe(t => {
        const ret = t.json();
        if (ret.result === true) {
          resolve(null);
        } else {
          formErrors[field] = validationMessages[field][key];
          resolve({[key]: true});
        }
      });
    });
  };
}

const validationOrder: string[] = ['Required', 'Regex', 'MaxLength', 'MinLength', 'Max', 'Min', 'EqualTo', 'Remote'];

function validatorMessageFn(form: any, formErrors: any, validationMessages, field: string, data?: any) {
  if (!form) {
    return;
  }
  if (formErrors && formErrors.hasOwnProperty(field)) {
    formErrors[field] = '';
    const control = form.get(field);

    if (control && control.dirty && !control.valid) {
      const messages = validationMessages[field];
      for (const obj of validationOrder) {
        if (control.errors && control.errors.hasOwnProperty(obj)) {
          (formErrors[field] = messages[obj] + '');
          break;
        }
      }
    }
  }
}
