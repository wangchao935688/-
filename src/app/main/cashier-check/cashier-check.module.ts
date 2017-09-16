import {NgModule} from '@angular/core';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {CashierCheckRouterModule} from './cashier-check.module.router';
import {ChargeListComponent} from './component/charge-list/charge-list.component';
import {FlowDetailSharedModule} from "../../rely/flow-detail-shared/flow-detail-shared.module";
import {BillSharedModule} from "../../rely/bill-shared/bill-shared.module";


@NgModule({
  imports: [
    CashierCheckRouterModule,
    SharedComponentModule,
    FlowDetailSharedModule,
    BillSharedModule
  ],
  exports: [
  ],
  declarations: [
    ChargeListComponent,
  ],
  providers: [],
  entryComponents: [
  ]
})
export class CashierCheckModule {
}
