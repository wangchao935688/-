import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";

import {ProfitIndexComponent} from "./component/profit-idnex/profit-index.component";
import {ExpendListComponent} from "./component/expend-list/expend-list.component";
import {IncomeListComponent} from "./component/income-list/income-list.component";

import {CheckDetailComponent} from "../cashier-check/component/check-detail/check-detail.component";

const profitRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {path: 'index', component: ProfitIndexComponent},
    {
      path: 'income-list/:beginTime/:endTime', component: IncomeListComponent,
      children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'income-detail', component: CheckDetailComponent},
      ]
    },
    {
      path: 'expend-list/:beginTime/:endTime', component: ExpendListComponent,
      children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'expend-detail', component: CheckDetailComponent},
      ]
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(profitRouter)],
  exports: [RouterModule]
})
export class ProfitModuleRouter {

}
