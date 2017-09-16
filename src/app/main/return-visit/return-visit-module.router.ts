import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReturnVisitManageComponent} from './component/return-visit-manage/return-visit-manage.component';
import {ReturnVisitOptionsComponent} from './component/return-visit-options/return-visit-options.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {ReturnVisitDetailComponent} from './component/return-visit-detail/return-visit-detail.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
const feedbackRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: ReturnVisitManageComponent,
      children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'return-visit-detail/:id', component: ReturnVisitDetailComponent}
      ]
    },
    {
      path: 'return-visit-option', component: ReturnVisitOptionsComponent,
    },
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(feedbackRouter)],
  exports: [RouterModule]
})
export class ReturnVisitRouterModule {
}
