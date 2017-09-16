import {NgModule} from '@angular/core';
import {RechargeRouterModule} from './recharge-router.module';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {RechargeListComponent} from './component/recharge-list/recharge-list.component';
import {CreateRechargeComponent} from './component/create-recharge/create-recharge.component';
import {RechargeAccountListComponent} from './component/recharge-account-list/recharge-account-list.component';
import {RechargeAccountComponent} from './component/recharge-account/recharge-account.component';
import {BillSharedModule} from '../../rely/bill-shared/bill-shared.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';

@NgModule({
  imports: [
    RechargeRouterModule,
    SharedComponentModule,
    BillSharedModule,
    MalihuScrollbarModule
  ],
  declarations: [
    CreateRechargeComponent,
    RechargeAccountListComponent,
    RechargeListComponent,
    RechargeAccountComponent
  ],
  entryComponents: [
    CreateRechargeComponent
  ]
})
export class RechargeModule {

}
