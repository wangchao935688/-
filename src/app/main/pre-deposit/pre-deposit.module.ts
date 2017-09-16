
import { NgModule } from '@angular/core';
import {SharedComponentModule} from '../../shared/shared-component.module';

import { PreDepositRouterModule } from './pre-deposit.module.router';
import { PreDepositListComponent} from './component/Pre-deposit-list/pre-deposit-list.component';
import {Predepositservice} from 'app/core/service/pre-deposit.service';
import {AccountService} from '../../core/service/account.service';
import {ChargeService} from '../../core/service/charge.service';
import {FlowDetailSharedModule} from "../../rely/flow-detail-shared/flow-detail-shared.module";
import {BillSharedModule} from "../../rely/bill-shared/bill-shared.module";

@NgModule({
  imports : [
    PreDepositRouterModule  ,
    SharedComponentModule,
    FlowDetailSharedModule,
    BillSharedModule
  ],
  declarations: [PreDepositListComponent],
  providers: [],
  entryComponents: []
  })
export class PreDeposiModule {
}
