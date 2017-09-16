/**
 * Created by KingKong on 2017/6/9.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {DemoIndexComponent} from './demo-index/demo-index.component';
import {DemoRightDetailComponent} from './demo-index/demo-right-detail/demo-right-detail.component';
import {DemoConfigComponent} from './demo-config/demo-config.component';
import {DemoListComponent} from './demo-list/demo-list.component';
import {DemoListDetailComponent} from './demo-list/demo-list-detail/demo-list-detail.component';
import {DemoLargeComponent} from './demo-large/demo-large.component';
import {DemoLargeDetailComponent} from './demo-large/demo-large-detail/demo-large-detail.component';
import {DemoListDetailInfoComponent} from './demo-list/demo-list-detail/demo-list-detail-info/demo-list-detail-info.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {QiezziHideDataComponent} from '../../shared/component/qiezzi-hide-data/qiezzi-hide-data.component';

const demoRouter: Routes = [
  {
    path: '',
    component: QiezziMainRootComponent,
    children: [
      {path: '', redirectTo: 'index', pathMatch: 'full'},
      {
        path: 'index', component: DemoIndexComponent, children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'detail', component: DemoRightDetailComponent}
      ]
      },
      {path: 'config', component: DemoConfigComponent},
      {
        path: 'list', component: DemoListComponent, children: [
        {path: '', component: QiezziNoDataComponent},
        {
          path: 'detail/:detail-id', component: DemoListDetailComponent, children: [
          {path: '', component: QiezziHideDataComponent},
          {path: 'detail-info/:info-id', component: DemoListDetailInfoComponent}
        ]
        }
      ]
      },
      {
        path: 'large', component: DemoLargeComponent, children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'detail/:detail-id', component: DemoLargeDetailComponent}
      ]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(demoRouter)],
  exports: [RouterModule]
})
export class DemoRouterModule {
}
