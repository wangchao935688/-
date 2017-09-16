/**
 * Created by chengqi on 2017/7/21.
 */
/**
 * Created by chengqi on 2017/7/15.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {ChargeItemIndexComponent} from './component/charge-item-index/charge-item-index.component';

const chargeitemsettingRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: ChargeItemIndexComponent,
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(chargeitemsettingRouter)],
  exports: [RouterModule]
})
export class ChargeItemSettingModuleRouter {

}
