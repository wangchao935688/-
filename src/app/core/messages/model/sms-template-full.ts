/**
 * Created by Li Jinglei on 2017/7/27.
 */
export class TemplateFullModel {
  // 模板列表
  TemplateList: Array<TemplateSimpleModel>;
  // 模板类别ID
  TypeCode: string;
  // 模板类别名称
  TypeName: string;
}
export class TemplateSimpleModel {
  // 模板Id
  Id: string;
  // 模板名称
  SMSName: string;
  // 模板内容
  SMSContext: string;
}
