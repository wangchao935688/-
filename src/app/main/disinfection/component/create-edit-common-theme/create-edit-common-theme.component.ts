import { Component, OnInit } from '@angular/core';
import {FormGroup} from '@angular/forms';
import {CreateDemoForm} from '../../../../core/forms/demo/create-demo-form';
import {ApplicationService} from '../../../../core/service/application.service';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
@Component({
  selector: 'create-edit-common-theme',
  templateUrl: './create-edit-common-theme.component.html',
  styleUrls: ['./create-edit-common-theme.component.scss']
})
export class CreateEditCommonThemeComponent extends PopupWindowBaseComponent implements OnInit {
  formName: string;
  formGroup: FormGroup;
  formModel: CreateDemoForm;
  constructor(
    private application: ApplicationService,
  ) {
    super();
  }

  ngOnInit() {
    this.formModel = new CreateDemoForm();
  }
  /*取消*/
  cancel() {
    this.close();
  }
  /*保存*/
  accountTransfer() {
    this.close();
  }
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

}
