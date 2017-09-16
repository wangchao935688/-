/**
 * Created by chenmeng on 2017/8/1.
 */
import {PageRequest, PageResponse} from "./page-request-response";

/**
 * 批次列表
 */
export class GoodsBatchListRequest {
  goodsId: string;
  keyword: string;
}
export class GoodsBatchListResponse {
  Id: string;
  Sort: number;          //排序
  GoodId: string;        //物品id
  Name: string;          //名称
  BatchAmount: number;   //数量
  ProductionDate: string;//生产日期
  ShelfLifeDate: string; //有效期至
  ShelfLifeDayNum: number; //保质期
}

/**
 * 批次列表
 */
export class BatchListRequest extends PageRequest {
  beginTime: string;     //开始时间
  endTime: string;       //结束时间
  goodsType: string;     //物品类别code
  keyword: string;       //搜索关键字
  goodsStock: number;     //0或空全部 1有库存 2没有库存
  orderBy: number;        //排序
}
export class BatchListResponse extends PageResponse {
  Items: Array<GoodBatch_Full>;
}
export class GoodBatch_Full {
  GoodsName: string;       //物品名称
  Specifications: string;  //规格
  Unit: string;            //单位
  RemainingDayNum: number; //剩余天数
  Id: string;              //id
  Sort: number;            //排序
  GoodId: string;          //物品id
  Name: string;            //名称
  BatchAmount: number;     //数量
  ProductionDate: string;  //生产日期
  ShelfLifeDate: string;   //有效期至
  ShelfLifeDayNum: number; //保质期
}
/**
 * 添加批次
 */
export class AddGoodsBatchRequest {
  GoodId: string;    //物品id
  Name: string;      //名称
  ProductionDate: string;  //生产日期
}
export class AddGoodsBatchResponse {

}
/**
 * 修改批次
 */
export class EditGoodsBatchRequest {
  Name: string;    //名称
  ProductionDate: string;  //生产日期
  Id: string;      //id
}
export class EditGoodsBatchResponse {

}

/**
 * 删除批次
 */
export class DelGoodsBatchResuest {
  ID: string;    //主键
}
export class DelGoodsBatchResponse {

}
/**
 * 入库单列表
 */
export class StockInListRequest {
  beginTime: string;      //开始时间
  endTime: string;        //结束时间
  supplierID: string;     //供应商id
  workerID: string;       //库管员id
  keyword: string;        //搜索关键字
  pageIndex: number = 1;  //页码
  pageSize: number = 20;  //页容量
}
export class StockInListResponse extends PageResponse {
  Items: Array<StockIn_Simple>;  //
}
export class StockIn_Simple {
  Id: string;          //id
  StorageDate: string; //入库日期
  StorageCode: string; //入库单号
  SupplierId: string;  //供应商id
  SupplierName: string;//供应商名称
  TotalAmount: number; //总金额
  WorkerCode: string;  //库管员
  WorkerName: string;  //库管员名称
  TotalQuantity: number; //总数量
  Enabled: number;     //0作废 1正常
}
/**
 * 入库明细列表
 */
export class StockInItemListRequest {
  beginTime: string;   //
  endTime: string;     //
  goodsType: string;     //
  keyword: string;       //
  PageIndex: number = 1;
  PageSize: number = 20;
}
export class StockInItemListResponse extends PageResponse {
  Items: Array<StockInItem_Simple>;
}
export class StockInItem_Simple {
  Id: string;          //id
  GoodId: string;          //物品id
  GoodsName: string;     //物品名称
  GoodsTypeName: string; //物品类别名称
  StorageDate: string;   //入库日期
  StorageCode: string;   //入库单号
  RetailPrice: number;    //单价
  TotalAmount: number;   //总金额
  Number: number;        //数量
  Specifications: string;//规格
  Unit: string;          //单位
  Remarks: string;       //备注
}
/**
 * 入库单详情
 */
export class GetStockInRequest {
  id: string;
}
export class GetStockInResponse {
  StockInItemList: Array<StockInItem_Simple>;   //入库明细集合
  Id: string;            //id
  StorageDate: string;   //入库日期
  StorageCode: string;   //入库单号
  SupplierId: string;    //供应商id
  SupplierName: string;  //供应商名称
  TotalAmount: number;   //总金额
  WorkerCode: string;    //库管员
  WorkerName: string;    //库管员名称
  TotalQuantity: number; //总数量
  Enabled: number;       //0作废 1正常
}
/**
 * 新增入库单
 */
export class AddStockInRequest {
  StorageDate: string;   //入库日期
  SupplierId: string;    //供应商id
  WorkerID: string;      //库管员
  Comment: string;       //备注
  StockInItemList: Array<StockInItem_Add>;//入库明细列表
}
export class StockInItem_Add {
  BatchId: string;   //批次id
  GoodId: string;    //物品id
  Price: number;     //价格
  Number: number;    //数量
  Remarks: string;   //备注
}
export class AddStockInResponse {

}
/**
 * 修改入库单
 */
export class EditStockInRequest {
  Id: string;            //入库单id
  StorageDate: string;   //入库日期
  SupplierId: string;    //供应商id
  WorkerID: string;      //库管员
  Comment: string;       //备注
  StockInItemList: Array<StockInItem_Add>;//入库明细列表
}
export class EditStockInResponse {

}
/**
 * 作废
 */
export class DelStockInRequest {
  Id: string;
  InvalidComment: string;  //作废原因
}
export class DelStockInResponse {

}
/**
 * 出库单列表
 */
export class StockOutListRequest {
  beginTime: string;   //
  endTime: string;     //
  usePersonnelID: string;  //
  workerID: string;        //
  keyword: string;         //
  pageIndex: number = 1;   //
  pageSize: number = 20; //
}
export class StockOutListResponse extends PageResponse {
  Items: Array<StockOut_Simple>; //
}
export class StockOut_Simple {
  Id: string;      //id
  UsePersonnelCode: string;  //领用人
  UsePersonnelName: string;  //领用人名称
  LibraryStaffCode: string;  //库管员
  LibraryStaffName: string;  //库管员名称
  StockOutDate: string;      //出库日期
  TotalAmount: number;       //总金额
  OutOrder: string;          //入库单号
  TotalQuantity: number;     //总数量
  Enabled: number;           //0作废 1正常
}
/**
 * 出库明细列表
 */
export class StockOutItemListRequest {
  beginTime: string;   //
  endTime: string;     //
  goodsType: string;     //
  keyword: string;       //
  pageIndex: number = 1;   //
  pageSize: number = 20; //
}
export class StockOutItemListResponse extends PageResponse {
  Items: Array<StockOutItem_Simple>; //
}
export class StockOutItem_Simple {
  Id: string;            //id
  GoodId: string;        //物品id
  GoodsName: string;     //物品名称
  GoodsTypeName: string; //物品类别名称
  InventoryNum: number;  //入库数量
  Price: number;         //出库价
  TotalAmount: number;   //总金额
  RecipientsNumber: number;  //出库数量
  StockOutDate: string;  //出库日期
  OutOrder: string;      //入库单编号
  Specifications: string;//规格
  Unit: string;          //单位
  Remarks: string;       //备注
}
/**
 * 出库单详情
 */
export class GetStockOutRequest {
  id: string;
}
export class GetStockOutResponse {
  Creater: string;     //确认人
  CreateTime: string;  //确认时间
  Comment: string;     //备注
  StockOutItemList: Array<StockOutItem_Simple>;  //出库单明细列表
  Id: string;          //id
  UsePersonnelCode: string;  //领用人
  UsePersonnelName: string;  //领用人名称
  LibraryStaffCode: string;  //库管员
  LibraryStaffName: string;  //库管员名称
  StockOutDate: string;      //出库日期
  TotalAmount: number;       //总金额
  OutOrder: string;          //入库单号
  TotalQuantity: number;     //总数量
  Enabled: number;           //0作废 1正常
}

/**
 * 添加出库单
 */
export class AddStockOutRequest {
  StorageDate: string;     //出库日期
  RecipientID: string;     //领用人ID
  WorkerID: string;        //库管员
  Comment: string;         //备注
  StockOutItemList: Array<StockOutItem_Add>; //出库明细列表
}
export class StockOutItem_Add {
  GoodId: string;    //物品id
  Price: number;     //价格
  Number: number;    //数量
  Remarks: string;   //备注
}
export class AddStockOutResponse {

}
/**
 * 修改出库单
 */
export class EditStockOutRequest {
  Id: string;    //id
  StorageDate: string;   //出库日期
  RecipientID: string;   //领用人ID
  WorkerID: string;      //库管员
  Comment: string;       //备注
  StockOutItemList: Array<StockOutItem_Add>; //出库明细列表
}
export class EditStockOutResponse {
}

/**
 * 删除出库单
 */
export class DelStockOutRequest {
  Id: string;      //id
  InvalidComment: string;  //作废原因
}
export class DelStockOutResponse {
}

/**
 * 退货单列表
 */
export class BreakageListRequest {
  beginTime: string;   //
  endTime: string;     //
  approvalPersonID: string;
  workerID: string;
  keyword: string;
  pageIndex: number = 1;   //
  pageSize: number = 20; //
}
export class BreakageListResponse extends PageResponse {
  Items: Array<Breakage_Simple>;
}
export class Breakage_Simple {
  Id: string;        //id
  ApprovalPersonCode: string;  //退货人
  ApprovalPersonName: string;  //退货人名称
  LibraryStaffCode: string;    //库管员
  LibraryStaffName: string;    //库管员名称
  ReportBackDate: string;      //退货日期
  ReportBackOrder: string;     //退货单号
  TotalAmount: number;         //总金额
  Enabled: number;             //0删除 1正常
  TotalQuantity: number;       //总数量
}
/**
 * 退货单明细列表
 */
export class BreakageItemListRequest {
  beginTime: string;   //
  endTime: string;     //
  goodsType: string;     //
  keyword: string;       //
  pageIndex: number = 1;   //
  pageSize: number = 20; //
}
export class BreakageItemListResponse extends PageResponse {
  Items: Array<BreakageItem_Simple>;
}
export class BreakageItem_Simple {
  Id: string;        //id
  ReportBackDate: string;  //退费日期
  ReportBackOrder: string; //退费单号
  TotalAmount: number;     //总金额
  DamageQuantity: number;  //退货数量
  GoodId: string;          //物品id
  GoodsName: string;       //物品名称
  GoodsTypeName: string;   //物品类别名称
  Price: number;           //单价
  Unit: string;            //单位
  Specifications: string;  //规格
  Remarks: string;         //备注
}
/**
 * 退货单详情
 */
export class GetBreakageRequest {
  id: string;
}
export class GetBreakageResponse {
  BreakageItemList: Array<BreakageItem_Simple>;  //退货明细列表
  Id: string;              //id
  ReportBackDate: string;  //退费日期
  ReportBackOrder: string; //退费单号
  TotalAmount: number;     //总金额
  DamageQuantity: number;  //退货数量
  GoodId: string;          //物品id
  GoodsName: string;       //物品名称
  GoodsTypeName: string;   //物品类别名称
  Price: number;           //单价
  Unit: string;            //单位
  Specifications: string;  //规格
  Remarks: string;         //备注
}
/**
 * 添加退费单
 */
export class AddBreakageRequest {
  StorageDate: string;   //入库日期
  ApprovalPersonID: string;  //退货人id
  WorkerID: string;      //库管员
  Comment: string;       //备注
  BreakageItemList: Array<StockOutItem_Add>; //退货明细列表
}
export class AddBreakageResponse {
}
/**
 * 修改退货单
 */
export class EditBreakageRequest {
  Id: string;      //id
  StorageDate: string;   //入库日期
  ApprovalPersonID: string;  //退货人id
  WorkerID: string;      //库管员
  Comment: string;       //备注
  BreakageItemList: Array<StockOutItem_Add>; //退货明细列表
}
export class EditBreakageResponse {
}
/**
 * 作废退货单
 */
export class DelBreakageRequest {
  Id: string;    //id
  InvalidComment: string;    //作废原因
}
export class DelBreakageResponse {

}

