import { NgModule } from '@angular/core';
import {SharedComponentModule} from "../../shared/shared-component.module";
import {HospitalAuthenticateComponent} from "../../main/hospital/component/hospital-authenticate/hospital-authenticate.component";

@NgModule({
  imports: [
    SharedComponentModule
  ],
  declarations: [
    HospitalAuthenticateComponent
  ],
  exports:[
    HospitalAuthenticateComponent
  ],
  entryComponents:[
    HospitalAuthenticateComponent
  ]
})
export class AuthenticateSharedModule { }
