import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ApplicationService} from '../../../../core/service/application.service';
import {AccountService} from '../../../../core/service/account.service';
import {TransferRequest} from '../../../../core/messages/account-change-record-request-response';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {FormGroup} from '@angular/forms';
import {HospitalService} from '../../../../core/service/hospital.service';
import {
  GetHospitalAccountTypeListResponse,
  HospitalAccountFull
} from '../../../../core/messages/hospital-account-request-response';
import {CapitalFlowTransferForm} from '../../../../core/forms/capital-flow/capital-flow-transfer-form';
@Component({
  selector: 'app-capital-flow-transfer',
  templateUrl: './capital-flow-transfer.component.html',
  styleUrls: ['./capital-flow-transfer.component.scss'],
  viewProviders : [ AccountService ]
})
export class CapitalFlowTransferComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, ICustomizeFormValidate  {
  /*
   * TODO 设置表单验证参数
   * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};
  /*
  * 设置参数
  * */
  requestData: TransferRequest = new TransferRequest(); // 转账请求数据类型
  Date= new Date();
  hospitalAccountFull: Array<HospitalAccountFull>;
  typeList = []; // 类型下拉框
  isProcessing = false;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};
  constructor(private application: ApplicationService,
              private hospitalService: HospitalService,
              private form: CustomizeFormValidateService,
              private accountService: AccountService) {super(); }
  ngOnInit() {
    this.getHospitalAccountTypeList();
    /*
    * 初始化请求验证规则
    * */
    this.formName = 'Transfer';
    this.formModel = new CapitalFlowTransferForm();
    this.form.buildForm(this);
  }
  ngAfterViewInit(): void {
  }
  /*
  * 鼠标移出触发验证
  * */
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  /*
  * TODO 转账
  * */
  accountTransfer() {
    this.isProcessing = true;
    this.requestData.Money = this.formModel.Money;
    this.requestData.AccountFrom = this.formModel.AccountFrom;
    this.requestData.AccountTo = this.formModel.AccountTo;
    this.accountService.transfer(this.requestData).subscribe(val => {
      this.isProcessing = false;
      this.application.main.openPromptMessage('转账成功！', 3000);
      this.close(val);
    }, error => {
      this.isProcessing = false;
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*
  * TODO 加载账户列表
  * */
  getHospitalAccountTypeList() {
    this.typeList = [];
    this.hospitalService.getHospitalAccountList({IncludeAdvanceAccount: true}).subscribe(val => {
      console.log(val);
      if (val && val.length > 0) {
        this.hospitalAccountFull = val;
        this.hospitalAccountFull.forEach(item => {
          this.typeList.push( {value: item.ID, label: item.AccountName} );
        });
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  /*取消*/
  cancel() {
    this.close();
  }
  /*accountTransfer() {
    // this.close({msg: 'succ', title: '消息', index: 1000001});
}*/
}
