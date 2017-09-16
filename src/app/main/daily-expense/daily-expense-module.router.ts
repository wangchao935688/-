import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ExpenseListComponent} from './component/expense-list/expense-list.component'
import {ExpenseTypeListComponent} from './component/expensetype-list/expensetype-list.component'
import {ExpenseComponent} from './component/expense/expense.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';

const dailyexpenseRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'expense-list', pathMatch: 'full'
    },
    {
      path: 'expense-list', component: ExpenseListComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'expense', component: ExpenseComponent},
    ]
    },
    {
      path: 'type-list', component: ExpenseTypeListComponent
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(dailyexpenseRouter)],
  exports: [RouterModule]
})
export class DailyExpenseRouterModule {
}
