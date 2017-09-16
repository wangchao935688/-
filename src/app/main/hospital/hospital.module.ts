import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';

import {HospitalIndexComponent} from './component/hospital-index/hospital-index.component';
import {HospitalRouterModule} from './hospital.module.router';
import { EditHospitalAddressComponent } from './component/edit-hospital-address/edit-hospital-address.component';
import { EditHospitalLogoComponent } from './component/edit-hospital-logo/edit-hospital-logo.component';
import { EditBookingPhoneComponent } from './component/edit-booking-phone/edit-booking-phone.component';
import {AuthenticateSharedModule} from "../../rely/authenticate-shared/authenticate-shared.module";

@NgModule({
  imports: [
    HospitalRouterModule,
    SharedComponentModule,
    AuthenticateSharedModule
  ],
  declarations: [
    HospitalIndexComponent,
    EditHospitalAddressComponent,
    EditHospitalLogoComponent,
    EditBookingPhoneComponent,
  ],
  entryComponents: [
  //  引入process的弹窗组件
    EditHospitalAddressComponent,
    EditBookingPhoneComponent,
  ]
})
export class HospitalModule {
}
