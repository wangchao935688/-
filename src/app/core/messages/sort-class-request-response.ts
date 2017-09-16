/**
 * Created by LiJinglei on 2017/7/11.
 */
/**
 * 获取所有员工排班列表
 */
export class GetAllShiftListRequest {
  // 开始时间（yyyy-MM-dd），必填
  beginTime: string;
  // 结束时间（yyyy-MM-dd），必填
  endTime: string;
}
export class GetAllShiftListResponse {
  // 员工姓名
  WorkerName: string;
  // 排班列表
  ShiftList?: Array< ShiftSimple>;
}
export class ShiftSimple {
  // 排班日期
  Date: string;
  ID: string;
  // 排班类型模型
  TypeModel: Array< ShiftTypeSimple>;
}
export class ShiftTypeSimple {
  // 类型ID
  ID?: string;
  // 类型名称
  Name?: string;
  // 类型颜色
  Color?: string;
}
/*
* 添加排班
* */
export class MakeShiftRequest {
  // 员工ID
  WorkerID?: string;
  // 排班日期
  Date?: string;
  // 排班班次编码
  ShiftTypeCode?: string;
}
/*
* 获取所有排班类型列表
* */
export class GetShiftTypeListResponse {
  // 上班时间
  StartTime?: TimeModel;
  // 下班时间
  StopTime?: TimeModel;
  // 类型ID
   ID?: string;
   // 类型名称
  Name?: string;
  // 类型颜色
  Color?: string;
}
export class TimeModel {
  // 小时
  Hour: number;
  // 分钟
  Minute: number;
}
/*
* 新建或修改排班类型
* */
export class EditShiftTypeRequest {
  // 类型ID，留空则为添加
  ID: string;
  // 类型名称
  Name: string;
  // 类型颜色
  Color: string;
  // 上班时间
  StartTime: TimeModel;
  // 下班时间
  StopTime: TimeModel;
}
