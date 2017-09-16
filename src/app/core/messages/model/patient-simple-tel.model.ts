/**
 * 患者详情 简略
 */
export class PatientSimpleTelModel {
  Tel: string;
  // 患者Id
  Id?: string;
  // 患者编号
  PatientCode?: string;
  // 患者姓名
  PatientName?: string;
  // 患者性别
  Sex?: number;
  // 患者年龄
  Age?: number;
  // 是否是重要患者
  IsImportant?: boolean;
  // 是否欠费
  IsArrearage?: boolean;
  // 患者头像
  Image?: string;
}
