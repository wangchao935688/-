import {PageRequest, PageResponse} from "./page-request-response";
/**
 * Created by bingq on 2017/6/16.
 */

// export class GetAllRequest{
//
// }

export class GetAllResponse{
  /**
   * 组合收费列表
   */
  GroupList:ChargeGroupAndItemModel[];
  /**
   * 诊疗
   */
  TypeList0:ChargeTypeAndItemModel[];
  /**
   * 药品
   */
  TypeList1:ChargeTypeAndItemModel[];
}

/**
 * 收费项目分类和收费项目模型
 */
export  class  ChargeTypeAndItemModel{
  /**
   * 收费项目列表
   */
  ItemList:ChargeItemModel[];
  /**
   * 自增主键
   */
  ID:string;

  HospitalCode:string;
  /**
   * 收费项目分类名称
   */
  TypeName:string;
  /**
   * 是否关联库存商品 0.不关联（原1.诊疗） 1.关联（原2.药品）
   */
  ConnectToGoods:boolean;
  Sort:number;
}
/**
 * 收费项目模型
 */
export  class  ChargeItemModel{
  ID:string;
  /**
   * 收费项目分类ID
   */
  ChargeItemTypeID:string;
  HospitalCode:string;
  /**
   * 收费项目名称
   */
  Name:string;
  /**
   * PhoneticCode
   */
  PhoneticCode:string;
  Unit:string;
  Price:number;
  Note:string;
  /**
   * 是否关联库存商品 0.不关联（原1.诊疗） 1.关联（原2.药品）
   */
  ConnectToGoods:boolean;
  /**
   *库存商品ID
   */
  GoodsId:string;

  Sort:number;
}

/**
 * 收费组合和收费项目模型
 */
export class ChargeGroupAndItemModel{

  /**
   * 收费项目列表
   */
  ItemList:ChargeItemGroup_ChargeItemModel_Select[];
  ID:string;

  HospitalCode:string;
  /**
   *收费组合名称
   */
  GroupName:string;
  /**
   *合计价格
   */
  TotalPrice:number;

  Sort:number;
}

/**
 * 收费组合_收费项目关系模型
 */
export class ChargeItemGroup_ChargeItemModel_Select{

  ID:string;
  /**
   * GroupID
   */
  GroupID:number;
  /**
   * 收费项目ID
   */
  ChargeItemID:string
  /**
   *收费项目模型
   */
  ChargeItem:ChargeItemModel;
  /**
   * 收费项目数量
   */
  Number:number;
  Sort:number;
}


// /**
//  * 获取所有收费项目分类（简略收费项目）
//  */
// export class GetChargeItemTypeListResponse{
//
// }
/**
 * 简率收费模型
 */
export class ChargeItemTypeModel{
  /**
   * 自增主键
   */
  ID:string;
  /**
   * HospitalCode
   */
  HospitalCode:string;
  /**
   *
   收费项目分类名称
   */
  TypeName:string;
  Sort:number;
}
/**
 * 收费项搜索请求
 */
export class  ChargeItemSeacrhRequest extends PageRequest{
  /**
   * 关键词
   */
  KeyWords:string;
}
/**
 *收费项搜索响应
 */
export class ChargeItemSeacrhResponse extends PageResponse{
  Items:ChargeItemModel[];
}
