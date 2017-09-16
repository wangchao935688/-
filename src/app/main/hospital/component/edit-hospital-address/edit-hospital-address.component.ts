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

@Component({
  selector: 'app-edit-hospital-address',
  templateUrl: './edit-hospital-address.component.html',
  styleUrls: ['./edit-hospital-address.component.scss']
})
export class EditHospitalAddressComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit{


  constructor(private PatientService: PatientService,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private WorkerService: WorkerService,
              private HospitalService: HospitalService,
              private SystemService: SystemService) {
    super();
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {}



  save(){
    this.close(null);
  }
  cancel(){
    this.close(null);
  }
}
