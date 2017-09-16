/**
 * Created by chengqi on 2017/7/15.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DisinfectionOptionComponent} from './component/disinfection-option/disinfection-option.component';
import {DisinfectionComponent} from './component/disinfection/disinfection.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {DisinfectionListComponent} from './component/disinfection-list/disinfection-list.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';

const disinfectionRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: DisinfectionListComponent,
      children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'disinfection', component: DisinfectionComponent}
      ]
    },
    {
      path: 'disinfection-option', component: DisinfectionOptionComponent,
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(disinfectionRouter)],
  exports: [RouterModule]
})
export class DisinfectionModuleRouter {

}
