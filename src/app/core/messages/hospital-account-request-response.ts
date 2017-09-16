export class GetHospitalAccountTypeListResponse {
  // 支付方式编码 主键
  TypeCode: number;
  // 支付方式名称
  TypeName: string;
  // 图标
  Image: string;
  // 是否可见 1.可见 0.不可见
  Visible: boolean;
}
/* 账户列表 (request) */
export class AccountRequest {
  IncludeAdvanceAccount?: boolean;
}
/* 账户列表 (response) */
export class HospitalAccountFull {
  ID?: string;
  // 账户名称
  AccountName: string;
  // 账户类型
  AccountType: number;
  // 账户余额
  Balance: number;
  // 是否可见 1.可见 0.不可见
  Visible?: number;
  // 是否禁用 1.禁用 0.正常
  Disabled?: number;
  // 图片
  Image?: string;
}
/*
* 诊所认证状态
* */
export class GetAuthenticationStateResponse {
  // 状态 -1 未审核 0 审核中 1 审核通过 2未通过
  State: number;
}
