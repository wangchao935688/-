import {ProcessCompanyContactFullModel} from "./process-company-contact-full.model";
/**
 * 外加工流程项目查询模型（完整版）
 */
export class ProcessRecordFullModel {
  // 唯一标识
  Id: number;
  // 外加工id
  ProcessId: string;
  // 患者code
  PatientCode: string;
  // 派送单号
  ProcessOrder: string;
  // 加工天数
  DayNum: number;
  // 返工原因
  ReworkReason: string;
  // 联系人
  ContactModel: ProcessCompanyContactFullModel;
  // 各种状态通用时间
  CommonTime: string;
  // 打0待派送，1已派送，2已回件，3已试戴，4返工,5已戴走
  Status: number;
}
