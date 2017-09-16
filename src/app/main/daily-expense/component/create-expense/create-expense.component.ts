import {AfterViewInit, Component, ElementRef, OnInit, Input} from '@angular/core';
import {
  AddRequest,
} from '../../../../core/messages/income-and-expenses-request-response';
import * as Worker from '../../../../core/messages/worker-request-response';
import {WorkerService} from '../../../../core/service/worker.service';
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {HospitalService} from '../../../../core/service/hospital.service';
import * as HospitalAccount from '../../../../core/messages/hospital-account-request-response';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'create-expense',
  styleUrls: ['./create-expense.scss'],
  templateUrl: './create-expense.component.html'
})
export class CreateExpenseComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, ICustomizeFormValidate {
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  /*
  * 参数设置
  * */
  TypeList = []; // 收支类别
  AccountList = []; // 账户列表
  HandlerList = []; // 经手人列表
  @Input()
  time: string;
  @Input()
  referee: Worker.WorkerListResponse;
  accountList: HospitalAccount.GetHospitalAccountTypeListResponse[];
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  constructor(private el: ElementRef,
              private hospitalService: HospitalService,
              private workerService: WorkerService,
              private dailyExpenseService: DailyExpenseService,
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
    this.getHospitalAccountTypeList();
    this.getWorkerList();
    this.getTypeList(0);

    this.formName = 'DailyExpenseAdd';
    this.form.buildForm(this);
    this.formModel = new AddRequest();
    this.time = new Date().getFullYear() + '-' + (new Date().getMonth() + 1) + '-' + new Date().getDate();
  }

  ngAfterViewInit(): void {
    this.ready();
  }
/*
* TODO 加载经手人
* */
  getWorkerList() {
    this.workerService.getWorkerList({WorkerType: null, IsPermission: false, KeyWords: ''}).subscribe(val => {
      if (val) {
        val.Items.forEach( value => {
          this.HandlerList.push( {value: value.WorkerId, label: value.WorkerName} );
        } );
      }
    });
  }
/*
* TODO 加载账户列表
* */
  getHospitalAccountTypeList() {
    this.hospitalService.getHospitalAccountTypeList().subscribe(val => {
      if (val) {
        val.forEach( value => {
          this.AccountList.push( {value: value.TypeCode, label: value.TypeName} );
        } );
      }
    });
}
/*
* TODO 加载收支类型
* */
  getTypeList(index) {
    this.dailyExpenseService.getExpenseTypeList({type: index}).subscribe(val => {
      if (val) {
        // this.templateList = val;
        val.forEach( value => {
          this.TypeList.push( {value: value.TypeName, label: value.ID} );
        } );
      }
    });
  }
  /**
   * TODO 保存新增数据
   */
  saveExpenseList() {
    this.dailyExpenseService.saveDailyExpenseAdd(this.formModel).subscribe(val => {
      console.log(val);
      if (val) {

      }
    });
  }
/*
* TODO 选择经手人
* */
  onHandlerChange(evt ) {
    console.log(evt);
  }
/*
* TODO 选择账号
* */
  onAccountChange(evt) {
    console.log(evt);
  }
  /*
  * TODO 选择收支类别
  * */
  onTypeChange(evt) {
    console.log(evt);
  }
  /*
  * TODO 取消新建
  * */
  cancel() {
    this.close();
  }
}
