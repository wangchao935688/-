"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var page_request_response_1 = require("./page-request-response");
/**
 * 创建患者请求
 */
var SavePatientRequest = (function () {
    function SavePatientRequest() {
    }
    return SavePatientRequest;
}());
exports.SavePatientRequest = SavePatientRequest;
/**
 * 创建患者响应
 */
var SavePatientResponse = (function () {
    function SavePatientResponse() {
    }
    return SavePatientResponse;
}());
exports.SavePatientResponse = SavePatientResponse;
/**
 * 搜索患者  (request)
 */
var SearchPatientRequest = (function () {
    function SearchPatientRequest() {
    }
    return SearchPatientRequest;
}());
exports.SearchPatientRequest = SearchPatientRequest;
var SearchPatientResponse = (function () {
    function SearchPatientResponse() {
    }
    return SearchPatientResponse;
}());
exports.SearchPatientResponse = SearchPatientResponse;
/**
 * 账户余额 (request)
 */
var PatientBalanceRequest = (function () {
    function PatientBalanceRequest() {
    }
    return PatientBalanceRequest;
}());
exports.PatientBalanceRequest = PatientBalanceRequest;
/**
 *患者列表请求
 */
var GetPatientListRequest = (function (_super) {
    __extends(GetPatientListRequest, _super);
    function GetPatientListRequest() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetPatientListRequest;
}(page_request_response_1.PageRequest));
exports.GetPatientListRequest = GetPatientListRequest;
/**
 * 患者排序枚举
 */
var PatientOrderBy;
(function (PatientOrderBy) {
    /**
     * 添加时间正序
     */
    PatientOrderBy[PatientOrderBy["AddDateTimeAsc"] = 1] = "AddDateTimeAsc";
    /**
     * 添加时间倒序
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["AddDateTimeDesc"] = 2] = "AddDateTimeDesc";
    /**
     * 状态正序
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["StatusAsc"] = 3] = "StatusAsc";
    /**
     * 状态倒序
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["StatusDesc"] = 4] = "StatusDesc";
    /**
     * 拼音码正序
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["PhoneticCodeAsc"] = 5] = "PhoneticCodeAsc";
    /**
     * 拼音码倒序
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["PhoneticCodeDesc"] = 6] = "PhoneticCodeDesc";
    /**
     * 就诊时间正序
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["SeeDoctorTimeAsc"] = 7] = "SeeDoctorTimeAsc";
    /**
     *
     * @type {number}
     */
    PatientOrderBy[PatientOrderBy["SeeDoctorTimeDesc"] = 8] = "SeeDoctorTimeDesc";
    /**
     * 按日期倒序排列，每天按预约/挂号时间正序排列
     */
    PatientOrderBy[PatientOrderBy["DateDescStartTimeAsc"] = 9] = "DateDescStartTimeAsc";
    /**
     * 预约开始时间
     */
    PatientOrderBy[PatientOrderBy["StartTimeAsc"] = 10] = "StartTimeAsc";
    /**
     * 状态倒序，开始时间正序
     */
    PatientOrderBy[PatientOrderBy["StatusDescStartTimeAsc"] = 11] = "StatusDescStartTimeAsc";
    /**
     * 消费最多
     */
    PatientOrderBy[PatientOrderBy["CostMax"] = 12] = "CostMax";
    /**
     * 充值最多
     */
    PatientOrderBy[PatientOrderBy["RechargeMax"] = 13] = "RechargeMax";
    /**
     * 预约开始时间
     */
    PatientOrderBy[PatientOrderBy["StartTimeDesc"] = 14] = "StartTimeDesc";
})(PatientOrderBy = exports.PatientOrderBy || (exports.PatientOrderBy = {}));
/**
 * 患者列表响应
 */
var GetPatientListResponse = (function (_super) {
    __extends(GetPatientListResponse, _super);
    function GetPatientListResponse() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return GetPatientListResponse;
}(page_request_response_1.PageResponse));
exports.GetPatientListResponse = GetPatientListResponse;
/**
 *患者病历简要详情请求
 */
var CasePatientDetailsRequest = (function () {
    function CasePatientDetailsRequest() {
    }
    return CasePatientDetailsRequest;
}());
exports.CasePatientDetailsRequest = CasePatientDetailsRequest;
/**
 *患者病历简要详情响应
 */
var CasePatientDetailsResponse = (function () {
    function CasePatientDetailsResponse() {
    }
    return CasePatientDetailsResponse;
}());
exports.CasePatientDetailsResponse = CasePatientDetailsResponse;
/**
 * 获取患者个人中心请求
 */
var PatientCenterRequest = (function () {
    function PatientCenterRequest() {
    }
    return PatientCenterRequest;
}());
exports.PatientCenterRequest = PatientCenterRequest;
/**
 * 获取患者个人中心响应
 */
var PatientCenterResponse = (function () {
    function PatientCenterResponse() {
    }
    return PatientCenterResponse;
}());
exports.PatientCenterResponse = PatientCenterResponse;
var DetailPatient = (function () {
    function DetailPatient() {
    }
    return DetailPatient;
}());
exports.DetailPatient = DetailPatient;
/*
* 患者详情
* */
var GetPatientRequest = (function () {
    function GetPatientRequest() {
    }
    return GetPatientRequest;
}());
exports.GetPatientRequest = GetPatientRequest;
var GetPatientResponse = (function () {
    function GetPatientResponse() {
    }
    return GetPatientResponse;
}());
exports.GetPatientResponse = GetPatientResponse;
/*
* 患者就诊记录
* */
var GetPatlogNotesRequest = (function () {
    function GetPatlogNotesRequest() {
    }
    return GetPatlogNotesRequest;
}());
exports.GetPatlogNotesRequest = GetPatlogNotesRequest;
var GetPatlogNotesResponse = (function () {
    function GetPatlogNotesResponse() {
    }
    return GetPatlogNotesResponse;
}());
exports.GetPatlogNotesResponse = GetPatlogNotesResponse;
var PatlogNotesModel = (function () {
    function PatlogNotesModel() {
    }
    return PatlogNotesModel;
}());
exports.PatlogNotesModel = PatlogNotesModel;
var CostAndCaseModel = (function () {
    function CostAndCaseModel() {
    }
    return CostAndCaseModel;
}());
exports.CostAndCaseModel = CostAndCaseModel;
/*
* 患者图像列表
* */
var PatientImageListRequest = (function () {
    function PatientImageListRequest() {
    }
    return PatientImageListRequest;
}());
exports.PatientImageListRequest = PatientImageListRequest;
var PatientImageListResponse = (function () {
    function PatientImageListResponse() {
    }
    return PatientImageListResponse;
}());
exports.PatientImageListResponse = PatientImageListResponse;
var PatientPatientImage = (function () {
    function PatientPatientImage() {
    }
    return PatientPatientImage;
}());
exports.PatientPatientImage = PatientPatientImage;
var PatientImage = (function () {
    function PatientImage() {
    }
    return PatientImage;
}());
exports.PatientImage = PatientImage;
/*
* 患者标签列表
* */
var PatientRelationTypeListResponse = (function () {
    function PatientRelationTypeListResponse() {
    }
    return PatientRelationTypeListResponse;
}());
exports.PatientRelationTypeListResponse = PatientRelationTypeListResponse;
/*
* 患者预约列表
* */
var getBookingDetailsResponse = (function () {
    function getBookingDetailsResponse() {
    }
    return getBookingDetailsResponse;
}());
exports.getBookingDetailsResponse = getBookingDetailsResponse;
//# sourceMappingURL=patient-request-response.js.map