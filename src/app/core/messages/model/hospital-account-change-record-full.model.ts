export class HospitalAccountChangeRecordFull {
  // 流水号，暂时使用id的hash
  SerialNumber: number;
  // 外部单据ID 详见TradeType说明
  OutID: string;
  // 流水类别描述（用于显示）
  TypeDescription: string;
  // 创建人code
  Creator: string;
  // 创建人姓名
  CreatorName: string;
  // 标识
  ID: string;
  // 交易类别，与OutID配合使用 0.账户初始化 1.预收费充值 2.预收费消费 3.收费单 4.日常收入支出单 5.转账 例如：TradeType为1，则OutID为充值单ID；TradeType为3，则OutID为收费单ID
  TradeType: number;
  // 变动钱数
  Money: number;
  // 支付/收款账户类型（只冗余，不连锁修改，目前仅为了区分预付款）
  PayType: number;
  // 支付时间
  PayTime: string;
  // 诊所账户id
  AccountID: string;
  // 账户名称
  AccountName: string;
}
