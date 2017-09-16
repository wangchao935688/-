import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ChargeListComponent} from "./component/charge-list/charge-list.component";
import {CheckDetailComponent} from "./component/check-detail/check-detail.component";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {FeeComponent} from '../outpatient-fee/component/fee/fee.component';


const CashierCheckRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'charge-list', pathMatch: 'full'
    },
    {
      path: 'charge-list', component: ChargeListComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'check-detail/:checkId', component: CheckDetailComponent, children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'fee/:feeId', component: FeeComponent},
      ] },
    ]
    },
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(CashierCheckRouter)],
  exports: [RouterModule]
})
export class CashierCheckRouterModule {
}
