/**
 * Created by chengqi on 2017/7/15.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {BasicIndexComponent} from './component/basic-index/basic-index.component';

const basicindexRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: BasicIndexComponent,
    },
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(basicindexRouter)],
  exports: [RouterModule]
})
export class BasicSettingModuleRouter {

}
