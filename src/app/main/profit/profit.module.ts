import {NgModule} from "@angular/core";

import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";

import {SharedComponentModule} from "../../shared/shared-component.module";

import {ProfitService} from "../../core/service/profit.service";
import {AccountService} from "../../core/service/account.service";

import {ProfitModuleRouter} from "./profit.module.router";

import {ProfitIndexComponent} from "./component/profit-idnex/profit-index.component";
import {IncomeListComponent} from "./component/income-list/income-list.component";
import {ExpendListComponent} from "./component/expend-list/expend-list.component";
import {BillSharedModule} from "../../rely/bill-shared/bill-shared.module";
import {FlowDetailSharedModule} from "../../rely/flow-detail-shared/flow-detail-shared.module";

@NgModule({
  imports: [
    ProfitModuleRouter,
    SharedComponentModule,
    FlowDetailSharedModule,
    BillSharedModule
  ],
  declarations: [
    ProfitIndexComponent,
    IncomeListComponent,
    ExpendListComponent],
  providers: [
    ProfitService,
    AccountService
  ]
})
export class ProfitModule {

}
