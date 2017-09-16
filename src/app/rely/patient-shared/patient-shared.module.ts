import { NgModule } from '@angular/core';
import {PatientDetailComponent} from "../../main/patient/component/patient-detail/patient-detail.component";
import {PatientIndexComponent} from "../../main/patient/component/patient-index/patient-index.component";
import {PatientHomeComponent} from "../../main/patient/component/patient-home/patient-home.component";
import {PatientCheckComponent} from "../../main/patient/component/patient-check/patient-check.component";
import {PatientCaseComponent} from "../../main/patient/component/patient-case/patient-case.component";
import {PatientPaymentComponent} from "../../main/patient/component/patient-payment/patient-payment.component";
import {PatientImageComponent} from "../../main/patient/component/patient-image/patient-image.component";
import {PatientProcessComponent} from "../../main/patient/component/patient-process/patient-process.component";
import {PatientReturnVisitComponent} from "../../main/patient/component/patient-return-visit/patient-return-visit.component";
import {PatientBookingComponent} from "../../main/patient/component/patient-booking/patient-booking.component";
import {SharedComponentModule} from "../../shared/shared-component.module";
import {ChargeSharedModule} from "../charge-shared/charge-shared.module";
import {ProcessSharedModule} from "../process-shared/process-shared.module";
import {ToothSharedModule} from "../tooth-shared/tooth-shared.module";
import {EditPatientComponent} from "../../main/patient/component/edit-patient/edit-patient.component";

@NgModule({
  imports: [
    SharedComponentModule,
    ProcessSharedModule,
    ChargeSharedModule,
    ToothSharedModule,
  ],
  declarations: [
    PatientDetailComponent,
    PatientIndexComponent,
    PatientHomeComponent,
    PatientCheckComponent,
    PatientCaseComponent,
    PatientBookingComponent,
    PatientReturnVisitComponent,
    PatientProcessComponent,
    PatientImageComponent,
    PatientPaymentComponent,
    EditPatientComponent
  ],
  exports:[
    PatientDetailComponent,
    PatientIndexComponent,
    PatientHomeComponent,
    PatientCheckComponent,
    PatientCaseComponent,
    PatientBookingComponent,
    PatientReturnVisitComponent,
    PatientProcessComponent,
    PatientImageComponent,
    PatientPaymentComponent
  ]
})
export class PatientSharedModule { }
