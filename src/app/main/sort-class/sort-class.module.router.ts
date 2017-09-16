import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {ClassOptionComponent} from './component/class-option/class-option.component';
import {CreateEditSortClassComponent} from './component/create-edit-sort-class/create-edit-sort-class.component';

const processRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: CreateEditSortClassComponent },
    {
      path: 'class-options', component: ClassOptionComponent,
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(processRouter)],
  exports: [RouterModule]
})
export class SortClassModuleRouter {

}
