import {ProcessItemFullModel} from "./processItem-full.model";
import {PatientSimpleTelModel} from "./patient-simple-tel.model";
/**
 *
 */
export class ProcessSimpleModel {
  // 唯一标识
  Id: string;
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
  ItemList: ProcessItemFullModel;
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

