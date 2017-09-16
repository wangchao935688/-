/**
 * Created by Li Jinglei on 2017/6/22.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';

import {CapitalFlowIndexComponent} from './component/capital-flow-index/capital-flow-index.component';
import {CheckDetailComponent} from '../cashier-check/component/check-detail/check-detail.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';

const capitalflowRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'index', pathMatch: 'full'
    },
    {
      path: 'index', component: CapitalFlowIndexComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'detail/:checkId', component: CheckDetailComponent}
    ]
    }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(capitalflowRouter)],
  exports: [RouterModule]
})
export class CapitalFlowRouterModule {
}
