import {Component, Input, OnInit} from "@angular/core";
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {ProcessService} from "../../../../core/service/process.service";
import {ChangeStateReceivedRequest} from "../../../../core/messages/process-request-response";
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {ApplicationService} from "../../../../core/service/application.service";
import {ChangeStateReceiveForm} from "../../../../core/forms/process/chnage-state-receive-form";
/**
 * 登记回件
 */
@Component({
  selector: 'process-received',
  templateUrl: './process-received.component.html'
})
export class ProcessReceivedComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  @Input()
  data: string;

  //是否正在处理中
  isProcessing=false;

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
    this.formName = 'ProcessReceived';
    this.formModel = new ChangeStateReceiveForm();
    this.form.buildForm(this);

    this.formModel.ID = this.data;
  }

  ok() {
    this.isProcessing=true;
    let request=new ChangeStateReceivedRequest();
    request.ID=this.formModel.ID;
    request.CommonTime=this.formModel.CommonTime;
    this.processService.postOutsideProcessChangeStateReceived(this.formModel).subscribe(val => {
      this.application.main.openPromptMessage('登记回件成功！');
      this.isProcessing=false;
      this.close(val);
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
      this.isProcessing=false;
    });
  }

}
