/**
 * Created by 67087 on 2017-06-30.
 */
import {PredepositListResponse} from './model/pre-deposit-list-model';
/* 分页获取患者预存款账户列表 (request) */
export class GetAdvanceMoneyListRequest {
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string;
  // 查询的页码，留空则查询第一页
  pageIndex?: number;
  // 查询的条数，留空则按默认
   pageSize?: number;
}
/* 分页获取患者预存款账户列表 (response) */
export class GetAdvanceMoneyListResponse {
  //  当前页
  CurrentPage?: number;
  //  总页数
  TotalPages?: number;
  // 数据总数
  TotalItems?: number;
  // 每页显示数据数
  ItemsPerPage?: number;
  // 创建人姓名
  CreatorName?: string;
  // 预存款列表
  Items:  Array<PredepositListResponse>;
}

/* 获取预存款变动统计 (request) */
export class GetAdvanceMoneyStatisticsRequest {
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string;
}

/* 获取预存款变动统计 (response) */
export class GetAdvanceMoneyStatisticsResponse {
  // 充值
  Inflow: number;
  // 消费
  Outflow: number;
  // 期初
  BeginningBalance: number;
  // 期末
  EndingBalance: number;
}
/* 流水详情 (request) */
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


