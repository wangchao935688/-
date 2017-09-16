import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";
import {Component, ElementRef, Input, OnInit} from "@angular/core";
import {ProcessService} from "../../../../core/service/process.service";
import {ChangeStateSentRequest} from "../../../../core/messages/process-request-response";
import {ApplicationService} from "../../../../core/service/application.service";
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {ProcessSentForm} from '../../../../core/forms/process/process-send-form';

/**
 * 外加工登记取件
 */
@Component({
  selector: 'process-sent',
  templateUrl: './process-sent.html'
})
export class ProcessSentComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  @Input()
  data: any;

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
    this.formName = 'ProcessSent';
    this.formModel = new ProcessSentForm();
    this.formModel.ID = this.data;
    this.form.buildForm(this);
  }

  ok() {
    let request=new ChangeStateSentRequest();
    this.isProcessing=true;
    request.ID=this.formModel.ID;
    request.CommonTime=this.formModel.CommonTime;
    request.ContactID=this.formModel.ContactID;
    request.DayNum=this.formModel.DayNum;
    request.ExpressCode=this.formModel.ExpressCode;

    this.processService.postOutsideProcessChangeStateSent(request).subscribe(val => {
      this.application.main.openPromptMessage('登记取件成功！');
      this.isProcessing=false;
      this.close(val);
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
      this.isProcessing=false;
    });
  }
}
