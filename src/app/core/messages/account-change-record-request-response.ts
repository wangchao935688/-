/**
 * Created by Li Jinglei on 2017/6/28.
 */
/* 流水详情 (request) */
import {CapitalCashierListResponse} from './model/capital-cashier-list-model';
export class DetailRequest {
  id?: string;
}
/* 流水详情 (response) */
export class DetailResponse {
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
export class ListRequest {
  // 员工ID，留空则不限
  doctorID?: string;
  // 账户ID，留空则不限
  accountID?: string;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string;
  // 查询的页码，留空则查询第一页
  pageIndex: number;
  // 查询的条数，留空则按默认
  pageSize: number;
}
/* 流水列表 (response) */
export class ListResponse {
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
export class CountRequest {
  // 员工ID，留空则不限
  doctorID?: string;
  // 账户ID，留空则不限
  accountID?: string;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime: string;
}
/* 流水统计 (response) */
export class CountResponse {
  // 流入
  Inflow: number;
  // 流出
  Outflow: number;
  // 期初
  BeginningBalance: number;
  // 期末
  EndingBalance: number;
}
export class TransferRequest {
  // 金额
  Money: number = null;
  // 转入账户
  AccountTo: string = null;
  // 转出账户
  AccountFrom: string = null;
}
