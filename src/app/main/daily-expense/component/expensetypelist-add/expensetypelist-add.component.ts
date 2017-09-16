import {AfterViewInit, Component, ElementRef, OnInit, Input} from '@angular/core';
import {
  EditTypeRequest
} from '../../../../core/messages/income-and-expenses-request-response';
import {FormGroup} from '@angular/forms';
import {DailyExpenseService} from '../../../../core/service/daily-expense.service';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {CustomizeFormValidateService} from '../../../../core/service/customize-form.service';

@Component({
  selector: 'expensetypelist-add',
  styleUrls: ['./expensetypelist-add.scss'],
  templateUrl: './expensetypelist-add.component.html'
})
export class ExpenseTypeListAddComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {
  /*
   * form验证
   * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  requestData: EditTypeRequest;
  IsCtrl: boolean; // 控制图标弹框显示隐藏
  controlList = []; // 图标列表
  selectedColorIndex: number; // 选中图标index
  constructor(private el: ElementRef,
              private dailyExpenseService: DailyExpenseService,
              private form: CustomizeFormValidateService, ) {
    super();
  }
  ngOnInit() {
    this.formName = 'ExpenseType';
    this.form.buildForm(this);
    this.formModel = new EditTypeRequest();
    // 获取传参  type和id 有id，则赋值给requestData
    this.iconListExpenseType();
    this.addExpenseTypeList();
  }

  ngAfterViewInit(): void {
  }
  onInputElementBlur(name) { // 表单验证设置
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  /*
  * TODO 获取收支图标列表
  * */
  iconListExpenseType() {
    this.dailyExpenseService.iconListExpenseType({ type: 0}).subscribe(val => {
      console.log(val);
      if (val && val.length > 0) {
        this.controlList = val;
      }
    });
  }
  /**
   * TODO 新增收支类别
   */
  addExpenseTypeList() {
    this.dailyExpenseService.editExpenseType({Type: 0, TypeName: '测试用3', IconUrl: 'http://img5.qiezzi.com/clinic-shouru_chanpin.png'}).subscribe(val => {
      console.log(val);
    });
  }
/*
* TODO 控制icon弹框显示隐藏
* */
  showIconList() {
    this.IsCtrl = ! this.IsCtrl;
  }
  /*
  * TODO 选择图标
  * */
  moreItemClick(evt, index) {

  }
}
