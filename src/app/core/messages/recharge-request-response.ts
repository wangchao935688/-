import {ReferrerModel} from "./model/referrer.model";
import {OperatorModel} from "./model/operator.model";
import {AccountRechargeModel} from "./model/account-recharge.model";
import {PatientSimpleTelModel} from "./model/patient-simple-tel.model";
/**
 * 充值单列表
 */
export class RechargeGetListRequest {
  // 推荐人ID，留空则不限
  referrerId: string;
  // 充值账户列表，留空则不限
  accountIDArray: string;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime: string;
  // 关键字，留空则不限
  keyword: string;
  // 查询的页码，留空则查询第一页
  pageIndex: number;
  // 查询的条数，留空则按默认
  pageSize: number;
}
/**
 * 充值单列表
 */
export class RechargeGetListResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: RechargeGetListItemResponse[];
}

export class RechargeGetListItemResponse {
  ID: string;
  RechargeCode: string;
  PatientID: string;
  PatientModel: PatientSimpleTelModel;
  Money: number;
  AccountName: string;
  Note: string;
  ReferrerId: string;
  ReferrerModel: ReferrerModel;
  OperatorModel: OperatorModel;
  RechargeTime: string;
  Disabled: boolean;
  CancelReason: string;
  LastOperationTime: string;
}


/**
 * 充值单详情
 */
export class RechargeGetResponse {
  // 唯一标识
  ID: string;
  // 充值单编码
  RechargeCode: string;
  // 患者id
  PatientID: string;
  // 患者详情
  PatientModel: PatientSimpleTelModel;
  // 支付金额
  Money: number;
  // 支付账户名称
  AccountName: string;
  // 备注
  Note: string;
  // 推荐人id
  ReferrerId: string;
  // 推荐人详情
  ReferrerModel: ReferrerModel;
  // 操作人详情
  OperatorModel: OperatorModel;
  // 充值时间
  RechargeTime: string;
  // 是否废除
  Disabled: boolean;
  // 作废原因
  CancelReason: string;
  // 作废时间/最后操作时间
  LastOperationTime: string;
}


/**
 * 充值账户列表 request
 */
export class RechargeAccountGetListRequest {
  // 搜索关键字
  keyword: string;
  // 排序枚举
  orderEnum: number;
  // 查询的页码，留空则查询第一页
  pageIndex: number;
  // 查询的条数，留空则按默认
  pageSize: number;
}

/**
 * 充值账户列表 response
 */
export class RechargeAccountGetListResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: RechargeAccountGetListItemsResponse[]
}

export class RechargeAccountGetListItemsResponse {
  // 患者id
  PatientID: string;
  // 患者模型
  PatientModel: PatientSimpleTelModel;
  // 预存款余额
  Balance: number;
  // 消费总额
  TotalConsumption: number;
  // 充值总额
  TotalRecharge: number;
}

/**
 * 充值账户详情 request
 */
export class RechargeAccountGetRequest {
  // 患者id
  patientID: string;
}

/**
 * 充值账户详情 response
 */
export class RechargeAccountGetResponse {
  // 患者id
  PatientID: string;
  // 患者模型
  PatientModel: PatientSimpleTelModel;
  // 预存款余额
  Balance: number;
  // 消费总额
  TotalConsumption: number;
  // 充值总额
  TotalRecharge: number;
}

/**
 * 充值账户变动记录 request
 */
export class RechargeAccountChangeRecordRequest {
  patientID: string;
  // 查询的页码，留空则查询第一页
  pageIndex?: number;
  // 查询的条数，留空则按默认
  pageSize?: number;
}
/**
 * 充值账户变动记录 response
 */
export class RechargeAccountChangeRecordResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: RechargeAccountChangeRecordItemsResponse[];
}
export class RechargeAccountChangeRecordItemsResponse {
  // 流水id
  ID: string;
  // 流水数额
  Money: number;
  // 变动后余额
  CurrentBalance: number;
  // 流水类别
  RecordType: string;
  // 流水时间
  RecordTime: string;
}

export class RechargeRechargeRequest {
  // 患者id
  PatientID: string;
  // 账户
  AccountRechargeModel: AccountRechargeModel;
  // 备注
  Note: string;
  // 推荐人id
  ReferrerId: string;
}

/**
 * 作废充值单 request
 */
export class RechargeCancelRequest {
  ID: string;
  // 最后修改时间
  Time: string;
  // 作废原因
  CancelReason: string;
}



