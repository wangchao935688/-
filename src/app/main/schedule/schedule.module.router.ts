import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {BookingIndexComponent} from "./component/booking-index/booking-index.component";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {BookingDetailComponent} from "./component/booking-detail/booking-detail.component";
import {ScheduleDetailComponent} from "./component/schedule-detail/schedule-detail.component";
import {PatientIndexComponent} from "../patient/component/patient-index/patient-index.component";

const scheduleRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: BookingIndexComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'schedule-detail/:detailId', component: ScheduleDetailComponent},
      {
        path: 'booking-detail/:detailId', component: BookingDetailComponent, children: [
        {path: 'patient-detail/:patientId', component: PatientIndexComponent}
      ]
      }
    ]
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(scheduleRouter)],
  exports: [RouterModule]
})
export class ScheduleRouterModule {
}
