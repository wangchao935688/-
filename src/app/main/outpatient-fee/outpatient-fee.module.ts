/**
 * Created by KingKong on 2017/5/16.
 */
import {NgModule} from '@angular/core';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {FeeListComponent} from './component/fee-list/fee-list.component';
import {OutpatientFeeRouterModule} from './outpatient-fee.module.router';
import {BillSharedModule} from '../../rely/bill-shared/bill-shared.module';
import {ChargeSharedModule} from '../../rely/charge-shared/charge-shared.module';

@NgModule({
  imports: [
    OutpatientFeeRouterModule,
    SharedComponentModule,
    BillSharedModule,
    ChargeSharedModule
  ],
  declarations: [
    FeeListComponent
  ],
  exports: [],
  providers: [
  ],
  entryComponents: [
  ]
})
export class OutpatientFeeModule {
}
