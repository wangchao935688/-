import {PatientSimpleModel} from './patient-simple.model';
import {WorkerSimple} from './worker_simple';
/**
 * Created by 李景磊 on 2017/7/3.
 */
export class CaseSimpleModel {
  // 病历ID
  Id: string;
  // 病历编号
  CaseCode: string;
  // 患者模型
  PatientModel: PatientSimpleModel;
  // 账单时间
  VisitingTime: string;
  // 标签名称
  RelationName: string;
  // 医生名称
  WorkerModel: WorkerSimple;
  // 0初诊 1复诊
  CaseType: number;
  // 是否是图片病例
  IsImageCase: boolean;
}
