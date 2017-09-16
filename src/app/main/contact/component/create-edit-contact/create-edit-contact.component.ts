import { Component, OnInit, EventEmitter } from '@angular/core';
import {DoubleDate} from '../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {AddRequest} from '../../../../core/messages/contact-request-response';
import {PatientService} from '../../../../core/service/patient.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {CustomizeFormValidateService} from '../../../../core/service/customize-form.service';
import {WorkerService} from '../../../../core/service/worker.service';
import {HospitalService} from '../../../../core/service/hospital.service';
import {SystemService} from 'app/core/service/system.service';
import {ContactService} from "../../../../core/service/contact.service";

@Component({
  selector: 'app-create-edit-contact',
  templateUrl: './create-edit-contact.component.html',
  styleUrls: ['./create-edit-contact.component.scss']
})
export class CreateEditContactComponent extends PopupWindowBaseComponent implements OnInit {
  addRequest: AddRequest;
  scrollbarOptions = {axis: 'y', theme: 'minimal-dark'};
  doctorFirstList = []; // 医生下拉列表
  defaultDate: DoubleDate = {
    leftDate: '',
    rightDate: ''
  };
  // 请求数据接口
  requestData: AddRequest;
  // requestData: ContactRequestResponse.GetListRequest= new ContactRequestResponse.GetListRequest();
  // responseData: ContactRequestResponse.GetListWorkerFullResponse;

  onSelectLeft = new EventEmitter();
  onSelectRight = new EventEmitter();
  options: any = {
    leftOptions: {view: 'days', minView: 'days'},
    rightOptions: {view: 'days', minView: 'days'}
  };
  constructor(private PatientService: PatientService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private WorkerService: WorkerService,
              private HospitalService: HospitalService,
              private SystemService: SystemService,
              private contactService: ContactService) {
    super();
  }

  ngOnInit() {
    // this.contactService.GetList(this.requestData).subscribe(t => {
    //
    // });
  }

  onSelectDate(evt: any) {
    if (evt == 0) {
      this.onSelectLeft.emit();
    }
    if (evt == 1) {
      this.onSelectRight.emit();
    }
  }
  onDate(evt: any) {
    if (evt.index == 0) {
      this.onSelectLeft.emit(evt.date);
      this.options.rightOptions = Object.assign({}, this.options.rightOptions, {minDate: new Date(evt.date)});
    }
    if (evt.index == 1) {
      this.onSelectRight.emit(evt.date);
      this.options.leftOptions = Object.assign({}, this.options.leftOptions, {maxDate: new Date(evt.date)});
    }
  }

  /*
  添加联系人
  * */
  Add() {
    this.contactService.Add(this.addRequest).subscribe(t => {
      this.application.main.openPromptMessage('添加成功！', 3000);
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }

  /**
   * 确定
   */
  ok() {
    const data: any = {'test': 'ddd'};
    super.sendMessage(data);
    data.aa = 9;
    super.close(data);
  }

  /**
   * 取消
   */
  cancel() {
    let data: any = {'test': 'ddd'};
    super.close(data);
  }
}
