/**
 * Created by bingq on 2017/6/17.
 */

export class WorkerSimple {
  /**
   * 员工id
   * */
  WorkerId: string;
  /**
   * 员工编号
   * */
  WorkerCode: string;
  /**
   * 员工姓名
   * */
  WorkerName: string;
  /**
   * 员工头像
   * */
  HeadImageUrl: string;
  /**
   * 员工类型
   * */
  WorkerType: number;
  /**
   * 手机号码
   * */
  Tel: string;
}


export class WorkerDetail extends WorkerSimple {
  /**拼音码*/
  PhoneticCode: string;
}
