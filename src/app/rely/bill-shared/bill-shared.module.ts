import { NgModule } from '@angular/core';
import {FeeComponent} from "../../main/outpatient-fee/component/fee/fee.component";
import {SharedComponentModule} from "../../shared/shared-component.module";
import {RechargeComponent} from "../../main/recharge/component/recharge/recharge.component";
import {ExpenseComponent} from "../../main/daily-expense/component/expense/expense.component";

@NgModule({
  imports: [
    SharedComponentModule
  ],
  declarations: [
    FeeComponent,
    RechargeComponent,
    ExpenseComponent
  ],
  exports:[
    FeeComponent,
    RechargeComponent,
    ExpenseComponent
  ]
})
export class BillSharedModule { }
