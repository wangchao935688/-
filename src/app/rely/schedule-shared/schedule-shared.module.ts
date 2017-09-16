import { NgModule } from '@angular/core';
import {CreateEditBookingComponent} from "../../main/schedule/component/create-edit-booking/create-edit-booking.component";
import {BookingDetailComponent} from "../../main/schedule/component/booking-detail/booking-detail.component";
import {SharedComponentModule} from "../../shared/shared-component.module";

@NgModule({
  imports: [
    SharedComponentModule
  ],
  declarations: [
    CreateEditBookingComponent,
    BookingDetailComponent
  ],
  exports:[
    CreateEditBookingComponent,
    BookingDetailComponent
  ],
  entryComponents:[
    CreateEditBookingComponent
  ]
})
export class ScheduleSharedModule { }
