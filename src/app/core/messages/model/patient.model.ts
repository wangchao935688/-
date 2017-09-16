/**
 * 患者详情
 */
export class PatientModel {
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
  // 出生日期
  BirthDate?: string;
  // 是否是重要患者
  IsImportant?: boolean;
  // 是否欠费
  IsArrearage?: boolean;
  // 患者头像
  Image?: string;
  // 医生姓名
  DoctorName?: string;
  // 医生code
  DoctorCode?: string;
  // 就诊事项
  Aim?: string;
  // 就诊事项
  AimString?: string;
  // 添加时间
  AddDateTime?: string;
  // 拼音码
  PhoneticCode?: string;
  // 座机
  Phone?: string;
  // 电话
  Tel?: string;
  // 充值总额
  TotalRecharge?: number;
  // 消费总额
  TotalConsumption?: number;
  // 日期
  Date?: string;
  // 标签code
  RelationCode?: string;
  // 标签名称
  RelationName?: string;
}


