import { NgModule } from '@angular/core';
import { SendSmsComponent } from './component/send-sms/send-sms.component';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {SmsModuleRouter} from  './sms.module.router';
import { ReplySmsComponent } from './component/reply-sms/reply-sms.component';
import { RechargeSmsListComponent } from './component/recharge-sms-list/recharge-sms-list.component';
import { RechargeSmsStepComponent } from './component/recharge-sms-step/recharge-sms-step.component';
import { SmsRecordListComponent } from './component/sms-record-list/sms-record-list.component';
import { SmsRecordComponent } from './component/sms-record/sms-record.component';
import { SmsTemplateComponent } from './component/sms-template/sms-template.component';
import { CreateEditSmsTemplateComponent } from './component/create-edit-sms-template/create-edit-sms-template.component';
import { SmsKindListComponent } from './component/sms-kind-list/sms-kind-list.component';
import {SelectReceiverComponent} from './component/select-receiver/select-receiver.component';
import { MyTemplateListComponent } from './component/my-template-list/my-template-list.component';
import { SysTemplateListComponent } from './component/sys-template-list/sys-template-list.component';
import {HospitalService} from '../../core/service/hospital.service';
import {SmsService} from '../../core/service/sms.service';
import {QRCodeModule} from '../../rely/qrcode/index';
import {AuthenticateSharedModule} from '../../rely/authenticate-shared/authenticate-shared.module';

@NgModule({
  imports: [
  SmsModuleRouter,
    SharedComponentModule,
    QRCodeModule,
    AuthenticateSharedModule
  ],
  declarations: [SendSmsComponent,
    SelectReceiverComponent,
    ReplySmsComponent,
    RechargeSmsListComponent,
    RechargeSmsStepComponent,
    SmsRecordListComponent,
    SmsRecordComponent,
    SmsTemplateComponent,
    CreateEditSmsTemplateComponent,
    SmsKindListComponent,
    MyTemplateListComponent,
    SysTemplateListComponent],
  providers: [
    HospitalService,
    SmsService
  ],
  entryComponents: [
    SelectReceiverComponent,
    RechargeSmsStepComponent,
    SmsKindListComponent,
    CreateEditSmsTemplateComponent
  ]
})
export class SmsModule { }
