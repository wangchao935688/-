import {PatientSimpleTelModel} from './model/patient-simple-tel.model';
import {PageRequest, PageResponse} from './page-request-response';
import {WorkerSimple} from "./model/worker_simple";

/**
 * 分页获取回访列表：搜索、医生、回访人、回访类型、状态、起止时间
 */
export class FollowUpGetListRequest extends PageRequest {
  // 搜索关键词，留空不限 Required
  keyword?: string = null;
  // 医生ID，留空不限 Required
  doctorID?: string = null;
  // 回访员工ID，留空不限 Required
  interviewWorkerID?: string = null;
  // 回访类型ID，留空不限 Required
  typeID?: number = null;
  // 状态 0：进行中 1：已取消 2：已完成，留空不限 Required
  state?: number = null;
  // 开始日期（yyyy-MM-dd），留空则不限 Required
  beginTime?: string = null;
  // 结束日期（yyyy-MM-dd），留空则不限 Required
  endTime?: string = null;
//  排序
  OrderBy?: number = null;
}

/**
 * 分页获取回访列表：搜索、医生、回访人、回访类型、状态、起止时间
 */
export class FollowUpGetListResponse extends PageResponse {
  Items: Array<InterviewSimple>;
}

export class InterviewSimple {
  /*ID*/
  Id: string;
  /*
  *患者编号(后台内部使用)
  * */
  PatientCode: string;
  /*
  *患者模型
  * */
  PatientModel: PatientSimpleTelModel;
  /*
  *回访日期
  * */
  InterviewDate: string;
  /*
  * 医生编号
  * */
  DoctorCode: string;
  /*
  *医生姓名
  * */
  DoctorModel: Array<InterviewWorkerSimple>;
  /*
  * 回访人员名称列表
  * */
  InterviewWorkerList: Array<InterviewWorkerSimple>;
  /*
  *	状态 0：进行中 1：已取消 2：已完成（后台人员注意，名字变了，map不过去）
  * */
  State: number;
  /*
  *	回访内容
  * */
  Content: string;
  /*
  * 备注
  * */
  Note: string;
  /*
  *取消原因
  * */
  Reason: string;
  /*
  * 回访类型
  * */
  InterviewType: number;
  /*
  * 回访类型名称
  * */
  InterviewTypeName: string;
  /*
  * 	创建人姓名
  * */
  CreatorName: string;
  /*
  * 创建时间
  * */
  CreateTime: string;
}

/**
 * 查询回访详情
 */
export class FollowUpGetRequest {
  /*
   * Id
   * */
  id: string;
}

export class FollowUpGetResponse {
  // 回访结果列表
  InterviewResultList: InterviewResultFull[];
  // 唯一标识
  Id: string;
  // 患者编号(后台内部使用)
  PatientCode: string;
  // 患者模型
  PatientModel: PatientSimpleTelModel;
  // 回访日期
  InterviewDate: string;
  // 医生编号
  DoctorCode: string;
  // 医生姓名
  DoctorModel: WorkerSimple;
  // 回访人员名称列表
  InterviewWorkerList: Array<InterviewWorkerSimple>;
  // 状态 0：进行中 1：已取消 2：已完成（后台人员注意，名字变了，map不过去）
  State: number;
  // 回访内容
  Content: string;
  // 备注
  Note: string;
  // 取消原因
  Reason: string;
  // 回访类型
  InterviewType: number;
  // 回访类型名称
  InterviewTypeName: string;
  // 创建人姓名
  CreatorName: string;
  // 创建时间
  CreateTime: string;
}

/*
*根据患者ID查询历史回访列表
*
* */
export class FollowUpGetListpatientIDRequest {
  patientID: string;
}

/*
*状态
* */
class FollowUpStateEnum {
  进行中: 0;
  已取消: 1;
  已完成: 2;
}

/*
* 根据患者ID查询历史回访列表
* */
export class FollowUpGetListpatientIDResponse {
  /*
  * 回访结果列表
  * */
  InterviewResultList: InterviewResultFull[];
  /*
  * 唯一标识
  * */
  Id: string = null;
  /*
  * 患者编号(后台内部使用)
  * */
  PatientCode: string = null;
  /*
  * 患者模型
  * */
  PatientModel: PatientSimpleTel;
  /*
  * 回访日期
  * */
  InterviewDate: string = null;
  /*
  * 医生编号
  * */
  DoctorCode: string = null;
  /*
  * 医生姓名
  * */
  DoctorModel: InterviewWorkerSimple;
  /*
  * 回访人员名称列表
  * */
  InterviewWorkerList: Array<InterviewWorkerSimple>;
  /*
  * 状态 0：进行中 1：已取消 2：已完成（后台人员注意，名字变了，map不过去）
  * */
  State: FollowUpStateEnum;
  /*
  * 回访内容
  * */
  Content: string = null;
  /*
  * 备注
  * */
  Note: string = null;
  /*
  * 取消原因
  * */
  Reason: string = null;
  /*
  * 回访类型
  * */
  InterviewType: number = null;
  /*
  * 回访类型名称
  * */
  InterviewTypeName: string = null;
  /*
  * 创建人姓名
  * */
  CreatorName: string = null;
  /*
  * 创建时间
  * */
  CreateTime: string = null;
}

/*
* 患者信息
* */
class PatientSimpleTel {
  Tel: string;
  /*
  * 患者Id
  * */
  Id: string;
  /*
  * 患者编号
  * */
  PatientCode: string;
  /*
  * 患者姓名
  * */
  PatientName: string;
  /*
  * 患者性别
  * */
  Sex: number;
  /*
  * 患者年龄
  * */
  Age: number;
  /*
  * 是否是重要患者
  * */
  IsImportant: boolean;
  /*
  * 是否欠费
  * */
  IsArrearage: boolean;
  /*
  * 患者头像
  * */
  Image: string;
}

/*
* 回访人员列表名称
*
* */
export class InterviewWorkerSimple {
  /*
   * 员工ID
   * */
  WorkerId: string;
  /*
   * 员工编码
   * */
  WorkerCode: string;
  /*
   * 员工姓名
   * */
  WorkerName: string;
  /*
   * 员工头像
   * */
  HeadImageUrl: string;
  /*
   * 员工类型
   * */
  WorkerType: number;
  /*
   * 手机号码
   * */
  Tel: string;
}

/**
 * 新增回访VO
 */
export class FollowUpAddRequest {
  // 患者ID
  PatientID: string;
  // 医生ID
  DoctorID: string;
  // 回访员工ID列表
  InterviewWorkerIDList: string[];
  // 回访日期
  InterviewDate: string;
  // 回访类型ID
  InterviewType: number;
  // 回访内容
  Content: string;
  // 备注
  Note: string;
}

/**
 * 修改回访VO
 */
export class FollowUpUpdateRequest {
  // 唯一标识
  Id?: string = null;
  // 医生ID
  DoctorID?: string = null;
  // 回访员工ID列表
  InterviewWorkerIDList?: string = null;
  // 回访日期
  InterviewDate?: string = null;
  // 回访类型ID
  InterviewType?: number = null;
  // 回访内容
  Content?: string = null;
  // 备注
  Note?: string = null;
}

/**
 * 取消回访VO
 */
export class FollowUpCancelRequest {

  // 回访ID
  ID: string;
  // 取消理由
  Reason: string;

  constructor(ID: string, Reason: string) {
  }
}

/**
 * 添加回访结果VO
 */
export class FollowUpAddResultRequest {
  // 回访ID
  InterviewId: string;
  // 回访结果
  Result: string;

}

/**
 * 获取所有回访类别列表
 */
export class FollowUpGetTypeListResponse {
  // 回访类型ID
  TypeID: number;
  // 回访类型名称
  TypeName: string;
}

/**
 * 添加回访模板
 */
export class FollowUpAddTemplateRequest {
  // 类型：0 回访内容模板 1 回访结果模板
  Type: string;
  // 模板名称
  Name: string;
  // 模板内容
  Content: string;
}

/**
 * 获取所有回访模板 (分页)
 */
export class FollowUpGetTemplatePageRequest {
  // 模板类型 0 回访内容模板 1 回访结果模板
  type: number;
  // 查询的页码，留空则查询第一页
  pageIndex: number;
  // 查询的条数，留空则按默认
  pageSize: number;
}

/*
* TODO 获取所有回访模板
* */
export class FollowUpGetTemplateListRequest {
  /*
  * 模板类型 0 回访内容模板 1 回访结果模板
  * */
  type: number = null;
}

/**
 * 获取所有回访模板
 */
export class FollowUpGetTemplateListResponse {
  // 唯一标识
  Id: string;
  // 模板名称
  Name: string;
  // 模板内容
  Content: string;
}

/**
 * 获取所有回访模板 (分页)
 */
export class FollowUpGetTemplatePageResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: FollowUpGetTemplateListResponse[];
}

class InterviewResultFull {
  /*
   * 唯一标示
   * */
  Id: string;
  /*
   * 回访结果
   * */
  Result: string;
  /*
   * 添加回访结果人编号
   * */
  WorkerCode: string;
  /*
   * 添加回访结果人名称
   * */
  WorkerName: string;
  /*
   * 回访人类型
   * */
  WorkerType: number;
  /*
   * 添加时间
   * */
  CreateTime: string;
}

/*
* 患者回访列表
* */
export class GetListRequest {
  patientID: string;
}

export class GetListResponse {
  Id: string;
}

/*
* 选择回访人列表
*
* */
export class FollewUpUserListResponse {
  /*
  * 是否默认
  * */
  IsDefault: boolean;
  /*
  * 员工id
  * */
  WorkerId: number;
  /*
  * 员工编号
  * */
  WorkerCode: string;
  /*
  * 员工姓名
  * */
  WorkerName: string;
  /*
  * 员工头像
  * */
  HeadImageUrl: string;
  /*
  * 员工类型
  * */
  WorkerType: number;
  /*
  * 手机号码
  * */
  Tel: string;
}

/**
 * Created by chengqi on 2017/7/24.
 */
export class InterviewListRequest {
  PatientCode: string;
  /*当页数*/
  PageIndex?: number;
  /*每页数*/
  PageSize?: number;
}

export class InterviewListResponse {

  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: Array<InterviewListModel>;
}

export class InterviewListModel {
  Id: string;
  /*回访时间*/
  InterviewDate: string;
  /*添加时间*/
  AddDateTime: string;
  /*回访类型*/
  InterviewType: number;
  /*回访内容*/
  Content: string;
  /*回访状态*/
  Status: number;
  /*患者删除标记*/
  PatientEnabled: number;
  /*患者code*/
  PatientCode: string;
  /*患者名称*/
  PatientName: string;
  /*回访人*/
  InterviewWorker: string;
}
