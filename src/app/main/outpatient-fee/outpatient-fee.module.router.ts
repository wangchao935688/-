/**
 * Created by bingq on 2017/6/9.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {FeeListComponent} from "./component/fee-list/fee-list.component";
import {CreateFeeComponent} from './component/create-fee/create-fee.component';
import {FeeComponent} from './component/fee/fee.component';
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";

const patientRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'list',
      pathMatch: 'full'
    },
    {
      path: 'list', component: FeeListComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'fee/:feeId', component: FeeComponent}
    ]
    },
    {path: 'create', component: CreateFeeComponent}]
  }
];
@NgModule({
  imports: [RouterModule.forChild(patientRouter)],
  exports: [RouterModule]
})
export class OutpatientFeeRouterModule {
}
