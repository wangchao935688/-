import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaseListComponent } from './component/case-list/case-list.component';
import { CaseComponent } from './component/case/case.component';
import { CaseOptionComponent } from './component/case-option/case-option.component';
import { CreateEditCaseComponent } from './component/create-edit-case/create-edit-case.component';
import { SelectCaseTemplateComponent } from './component/select-case-template/select-case-template.component';
import { SelectCasePhraseComponent } from './component/select-case-phrase/select-case-phrase.component';
import { CaseTemplateCategoryIndexComponent } from './component/case-template-category-index/case-template-category-index.component';
import {CaseRouterModule} from './case.module.router';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {CaseService} from '../../core/service/case.service';
import {ToothSharedModule} from '../../rely/tooth-shared/tooth-shared.module';
import { SelectDoctorTemplatesComponent } from './component/select-doctor-templates/select-doctor-templates.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    CaseRouterModule,
    ToothSharedModule
  ],
  declarations: [
    CaseListComponent,
    CaseComponent,
    CaseOptionComponent,
    CreateEditCaseComponent,
    SelectCaseTemplateComponent,
    SelectCasePhraseComponent,
    CaseTemplateCategoryIndexComponent,
    SelectDoctorTemplatesComponent
  ],
  providers: [
    CaseService
  ],
  entryComponents: [
    SelectCasePhraseComponent,
    SelectCaseTemplateComponent
  ]
})
export class CaseModule { }
