/**
 * Created by Li Jinglei on 2017/7/20.
 */
/**
 * Created by chengqi on 2017/7/15.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {AccountComponent} from "./account/account.component";
import {AccountBasicComponent} from "./account-basic/account-basic.component";
import {AccountSecurityComponent} from "./account-security/account-security.component";
import {MySortClassComponent} from "./my-sort-class/my-sort-class.component";
import {MyWorkloadComponent} from "./my-workload/my-workload.component";

const MyCenterRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'account', pathMatch: 'full'},
    {
      path: 'account', component: AccountComponent,
      children: [
        {path: '',  redirectTo: 'basic', pathMatch: 'full'},
        {path: 'basic', component: AccountBasicComponent},
        {path: 'security', component: AccountSecurityComponent}
      ]
    },
    {
      path: 'my-sort-class', component: MySortClassComponent,
    },
    {
      path: 'my-workload', component: MyWorkloadComponent,
    }
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(MyCenterRouter)],
  exports: [RouterModule]
})
export class MyCenterModuleRouter {

}
