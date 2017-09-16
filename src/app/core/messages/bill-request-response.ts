/**
 * Created by bingq on 2017/6/7.
 */
import {PageRequest,PageResponse} from './page-request-response';

/**
 * 添加请求
 */
export class AddRequest {
  /**
   * 收费单详情
   */
  BillModel: AddBillModel;
  /**
   *收费项列表
   */
  BillItemModelList: BillItem_Edit[]
}

/**
 * 收费单详情
 */
export class AddBillModel{
  /**
   * 患者id
   */
  PatientID:string;
  /**
   * 优惠价（整单折扣或抹零后价格）
   */
  ReducedPrice:number;
  /**
   * 已支付
   */
  PaidAmount:number;
  /**
   * 备注
   */
  Note:string;
  /**
   * 医生编号
   */
  DoctorCode:string;
  /**
   * 护士编号
   */
  NurseCode:string;
  /**
   * 账单时间
   */
  BillTime:string
  /**
   * 类型 0.简略 1.明细
   */
  BillType:number
  /**
   * 1000 云诊所，2000爱牙分期，3000 B2B商城
   */
  PlatformId:number;
}

/**
 * 收费单详情
 */
export class BillItem_Edit{
  /**
   *收费项目分类ID
   */
  ChargeItemTypeID:string;
  /**
   *收费项目id
   */
  ChargeItemID:string;
  /**
   *数量
   */
  Number:number;
  /**
   *优惠价（单项折扣或抹零后价格，简略收费使用此项记录价格）
   */
  ReducedPrice:number;
}

/**
 * 全部收费单/搜索 请求
 */
export class GetBillListRequest extends PageRequest{
  DoctorCode:string;
  Status:any;
  KeyWords:string;
  StartTime:string;
  EndTime:string;

}

export class BillListModel{
  /**
   * 账单
   */
  Bill:BillModel;
  /**
   * 相关患者
   */
  Patient:PatientDetail;
}

/**
 * 收费单信息
 */
export class BillModel {
  /**
   *   唯一标识
   */
  ID: string;

  /**
   * 订单编号
   */
  BillCode: string;

  /**
   *   患者id
   */
  PatientID: string;
  // 患者id

  /**
   *   患者姓名
   */
  PatientName: string;

  /**
   *   单项折扣后价格
   */
  OriginalPrice: number;

  /**
   *   支付价（整单折扣或抹零后价格）
   */
  ReducedPrice: number;

  /**
   *  原价
   */
  NoDiscountPrice: number;

  /**
   *   折扣率
   */
  Discount: number;

  /**
   *   总折扣率
   */
  TotalDiscount: number;
  /**
   * 优惠金额
   */
  TotalReducedMoney: number;
  /**
   *   已支付
   */
  PaidAmount: number;
  /**
   *  退费金额
   */
  RefundedAmount: number;
  /**
   *   欠费
   */
  ArrearagePrice: number;

  /**
   * 备注
   */
  Note: string;

  /**
   * 医生编号
   */
  DoctorCode: string;

  /**
   *   医生姓名
   */
  DoctorName: string;

  /**
   *  护士编号
   */
  NurseCode: string;

  /**
   *  护士姓名
   */
  NurseName: string;
  /**
   *   贷款金额
   */
  AmountApp: number;

  /**
   *   业务类型 1.普通 2.分期
   */
  BussinesType: number;

  /**
   *   推荐人姓名
   */
  ReferrerName: string;

  /**
   *  账单时间
   */
  BillTime: string;

  /**
   *   最后付费时间
   */
  LastPayTime: string;

  /**
   *   类型 0.待收费 1.已付清 2.欠费 3.退费 4.作废 5.已关闭 6.已锁定
   */
  BillStatus: number;

  /**
   * 类型 0.简略 1.明细
   */
  BillType: number;

  /**
   *   作废原因
   */
  CancelReason: string;

  /**
   *   退费原因
   */
  RefundReason: string;

  /**
   *   1000 云诊所，2000爱牙分期，3000 B2B商城
   */
  PlatformId: number;

  /**
   *   作废人名称/最后操作人名称
   */
  LastOperator: string;

  /**
   *   作废时间/最后操作时间
   */
  LastOperationTime: string;
  /**
   *   退费人名称/最后收费人
   */
  LastPayee: string;
}

/**
 * 患者信息
 */
export class PatientDetail {
  /**
   *   患者Id
   */
  Id: string;
  /**
   *   医院编号
   */
  HospitalCode: string;

  /**
   *   患者姓名
   */
  PatientName: string;

  /**
   *   患者编号
   */
  PatientCode: string;
  /**
   * 是否是重要患者 1重要 0不重要
   */
  IsImportant: boolean;

  /**
   *  是否欠费
   */
  IsArrearage: boolean;

  /**
   *  性别 0 男 1 女
   */
  Sex: boolean;

  /**
   *    患者年龄
   */
  Age: number;

  /**
   * 出生日期
   */
  BirthDate: string;

  /**
   * 电话
   */
  Tel: string;

  /**
   * 联系方式（座机）
   */
  Phone: string;

  /**
   *  其他联系方式
   */
  OtherContacts: string;

  /**
   *   省份
   */
  Province: string;

  /**
   *   城市
   */
  City: string;

  /**
   *   地区
   */
  Area: string;

  /**
   *  详细地址
   */
  Address: string;

  /**
   * 头像
   */
  Image: string;

  /**
   *  意向医生code
   */
  IntentionDoctorCode: string;

  /**
   *  意向医生姓名
   */
  IntentionDoctorName: string;

  /**
   *  标签编号
   */
  RelationCode: string;

  /**
   *   标签名称
   */
  RelationName: string;

  /**
   *   患者来源编号
   */
  PatientsWith: string;

  /**
   *  患者来源名称
   */
  PatientsWithName: string;

  /**
   *   备注
   */
  Note: string;

  /**
   *   初诊时间
   */
  FirstDate: string;

  /**
   * 首诊医师code
   */
  FirstDoctor: string;

  /**
   *   首诊医师
   */
  FirstDoctorName: string;

}

/**
 * 全部收费单/搜索 响应
 */
export class GetBillListResponse extends PageResponse{
  Items:BillListModel[];
}

/**
 * 收费单详情请求
 */
export class DetailsRequest{

}
/**
 * 收费项
 */
export class BillItemModel{
  /**
   * 唯一标识，id
   */
  Id:string;
  /**
   * 订单ID
   */
  BillID:string;
  /**
   * 收费项目分类ID
   */
  ChargeItemTypeID:string;
  /**
   *收费项目分类名称
   */
  ChargeItemTypeName:string;
  /**
   *收费项目id
   */
  ChargeItemID:string;
  /**
   *收费项目名称
   */
  ChargeItemName:string;
  /**
   *单位
   */
  Unit:string;
  /**
   *数量
   */
  Number:number;
  /**
   *原价
   */
  OriginalPrice:number;
  /**
   *优惠价（单项折扣或抹零后价格，简略收费使用此项记录价格）
   */
  ReducedPrice:number;
  /**
   * 折扣率
   */
  Discount:number;

  /**
   * 是否关联库存商品 0.不关联（原1.诊疗） 1.关联（原2.药品）
   */
  ConnectToGoods:boolean;
  /**
   * 库存商品ID
   */
  GoodsId:string;
}
/**
 * 支付记录
 */
export class BillPayRecordModel{
  PayPrice:number;
  PayTime:string;
  PayeeCode:string;
  PayeeName:string;
  ChangeRecoed:HospitalAccountChangeRecord_Simple[];
}
/**
 * 诊所账户流水查询模型 简略版
 */
export class HospitalAccountChangeRecord_Simple{
  /**
   *标识
   */
  ID:string;
  /**
   *交易类别，与OutID配合使用 0.账户初始化 1.预收费充值 2.预收费消费 3.收费单 4.日常收入支出单 5.转账 例如：TradeType为1，则OutID为充值单ID；TradeType为3，则OutID为收费单ID
   */
  TradeType:number;
  /**
   *变动钱数
   */
  Money:number;
  /**
   *支付/收款账户类型（只冗余，不连锁修改，目前仅为了区分预付款）
   */
  PayType:number;
  /**
   *支付时间
   */
  PayTime:string;
  /**
   *诊所账户id
   */
  AccountID:string;
  /**
   *账户名称
   */
  AccountName:string;
}
/**
 * 收费单详情响应
 */
export class BillDetailRequest {
  ID: string;
}
export class DetailsResponse {
  Bill: BillModel;
  Patient: PatientDetail;
  BillItem: BillItemModel[];
  RecordList: BillPayRecordModel[];
}


/**
 * 作废收费单
 */
export class CancelRequest {
  /**
   * 订单id
   */
  BillID: string;
  /**
   * 最后修改时间
   */
  Time: string;
  /**
   * 作废原因
   */
  CancelReason: string;
}
export class CancelResponse {

}

/**
 * 编辑收费单
 */
export class EditRequest {
  /**
   * 收费单详情
   */
  BillModel: Bill_Update;
  /**
   * 收费项列表
   */
  BillItemModelList: BillItem_Edit[];
}

/**
 * 编辑收费单详情
 */
export class Bill_Update {
  /**
   *
   */
  ID: string;
  /**
   *原价（单项折扣后价格）
   */
  OriginalPrice: number;
  /**
   *优惠价（整单折扣或抹零后价格）
   */
  ReducedPrice: number;
  Note: string;
  /**
   *最后付费时间与最后操作时间之间的较大值
   */
  Timestamp: string;
    /**
     *类型 0.简略 1.明细
     */

  BillType: number;
  /**
   * 1000 云诊所，2000爱牙分期，3000 B2B商城
   */
  PlatformId: number;
}


// export class EditResponse{
//
// }

/**
 * 收费单退费请求
 */
export class RefundRequest {

  BillID: string;
  Time: string;
  /**
   * 备注
   */
  Note: string;
}

/**
 * 收费 请求
 */
export class ChargeRequest {
  /**
   * 收费单Id
   */
  BillID: string;
  /**
   * 账户集合
   */
  AccountList: HospitalAccount_Change[]
  /**
   * 最后修改时间
   */
  Time: string;

  /**
   * 备注
   */
  Note: string;
}
/**
 * 账户余额变动模型
 */
export class HospitalAccount_Change {
  ID: string;
  Money: number;
}
/*
* 患者收费结账列表
* */
export class GetPatientBillRequest {
  patientID: string;
}
export class GetPatientBillResponse {
  Id: string;
  // 1病历 2收费单
  Flog?: number;
  // 订单编号
  BillCode?: string;
  // 病历code
  CaseCode?: string;
  // 医生code
  DoctorCode?: string;
  // 医生姓名
  DoctorName?: string;
  // 时间
  VisitingTime?: string;
  // 价格
  Price?: number;
  // 类型 0.简略 1.明细
  BillType?: number;
  // 类型 0.待收费 1.已付清 2.欠费 3.退费 4.作废 5.已关闭 6.已锁定
  BillStatus?: number;
  // 0初诊 1复诊
  PatlogType?: number;
  //  病例标签名称，逗号隔开
  RelationName?: string;
}
