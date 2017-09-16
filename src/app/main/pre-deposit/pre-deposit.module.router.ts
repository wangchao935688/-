import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';

import {PreDepositListComponent} from './component/Pre-deposit-list/pre-deposit-list.component';
import {CheckDetailComponent} from '../cashier-check/component/check-detail/check-detail.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {FeeComponent} from '../outpatient-fee/component/fee/fee.component';

const PreDepositRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'app-pre-deposit', pathMatch: 'full'
    },
    {
      path: 'app-pre-deposit', component: PreDepositListComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'check-detail', component: CheckDetailComponent, children:[
          {path: '', component: QiezziNoDataComponent},
          {path: 'app-fee', component: FeeComponent},
      ] },
    ]
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(PreDepositRouter)],
  exports: [RouterModule]
})
export class PreDepositRouterModule {
}
