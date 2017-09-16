import {AfterViewInit, Component, ElementRef, Input, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {FormGroup} from '@angular/forms';
import {ProcessService} from '../../../../core/service/process.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {OutsideProcessEditColorNumberRequest} from '../../../../core/messages/process-request-response';
import {ActivatedRoute, Router} from '@angular/router';
import {EditShiftTypeRequest} from '../../../../core/messages/sort-class-request-response';
import {SortClassService} from "../../../../core/service/sort-class.service";


@Component({
  selector: 'app-create-edit-class',
  templateUrl: './create-edit-class.component.html',
  styleUrls: ['./create-edit-class.component.scss']
})
export class  CreateEditClassComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, ICustomizeFormValidate {
  /*
  * form验证
  * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };
/*
* 设置参数
* */
  shiftTypeId: string;
  StartTimeList = [];
  StopTimeList = [];
  @Input()
  data: any;

  index: number;
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};
  IsCtrl = false;
  controlList= [ '#E6E7F3', '#DBDBDB', '#ACA6FF', '#7BCA9E', '#FE4E74', '#7A80FA', '#FFB18C' ];
  selectedColorIndex: number;
  constructor(
              private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private SortClassService: SortClassService) {
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
    this.formName = 'SortClass';
    this.formModel = new EditShiftTypeRequest();
    this.form.buildForm(this);
    this.route.params.subscribe(t => { // 获取ID
      console.log(t);
      this.shiftTypeId = t['id'];
    });
    for (let i = 0; i < 24; i++) { // 添加时间下拉框
      let hour = i + ':' + '00';
      let half = i + ':' + '30';
      this.StartTimeList.push( {value: hour, label: hour} );
      this.StartTimeList.push( {value: half, label: half} );
      this.StopTimeList.push( {value: hour, label: hour} );
      this.StopTimeList.push( {value: half, label: half} );
    }}

  ngAfterViewInit(): void {

  }
  ok() {
    console.log('1')
    this.SortClassService.editShiftType(this.formModel).subscribe(val => {
      console.log(val);
      this.application.main.openPromptMessage('新建成功！', 3000); // 提示删除成功
      this.close({msg: 'succ'}); // 删除成功后，访问刷新
    });
  }
  onStartChange(evt) {
    console.log(evt);
  }
  onStopChange(evt) {
    console.log(evt);
  }
  /*
  * 控制颜色选择框
  * */
  showColorList() {
    this.IsCtrl = ! this.IsCtrl;
  }
  moreItemClick(evt, i) {
    this.selectedColorIndex = i;
    this.formModel.Color = this.controlList[this.selectedColorIndex];
  }
}
