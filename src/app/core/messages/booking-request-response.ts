/**
 * Created by Li Jinglei on 2017/7/3.
 */
/*
 * 患者预约列表Request
 * */
import * as BookingSchedule from './model/booking.model';
import {assertNotNull} from "@angular/compiler/src/output/output_ast";
import {WorkerSimple} from "./model/worker_simple";

export class PatientBookingListRequest {
  // 开始日期
  StartTime?: string;
  // 结束日期
  EndTime?: string;
  // 医生编号
  DoctorCode?: string;
  // 0初诊 1复诊
  PatlogType?: number;
  // 1预约 2挂号
  TableType?: number;
  // 0未到达 1已到达 2治疗中 3已完成
  Status?: number;
  // 搜索关键字
  KeyWord?: string;
  // 患者编号
  PatientCode?: string;
  // 当前页
  PageIndex?: number;
  // 每页数
  PageSize?: number;
}

/*
 * 患者预约列表Response
 * */
export class PatientBookingListResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: Array<BookingSchedule.AllBookingModel>;
}

export class BookingDetailRequest {
  // 开始日期
  Id: string;
}

export class BookingDetailsResponse {
  /**
   * id
   * */
  Id: string;
  /**
   * 患者id
   * */
  PatientId: string;
  /**
   * 患者code
   * */
  PatientCode: string;
  /**
   * 医生code
   * */
  DoctorCode: string;
  /**
   * 患者姓名
   * */
  PatientName: string;
  /**
   * 医生姓名
   * */
  DoctorName: string;
  /**
   * 是否重要
   * */
  IsImportant: number;
  /**
   * 性别
   * */
  Sex: number;
  /**
   * 年龄
   * */
  Age: number;
  /**
   * 添加时间
   * */
  AddDateTime: Date;
  /**
   * 就诊事项Code
   * */
  Aim: BookingSchedule.DictDetail_Simple[];
  /**
   * 备注
   * */
  Note: string;
  /**
   *  类别   2   挂号   1   预约
   * */
  TableType: number;
  /**
   * 状态： 0：未到达 1：候诊中 2：治疗中 3：已完成 -1：取消
   * */
  Status: number;
  /**
   * 取消原因
   * */
  CancelName: string;
  /**
   * 挂号类型   0   初诊   1   复诊
   * */
  PatlogType: number;
  /**
   * 是否欠费   1   欠费   0   没欠
   * */
  IsNotPay: number;
  /**
   *  0    删除   1   未删除
   * */
  PatientEnabled: number;
  /**
   * 接诊时间
   * */
  SeeDoctorTime: Date;
  /**
   * 完成时间
   * */
  EndDoctor: Date;
  /**
   * 预约时间
   * */
  Date: Date;
  /**
   * 预约时间
   * */
  Time: string;
  /**
   * 预约小时
   * */
  Minute: string;
  /**
   * 预约时间
   * */
  Time2: string;
  /**
   * 预约小时
   * */
  Minute2: string;
  /**
   * 电话
   * */
  Tel: string;
  /**
   * 联系方式（座机）
   * */
  Phone: string;
}


/*
 * 日程详情Request
 * */
export class ScheduleDetailRequest {
  /**
   * 日程id
   * */
  Id: string;
}

/*
 * 日程详情Response
 * */
export class Schedule_FullDetailsResponse {
  /**
   * 日程ID
   * */
  Id: string;
  /**
   * 主题
   * */
  Name: string;
  /**
   * 发起人
   * */
  DoctorCode: string;
  /**
   * 发起人姓名
   * */
  DoctorName: string;
  /**
   * 开始时间
   * */
  StartTime: string;
  /**
   * 结束时间
   * */
  EndTime: string;
  /**
   * 时长
   * */
  Time: number;
  /**
   * 0永不 1分钟 2小时 3天
   * */
  TimeType: number;
  /**
   * 备注
   * */
  Note: string;
  /**
   * 添加时间
   * */
  Players: WorkerSimple[];
}


export class BookingScheduleListRequest {
  /**
   *   0 全部 1 预约 2 日程
   * */
  type: number = null;
  /**
   * 医生Code
   * */
  doctorCode: string = null;
  /**
   *就诊事项数组
   * */
  aim: string[] = null;
  /**
   * 0   初诊   1   复诊
   * */
  patlogType: number = null;
  /**
   * 状态   0   未到达   1   候诊中   2   治疗中   3   已完成   -1   已取消
   * */
  status: number = null;
  /**
   * 搜索关键字（预约）
   * */
  keyword: string = null;
  /**
   * 开始时间
   * */
  start: string = null;
  /**
   *
   * */
  end: string = null;
  /**
   * 当前页
   * */
  pageIndex: number = null;
  /**
   * 页容量
   * */
  pageSize: number = null;
}

export class BookingScheduleListResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: BookingSchedule.BookingSchedule_AimModel[];
  Context: any;
}

export class SaveBookingRequest {
  /**  1预约 2挂号 */
  TableType: number = null;
  /**  预约Id（有值为修改，没有值为添加）  */
  Id: string = null;
  /**  患者ID  */
  PatientID: string = null;
  /**  重要患者 1重要 0不重要  */
  IsImportant: boolean = null;
  /**  性别 0 男 1 女    */
  Sex: number = null;
  /**  出生日期  */
  BirthDate: string = null;
  /**  手机  */
  Tel: string = null;
  /**  区号  */
  AreaCode: string = null;
  /**  座机  */
  Phone: string = null;
  /**  就诊类型 0 初诊 1 复诊  */
  PatlogType: number = null;
  /**  医生编号  */
  DoctorCode: string = null;
  /**  就诊事项  */
  Aim: string[] = null;
  /**  开始时间  */
  StartTime: string = null;
  /**  结束时间  */
  EndTime: string = null;
  /**  预约备注  */
  Note: string = null;
  /**  外加工试戴过来的外加工id  */
  ProcessId: string = null;
  /**  微信预约Id  */
  WXBookingId: string = null;
  /**  是否发送短信*/
  IsSendSMS: boolean = null;
}

export class Schedule_Add {
  /**日程ID*/
  Id: string;
  /**主题*/
  Name: string;
  /**开始时间*/
  StartTime: string;
  /**结束时间*/
  EndTime: string;
  /**时长*/
  Time: number;
  /**0永不 1分钟 2小时 3天*/
  TimeType: number;
  /**备注*/
  Note: string;
  /**参与人*/
  PlayerID: string[];
}

export class DelScheduleRequest {
  Id: string;
}

export class SetStatusRequest {
  /**预约id*/
  Id: string = null;
  /**状态，0：未到达 1：候诊中 2：治疗中 3：已完成 -1：取消*/
  Status: number = null;
  /**取消原因 Status为-1 才传值*/
  CancelLabel: number = null;
  /**医生编号*/
  DoctorCode: string = null;
}
