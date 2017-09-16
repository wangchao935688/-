/**
 * Created by Li Jinglei on 2017/7/24.
 */
export class CaseItemModel {
  Id?: string;
  // 病历号
  CaseCode?: string;
  // 类型 0为检查，1为x光检查，2为诊断，3为治疗计划，4为治疗
  Type?: string;
  // 牙位置
  ToothPlace?: string;
  // 牙位样式
  TeethStyle?: string;
  // 描述
  Content?: string;
  // 病历图片，多张用逗号隔开
  Images?: string;
}
