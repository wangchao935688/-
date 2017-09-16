import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {SendSmsComponent} from "./component/send-sms/send-sms.component";
import {SmsRecordListComponent} from "./component/sms-record-list/sms-record-list.component";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {SmsRecordComponent} from "./component/sms-record/sms-record.component";
import {SmsTemplateComponent} from "./component/sms-template/sms-template.component";
import {SysTemplateListComponent} from "./component/sys-template-list/sys-template-list.component";
import {MyTemplateListComponent} from "./component/my-template-list/my-template-list.component";
import {ReplySmsComponent} from "./component/reply-sms/reply-sms.component";
import {RechargeSmsListComponent} from "./component/recharge-sms-list/recharge-sms-list.component";
/**
 * Created by chengqi on 2017/7/7.
 */

const smsRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'send', pathMatch: 'full'},
    {path: 'send', component: SendSmsComponent},
    {path: 'reply', component: ReplySmsComponent},
    {path: 'recharge-list', component: RechargeSmsListComponent},
    {
      path: 'record-list', component: SmsRecordListComponent,
      children: [
        {path: 'record/:recordId', component: SmsRecordComponent}
      ]
    },
    {path: 'template', component: SmsTemplateComponent},
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(smsRouter)],
  exports: [RouterModule]
})
export class SmsModuleRouter {

}
