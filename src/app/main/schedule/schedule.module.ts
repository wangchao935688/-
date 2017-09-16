import {NgModule} from "@angular/core";
import {SharedComponentModule} from "../../shared/shared-component.module";

import {ScheduleRouterModule} from "./schedule.module.router";
import {BookingIndexComponent} from './component/booking-index/booking-index.component';
import {BookingDayComponent} from './component/booking-day/booking-day.component';
import {BookingWeekComponent} from './component/booking-week/booking-week.component';
import {BookingMonthComponent} from './component/booking-month/booking-month.component';
import {BookingListComponent} from './component/booking-list/booking-list.component';
import {ScheduleListComponent} from './component/schedule-list/schedule-list.component';
import {CreateEditScheduleComponent} from './component/create-edit-schedule/create-edit-schedule.component';
import {ScheduleDetailComponent} from './component/schedule-detail/schedule-detail.component';
import {BookingService} from "../../core/service/booking.service";
import {QiezziSelectPartakerComponent} from "../../shared/component/qiezzi-select-partaker/qiezzi-select-partaker.component";
import {BookingSelectDoctorComponent} from './component/booking-select-doctor/booking-select-doctor.component';
import {ScheduleSharedModule} from "../../rely/schedule-shared/schedule-shared.module";
import {PatientSharedModule} from "../../rely/patient-shared/patient-shared.module";
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";

@NgModule({
  declarations: [
    BookingIndexComponent,
    BookingDayComponent,
    BookingWeekComponent,
    BookingMonthComponent,
    BookingListComponent,
    ScheduleListComponent,
    CreateEditScheduleComponent,
    ScheduleDetailComponent,
    BookingSelectDoctorComponent
  ],
  imports: [
    ScheduleRouterModule,
    SharedComponentModule,
    MalihuScrollbarModule,
    PatientSharedModule,
    ScheduleSharedModule
  ],
  providers: [
    BookingService
  ],
  entryComponents: [
    CreateEditScheduleComponent,
    QiezziSelectPartakerComponent,
    BookingSelectDoctorComponent
  ]
})
export class ScheduleModule {
}
