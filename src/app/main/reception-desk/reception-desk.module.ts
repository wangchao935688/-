import {NgModule} from '@angular/core';

import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";

import {SharedComponentModule} from "../../shared/shared-component.module";
import {ReceptionDeskRouterModule} from "./reception-desk.module.router";
import {ReceptionIndexComponent} from './component/reception-index/reception-index.component';
import { TileTodayComponent } from './component/tile-today/tile-today.component';
import { NoDoctorListComponent } from './component/no-doctor-list/no-doctor-list.component';
import { AllListComponent } from './component/all-list/all-list.component';
import { ListTodayComponent } from './component/list-today/list-today.component';
import {BookingService} from "../../core/service/booking.service";

@NgModule({
  imports: [
    ReceptionDeskRouterModule,
    SharedComponentModule,
    MalihuScrollbarModule
  ],
  providers:[BookingService],
  declarations: [
    ReceptionIndexComponent,
    TileTodayComponent,
    NoDoctorListComponent,
    AllListComponent,
    ListTodayComponent
  ]
})
export class ReceptionDeskModule {
}
