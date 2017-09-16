/**
 * Created by bingq on 2017/5/31.
 */
export class CreateDemoForm {
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
  IsImportant: boolean;

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
}
