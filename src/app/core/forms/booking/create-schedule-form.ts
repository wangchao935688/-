/**
 * Created by KingKong on 2017/7/20.
 */


export class CreateScheduleForm {
  /**日程ID*/
  Id?: string;
  /**主题*/
  Name: string;
  /**开始日期*/
  StartDate: string;
  /**开始时间*/
  StartTime: string;
  /**结束日期*/
  EndDate: string;
  /**结束时间*/
  EndTime: string;
  /**提醒*/
  TimeAlert: RelativeSelectValue;
  /**备注*/
  Note: string;
  /**参与人*/
  Players: { [key: string]: string }[];
}

/**左右关联下拉菜单*/
export class RelativeSelectValue {
  /**左侧选项值*/
  LeftValue: string;
  /**右侧选项值*/
  RightValue: string;
}


export class CreateBookingForm {
  /**预约ID*/
  Id?: string = null;
  /**患者姓名*/
  PatientName: string = null;
  /**患者编号*/
  PatientCode: string = null;
  /**性别*/
  Sex: number = null;
  /**年龄*/
  Age: number = null;
  /**出生日期*/
  BirthDate: string = null;
  /**手机*/
  Tel: string = null;
  /**区号*/
  AreaCode: string = null;
  /**座机*/
  Phone: string = null;
  /**就诊类型 0 初诊 1 复诊*/
  PatlogType: number = null;
  /**医生编号*/
  DoctorCode: string = null;
  /**就诊日起*/
  VisitDate: string = null;
  /**开始时间*/
  StartTime: string = null;
  /**结束时间*/
  EndTime: string = null;
  /**就诊事项*/
  Aim: string[] = null;
  /**备注*/
  Note: string = null;
}
