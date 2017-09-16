/**
 * Created by bingq on 2017/5/29.
 */
import {ShiftTypeSimple} from "./sort-class-request-response";
/**
 * 登录请求数据
 */
export class LoginRequest {
  /**
   *登录名
   */
  UserName:string;
  /**
   *登录密码 md5加密
   */
  Password:string;
  /**
   *设备类型
   */
  DeviceType:string;
  /**
   *设备识别码
   */
  DeviceToken:string;
  /**
   *分辨率
   */
  ResolutionSize:string;
  RegistrationId:string;
  AutoSignIn:boolean;
}
/**
 * 登录响应数据
 */
export class LoginResponse {
Web:WebClientInfo;
Workers:WorkerInfoModel[];
}

/**
 *web登录成功,相关信息
 */
class WebClientInfo {
  UserCookie: string;
  Cookie: string;
}

/**
 *员工信息
 */
export class WorkerInfoModel {
  UserID: number;
  HospitalCode: string;
  HospitalName: string;
  WorkerCode: string;
  WorkerName: string;
  WorkerID: string;
  WorkerType: string;
  HeadImageUrl: string;
  Province: string;
  City: string;
  Area: string;
}

/**
 *修改密码
 */
export class ChangePasswordRequest {
  // 旧密码
  OldPassword: string;
  // 新密码
  NewPassword: string;
}

/**
 *绑定手机
 */
export class ChangeTelRequest {
  // 密码
  Password: string;
  // 手机号
  Tel: string;
  // 验证码
  VerificationCode: string;
}

/**
 *验证密码
 */
export class CheckPasswordRequest {
  // 密码
  Password: string;
}

/**
 *获取验证码
 */
export class SendVerificationCodeRequest {
  // 手机号
  Tel: string;
  // 验证码类型
  SendType: number;
}

/**
 *校验验证码
 */
export class CheckVerificationCodeRequest {
  // 手机号
  Tel: string;
  // 验证码类型
  SendType: number;
  // 验证码
  CheckCode: string;
}
export class CheckVerificationCodeResponse {
  // 是否正确
  IsTrue: boolean;
}

/**
 *获取我的排班
 */
export class GetMyShiftListRequest {
  // 开始时间（yyyy-MM-dd），必填
  beginTime: string;
  // 结束时间（yyyy-MM-dd），必填
  endTime: string;
}
export class GetMyShiftListReponse {
  // 排班日期
  Date: string;
  // ID
  ID: string;
  // 排班类型模型
  TypeModel: ShiftTypeSimple;
}
/**
 *获取工作量
 */
export class PersonWorkloadRequest {
  // 0.按日分组 1.按月分组 必填
  groupByDayOrMonth: number;
  // 医生id 必填
  doctorID: string;
  // 开始时间（yyyy-MM-dd），必填
  beginTime: string;
  // 结束时间（yyyy-MM-dd），必填
  endTime: string;
  // 是否包含类别列表 必填 web true app false
  isIncludeType: boolean;
}
export class PersonWorkloadResponse {
  // 总收入
  TotalPrice: number;
  // 列表
  Items: Array<PersonWorkloadModel>;
  // 类别列表
  TypeList: Array<WorkloadDateModel>
}
export class PersonWorkloadModel {
  // 日期
  Date: string;
  // 原价
  NoDiscountPrice: number;
  // 优惠金额
  PrivilegePrice: number;
  // 账单金额
  ReducedPrice: number;
  // 已收
  EarningPrice: number;
  // 历史欠款
  HistoryDebt: number;
  // 历史代收费
  HistoryCharge: number;
  // 退费
  ReturnPrice: number;
  // 收入
  TotallPrice: number;
}
export class WorkloadDateModel {
  // 日期
  Date: string;
  // 总计金额
  TotalPrice: number;
  // 类别列表
  Items: Array<WorkloadTypeModel>;
}
export class WorkloadTypeModel {
  // 收费项类别id
  ChargeItemTypeID: string;
  // 收费项类别名称
  ChargeItemTypeName: string;
  // 金额
  Price: number;
}

/**
 *获取图形验证码
 */
export class VerificationCodeResponse {
  // MD5加密串
  Md5: string;
  // 过期时间
  Time: string;
  // 验证码
  VerificationCode: string;
  // 图形
  Image: string;
}
