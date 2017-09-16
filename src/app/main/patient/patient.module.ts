import {NgModule} from '@angular/core';
import {CreatePatientComponent} from './component/create-patient/create-patient.component';
import {PatientRouterModule} from './patient.module.router';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {PatientService} from '../../core/service/patient.service';
import {PatientListComponent} from './component/patient-list/patient-list.component';
import { PatientOptionsComponent } from './component/patient-options/patient-options.component';
import { CreateOptionComponent } from './component/create-option/create-option.component';
import {ProcessService} from '../../core/service/process.service';
import {HospitalService} from '../../core/service/hospital.service';
import {CaseService} from '../../core/service/case.service';
import {BookingService} from '../../core/service/booking.service';
import {ReturnVisitService} from '../../core/service/return-visit.service';
import {RechargeService} from '../../core/service/recharge.service';
import {QiezziPopupConfirmComponent} from '../../shared/component/qiezzi-popup-window/popup-confirm/qiezzi-popup-confirm.component';
import { PatientRelationTypeComponent } from './component/patient-relation-type/patient-relation-type.component';
import {SystemService} from '../../core/service/system.service';
import { EditPatientComponent } from './component/edit-patient/edit-patient.component';
import {PatientSharedModule} from "../../rely/patient-shared/patient-shared.module";

@NgModule({
  imports: [
    SharedComponentModule,
    PatientRouterModule,
    PatientSharedModule
  ],
  declarations: [
    CreatePatientComponent,
    PatientListComponent,
    PatientOptionsComponent,
    CreateOptionComponent,
    PatientRelationTypeComponent
  ],
  providers: [
    PatientService,
    ProcessService,
    HospitalService,
    CaseService,
    ReturnVisitService,
    RechargeService,
    BookingService,
    SystemService
  ],
  entryComponents: [
    CreatePatientComponent,
    PatientOptionsComponent,
    CreateOptionComponent,
    QiezziPopupConfirmComponent,
    PatientRelationTypeComponent,
    EditPatientComponent,
  ]
})
export class PatientModule {
}
