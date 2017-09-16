/**
 * Created by Li Jinglei on 2017/7/3.
 */
import {WorkerSimple} from "./worker_simple";

export class AllBookingModel {
  // 挂号Id
  Id: string;
  // 患者编号
  PatientCode?: string;
  // 医生编号
  DoctorCode?: string;
  // 患者名称
  PatientName?: string;
  // 医生名称
  DoctorName?: string;
  // 是否重要
  IsImportant?: boolean;
  // 性别
  Sex?: number;
  // 年龄
  Age?: number;
  // 预约/挂号 开始时间
  StartTime?: string;
  // 预约/挂号 结束时间
  EndTime?: string;
  // 就诊事项
  Aim?: string;
  // 就诊事项
  AimString?: string;
  // 备注
  Note?: string;
  // 类别 2挂号 1预约
  TableType?: number;
  // 状态： 0：未到达 1：候诊中 2：治疗中 3：已完成 -1：取消
  Status?: number;
  // 挂号类型 0初诊 1复诊
  PatlogType?: number;
  // 是否欠费 1欠费 0没欠
  IsArrearage?: boolean;
  // 0删除 1未删除
  PatientEnabled?: number;
  // 接诊时间
  SeeDoctorTime?: string;
  // 完成时间
  EndDoctor?: string;
  // 预约日期
  Date?: string;
}

export class DictDetail_Simple {
  /**
   * 编号
   * */
  Code: string;
  /**
   * 名称
   * */
  Name: string;
}


export class BookingSchedule_AimModel {
  /**
   *就诊事项
   * */
  Aim: DictDetail_Simple[];
  /**
   *日历（类别 1预约 2挂号 3日程）
   * */
  Type: number;
  /**
   *Id（日程，预约）
   * */
  Id: string;
  /**
   *开始时间（日程，预约）
   * */
  StartTime: string
  /**
   *结束时间
   * */
  EndTime: string
  /**
   *医生姓名（预约）
   * */
  DoctorName: string;
  /**
   *医生编号
   * */
  DoctorCode: string;
  /**
   *状态 （预约）
   * */
  Status: number;
  /**
   *0初诊 1复诊 （预约）
   * */
  PatlogType: number;
  /**
   *主题（日程）
   * */
  Name: string;
  /**
   *患者code
   * */
  PatientCode: string;
  /**
   *参与人（日程）
   * */
  Worker: WorkerSimple[];
  /**
   *患者信息
   * */
  Patient: Patient_Simple;
}

export class Patient_Simple {
  /**
   *患者Id
   * */
  Id: string;
  /**
   *患者编号
   * */
  PatientCode: string;
  /**
   *患者姓名
   * */
  PatientName: string;
  /**
   *患者性别
   * */
  Sex: number;
  /**
   *患者年龄
   * */
  Age: number;
  /**
   *是否是重要患者
   * */
  IsImportant: boolean;
  /**
   *是否欠费
   * */
  IsArrearage: boolean;
  /**
   *患者头像
   * */
  Image: string;
}
