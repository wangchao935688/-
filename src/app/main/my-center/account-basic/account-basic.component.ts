import {AfterViewInit, Component, OnInit} from '@angular/core';
import {WorkerService} from '../../../core/service/worker.service';
import {ApplicationService} from '../../../core/service/application.service';
import {QiezziUserHeadComponent} from '../../../shared/component/qiezzi-user-head/qiezzi-user-head.component';
import {PopupWindowSize} from '../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {SelectAddress} from '../../../core/messages/system-request-response';
import {CookieService} from 'ngx-cookie';
import {CustomizeFormValidateService, ICustomizeFormValidate} from "../../../core/service/customize-form.service";
import {FormGroup} from "@angular/forms";
import {SavePatientRequest} from "../../../core/messages/patient-request-response";
import {WorkerDetailForm} from "app/core/forms/worker/worker-detail-form";
import {EditWorkerRequest, GetWorkerDetailResponse} from "../../../core/messages/worker-request-response";

@Component({
  selector: 'app-account-basic',
  templateUrl: './account-basic.component.html',
  styleUrls: ['./account-basic.component.scss']
})
export class AccountBasicComponent implements OnInit, AfterViewInit, ICustomizeFormValidate {
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
  * 参数设置
  * */
  isProcessing= false; // 表单提交是否在进行中
  editWorkerRequest: EditWorkerRequest = new EditWorkerRequest(); // 修改员工信息请求参数
  getWorkerDetailResponse: GetWorkerDetailResponse = new GetWorkerDetailResponse();
  selectAddress: SelectAddress;
  dataLoading = 'hide';
  constructor(private workerService: WorkerService,
              private application: ApplicationService,
              private cookieService: CookieService,
              private form: CustomizeFormValidateService) { }

  ngOnInit() {
    this.formName = 'Worker';
    this.formModel = new WorkerDetailForm();
    this.form.buildForm(this);
    let userInfo = this.cookieService.getObject('currentWorker');
    this.selectAddress = {province: '00101', city: '00101016', area: '0010101602'};
    this.workerService.getWorkerDetail(userInfo['WorkerID']).subscribe(val => {
      console.log(val);
      this.dataLoading = 'hide';
      if (val) {
        this.getWorkerDetailResponse = val;
        this.formModel.WorkerName = this.getWorkerDetailResponse.WorkerName;
        // this.formModel.Sex = this.getWorkerDetailResponse.Sex;
        // this.formModel.BirthDate = this.getWorkerDetailResponse.BirthDate;
        this.formModel.Tel = this.getWorkerDetailResponse.Tel;
        this.formModel.Address = this.getWorkerDetailResponse.Address;
        this.selectAddress.province = this.getWorkerDetailResponse.Province;
        this.selectAddress.city = this.getWorkerDetailResponse.City;
        this.selectAddress.area = this.getWorkerDetailResponse.Area;
        this.editWorkerRequest.Id = this.getWorkerDetailResponse.Id;
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
      console.log(error['errorMessage']);
    });
  }
  ngAfterViewInit() {
    this.dataLoading = 'show';
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
  * TODO 上传头像
  * */
  upLoadImg() {
    this.application.frontLayer.openPopupWindow( QiezziUserHeadComponent, '安全验证', PopupWindowSize.SMALL, 500, null, false).subscribe(t => {
      console.log(t);
      if (t && t.data) {
        console.log(t.data);
      }
    });
  }
/*
* 保存
* */
  ok() {
    // this.editWorkerRequest.Id
    this.isProcessing = true;
    this.workerService.editWorker(this.editWorkerRequest).subscribe(val => {
      this.isProcessing = false;
      this.application.main.openPromptMessage('保存成功！', 3000);
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
      console.log(error['errorMessage']);
    });
  }
  /*
  * TODO 获取地址
  * */
  onChangeAddress(evt) {
    console.log(evt);
    this.editWorkerRequest.Province = evt.province;
    this.editWorkerRequest.City = evt.city;
    this.editWorkerRequest.Area = evt.area;
  }

}
