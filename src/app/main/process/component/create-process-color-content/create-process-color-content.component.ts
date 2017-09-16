import {Component, Input, OnInit} from "@angular/core";
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {ProcessService} from "../../../../core/service/process.service";
import {ProcessColorContentForm} from "../../../../core/forms/process/process-color-form";
import {
  OutsideProcessEditColorNumberRequest,
  OutsideProcessEditProcessContentRequest
} from "../../../../core/messages/process-request-response";
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {ApplicationService} from "../../../../core/service/application.service";
@Component({
  selector: 'create-process-content',
  templateUrl: 'create-process-color-content.component.html',
  styleUrls: ['create-process-color-content.component.scss']
})
export class CreateProcessColorContentComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  @Input()
  data: any;

  index: number;

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  // 是否正在处理中
  isProcessing = false;

  constructor(private processService: ProcessService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService) {
    super();
  }

  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

  ngOnInit() {
    this.index = this.data.index;
    this.formName = this.index === 1 ? 'ProcessContent' : 'ProcessColor';
    this.formModel = new ProcessColorContentForm();
    this.form.buildForm(this);

    if (this.data.DictDetailCode) {
      this.formModel.DictDetailCode = this.data.DictDetailCode;
    }
    if (this.data.DictDetailName) {
      this.formModel.DictDetailName = this.data.DictDetailName;
    }
  }

  ok() {
    let request;
    this.isProcessing=true;
    if (this.index == 0) {
      request = new OutsideProcessEditProcessContentRequest();
      request.DictDetailCode = this.formModel.DictDetailCode;
      request.DictDetailName = this.formModel.DictDetailName;
      this.processService.postOutsideProcessEditProcessContent(request).subscribe((val) => {
        this.application.main.openPromptMessage('新增加工内容成功！');
        this.isProcessing=false;
        this.close({data: 'anything'});
      }, error => {
        this.application.main.openPromptMessage(error.errorMessage);
        this.isProcessing=false;
      });
    } else {
      request = new OutsideProcessEditColorNumberRequest();
      request.DictDetailCode = this.formModel.DictDetailCode;
      request.DictDetailName = this.formModel.DictDetailName;
      this.processService.postOutsideProcessEditColorNumber(request).subscribe((val) => {
        this.application.main.openPromptMessage('新增加工色号成功！');
        this.isProcessing=false;
        this.close({data: 'anything'});
      }, error => {
        this.application.main.openErrorMessage(error.errorMessage);
        this.isProcessing=false;
      });
    }
  }
}
