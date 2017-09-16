/**
 * Created by chenmeng on 2017/7/24.
 */
import {PageRequest, PageResponse} from './page-request-response';


/**
 * 主营收入统计报表请求
 */
export class MainIncomeRequest {
  groupByDayOrMonth: number;  //0.按日分组 1.按月分组，不得为空
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
/**
 * 主营收入统计报表响应
 */
export class MainIncomeResponse {
  TotalInflow: number;  //总流入
  TotalOutflow: number; //总流出
  TotalSum: number;     //总合计
  Items: Array<MoneyStatisticsModel>; //按日统计列表
}
export class MoneyStatisticsModel {
  Date: string;   //日期或月份
  Inflow: number;  //流入
  Outflow: number; //流出
  Sum: number;     //合计
}

/**
 * 资金流水统计报表
 */
export class CashFlowRequest {
  groupByDayOrMonth: number;  //0.按日分组 1.按月分组，不得为空
  accountID?: string = null;  //账户ID，留空则不限
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class CashFlowResponse {
  TotalInflow: number;         //总流入
  TotalOutflow: number;        //总流出
  TotalSum: number;            //总合计
  Items: Array<MoneyStatisticsModel>; //按日统计列表
}
/**
 * 预存款统计报表
 */
export class AdvanceMoneyRequest {
  groupByDayOrMonth: number;   //0.按日分组 1.按月分组，不得为空
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class AdvanceMoneyResponse {
  TotalInflow: number;         //总流入
  TotalOutflow: number;        //总流出
  TotalSum: number;            //总合计
  Items: Array<MoneyStatisticsModel>; //按日统计列表
}
/**
 * 利润统计报表
 */
export class ProfitRequest {
  groupByDayOrMonth: number;   //0.按日分组 1.按月分组，不得为空
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class ProfitResponse {
  TotalInflow: number;         //总流入
  TotalOutflow: number;        //总流出
  TotalSum: number;            //总合计
  Items: Array<MoneyStatisticsModel>; //按日统计列表
}
/**
 * 个人接诊
 */
export class PersonReceptionRequest {
  groupByDayOrMonth: number;   //0.按日分组 1.按月分组，不得为空
  doctorID: string;            //医生ID
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class PersonReceptionResponse {
  TotalNumber: number;         //总人次
  FirstVisitNumber: number;    //总初诊数量
  ReturnVisitNumber: number;   //总复诊数量
  Items: Array<PersonReceptionModel>;  //列表
}
export class PersonReceptionModel {
  Date: string;                //日期或月份
  FirstVisitNumber: number;    //初诊数量
  ReturnVisitNumber: number;   //复诊数量
  TotalNumber: number;         //个人总数量
}
/**
 * 全部医生接诊统计
 */
export class AllReceptionRequest {
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class AllReceptionResponse {
  TotalNumber: number;         //总人次
  FirstVisitNumber: number;    //总初诊数量
  ReturnVisitNumber: number;   //总复诊数量
  Items: Array<AllReceptionModel>;  //列表
}
export class AllReceptionModel {
  DoctorCode: string;
  DoctorName: string;          //医生名字
  FirstVisitNumber: number;    //初诊数量
  ReturnVisitNumber: number;   //复诊数量
  TotalNumber: number;         //个人总数量
}
/**
 * 个人外加工
 */
export class PersonProcessRequest {
  groupByDayOrMonth: number;   //0.按日分组 1.按月分组，不得为空
  doctorID: string;            //医生ID
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class PersonProcessResponse {
  TotalNum: number;            //总件数
  TotalPrice: number;          //总价格
  Items: Array<PersonOutSideProcessModel>;  //列表
}
export class PersonOutSideProcessModel {
  Date: string;                //日期或月份
  Num: number;                 //件数
  Price: number;               //价格
}
/**
 * 全部医生外加工统计
 */
export class AllProcessRequest {
  beginTime: string;          //开始日期（yyyy-MM-dd），不得为空
  endTime: string;            //结束日期（yyyy-MM-dd），不得为空
}
export class AllProcessResponse {
  TotalNum: number;            //总件数
  TotalPrice: number;          //总价格
  Items: Array<AllOutSideProcessModel>;  //列表
}
export class AllOutSideProcessModel {
  DoctorName: string;          //医生名字
  Num: number;                 //加工数量
  Price: number;               //加工价格
}
/**
 * 全部医生工作量
 */
export class AllWorkloadRequest {
  beginTime: string;            //开始日期（yyyy-MM-dd），必填
  endTime: string;              //结束日期（yyyy-MM-dd），必填
  isIncludeType: boolean;       //是否包含类别列表 必填 web true app false
}
export class AllWorkloadResponse {
  TotalPrice: number;           //总收入
  Items: Array<AllWorkloadModel>;         //列表
  TypeList: Array<WorkerloadDoctorModel>; //类别列表
}
export class AllWorkloadModel {
  DoctorName: string;           //医生名字
  NoDiscountPrice:number;       //原价
  PrivilegePrice:number;        //优惠金额
  ReducedPrice:number;          //账单金额
  EarningPrice:number;          //已收
  HistoryDebt:number;           //历史欠款
  HistoryCharge:number;         //历史代收费
  ReturnPrice:number;           //退费
  TotalPrice: number;           //收入
}
export class WorkerloadDoctorModel {
  DoctorCode: string;           //医生编号
  DoctorName: string;           //医生名字
  TotalPrice: number;           //总计金额
  Items: Array<WorkloadTypeModel>;  //类别列表
}
export class WorkloadTypeModel {
  ChargeItemTypeID:string;      //收费项类别id
  ChargeItemTypeName:string;    //收费项类别名称
  Price: number;                //金额
}
/**
 * 医生个人工作量
 */
export class PersonWorkloadRequest {
  groupByDayOrMonth: number;    //0.按日分组 1.按月分组 必填
  doctorID: string;             //医生ID 必填
  beginTime: string;            //开始日期（yyyy-MM-dd），必填
  endTime: string;              //结束日期（yyyy-MM-dd），必填
  isIncludeType: boolean;       //是否包含类别列表 必填 web true app false
}
export class PersonWorkloadResponse {
  TotalPrice: number;           //总收入
  Items: Array<PersonWorkloadModel>;         //列表
  TypeList: Array<WorkloadDateModel>; //类别列表
}
export class PersonWorkloadModel {
  Date: string;                 //日期
  NoDiscountPrice:number;       //原价
  PrivilegePrice:number;        //优惠金额
  ReducedPrice:number;          //账单金额
  EarningPrice:number;          //已收
  HistoryDebt:number;           //历史欠款
  HistoryCharge:number;         //历史代收费
  ReturnPrice:number;           //退费
  TotalPrice: number;           //收入
  }
export class WorkloadDateModel {
  Date: string;                 //日期
  TotalPrice: number;           //总计金额
  Items: Array<WorkloadTypeModel>;  //类别列表
}
/**
 * 门诊统计
 */
export class ClinicRequest {
  groupByDayOrMonth: number;    //0.按日分组 1.按月分组 必填
  beginTime: string;            //开始日期（yyyy-MM-dd），必填
  endTime: string;              //结束日期（yyyy-MM-dd），必填
}
export class ClinicResponse {
  SeeDoctorNumber:number;       //就诊人次
  BookingNumber:number;         //预约人次
  PatlogNumber:number;          //挂号人次
  BookingNumber_NewPatient:number;  // 新患者预约人次
  PatlogNumber_NewPatient:number;   // 新患者挂号人次
  BookingRatio:number;          //预约占比
  SeeDoctorList:Array<ManTimeModel>;  //就诊列表
  BookingList:Array<ManTimeModel>;    //预约列表
  PatlogList:Array<ManTimeModel>;     //挂号列表
  FirstVisitNumber:number;      //初诊数量
  ReturnVisitNumber:number;     //复诊数量
  FirstVisitRatio:number;       //初诊占比
  ReturnVisitRatio:number;      //复诊占比
  VisitList:Array<PatlogTypeModel>;     //初复诊列表
  BookingCancelNumber:number;   //预约流失数量
  BookingCancelRatio:number;    //预约流失占比
  BookingCancelList:Array<NumRatioModel>;     //预约流失列表
  PatlogCancelNumber:number;    //挂号流失数量
  PatlogCancelRatio:number;     //挂号流失占比
  PatlogCancelList:Array<NumRatioModel>;     //挂号流失列表
  PatientNumber:number;         //患者数量
  NewPatientNumber:number;      //新患者数量
  PatientsWiteList:Array<NumRatioModel>;     //患者来源列表
  AimNumber:number;             //事项总数
  AimList:Array<NumRatioModel>;     //就诊事项列表
}
export class ManTimeModel {
  Num: number;                  //人次
  Date: string;                 //日期
}
export class PatlogTypeModel {
  DoctorCode: string;           //医生编号
  DoctorName: string;           //医生姓名
  FirstVisitNumber:number;      //初诊数量
  ReturnVisitNumber:number;     //复诊数量
  SeeDoctorNumber:number;       //就诊数量
  FirstVisitRatio:number;       //初诊占比
  ReturnVisitRatio:number;      //复诊占比
}
export class NumRatioModel {
  Code:string;                  //编号
  Name:string;                  //类型
  Num:number;                   //数量
  Ratio:number;                 //占比
}







