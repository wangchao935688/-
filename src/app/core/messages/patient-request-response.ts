/**
 * Created by bingq on 2017/5/31.
 */
import {PatientModel} from './model/patient.model';
import {PageRequest, PageResponse} from './page-request-response';
/**
 * 创建患者请求
 */
export class SavePatientRequest {
  /**
   *患者Id 如果id为空 则添加，否 则为修改。
   */
  Id?:  string;
  /**
   *患者姓名
   */
  PatientName?:  string;
  /**
   *患者编号
   */
  PatientCode?:  string;
  /**
   *是否是重要患者 1重要 0不重要
   */
  IsImportant?:  boolean;
  /**
   *0自动生成 1手动 首次进来，传1 （病历号重复，提交重新生成病历号并保存，返回手动修改病历号，button：返回、确定）
   */
  State?:  number;
  /**
   *性别 0 男 1 女
   */
  Sex?:  number;
  /**
   *患者年龄
   */
  Age?:  number;
  /**
   *出生日期
   */
  BirthDate?:  string;
  /**
   *电话
   */
  Tel?:  string;
  /**
   *区号
   */
  AreaCode?:  string;
  /**
   *联系方式（座机）
   */
  Phone?:  string;
  /**
   *省份
   */
  Province?:  string;
  /**
   *城市
   */
  City?:  string;
  /**
   *地区
   */
  Area?:  string;
  /**
   *详细地址
   */
  Address?:  string;
  /**
   *头像
   */
  Image?:  string;
  /**
   *意向医生code
   */
  IntentionDoctorCode?:  string;
  /**
   *意向医生姓名
   */
  IntentionDoctorName?:  string;
  /**
   *患者来源
   */
  PatientsWith?:  number;
  /**
   *标签名称
   */
  RelationName?:  string[];
  /**
   *备注
   */
  Note?:  string;
  /**
   *初诊时间
   */
  FirstDate?:  string;
  /**
   *首诊医师
   */
  FirstDoctor?:  string;

}
/**
 * 创建患者响应
 */
export class SavePatientResponse {
  /**
   * 患者Id
   */
  PatientID:  string;
}
/**
 * 搜索患者  (request)
 */
export class SearchPatientRequest extends PageRequest {
  /**
   * 搜索关键字
   */
  KeyWords:  string = null;
  /**
   * 是否仅按患者名搜索
   */
  IsOnlyName:  boolean = null;
}
export class SearchPatientResponse {
  CurrentPage:  number;
  TotalPages:  number;
  TotalItems:  number;
  ItemsPerPage:  number;
  Items:  PatientModel[];
}
/**
 * 账户余额 (request)
 */
export class PatientBalanceRequest {
  patientID:  string;
}
/**
 *患者列表请求
 */
export class GetPatientListRequest extends PageRequest {
  DoctorCode: string = null;
  IsImportant: boolean = null;
  /**
   * IsArrearage
   */
  IsArrearage: boolean = null;
  SatrtTime: string = null;
  EndTime: string = null;
  /**
   * 就诊事项
   */
  Aim: string = null;
  /**
   * RelationCode
   */
  RelationCode: string = null;
  /**
   * 患者来源code
   */
  PatientsWith: string = null;
  /**
   * 地址
   */
  Address: string = null;
  /**
   * 搜索关键字
   */
  KeyWords: string = null;
  /**
   * 排序
   */
  OrderBy: number = null;
}
/**
 * 患者列表响应
 */
export class GetPatientListResponse extends PageResponse {
Items: PatientModel[];
}
/**
 *患者病历简要详情请求
 */
export class CasePatientDetailsRequest {
  Id: string;
  DoctorCode?: string;
  /**
   * 具体那一天的日期
   */
  Date?: string;
}
/**
 *患者病历简要详情响应
 */
export class CasePatientDetailsResponse {
  PatientName: string;
  PatientCode: string;
  /**
   * 性别 0 男 1 女
   */
  Sex: number;
  /**
   * 就诊类型 0 初诊 1 复诊
   */
  PatlogType: number;
  /**
   * 当天第一个预约/挂号的医生
   */
  DoctorCode: string;
  DoctorName: string;
  NurseCount: number;
}
/**
 * 获取患者个人中心请求
 */
export class PatientCenterRequest {
  //  患者ID
  Id:  string;
}
/**
 * 获取患者个人中心响应
 */
export class PatientCenterResponse {
  // 患者信息
  Patient: DetailPatient;
  // 累计消费
  TotalPay: number;
  // 预存款
  AdvanceMoney: number;
  // 就诊数量
  PatlogCount: number;
  // 最近医生
  RecentlyDoctor: string;
  // 最近事项
  RecentlyAim: string;
  // 最近日期
  RecentlyDate: string;
  // 病例数量
  CaseCount: number;
  // 图片数量
  ImageCount: number;
  // 外加工数量
  ProcessCount: number;
  // 预约数量
  BookingCount: number;
  // 回访数量
  InterviewCount: number;
  // 下次预约时间
  NextBooking: string;
  // 下次回访时间
  NextInterview: string;

}
export class DetailPatient {
  // 患者Id
  Id: string;
  // 医院编号
  HospitalCode: string;
  // 患者姓名
  PatientName: string;
  // 患者编号
  PatientCode: string;
  // 是否是重要患者 1重要 0不重要
  IsImportant: boolean;
  // 是否欠费
  IsArrearage: boolean;
  // 性别 0 男 1 女
  Sex: number;
  // 患者年龄
  Age: number;
  // 出生日期
  BirthDate: string;
  // 电话
  Tel: string;
  // 联系方式（座机）
  Phone: string;
  // 拼音
  PhoneticCode: string;
  // 其他联系方式
  OtherContacts: string;
  // 省份
  Province: string;
  // 城市
  City: string;
  // 地区
  Area: string;
  // 详细地址
  Address: string;
  // 头像
  Image: string;
  // 意向医生code
  IntentionDoctorCode: string;
  // 意向医生姓名
  IntentionDoctorName: string;
  // 标签编号
  RelationCode: string;
  // 标签名称
  RelationName: string;
  // 患者来源编号
  PatientsWith: number;
  // 患者来源名称
  PatientsWithName: string;
  // 备注
  Note: string;
  // 初诊时间
  FirstDate: string;
  // 首诊医师
  FirstDoctor: string;
  // 首诊医师
  FirstDoctorName: string;

}

/*
* 患者详情
* */
export class GetPatientRequest {
  // 患者ID
  Id: string;
}
export class GetPatientResponse {
  // 就诊次数
  PatlogCount?: number;
  // 患者Id
  Id: string;
  // 医院编号
  HospitalCode?: string;
  // 患者姓名
  PatientName?: string;
  // 患者编号
  PatientCode?: string;
  // 是否是重要患者 1重要 0不重要
  IsImportant?: boolean;
  // 是否欠费
  IsArrearage?: boolean;
  // 性别 0 男 1 女
  Sex?: number;
  //  患者年龄
  Age?: number;
  // 出生日期
  BirthDate?: string;
  // 电话
  Tel?: string;
  // 联系方式（座机）
  Phone?: string;
  // 拼音
  PhoneticCode?: string;
  // 其他联系方式
  OtherContacts?: string;
  // 省份
  Province?: string;
  // 城市
  City?: string;
  // 地区
  Area?: string;
  // 详细地址
  Address?: string;
  // 头像
  Image?: string;
  // 意向医生code
  IntentionDoctorCode?: string;
  // 意向医生姓名
  IntentionDoctorName?: string;
  // 标签编号
  RelationCode?: string;
  // 标签名称
  RelationName?: string;
  // 患者来源编号
  PatientsWith?: number;
  // 患者来源名称
  PatientsWithName?: string;
  // 备注
  Note?: string;
  // 初诊时间
  FirstDate?: string;
  // 首诊医师
  FirstDoctor?: string;
  // 首诊医师
  FirstDoctorName?: string;
}

/*
* 患者就诊记录
* */
export class GetPatlogNotesRequest {
  Id: string;
  PageIndex?: number;
  PageSize?: number;
}
export class GetPatlogNotesResponse {
  CurrentPage?: number;
  TotalPages?: number;
  TotalItems?: number;
  ItemsPerPage?: number;
  Items: Array<PatlogNotesModel>;
}
export class PatlogNotesModel {
  // 挂号Id
  Id?: string;
  // 医生编号
  DoctorCode?: string;
  // 医生姓名
  DoctorName?: string;
  // 看病时间
  SeeDoctorTime?: string;
  // 列表
  List?: Array<CostAndCaseModel>;
}
export class CostAndCaseModel {
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
  // 病例标签名称，逗号隔开
  RelationName?: string;
}

/*
* 患者图像列表
* */
export class PatientImageListRequest {
  // 患者Id 不可为空
  Id: string;
  EndTime?: string;
}
export class PatientImageListResponse {
  Items?: Array<PatientPatientImage>;
}
export class PatientPatientImage {
  // 数量
  Count?: number;
  // 时间
  AddDateTime?: string;
  // 集合
  ImageList?: Array<PatientImage>;
}
export class PatientImage {
  // 图片Id
  Id?: string;
  // 图片名称
  ImgName?: string;
  // 图片路径
  ImgPath?: string;
  // 缩略图
  Thumbnail?: string;
  // 添加时间
  AddDateTime?: string;
}

/*
* 患者标签列表
* */
export class PatientRelationTypeListResponse {
  // 编号
  Code: string;
  // 名称
  Name: string;
}
/*
* 患者预约列表
* */
export class getBookingDetailsResponse {
  Id: string;
  // 患者Id
  PatientId?: string;
  // 患者code
  PatientCode?: string;
  // 医生code
  DoctorCode?: string;
  // 患者姓名
  PatientName?: string;
  // 医生姓名
  DoctorName?: string;
  // 是否重要
  IsImportant?: number;
  Sex?: number;
  Age?: number;
  // 添加时间
  AddDateTime?: string;
  // 就诊事项Code
  Aim?: string;
  // 就诊事项
  AimString?: string;
  //  备注
  Note?: string;
  // 类别 2挂号 1预约
  TableType?: number;
  // 状态： 0：未到达 1：候诊中 2：治疗中 3：已完成 -1：取消
  Status?: number;
  // 取消原因
  CancelName?: string;
  // 挂号类型 0初诊 1复诊
  PatlogType?: number;
  // 是否欠费 1欠费 0没欠
  IsNotPay?: number;
  // 0删除 1未删除
  PatientEnabled?: number;
  // 接诊时间
  SeeDoctorTime?: string;
  // 完成时间
  EndDoctor?: string;
  // 预约时间
  Date?: string;
  // 预约时间
  Time?: string;
  // 预约小时
  Minute?: string;
  // 预约时间
  Time2?: string;
  // 预约小时
  Minute2?: string;
  // 电话
  Tel?: string;
  // 联系方式（座机）
  Phone?: string;
}

