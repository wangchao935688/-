/**
 * Created by Li Jinglei on 2017/6/24.
 */
/* 流水详情 (request) */
import {CapitalCashierListResponse} from './model/capital-cashier-list-model';
import {PageRequest} from "./page-request-response";
export class GetCashFlowDetailRequest {
  id?: string;
}
/* 流水详情 (response) */
export class GetCashFlowDetailResponse {
  //  流水号，暂时使用id的hash
  SerialNumber?: number;
  // 外部单据ID 详见TradeType说明
  OutID?: string;
  // 流水类别描述（用于显示）
  TypeDescription?: string;
  // 创建人code
  Creator?: string;
  // 创建人姓名
  CreatorName?: string;
  // 标识
  ID?: string;
  // 交易类别，与OutID配合使用 0.账户初始化 1.预收费充值 2.预收费消费 3.收费单 4.日常收入支出单 5.转账 例如：TradeType为1，则OutID为充值单ID；TradeType为3，则OutID为收费单ID
  TradeType?: number;
  // 变动钱数
  Money?: number;
  // 支付/收款账户类型（只冗余，不连锁修改，目前仅为了区分预付款）
  PayType?: number;
  // 支付时间
  PayTime?: string;
  // 诊所账户id
  AccountID?: string;
  // 账户名称
  AccountName?: string;
}
/* 流水列表 (request) */
export class GetCashFlowListRequest {
  // 员工ID，留空则不限
  doctorID?: string = null;
  // 账户ID，留空则不限
  accountID?: string = null;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string = null;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string = null;
  pageIndex = 1;
  pageSize = 10;
}
/* 流水列表 (response) */
export class GetCashFlowListResponse {
  // 当前页码
  CurrentPage?: number;
  // 总页码
  TotalPages?: number;
  // 总条数
  TotalItems?: number;
  // 每页条数
  ItemsPerPage?: number;
  // 流水列表
  Items:  Array<CapitalCashierListResponse>;
}
/* 流水统计 (request) */
export class GetCashFlowStatisticsRequest {
  // 员工ID，留空则不限
  doctorID?: string = null;
  // 账户ID，留空则不限
  accountID?: string = null;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime: string = null;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime: string = null;
}
/* 流水统计 (response) */
export class GetCashFlowStatisticsResponse {
  // 流入
  Inflow: number;
  // 流出
  Outflow: number;
  // 期初
  BeginningBalance: number;
  // 期末
  EndingBalance: number;
}
/* 账户列表 (request) */
export class AccountRequest {
  IncludeAdvanceAccount?: number;
}

