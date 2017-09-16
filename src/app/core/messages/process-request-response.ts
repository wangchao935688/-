import {ProcessSimpleModel} from './model/process-simple.model';
import {ProcessRecordFullModel} from './model/process-record-full.model';
import {ProcessItemFullModel} from './model/processItem-full.model';
import {PatientSimpleTelModel} from './model/patient-simple-tel.model';
import {ProcessItemAddModel} from './model/process-item-add.model';
/**
 * 外加工列表 (request)
 */
export class OutsideProcessGetListRequest {
  // 搜索关键词，留空不限
  keyword?: string = '';
  // 医生ID，留空不限
  doctorID?: string = '';
  // 外加工状态
  status?: number = 0;
  // 开始日期（yyyy-MM-dd），留空则不限
  beginTime?: string = '';
  // 结束日期（yyyy-MM-dd），留空则不限
  endTime?: string = '';
  // 查询的页码，留空则查询第一页
  pageIndex?: number = 1;
  // 查询的条数，留空则按默认
  pageSize?: number = 10;
  // 患者外加工列表
  patientID?: string;
}

/**
 * 外加工列表 (response)
 */
export class OutsideProcessGetListResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
  Items: ProcessSimpleModel[];
}
/**
 * 外加工列表 详情(response)
 */
export class OutsideProcessGetResponse {
  // 加工流程列表（按流程分组）
  RecordList: ProcessRecordFullModel[];
  // 唯一标识
  Id: string;
  // 医生ID
  DoctorID: string;
  // 医生code
  DoctorCode: string;
  // 医生姓名
  DoctorName: string;
  // 加工费
  Price: number;
  // 加工数量
  ProcessNum: string;
  // 加工单位id
  ProcessCompanyId: number;
  // 加工单位名称
  ProcessCompanyName: string;
  // 加工项目
  ItemList: ProcessItemFullModel[];
  // 备注
  Note: string;
  // 患者code
  PatientCode: string;
  // 患者
  PatientModel: PatientSimpleTelModel;
  // 就诊日期
  VisitingTime: string;
  // 状态 0待派送 1登记取件（已派送），2登记回件（已回件）,3登记试戴（已试戴），4登记返工（返工） 5登记带走（已戴走）
  Status: number;
}

/**
 * 登记取件 (request)
 */
export class ChangeStateSentRequest {
  // 派送单号
  ExpressCode: string = null;
  // 加工单位联系人id
  ContactID: number = null;
  // 加工天数
  DayNum: number = null;
  // 各种状态通用时间
  CommonTime: string = null;
  // id
  ID: string;
}
/**
 * 登记回件 (request)
 */
export class ChangeStateReceivedRequest {
  // 各种状态通用时间
  CommonTime: string = null;
  // id
  ID: string;
}
/**
 * 登记返工 (request)
 */
export class ChangeStateReworkedRequest {
  // 返工原因
  ReworkReason: string = null;
  // 各种状态通用时间
  CommonTime: string = null;
  // id
  ID: string;
}
/**
 * 登记戴走 (request)
 */
export class ChangeStateCompletedRequest {
  // 各种状态通用时间
  CommonTime: string = null;
  // id
  ID: string;
}

/**
 * 获取加工内容列表 (response)
 */
export class GetProcessContentListResponse {
  Key: number;
  Value: string;
}
/**
 * 获取色号列表 (response)
 */
export class GetColorNumberListResponse {
  Key: number;
  Value: string;
}


/**
 * 新建外加工 (request)
 */
export class OutsideProcessAddRequest {
  // 患者ID
  PatientID: string = null;
  // 医生code
  DoctorID: string;
  // 加工费
  Price: number;
  // 加工数量
  ProcessNum: number;
  // 加工单位id
  ProcessCompanyId: number;
  // 加工项目
  ItemList: ProcessItemAddModel[];
  // 备注
  Note: string;
  // 就诊日期
  VisitingTime: string;

}

/**
 * 修改外加工 (request)
 */
export class OutsideProcessUpdateRequest {
  // 唯一标识
  Id: string;
  // 医生code
  DoctorID: string;
  // 加工费
  Price: number;
  // 加工数量
  ProcessNum: number;
  // 加工单位id
  ProcessCompanyId: number;
  // 加工项目
  ItemList: ProcessItemAddModel[];
  // 备注
  Note: string;
  // 就诊日期
  VisitingTime: string;
}

/**
 * 删除外加工 (request)
 */
export class OutsideProcessDeleteRequest {
  ID: string;
}


/**
 * 外加工单位列表 (response)
 */
export class OutsideProcessGetCompanyListResponse {
  // 唯一标识
  Id: number;
  // 外加工单位名字
  Name: string;
  // 省份
  Province: string;
  // 县
  City: string;
  // 乡
  Area: string;
  // 详细地址
  Address: string;
  // 座机
  Tel: string;
  // 备注
  Note: string;
}

/**
 * 添加/编辑色号 (request)
 */
export class OutsideProcessEditColorNumberRequest {
  // 色号id （留空则为添加）
  DictDetailCode: number;
  // 色号名称
  DictDetailName: string;
}
/**
 * 添加/编辑加工内容 (request)
 */
export class OutsideProcessEditProcessContentRequest {
  // 色号id （留空则为添加）
  DictDetailCode: number;
  // 色号名称
  DictDetailName: string;
}


/**
 * 加工内容上移下移
 */
export class OutsideProcessReorderProcessContentRequest {
  // 上移1 下移-1
  Offset: number;
  // 唯一标识
  Key: number;
}

/**
 * 删除色号
 */
export class OutsideProcessDeleteColorNumberRequest {
  ID: string;
}
/**
 * 删除加工内容
 */
export class OutsideProcessDeleteProcessContentRequest {
  ID: string;
}
