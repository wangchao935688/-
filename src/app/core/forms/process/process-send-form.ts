/**
 * 添加/编辑色号 (request)
 */
export class ProcessSentForm {
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
