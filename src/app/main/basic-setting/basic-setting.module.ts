import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasicIndexComponent } from './component/basic-index/basic-index.component';
import { CaseRuleComponent } from './component/case-rule/case-rule.component';
import { SmsSendRuleComponent } from './component/sms-send-rule/sms-send-rule.component';
import { HostpialAccountListComponent } from './component/hostpial-account-list/hostpial-account-list.component';
import { CreateEditHostpialAccountComponent } from './component/create-edit-hostpial-account/create-edit-hostpial-account.component';
import { MedicalListComponent } from './component/medical-list/medical-list.component';
import { CreateEditMedicalComponent } from './component/create-edit-medical/create-edit-medical.component';
import {BasicSettingModuleRouter} from './basic-setting.module.router';
import {SharedComponentModule} from '../../shared/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    BasicSettingModuleRouter,
    SharedComponentModule
  ],
  declarations: [BasicIndexComponent, CaseRuleComponent, SmsSendRuleComponent, HostpialAccountListComponent, CreateEditHostpialAccountComponent, MedicalListComponent, CreateEditMedicalComponent],
  entryComponents: [
    CreateEditHostpialAccountComponent,
    CreateEditMedicalComponent
  ]
})
export class BasicSettingModule { }
