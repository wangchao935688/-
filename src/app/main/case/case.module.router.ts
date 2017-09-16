/**
 * Created by Li Jinglei on 2017/6/22.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {CaseListComponent} from './component/case-list/case-list.component';
import {CaseComponent} from './component/case/case.component';
import {CaseOptionComponent} from './component/case-option/case-option.component';
import {CreateEditCaseComponent} from './component/create-edit-case/create-edit-case.component';
import {SelectCaseTemplateComponent} from './component/select-case-template/select-case-template.component';
import {SelectDoctorTemplatesComponent} from './component/select-doctor-templates/select-doctor-templates.component';

const caseRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'case-list', pathMatch: 'full'
    },
    {
      path: 'case-list', component: CaseListComponent, children: [
      {path: '', component: QiezziNoDataComponent},
      {path: 'case/:id', component: CaseComponent}
    ]
    },
    {
      path: 'create', component: CreateEditCaseComponent, children: [
      {path: 'caseModule', component: SelectCaseTemplateComponent}
    ]
    },
    {
      path: 'case-option', component: CaseOptionComponent
    }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(caseRouter)],
  exports: [RouterModule]
})
export class CaseRouterModule {
}
