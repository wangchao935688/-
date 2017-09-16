/**
 * Created by chenmeng on 2017/8/1.
 */
import {PageRequest, PageResponse} from "./page-request-response";

/**
 * 物品列表
 */
export class GetGoodsListRequest extends PageRequest{
  keyword:string;     //搜索关键字
  goodsType:string;   //物品类别code
  isIncludeDisable:boolean; //是否包含禁用
  isAlarm:boolean;    //是否是低量报警
  goodsStock:number;  //0或空全部 1有库存 2没有库存
  orderBy:number;     //排序
}
export class GetGoodsListResponse extends PageResponse{
  Items:Array<Goods_Simple>;
}
export class Goods_Simple{
  Id: string;             //id
  GoodsType: number;      //物品类别
  GoodsTypeName: string;  //物品类别名称
  GoodsName: string;      //物品名称
  PhoneticCode: string;   //拼音码
  Specifications: string; //规格
  Unit: string;           //单位
  InventoryNum: number;   //数量
  Price: number;          //出库价
  AlarmBase: number;      //最低库存
  Barcode: string;        //物品条码
  CateNum: string;        //型号
  Brand: string;          //品牌
  MgtSwitch: number;      //管理启用开关
  Note: string;           //备注
  InPrice: number;        //入库价
  InitNum: number;        //期初数量
  InitCost: number;       //期初成本
  BatchSwitch: number;    //批号开关
  BatchExpireDayNum: number;  //保质期(天)
  BatchAlarmDayNum: number;    //报警天数(天)
}


/**
 * 当前库存
 */
export class GetCurrentGoodsListRequest{
  keyword:string;     //搜索关键字
  goodsType:string;   //物品类别code  string
  goodsStock:number;  //0或空全部 1有库存 2没有库存 number
  orderBy:number;     //排序number
  PageIndex: number = 1;
  PageSize: number = 20;
}
export class GetCurrentGoodsListResponse extends PageResponse{
  Items:Array<Goods_NowStock>;
}
export class Goods_NowStock extends Goods_Simple{
  RecPrice:number;  //最近进价
}

/**
 * 物品详情
 */
export class GetGoodsRequest {
  id: string;
}
export class GetGoodsResponse {
  Id: string;             //id
  GoodsType: number;      //物品类别
  GoodsTypeName: string;  //物品类别名称
  GoodsName: string;      //物品名称
  PhoneticCode: string;   //拼音码
  Specifications: string; //规格
  Unit: string;           //单位
  InventoryNum: number;   //数量
  Price: number;          //出库价
  AlarmBase: number;      //最低库存
  Barcode: string;        //物品条码
  CateNum: string;        //型号
  Brand: string;          //品牌
  MgtSwitch: number;      //管理启用开关
  Note: string;           //备注
  InPrice: number;        //入库价
  InitNum: number;        //期初数量
  InitCost: number;       //期初成本
  BatchSwitch: number;    //批号开关
  BatchExpireDayNum: number;  //保质期(天)
  BatchAlarmDayNum: number;    //报警天数(天)
}

/**
 * 添加物品
 */
export class AddGoodsRequest {
  GoodsType: number;    //物品类别
  GoodsName:string;     //物品名称
  PhoneticCode:string;  //拼音码
  Specifications:string;//规格
  Unit:string;          //单位
  InventoryNum:number;  //数量
  Price:number;         //出库价
  AlarmBase:number;     //最低库存
  Barcode:string;       //物品条码
  CateNum:string;       //型号
  Brand:string;         //品牌
  MgtSwitch:number;     //管理启用开关 1开 0关
  Note:string;          //备注
  InPrice:number;       //入库价
  InitNum:number;       //期初数量
  InitCost:number;      //期初成本
  BatchSwitch:number;   //批号开关 1开 0关
  BatchExpireDayNum:number; //保质期(天)
  BatchAlarmDayNum:number;  //报警天数(天)
}

export class AddGoodsResponse {

}
/**
 * 修改物品
 */
export class EditGoodsRequest{
  Id: string;             //id
  GoodsType: number;      //物品类别
  GoodsName: string;      //物品名称
  PhoneticCode: string;   //拼音码
  Specifications: string; //规格
  Unit: string;           //单位
  InventoryNum: number;   //数量
  Price: number;          //出库价
  AlarmBase: number;      //最低库存
  Barcode: string;        //物品条码
  CateNum: string;        //型号
  Brand: string;          //品牌
  MgtSwitch: number;      //管理启用开关
  Note: string;           //备注
  InPrice: number;        //入库价
  InitNum: number;        //期初数量
  InitCost: number;       //期初成本
  BatchSwitch: number;    //批号开关
  BatchExpireDayNum: number;  //保质期(天)
  BatchAlarmDayNum: number;    //报警天数(天)
}
export class EditGoodsResponse{

}

/**
 * 删除物品
 */
export class DeleteGoodsRequest {
  id: string;
}

export class DeleteGoodsResponse{

}

/**
 * 供应商列表
 */
export class GetSupplierListRequest{
  keyword:string;
}
export class GetSupplierListResponse{
  Id:string;            //id
  HospitalCode:string;  //诊所code
  Name:string;          //供应商名字
  Province:string;      //省份
  City:string;          //县
  Area:string;          //乡
  Address:string;       //详细地址
  Mail:string;          //邮箱地址
  Site:string;          //官网地址
}

/**
 * 供应商详情
 */
export class GetSupplierRequest{
  id:string;
}
export class GetSupplierResponse{
  Id:string;          //id
  Sort:number;        //排序
  Note:string;        //备注
  HospitalCode:string;//诊所code
  Name:string;        //供应商名字
  Province:string;    //省份
  City:string;        //县
  Area:string;        //乡
  Address:string;     //详细地址
  Mail:string;        //邮箱地址
  Site:string;        //官网地址
  ContactList:Array<SupplierContact_Simple>;//联系人
}
export class SupplierContact_Simple{
  Id:string;          //id 空为添加 非空修改
  Name:string;        //名字
  Tel:string;         //电话
}

/**
 * 添加供应商
 * AddSupplier
 */
export class AddSupplierRequest{
  Name:string;        //供应商名字
  Province:string;    //省份
  City:string;        //县
  Area:string;        //乡
  Address:string;     //详细地址
  Mail:string;        //邮箱地址
  Site:string;        //官网地址
  Note:string;        //备注
  ContactList:Array<SupplierContact_Simple>;//联系人
}
export class AddSupplierResponse{
}

/**
 * 修改供应商
 */
export class EditSupplierRequest{
  Id:string;          //id
  Name:string;        //供应商名字
  Province:string;    //省份
  City:string;        //县
  Area:string;        //乡
  Address:string;     //详细地址
  Mail:string;        //邮箱地址
  Site:string;        //官网地址
  Note:string;        //备注
  ContactList:Array<SupplierContact_Simple>;//联系人
}
export class EditSupplierResponse{

}

/**
 * 删除供应商
 */
export class DeleteSupplierRequest {
  id: string;
}
export class DeleteSupplierResponse{

}

