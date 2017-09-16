"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var qiezzi_main_root_component_1 = require("../../shared/component/qiezzi-main-root/qiezzi-main-root.component");
var main_income_report_component_1 = require("./component/main-income-report/main-income-report.component");
var capital_flow_report_component_1 = require("./component/capital-flow-report/capital-flow-report.component");
var pre_deposit_report_component_1 = require("./component/pre-deposit-report/pre-deposit-report.component");
var profit_report_component_1 = require("./component/profit-report/profit-report.component");
var process_report_component_1 = require("./component/process-report/process-report.component");
var workload_report_index_component_1 = require("./component/workload-report-index/workload-report-index.component");
var outpatient_report_component_1 = require("./component/outpatient-report/outpatient-report.component");
var in_stock_report_index_component_1 = require("./component/in-stock-report-index/in-stock-report-index.component");
var out_stock_report_index_component_1 = require("./component/out-stock-report-index/out-stock-report-index.component");
var attendance_report_component_1 = require("./component/attendance-report/attendance-report.component");
var statisticsRouter = [
    {
        path: '', component: qiezzi_main_root_component_1.QiezziMainRootComponent, children: [
            {
                path: '', redirectTo: "main-income-report", pathMatch: 'full'
            },
            {
                // 主营收入报表
                path: 'main-income-report', component: main_income_report_component_1.MainIncomeReportComponent, children: []
            },
            {
                // 资金流水报表
                path: 'capital-flow-report', component: capital_flow_report_component_1.CapitalFlowReportComponent, children: []
            },
            {
                // 预付款报表
                path: 'pre-deposit-report', component: pre_deposit_report_component_1.PreDepositReportComponent, children: []
            },
            {
                // 利润报表
                path: 'profit-report', component: profit_report_component_1.ProfitReportComponent, children: []
            },
            {
                // 外加工统计报表
                path: 'process-report', component: process_report_component_1.ProcessReportComponent, children: []
            },
            {
                // 医生工作量统计
                path: 'workload-report-index', component: workload_report_index_component_1.WorkloadReportIndexComponent, children: []
            },
            {
                // 门诊统计
                path: 'outpatient-report', component: outpatient_report_component_1.OutpatientReportComponent, children: []
            },
            {
                // 入库统计
                path: 'in-stock-report-index', component: in_stock_report_index_component_1.InStockReportIndexComponent, children: []
            },
            {
                // 出库统计
                path: 'out-stock-report-index', component: out_stock_report_index_component_1.OutStockReportIndexComponent, children: []
            },
            {
                // 考勤统计
                path: 'attendance-report', component: attendance_report_component_1.AttendanceReportComponent, children: []
            }
        ]
    }
];
var StatisticsModule = (function () {
    function StatisticsModule() {
    }
    return StatisticsModule;
}());
StatisticsModule = __decorate([
    core_1.NgModule({
        imports: [router_1.RouterModule.forChild(statisticsRouter)],
        exports: [router_1.RouterModule]
    })
], StatisticsModule);
exports.StatisticsModule = StatisticsModule;
//# sourceMappingURL=statistics.module.router.js.map