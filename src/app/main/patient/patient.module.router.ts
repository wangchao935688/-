/**
 * Created by bingq on 2017/5/31.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PatientListComponent} from './component/patient-list/patient-list.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {PatientIndexComponent} from './component/patient-index/patient-index.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {PatientOptionsComponent} from './component/patient-options/patient-options.component';
import {PatientBookingComponent} from './component/patient-booking/patient-booking.component';
import {PatientCaseComponent} from './component/patient-case/patient-case.component';
import {PatientCheckComponent} from './component/patient-check/patient-check.component';
import {PatientDetailComponent} from './component/patient-detail/patient-detail.component';
import {PatientImageComponent} from './component/patient-image/patient-image.component';
import {PatientPaymentComponent} from './component/patient-payment/patient-payment.component';
import {PatientProcessComponent} from './component/patient-process/patient-process.component';
import {PatientReturnVisitComponent} from './component/patient-return-visit/patient-return-visit.component';
import {PatientHomeComponent} from 'app/main/patient/component/patient-home/patient-home.component';
import {ProcessComponent} from '../process/component/process/process.component';
// import {ProcessComponent} from '../process/component/process/process.component';

const patientRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'list', pathMatch: 'full'
    },
    {
      path: 'list', component: PatientListComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'index/:patientId', component: PatientIndexComponent, children: [
        { path: '', component: QiezziNoDataComponent},
        { path: 'home/:patientId', component: PatientHomeComponent},
        { path: 'detail/:patientId', component: PatientDetailComponent},
        { path: 'check/:patientId', component: PatientCheckComponent},
        { path: 'case/:patientId', component: PatientCaseComponent},
        { path: 'booking/:patientId', component: PatientBookingComponent},
        { path: 'payment/:patientId', component: PatientPaymentComponent},
        { path: 'return-visit/:patientId', component: PatientReturnVisitComponent},
        { path: 'process/:patientId', component: PatientProcessComponent, children: [
          {path: '', component: QiezziNoDataComponent},
          {path: 'process-detail/:processId', component: ProcessComponent}
        ]},
        { path: 'image/:patientId', component: PatientImageComponent}
      ]}
    ]
    },
    {
      path: 'options', component: PatientOptionsComponent
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(patientRouter)],
  exports: [RouterModule]
})
export class PatientRouterModule {
}
