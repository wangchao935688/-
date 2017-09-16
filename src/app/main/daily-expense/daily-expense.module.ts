import {NgModule} from "@angular/core";
import {SharedComponentModule} from "../../shared/shared-component.module";
import {DailyExpenseRouterModule} from "./daily-expense-module.router";
import {ExpenseListComponent} from "./component/expense-list/expense-list.component"
import {ExpenseTypeListComponent} from "./component/expensetype-list/expensetype-list.component"
import {DailyExpenseService} from "../../core/service/daily-expense.service";
import {CreateExpenseComponent} from "./component/create-expense/create-expense.component"
import {ExpenseTypeListAddComponent} from "./component/expensetypelist-add/expensetypelist-add.component";
import {BillSharedModule} from "../../rely/bill-shared/bill-shared.module";

@NgModule({
  imports: [
    DailyExpenseRouterModule,
    SharedComponentModule,
    BillSharedModule
  ],
  declarations: [
    CreateExpenseComponent,
    ExpenseListComponent,
    ExpenseTypeListComponent,
    ExpenseTypeListAddComponent
  ],
  providers: [DailyExpenseService],
  entryComponents: [
    CreateExpenseComponent,
    ExpenseTypeListAddComponent
  ]
})
export class DailyExpenseModule {
}
