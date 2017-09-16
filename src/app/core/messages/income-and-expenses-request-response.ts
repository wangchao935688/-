/**
 * 请求列表所需的参数模板
 */
export class GetListRequest {
  // 类型 0.收入 1.支出
  type: number;
  // 日常收支类型id
  typeID?: string;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string;
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string;
  // 查询的页码，留空则查询第一页
  pageIndex?: number;
  // 查询的条数，留空则按默认
  pageSize?: number;
}
/**
 * 分页获取回访列表：单号、时间、类别、金额、账户、经手人、状态
 */
export class GetListResponse {
  TotalAmount: number;
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: GetListItemResponse[];
}
export class GetListItemResponse {
      ID: string;
      // 日常收支单编码
      Code: string;
      // 收入支出金额
      Amount: number;
      // 类型 0.收入 1.支出
      Type: number;
      // 收支分类ID
      TypeID: string;
      // 收支分类名称
      TypeName: string;
      // 收支分类图标
      TypeIcon: string;
      // 诊所账户id
      AccountID: string;
      // 诊所账户名称
      AccountName: string;
      // 创建时间
      CreateTime: string;
      // 创建人/确认人
      Creater: string;
      // 经手人用户ID
      HandlerID: string;
      // 经手人模型
      HandlerModel: GetListItemPatientModelResponse;
      // 图像资料
      Image: string;
      // 备注
      Note: string;
      // 是否已废除
      Disabled: boolean;
      // 作废原因
      CancelReason: string;
      LastOperator: string;
      // 作废时间/最后操作时间
      LastOperationTime: string;
}
export class GetListItemPatientModelResponse {
  WorkerId: string;
  WorkerCode: string;
  WorkerName: string;
  HeadImageUrl: string;
  WorkerType: number;
}
/**
 * 新增日常收支
 */
export class AddRequest {
  // 日常收支类型
  Type?: number;
  // 收支分类ID
  TypeID?: string;
  // 诊所账户变动模型
  AccountChange?: AChange;
  // 经手人用户ID
  HandlerID?: string;
  // 图像资料
  Image?: string;
  // 备注
  Note?: string;
}
export class AChange {
  ID: string;
  Money: number;
}
/**
 * 获取日常收支类型列表Request
 */
export class GetTypeListRequest {
  // 类型
  type: number;
}
/**
 * 获取日常收支类型列表Response
 */
export class GetTypeListResponse {
  // 唯一标识
  ID: string;
  // 日常收支分类名称
  TypeName: string;
  // 图标
  IconUrl: string;
}
/**
 * 日常收支详情
 */
export class GetResponse {
  // 唯一标识
  ID: string;
  // 日常收支单编码
  Code: string;
  // 收入支出金额
  Amount: number;
  // 类型 0.收入 1.支出
  Type: number;
  // 收支分类ID
  TypeID: string;
  // 收支分类名称
  TypeName: string;
  // 收支分类图标
  TypeIcon: string;
  // 诊所账户id
  AccountID: string;
  // 诊所账户名称
  AccountName: string;
  // 创建时间
  CreateTime: string;
  // 创建人/确认人
  Creater: string;
  // 经手人用户ID
  HandlerID: string;
  // 经手人模型
  HandlerModel: Handler;
  // 图像资料
  Image: string;
  // 备注
  Note: string;
  // 是否已废除
  Disabled: boolean;
  // 作废原因
  CancelReason: string;
  // 最后确认人
  LastOperator: string;
  // 作废时间/最后操作时间
  LastOperationTime: string;

}
export class Handler {
  // 员工id
  WorkerId: string;
  // 员工编号
  WorkerCode: string;
  // 员工姓名
  WorkerName: string;
  // 员工头像
  HeadImageUrl: string;
  // 员工类型
  WorkerType: number;
}
/**
 * 日常收支详情
 */
export class GetRequest {
  // 日常收支ID
  id: string;
}
/**
 * 日常收支作废
 */
export class CancelRequest {
  // ID
  ID: string;
  // 作废原因
  CancelReason: string;
  // 最后操作时间
  LastOperationTime: string;
}
/**
 * 日常收支类型编辑
 */
export class EditTypeRequest {
  // 唯一标识（留空为添加）
  ID?: string;
  // 日常收支类型
  Type: number;
  // 日常收支分类名称
  TypeName: string;
  // 图标ID
  IconUrl: string;
}
/**
 * 日常收支类型删除
 */
export class DeleteTypeRequest {
  // ID
  ID: string;
}
/**
 * 日常收支类型图标Req
 */
export class IncomeAndExpenseIconListRequest {
  // 0收入1支出
  type: number;
}

