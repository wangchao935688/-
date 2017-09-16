import {PageResponse, PageRequest} from "./page-request-response";
import {HospitalAccountChangeRecordFull} from "./model/hospital-account-change-record-full.model";
/**
 * 获取利润变动列表 (request)
 */
export class AccountChangeRecordGetProfitListRequest {
  // 0.收入 1.支出
  InflowOrOutflow: number;
  // 0.主营收入 1.日常收支，留空则不限
  MainOrOther: any;
  // 日常收支类型 仅MainOrOther为0时起作用，留空则不限
  OtherType: string;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime: string;
  pageIndex: number;
  pageSize: number;
}

/**
 * 获取利润变动列表 (response)
 */
export class AccountChangeRecordGetProfitListResponse extends PageResponse {
  Items: HospitalAccountChangeRecordFull[];
}


/**
 * 获取利润统计 (request)
 */
export class AccountChangeRecordGetProfitStatisticsRequest {
  // 0.收入 1.支出，留空则不限
  inflowOrOutflow: any = '';
  // 0.主营收入 1.日常收支，留空则不限
  mainOrOther: any = '';
  // 日常收支类型 仅MainOrOther为0时起作用，留空则不限
  otherType: string = '';
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime: string = '';
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime: string = '';
}

/**
 * 获取利润统计 (response)
 */
export class AccountChangeRecordGetProfitStatisticsResponse {
  // 收入合计
  Inflow: number = 0;
  // 主营收入
  Inflow_Main: number = 0;
  // 日常收入
  Inflow_Other: number = 0;
  // 支出合计
  Outflow: number = 0;
  // 利润
  Sum: number = 0;
}
