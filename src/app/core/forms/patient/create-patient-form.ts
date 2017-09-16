/**
 * Created by bingq on 2017/5/31.
 */
export class CreatePatientForm {
  /**
   *患者姓名
   */
  PatientName: string = '';
  /**
   *患者编号
   */
  PatientCode: string = '';
  /**
   *是否是重要患者 1重要 0不重要
   */
  IsImportant: boolean = null;

  /**
   *性别 0 男 1 女
   */
  Sex: number = null;
  /**
   *患者年龄
   */
  Age: number = null;
  /**
   *出生日期
   */
  BirthDate: string = null;
  /**
   *电话
   */
  Tel: string = null;
  /**
   *区号
   */
  AreaCode: string = null;
  /**
   *联系方式（座机）
   */
  Phone: string = null;
  /**
   *省份
   */
  Province: string = null;
  /**
   *城市
   */
  City: string = null;
  /**
   *地区
   */
  Area: string = null;
  /**
   *详细地址
   */
  Address: string = null;
  /**
   *头像
   */
  Image: string = null;
  /**
   *意向医生code
   */
  IntentionDoctorCode: string = null;
  /**
   *意向医生姓名
   */
  IntentionDoctorName: string = null;
  /**
   *患者来源
   */
  PatientsWith: number = null;
  /**
   *标签名称
   */
  RelationName: string[] = null;
  /**
   *备注
   */
  Note: string = null;
  /**
   *初诊时间
   */
  FirstDate: string = null;
  /**
   *首诊医师
   */
  FirstDoctor: string = null;
}
