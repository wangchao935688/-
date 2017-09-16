import { Component, OnInit } from '@angular/core';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {PopupWindowBaseComponent} from 'app/shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {FormGroup} from '@angular/forms';
import {PatientService} from '../../../../core/service/patient.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {WorkerService} from '../../../../core/service/worker.service';
import {HospitalService} from '../../../../core/service/hospital.service';
import {SystemService} from '../../../../core/service/system.service';
import {WorkerListRequest, WorkerListResponse} from '../../../../core/messages/worker-request-response';
import {DictDetailListRequest} from '../../../../core/messages/dict-request-response';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {PatientRelationTypeComponent} from '../patient-relation-type/patient-relation-type.component';

@Component({
  selector: 'app-edit-patient',
  templateUrl: './edit-patient.component.html',
  styleUrls: ['./edit-patient.component.scss']
})
export class EditPatientComponent extends PopupWindowBaseComponent implements OnInit, ICustomizeFormValidate {
  /*
   * TODO 设置表单验证参数
   * */
  formName: string;
  formGroup: FormGroup;
  formModel= {
    PatientName: '李景磊',
    PatientCode: 'ljl',
    IsImportant: null,
    State: null,
    Sex: null,
    Age: null,
    BirthDate: null,
    Tel: '123',
    AreaCode: '123',
    Phone: '123',
    Province: null,
    City: null,
    Area: null,
    Address: null,
    Image: null,
    IntentionDoctorCode: null,
    IntentionDoctorName: null,
    PatientsWith: null,
    RelationName: null,
    Note: null,
    FirstDate: new Date().toLocaleDateString(),
    FirstDoctor: null
  };
  formErrors: { [p: string]: string };
  formPlaceholder: { [p: string]: string };
  validationMessages: { [p: string]: { [p: string]: string } };

  /*
  * 设置参数
  * */
  workerListRequest: WorkerListRequest; // 医生列表请求
  workerListResponse: WorkerListResponse; // 医生列表
  doctorFirstList= []; // 医生下拉列表
  patientsWithListRequest: DictDetailListRequest; // 患者来源请求
  patientsWithList= []; // 患者来源下拉列表
  provList= [];
  cityList= [];
  countryList= [];
  defaultIndex= 0;
  selectIndex= 0;
  btnList= [{ Code : '5475', Name : 'qqq'}];
  tabData = {
    data: ['基本信息', '体格检查'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index);
      this.selectTabIndex(index.index);
    }
  };
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  constructor(private PatientService: PatientService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private WorkerService: WorkerService,
              private HospitalService: HospitalService) {
    super();
  }

  ngOnInit() {
    // 表单验证相关
    this.formName = 'Patient';
    this.form.buildForm(this);
  }
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }
  /*
  * TAB选项条点击事件
  * */
  selectTabIndex(index: number) {
    console.log(index);
    this.selectIndex = index;
  }
  /*
   * TODO 请求患者来源
   * */
  getPatientsWith() {
    this.patientsWithList = [];
    this.patientsWithListRequest = { SheetCode: 'PatientsWith'}; // 请求患者来源
    this.HospitalService.getDictDetailList(this.patientsWithListRequest).subscribe(val => {
      if (val.Items && val.Items.length > 0) {
        val.Items.forEach((value) => {
          this.patientsWithList.push({ label: value.Name, value: value.Code});
        });
      }
    });
  }
  /*
   * TODO 加载医生列表
   * */
  getWorkerList() {
    this.doctorFirstList = [];
    this.workerListRequest = { WorkerType: 0, IsPermission : true};
    this.WorkerService.getWorkerList(this.workerListRequest).subscribe(val => {
      console.log(val);
      if (val) {
        this.workerListResponse = val;
        this.workerListResponse.Items.forEach((value) => {
          this.doctorFirstList.push({ label: value.WorkerName, value: value.WorkerId });
        });
      }
    });
  }
  /*
   *  TODO 标签列表PatientRelationTypeComponent
   * */
  showRelationName() {
    this.application.frontLayer.openPopupWindow(PatientRelationTypeComponent, '编辑详细信息', PopupWindowSize.SMALL, 'auto',  false).subscribe(t => {
      console.log(t);
      if (t && t.data != null) {
        /*
         * TODO 添加到标签组
         * */

      }
    });
  }
  /*
  * TODO 保存修改信息
  * */
  save() {

  }
  /*
  * TODO 取消
  * */
  cancel() {
    this.close();
  }
}
