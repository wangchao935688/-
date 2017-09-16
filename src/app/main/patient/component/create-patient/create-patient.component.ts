import {AfterViewInit, Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {PatientService} from '../../../../core/service/patient.service';
import {SavePatientRequest} from '../../../../core/messages/patient-request-response';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {FormGroup} from '@angular/forms';
import {ApplicationService} from '../../../../core/service/application.service';
import {PatientRelationTypeComponent} from 'app/main/patient/component/patient-relation-type/patient-relation-type.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {WorkerService} from '../../../../core/service/worker.service';
import {WorkerListRequest, WorkerListResponse} from '../../../../core/messages/worker-request-response';
import {DictDetailListRequest, DictDetailListResponse} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {SystemService} from '../../../../core/service/system.service';
import {ProvinceCityAreaForm} from '../../../../core/forms/system/province-city-area-form';
@Component({
  selector: 'app-create-patient',
  templateUrl: './create-patient.component.html',
  styleUrls: ['./create-patient.component.scss']
})
export class CreatePatientComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, ICustomizeFormValidate {

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
   * 设置请求参数
   * */
  selectAddress: ProvinceCityAreaForm = new ProvinceCityAreaForm();
  savePatientRequest: SavePatientRequest;
  workerListRequest: WorkerListRequest; // 医生列表请求
  workerListResponse: WorkerListResponse; // 医生列表
  doctorFirstList = []; // 医生下拉列表
  patientsWithListRequest: DictDetailListRequest; // 患者来源请求
  patientsWithList = []; // 患者来源下拉列表
  provList = [];
  cityList = [];
  countryList = [];
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  isDisplay = true;
  popupLoading = 'hide';
  tagList = []; // 设置空标签
  inputIconList = [{icon: 'important', color: '#ddd'}];
  constructor(private PatientService: PatientService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private workerService: WorkerService,
              private HospitalService: HospitalService,
              private SystemService: SystemService) {
    super();
  }

  ngOnInit() {
    // 表单验证相关
    this.formName = 'Patient';
    this.formModel = new SavePatientRequest();
    this.form.buildForm(this);

    this.getWorkerList(); // 加载医生列表
    this.getPatientsWith(); // 加载患者来源
  }

  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

  ngAfterViewInit(): void {
    // 初始化SavePatientRequest
    this.formModel['PatientName'] = '李景磊';
  }

  /*
   * TODO 提交患者信息
   * */
  save() {
    console.log(this.formModel);
    this.PatientService.createPatient(this.formModel).subscribe(val => {
      /*
       * TODO 关闭页面
       * TODO 提示成功或失败
       * TODO 关闭弹框，并发送消息
       * */
      console.log(val['PatientID']);
      this.close(val['PatientID']);
    });
  }

  /*
   * TODO 取消患者
   * */
  cancel() {
    this.close(null);
  }
  /*
  * TODO 标记患者重要
  * */
  onInputIconClick(index) {
    console.log(index);
    this.inputIconList[index].color = this.inputIconList[index].color === '#ddd' ? '#FEA356' : '#ddd';
  }
  /*
  * TODO 选择患者
  * */
  choosePatient(info) {
    this.PatientService.getPatient({ Id: info.Id}).subscribe(val => {
      console.log(val);
      if (val) {
        this.formModel = val;
      }
    });
  }
  /*
   *  TODO 标签列表
   * */
  showRelationName() {
    this.application.frontLayer.openPopupWindow(PatientRelationTypeComponent, '患者标签', PopupWindowSize.SMALL, 'auto', false).subscribe(t => {
      console.log(t);
      if (t && t.data != null) {
        /*
         * TODO 添加到标签组
         * */
      }
    });
  }

  /*
   * TODO 加载医生列表
   * */
  getWorkerList() {
    this.doctorFirstList = [];
    this.workerListRequest = {WorkerType: 0, IsPermission: true};
    this.workerService.getWorkerList(this.workerListRequest).subscribe(val => {
      console.log(val);
      if (val) {
        this.workerListResponse = val;
        this.workerListResponse.Items.forEach((value) => {
          this.doctorFirstList.push({label: value.WorkerName, value: value.WorkerId});
        });
      }
    });
  }

  /*
   * TODO 请求患者来源
   * */
  getPatientsWith() {
    this.patientsWithList = [];
    this.patientsWithListRequest = {SheetCode: 'PatientsWith'}; // 请求患者来源
    this.HospitalService.getDictDetailList(this.patientsWithListRequest).subscribe(val => {
      if (val.Items && val.Items.length > 0) {
        val.Items.forEach((value) => {
          this.patientsWithList.push({label: value.Name, value: value.Code});
        });
      }
    });
  }

  /*
   * TODO 获取省市区三级联动
   * */
  onChangeAddress(addr) {
    console.log(addr);
  }

}
