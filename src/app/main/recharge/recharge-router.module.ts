import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CreateRechargeComponent} from './component/create-recharge/create-recharge.component';
import {RechargeListComponent} from './component/recharge-list/recharge-list.component';
import {RechargeAccountListComponent} from './component/recharge-account-list/recharge-account-list.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {RechargeComponent} from './component/recharge/recharge.component';
import {RechargeAccountComponent} from './component/recharge-account/recharge-account.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
const chargeRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'recharge-list', pathMatch: 'full'
    },
      {path: 'recharge-list', component: RechargeListComponent, children: [
        { path: '', component: QiezziNoDataComponent},
        {path: 'recharge/:id', component: RechargeComponent}
      ]},
      {path: 'recharge-account-list', component: RechargeAccountListComponent, children: [
        { path: '', component: QiezziNoDataComponent},
        {path: 'recharge-account/:id', component: RechargeAccountComponent}
      ]}
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(chargeRouter)],
  exports: [RouterModule]
})
export class RechargeRouterModule {

}
