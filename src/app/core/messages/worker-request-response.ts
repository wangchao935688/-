import {WorkerDetail} from "./model/worker_simple";
import {WorkerFull} from "./model/woker_full";

/**
 * 员工列表 参与人 (response)
 */
export class WorkerListResponse {
  Items: WorkerDetail[];
}

/**
 * 员工列表 参与人 (request)
 */
export class WorkerListRequest {
  // 员工类型 0医生 1 护士 2 前台 3 其他 null全部
  WorkerType: number = null;
  // 是否需要判断患者范围权限（仅对医生有效）
  IsPermission?: boolean = null;
  // 搜索关键字
  KeyWords?: string = null;
}

/**
 * 员工列表 (request)
 */
export class GetListRequest {
  // 员工类型数组
  workerTypeArray: number[];
}

export class WorkerPeople {
  WorkerId?: string;
  WorkerCode?: string;
  WorkerName?: string;
  HeadImageUrl?: string;
  WorkerType?: number;
  PhoneticCode?: string;
}
/*
 员工列表详细 (request)
 */
export class GetListWorkerFullRequest {
  workerType: number;
  accessState: number;//员工状态：0邀请中、1正常、-1已解除、-2已冻结
  keyword: string;
  pageIndex
  pageSize
}
/*
* 员工列表详细 (response)
* */
export class GetListWorkerFullResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: Array<WorkerFull>;
}

/*
* 员工详情
* */
export class GetWorkerDetailRequest {
  id: string;
}

export class GetWorkerDetailResponse {
  // 员工workerID
  Id: string;
  // userid
  UserID: number;
  // 医院编号
  HospitalCode: string;
  // 员工编号
  WorkerCode: string;
  // 员工名称
  WorkerName: string;
  // 类型
  WorkerType: string;
  // 性别
  Sex: number;
  // 出生日期
  BirthDate: string;
  // 职位
  JobTitle: string;
  // 职位名称
  JobTitleName: string;
  // 电话
  Tel: string;
  // 毕业院校
  GraduateSchool: string;
  // 地址
  Address: string;
  // 邮箱
  Email: string;
  QQ: string;
  // 0超管
  Level: number;
  // 头像
  HeadImageUrl: string;
  // 科室
  WorkerDepart: number;
  // 科室名称
  WorkerDepartName: string;
  // 省
  Province: string;
  // 市
  City: string;
  // 区
  Area: string;
}

/*
* 编辑员工信息
* */
export class EditWorkerRequest {
// 员工workerID
  Id: string;
  // 员工名称
  WorkerName: string;
  // 性别
  Sex: number;
  // 出生日期
  BirthDate: string;
  // 电话
  Tel: string;
  // 地址
  Address: string;
  // 头像
  HeadImageUrl: string;
  // 省
  Province: string;
  // 市
  City: string;
  // 区
  Area: string;
}

export class DoctorBookingModel {

  Id: string = null;
  /**医生code*/
  DoctorCode: string = null;
  /**医生姓名*/
  DoctorName: string = null;
  /**类型 0医生*/
  WorkerType: number = null;
  /**时间*/
  AddDateTime: string = null;
  /**  0超管*/
  Level: number = null;
  /**头像*/
  HeadImageUrl: string = null;
  /**排序*/
  Sort: number = null;
  /**预约挂号总数*/
  BookingCount: number = null;
  /**候诊数量*/
  WaitCount: number = null;
  /***/
  CureCount: number = null;
}

export class  DoctorBookingListResponse{
  Items:DoctorBookingModel[];
}
