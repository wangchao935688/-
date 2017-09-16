/**
 * Created by chengqi on 2017/7/25.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {MessageIndexComponent} from './component/message-index/message-index.component';

const MessageRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'message-index', pathMatch: 'full'
    },
    {
      path: 'message-index', component: MessageIndexComponent
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(MessageRouter)],
  exports: [RouterModule]
})
export class MessageRouterModule {
}
