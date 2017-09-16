import { NgModule } from '@angular/core';
import {CheckDetailComponent} from "../../main/cashier-check/component/check-detail/check-detail.component";
import {SharedComponentModule} from "../../shared/shared-component.module";

@NgModule({
  imports: [
    SharedComponentModule
  ],
  declarations: [
    CheckDetailComponent,
  ],
  exports:[
    CheckDetailComponent
  ]
})
export class FlowDetailSharedModule { }
