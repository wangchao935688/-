import {DictSimpleModel} from './model/dict-simple.model';
/**
 * 创建字典请求
 */
export class SaveDictDetailRequest {
  DictDetailName: string;
  DictSheetCode: string;
  Id: string;
}
/*
* 字典列表请求
* */
export class DictDetailListRequest {
// BookCancelReason:预约取消原因 PatlogCancelReason：挂号取消原因 WorkContent:就诊事项 PatientsWith：
// 患者来源 Goods:物品类别 InterviewType:回访类型 Department:科室 DegassingType：
// 消毒类别 DegassingMethod：消毒方式
  SheetCode: string;
}
export class DictDetailListResponse {
  Items: Array<DictSimpleModel>;
}
/**
 * 删除字典
 */
export class DelDictDetailRequest {
  Id: string;
}
export class AddressRequest {
  VersionNum: string;
}
/**
 * 字典排序请求
 */
export class ReorderRequest{
  Order:number;
  Offset:number;
  Key:string;
  SheetCode:string;
}

