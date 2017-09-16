"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var main_income_report_component_1 = require("./component/main-income-report/main-income-report.component");
var capital_flow_report_component_1 = require("./component/capital-flow-report/capital-flow-report.component");
var pre_deposit_report_component_1 = require("./component/pre-deposit-report/pre-deposit-report.component");
var profit_report_component_1 = require("./component/profit-report/profit-report.component");
var process_report_component_1 = require("./component/process-report/process-report.component");
var clinic_process_report_component_1 = require("./component/clinic-process-report/clinic-process-report.component");
var doctor_process_report_component_1 = require("./component/doctor-process-report/doctor-process-report.component");
var workload_report_index_component_1 = require("./component/workload-report-index/workload-report-index.component");
var workload_all_report_component_1 = require("./component/workload-all-report/workload-all-report.component");
var workload_doctor_report_component_1 = require("./component/workload-doctor-report/workload-doctor-report.component");
var outpatient_report_component_1 = require("./component/outpatient-report/outpatient-report.component");
var outpatient_report_index_component_1 = require("./component/outpatient-report-index/outpatient-report-index.component");
var outpatient_visit_report_component_1 = require("./component/outpatient-visit-report/outpatient-visit-report.component");
var outpatient_first_return_report_component_1 = require("./component/outpatient-first-return-report/outpatient-first-return-report.component");
var outpatient_booking_loss_report_component_1 = require("./component/outpatient-booking-loss-report/outpatient-booking-loss-report.component");
var outpatient_regist_report_component_1 = require("./component/outpatient-regist-report/outpatient-regist-report.component");
var outpatient_patient_source_report_component_1 = require("./component/outpatient-patient-source-report/outpatient-patient-source-report.component");
var outpatient_matter_report_component_1 = require("./component/outpatient-matter-report/outpatient-matter-report.component");
var in_stock_report_index_component_1 = require("./component/in-stock-report-index/in-stock-report-index.component");
var in_stock_report_component_1 = require("./component/in-stock-report/in-stock-report.component");
var in_stock_supply_report_component_1 = require("./component/in-stock-supply-report/in-stock-supply-report.component");
var out_stock_report_index_component_1 = require("./component/out-stock-report-index/out-stock-report-index.component");
var out_stock_report_component_1 = require("./component/out-stock-report/out-stock-report.component");
var out_stock_pocket_report_component_1 = require("./component/out-stock-pocket-report/out-stock-pocket-report.component");
var attendance_report_component_1 = require("./component/attendance-report/attendance-report.component");
var StatisticsModule = (function () {
    function StatisticsModule() {
    }
    return StatisticsModule;
}());
StatisticsModule = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule
        ],
        declarations: [
            main_income_report_component_1.MainIncomeReportComponent,
            capital_flow_report_component_1.CapitalFlowReportComponent,
            pre_deposit_report_component_1.PreDepositReportComponent,
            profit_report_component_1.ProfitReportComponent,
            process_report_component_1.ProcessReportComponent,
            clinic_process_report_component_1.ClinicProcessReportComponent,
            doctor_process_report_component_1.DoctorProcessReportComponent,
            workload_report_index_component_1.WorkloadReportIndexComponent,
            workload_all_report_component_1.WorkloadAllReportComponent,
            workload_doctor_report_component_1.WorkloadDoctorReportComponent,
            outpatient_report_component_1.OutpatientReportComponent,
            outpatient_report_index_component_1.OutpatientReportIndexComponent,
            outpatient_visit_report_component_1.OutpatientVisitReportComponent,
            outpatient_first_return_report_component_1.OutpatientFirstReturnReportComponent,
            outpatient_booking_loss_report_component_1.OutpatientBookingLossReportComponent,
            outpatient_regist_report_component_1.OutpatientRegistReportComponent,
            outpatient_patient_source_report_component_1.OutpatientPatientSourceReportComponent,
            outpatient_matter_report_component_1.OutpatientMatterReportComponent,
            in_stock_report_index_component_1.InStockReportIndexComponent,
            in_stock_report_component_1.InStockReportComponent,
            in_stock_supply_report_component_1.InStockSupplyReportComponent,
            out_stock_report_index_component_1.OutStockReportIndexComponent,
            out_stock_report_component_1.OutStockReportComponent,
            out_stock_pocket_report_component_1.OutStockPocketReportComponent,
            attendance_report_component_1.AttendanceReportComponent
        ]
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.js.map