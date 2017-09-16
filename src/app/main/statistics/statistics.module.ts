import {NgModule} from "@angular/core";
import {SharedComponentModule} from '../../shared/shared-component.module';

import {StatisticsRouterModule} from './statistics.module.router';
import {StatisticsService} from '../../core/service/statistics.service';
import {MainIncomeReportComponent} from './component/main-income-report/main-income-report.component';
import {CapitalFlowReportComponent} from './component/capital-flow-report/capital-flow-report.component';
import {PreDepositReportComponent} from './component/pre-deposit-report/pre-deposit-report.component';
import {ProfitReportComponent} from './component/profit-report/profit-report.component';
import {ProcessReportComponent} from './component/process-report/process-report.component';
import {ClinicProcessReportComponent} from './component/clinic-process-report/clinic-process-report.component';
import {DoctorProcessReportComponent} from './component/doctor-process-report/doctor-process-report.component';
import {WorkloadReportComponent} from './component/workload-report/workload-report.component';
import {WorkloadAllReportComponent} from './component/workload-all-report/workload-all-report.component';
import {WorkloadDoctorReportComponent} from './component/workload-doctor-report/workload-doctor-report.component';
import {OutpatientReportComponent} from './component/outpatient-report/outpatient-report.component';
import {OutpatientReportIndexComponent} from './component/outpatient-report-index/outpatient-report-index.component';
import {OutpatientVisitReportComponent} from './component/outpatient-visit-report/outpatient-visit-report.component';
import {OutpatientFirstReturnReportComponent} from './component/outpatient-first-return-report/outpatient-first-return-report.component';
import {OutpatientBookingLossReportComponent} from './component/outpatient-booking-loss-report/outpatient-booking-loss-report.component';
import {OutpatientRegistReportComponent} from './component/outpatient-regist-report/outpatient-regist-report.component';
import {OutpatientPatientSourceReportComponent} from './component/outpatient-patient-source-report/outpatient-patient-source-report.component';
import {OutpatientMatterReportComponent} from './component/outpatient-matter-report/outpatient-matter-report.component';
import {InStockReportIndexComponent} from './component/in-stock-report-index/in-stock-report-index.component';
import {InStockReportComponent} from './component/in-stock-report/in-stock-report.component';
import {InStockSupplyReportComponent} from './component/in-stock-supply-report/in-stock-supply-report.component';
import {OutStockReportIndexComponent} from './component/out-stock-report-index/out-stock-report-index.component';
import {OutStockReportComponent} from './component/out-stock-report/out-stock-report.component';
import {OutStockPocketReportComponent} from './component/out-stock-pocket-report/out-stock-pocket-report.component';
import {AttendanceReportComponent} from './component/attendance-report/attendance-report.component';

@NgModule({
  imports: [
    StatisticsRouterModule,
    SharedComponentModule
  ],
  providers: [
    StatisticsService,
  ],
  declarations: [

    MainIncomeReportComponent,
    CapitalFlowReportComponent,
    PreDepositReportComponent,
    ProfitReportComponent,
    ProcessReportComponent,
    ClinicProcessReportComponent,
    DoctorProcessReportComponent,
    WorkloadReportComponent,
    WorkloadAllReportComponent,
    WorkloadDoctorReportComponent,
    OutpatientReportComponent,
    OutpatientReportIndexComponent,
    OutpatientVisitReportComponent,
    OutpatientFirstReturnReportComponent,
    OutpatientBookingLossReportComponent,
    OutpatientRegistReportComponent,
    OutpatientPatientSourceReportComponent,
    OutpatientMatterReportComponent,
    InStockReportIndexComponent,
    InStockReportComponent,
    InStockSupplyReportComponent,
    OutStockReportIndexComponent,
    OutStockReportComponent,
    OutStockPocketReportComponent,
    AttendanceReportComponent
  ]
})
export class StatisticsModule {
}
