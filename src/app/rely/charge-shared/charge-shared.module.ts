import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PrintFeeComponent} from '../../main/outpatient-fee/component/print-fee/print-fee.component';
import {RefundComponent} from '../../main/outpatient-fee/component/refund/refund.component';
import {ChargeComponent} from '../../main/outpatient-fee/component/charge/charge.component';
import {CreateFeeComponent} from '../../main/outpatient-fee/component/create-fee/create-fee.component';
import {SharedComponentModule} from '../../shared/shared-component.module';

@NgModule({
  imports: [
    SharedComponentModule
  ],
  declarations: [
    CreateFeeComponent,
    ChargeComponent,
    RefundComponent,
    PrintFeeComponent
  ],
  exports: [
    CreateFeeComponent,
    ChargeComponent,
    RefundComponent,
    PrintFeeComponent
  ],
  entryComponents: [
    CreateFeeComponent,
    ChargeComponent,
    RefundComponent,
    PrintFeeComponent
  ]
})
export class ChargeSharedModule { }
