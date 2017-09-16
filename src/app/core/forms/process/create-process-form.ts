import {ProcessItemAddModel} from '../../messages/model/process-item-add.model';
export class CreateProcessForm {
  // 患者ID
  PatientID: string;
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
