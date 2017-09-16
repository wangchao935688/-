/**
 * Created by KingKong on 2017/5/15.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {AppMainComponent} from "./home/main-home/main-home.component";

const mainRouter: Routes = [
  {
    path: '',
    component: AppMainComponent,
    children: [
      {path: 'outpatient-fee', loadChildren: 'app/main/outpatient-fee/outpatient-fee.module#OutpatientFeeModule'},
      {path: 'schedule', loadChildren: 'app/main/schedule/schedule.module#ScheduleModule'},
      {path: 'system', loadChildren: 'app/main/system/system.module#SystemModule'},
      {path: 'patient', loadChildren: 'app/main/patient/patient.module#PatientModule'},
      {path: 'my-center', loadChildren: 'app/main/my-center/my-center.module#MyCenterModule'},
      {path: 'feedback', loadChildren: 'app/main/return-visit/return-visit.module#ReturnVisitModule'},
      {path: 'recharge', loadChildren: 'app/main/recharge/recharge.module#RechargeModule'},
      {path: 'daily-expense', loadChildren: 'app/main/daily-expense/daily-expense.module#DailyExpenseModule'},
      {path: 'stock', loadChildren: 'app/main/stock/stock.module#StockModule'},
      {path: 'case', loadChildren: 'app/main/case/case.module#CaseModule'},
      {path: 'statistics', loadChildren: 'app/main/statistics/statistics.module#StatisticsModule'},
      {path: 'hospital', loadChildren: 'app/main/hospital/hospital.module#HospitalModule'},
      {path: 'process-list', loadChildren: 'app/main/process/process.module#ProcessModule'},
      {path: 'demo', loadChildren: 'app/main/demo/demo.module#DemoModule'},
      {path: 'cashier-check', loadChildren: 'app/main/cashier-check/cashier-check.module#CashierCheckModule'},
      {path: 'profit', loadChildren: 'app/main/profit/profit.module#ProfitModule'},
      {path: 'basic-index', loadChildren: 'app/main/basic-setting/basic-setting.module#BasicSettingModule'},
      {path: 'capital-flow', loadChildren: 'app/main/capital-flow/capital-flow.module#CapitalFlowModule'},
      {path: 'pre-deposit', loadChildren: 'app/main/pre-deposit/pre-deposit.module#PreDeposiModule'},
      {path: 'sort-class', loadChildren: 'app/main/sort-class/sort-class.module#SortClassModule'},
      {path: 'sms', loadChildren: 'app/main/sms/sms.module#SmsModule'},
      {path: 'disinfection-list', loadChildren: 'app/main/disinfection/disinfection.module#DisinfectionModule'},
      {path: 'charge-index', loadChildren: 'app/main/charge-item-setting/charge-item-setting.module#ChargeItemSettingModule'},
      {path: 'contact', loadChildren: 'app/main/contact/contact.module#ContactModule'},
      {path: 'message', loadChildren: 'app/main/message/message.module#MessageModule'},
      {path: 'home', loadChildren: 'app/main/reception-desk/reception-desk.module#ReceptionDeskModule'},
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(mainRouter)],
  exports: [RouterModule]
})
export class MainRouterModule {
}
