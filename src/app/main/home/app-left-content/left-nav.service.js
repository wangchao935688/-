/**
 * Created by KingKong on 2017/5/15.
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var LeftNavService = (function () {
    function LeftNavService() {
    }
    LeftNavService.prototype.getList = function () {
        return new Promise(function (resolve, reject) {
            // setTimeout(() => {
            resolve([
                {
                    name: '门诊首页', twoLevel: [], linkActive: 'home', iconName: 'icon-shouye'
                },
                {
                    name: '门诊收费', twoLevel: [], linkActive: 'outpatient-fee', iconName: 'icon-menzhenshoufei'
                },
                {
                    name: '患者管理', twoLevel: [], linkActive: 'patient', iconName: 'icon-yuyuefuzhen'
                },
                {
                    name: '消毒管理', linkActive: 'disinfection-list', twoLevel: [], iconName: 'icon-yuyuefuzhen'
                },
                {
                    name: '预约管理', linkActive: 'schedule', twoLevel: [], iconName: 'icon-yuyueguanli'
                },
                {
                    name: '短信管理', twoLevel: [
                        { name: '发短信', linkActive: 'sms/send' },
                        { name: '短信回复', linkActive: 'sms/reply' },
                        { name: '发送记录', linkActive: 'sms/record-list' },
                        { name: '充值查询', linkActive: 'sms/recharge-list' },
                        { name: '短信模版', linkActive: 'sms/template' }
                    ], iconName: 'icon-duanxin'
                },
                {
                    name: '通讯录', linkActive: 'contact', twoLevel: [], iconName: 'icon-dianhuabu'
                },
                {
                    name: '系统管理', linkActive: 'system', twoLevel: [], iconName: 'icon-shezhi'
                },
                {
                    name: '基础设置', linkActive: 'basic-index', twoLevel: [], iconName: 'icon-shezhi'
                },
                {
                    name: '收费项目', linkActive: 'charge-index', twoLevel: [], iconName: 'icon-shezhi'
                },
                {
                    name: '回访', linkActive: 'feedback', twoLevel: [], iconName: 'icon-dianhuahuifang'
                },
                {
                    name: '充值', linkActive: 'recharge',
                    twoLevel: [
                        { name: '充值记录', linkActive: 'recharge/recharge-list' },
                        { name: '充值账户', linkActive: 'recharge/recharge-account-list' }
                    ],
                    iconName: 'icon-xinzengshoufeidan'
                },
                {
                    name: '演示', linkActive: 'demo', twoLevel: [{ name: '演示1', linkActive: 'demo/index' },
                        { name: '演示2', linkActive: 'demo/list' },
                        { name: '演示3', linkActive: 'demo/config' }], iconName: 'icon-bingli-moban'
                },
                {
                    name: '日常收支', linkActive: 'daily-expense', twoLevel: [], iconName: 'icon-copy18'
                },
                {
                    name: '收银对账', linkActive: 'cashier-check', twoLevel: [], iconName: 'icon-icon-test9'
                },
                {
                    name: '库存管理', linkActive: 'stock', twoLevel: [
                        { name: '当前库存', linkActive: 'stock/stockinfo' },
                        { name: '物品管理', linkActive: 'stock/goods-list' },
                        { name: '物品入库', linkActive: 'stock/input-stock-list' },
                        { name: '物品出库', linkActive: 'stock/output-stock-list' },
                        { name: '物品退货', linkActive: 'stock/return-goods-list' },
                        { name: '供应商管理', linkActive: 'stock/supplier-list' }
                    ], iconName: 'icon-copy18'
                },
                {
                    name: '诊所信息', linkActive: 'hospital', twoLevel: [], iconName: 'icon-icon-test9'
                },
                {
                    name: '统计', linkActive: 'statistics', twoLevel: [
                        { name: '主营收入报表', linkActive: 'statistics/main-income-report' },
                        { name: '资金流水报表', linkActive: 'statistics/capital-flow-report' },
                        { name: '预付款报表', linkActive: 'statistics/pre-deposit-report' },
                        { name: '利润报表', linkActive: 'statistics/profit-report' },
                        { name: '外加工统计报表', linkActive: 'statistics/process-report' },
                        { name: '医生工作量统计', linkActive: 'statistics/workload-report-index' },
                        { name: '门诊统计', linkActive: 'statistics/outpatient-report' },
                        { name: '入库统计', linkActive: 'statistics/in-stock-report-index' },
                        { name: '出库统计', linkActive: 'statistics/out-stock-report-index' },
                        { name: '考勤统计', linkActive: 'statistics/attendance-report' },
                    ], iconName: 'icon-icon-test9'
                },
                {
                    name: '外加工', linkActive: 'process-list',
                    twoLevel: [],
                    iconName: 'icon-shouye'
                },
                {
                    name: '利润', linkActive: 'profit',
                    twoLevel: [],
                    iconName: 'icon-shouye'
                },
                {
                    name: '个人中心', linkActive: 'my-center', twoLevel: [
                        { name: '账号管理', linkActive: 'my-center/account' },
                        { name: '我的排班', linkActive: 'my-center/my-sort-class' },
                        { name: '我的工作量', linkActive: 'my-center/my-workload' }
                    ], iconName: 'icon-yuyuefuzhen'
                },
                {
                    name: '资金流水', linkActive: 'capital-flow', twoLevel: [], iconName: 'icon-copy19'
                },
                {
                    name: '预存款', linkActive: 'pre-deposit', twoLevel: [], iconName: 'icon-shezhi'
                },
                {
                    name: '排班', linkActive: 'sort-class', twoLevel: [], iconName: 'icon-shezhi'
                }
            ]);
            // reject(e);
            //   }, 1000);
        });
    };
    return LeftNavService;
}());
LeftNavService = __decorate([
    core_1.Injectable()
], LeftNavService);
exports.LeftNavService = LeftNavService;
//# sourceMappingURL=left-nav.service.js.map