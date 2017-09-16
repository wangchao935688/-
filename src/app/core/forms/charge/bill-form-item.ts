/**
 * Created by bingq on 2017/6/17.
 */

/**
 * 修改/添加收费单收费项目
 */
export class BillFormItem {
  /**
   *收费项目分类ID
   */
  chargeItemTypeID: string;
  /**
   *收费项目id
   */
  chargeItemID: string;

  number: number;

  /**
   *优惠价（单项折扣或抹零后价格，简略收费使用此项记录价格）
   */
  reducedPrice: number;

 displayReducedPrice:string;

  discountRate: number;

  displayDiscountRate:string;

  chargeItemName: string;

  /**
   * 收费项目分类名称
   */
  chargeTypeName: string;
  /**
   * 库存数量
   */
  stockNumber: number;

  /**
   * 是否管理库存
   */
  connectToGoods: boolean;
  /**
   * 库存商品ID
   */
  goodsId: string;

  price:number;

  billType:number;

  /**
   * 正在请求库存数量
   */
  isLoadingStockNumber: boolean = false;


}
