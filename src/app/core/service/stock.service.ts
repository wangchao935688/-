import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {ApiMethod} from '../api-method';
import * as StockRequestResponse from '../messages/stock-request-response'
/**
 * Created by bingq on 2017/6/19.
 */

@Injectable()
export class StockService {
  constructor(private httpService: HttpService) {
  }

  /**
   * 获取指定商品库存数量
   * @param goodsId
   */
  getStockNumber(goodsId: string): Observable<number> {
    return Observable.of(2);
  }

  /**
   * 获取批次列表
   * @param request
   * @returns {Observable<T>}
   */
  getGoodsBatchList(request: StockRequestResponse.GoodsBatchListRequest): Observable<StockRequestResponse.GoodsBatchListResponse> {
    return this.httpService.get(ApiMethod.stock_GoodsBatchList, request);
  }

  /**
   * 获取批次列表
   * @param request
   * @returns {Observable<T>}
   */
  getBatchList(request: StockRequestResponse.BatchListRequest): Observable<StockRequestResponse.BatchListResponse> {
    return this.httpService.get(ApiMethod.stock_GoodsBatchList, request);
  }

  /**
   * 添加批次
   * @param request
   * @returns {Observable<T>}
   */
  addGoodsBatch(request: StockRequestResponse.AddGoodsBatchRequest): Observable<StockRequestResponse.AddGoodsBatchResponse> {
    return this.httpService.post(ApiMethod.stock_AddGoodsBatch, request);
  }

  /**
   * 修改批次
   * @param request
   * @returns {Observable<T>}
   */
  editGoodsBatch(request: StockRequestResponse.EditGoodsBatchRequest): Observable<StockRequestResponse.EditGoodsBatchResponse> {
    return this.httpService.post(ApiMethod.stock_EditGoodsBatch, request);
  }

  /**
   * 删除批次
   * @param request
   * @returns {Observable<T>}
   */
  delGoodsBatch(request: StockRequestResponse.DelGoodsBatchResuest): Observable<StockRequestResponse.DelGoodsBatchResponse> {
    return this.httpService.post(ApiMethod.stock_DelGoodsBatch, request);
  }

  /**
   * 入库单列表
   * @param request
   * @returns {Observable<T>}
   */
  getStockInList(request: StockRequestResponse.StockInListRequest): Observable<StockRequestResponse.StockInListResponse> {
    return this.httpService.get(ApiMethod.stock_StockInList, request);
  }

  /**
   * 入库明细列表
   * @param request
   * @returns {Observable<T>}
   */
  getStockInItemList(request: StockRequestResponse.StockInItemListRequest): Observable<StockRequestResponse.StockInItemListResponse> {
    return this.httpService.get(ApiMethod.stock_StockInItemList, request);
  }

  /**
   * 入库单详情
   * @param request
   * @returns {Observable<T>}
   */
  getGetStockIn(request: StockRequestResponse.GetStockInRequest): Observable<StockRequestResponse.GetStockInResponse> {
    return this.httpService.get(ApiMethod.stock_GetStockIn, request);
  }

  /**
   * 新增入库单
   * @param request
   * @returns {Observable<T>}
   */
  addStockIn(request: StockRequestResponse.AddStockInRequest): Observable<StockRequestResponse.AddStockInResponse> {
    return this.httpService.post(ApiMethod.stock_AddStockIn, request);
  }

  /**
   * 修改入库单
   * @param request
   * @returns {Observable<T>}
   */
  editStockIn(request: StockRequestResponse.EditStockInRequest): Observable<StockRequestResponse.EditStockInResponse> {
    return this.httpService.post(ApiMethod.stock_EditStockIn, request);
  }

  /**
   * 作废
   * @param request
   * @returns {Observable<T>}
   */
  delStockIn(request: StockRequestResponse.DelStockInRequest): Observable<StockRequestResponse.DelStockInResponse> {
    return this.httpService.post(ApiMethod.stock_DelStockIn, request);
  }

  /**
   * 出库单列表
   * @param request
   * @returns {Observable<T>}
   */
  getStockOutList(request: StockRequestResponse.StockOutListRequest): Observable<StockRequestResponse.StockOutListResponse> {
    return this.httpService.get(ApiMethod.stock_StockOutList, request);
  }

  /**
   * 出库明细列表
   * @param request
   * @returns {Observable<T>}
   */
  getStockOutItemList(request: StockRequestResponse.StockOutItemListRequest): Observable<StockRequestResponse.StockOutItemListResponse> {
    return this.httpService.get(ApiMethod.stock_StockOutItemList, request);
  }

  /**
   * 出库单详情
   * @param request
   * @returns {Observable<T>}
   */
  getStockOut(request: StockRequestResponse.GetStockOutRequest): Observable<StockRequestResponse.GetStockOutResponse> {
    return this.httpService.get(ApiMethod.stock_GetStockOut, request);
  }

  /**
   * 添加出库单
   * @param request
   * @returns {Observable<T>}
   */
  addStockOut(request: StockRequestResponse.AddStockOutRequest): Observable<StockRequestResponse.AddStockOutResponse> {
    return this.httpService.post(ApiMethod.stock_AddStockOut, request);
  }

  /**
   * 修改出库单
   * @param request
   * @returns {Observable<T>}
   */
  editStockOut(request: StockRequestResponse.EditStockOutRequest): Observable<StockRequestResponse.EditStockOutResponse> {
    return this.httpService.post(ApiMethod.stock_EditStockOut, request);
  }

  /**
   * 删除出库单
   * @param request
   * @returns {Observable<T>}
   */
  delStockOut(request: StockRequestResponse.DelStockOutRequest): Observable<StockRequestResponse.DelStockOutResponse> {
    return this.httpService.post(ApiMethod.stock_DelStockOut, request);
  }

  /**
   * 退货单列表
   * @param request
   * @returns {Observable<T>}
   */
  getBreakageList(request: StockRequestResponse.BreakageListRequest): Observable<StockRequestResponse.BreakageListResponse> {
    return this.httpService.get(ApiMethod.stock_BreakageList, request);
  }

  /**
   * 退货单明细列表
   * @param request
   * @returns {Observable<T>}
   */
  getBreakageItemList(request: StockRequestResponse.BreakageItemListRequest): Observable<StockRequestResponse.BreakageItemListResponse> {
    return this.httpService.get(ApiMethod.stock_BreakageItemList, request);
  }

  /**
   * 退货单详情
   * @param request
   * @returns {Observable<T>}
   */
  getBreakage(request: StockRequestResponse.GetBreakageRequest): Observable<StockRequestResponse.GetBreakageResponse> {
    return this.httpService.post(ApiMethod.stock_GetBreakage, request);
  }

  /**
   * 添加退费单
   * @param request
   * @returns {Observable<T>}
   */
  addBreakage(request: StockRequestResponse.AddBreakageRequest): Observable<StockRequestResponse.AddBreakageResponse> {
    return this.httpService.post(ApiMethod.stock_AddBreakage, request);
  }

  /**
   * 修改退货单
   * @param request
   * @returns {Observable<T>}
   */
  editBreakage(request: StockRequestResponse.EditBreakageRequest): Observable<StockRequestResponse.EditBreakageResponse> {
    return this.httpService.post(ApiMethod.stock_EditBreakage, request);
  }

  /**
   * 作废退货单
   * @param request
   * @returns {Observable<T>}
   */
  delBreakage(request: StockRequestResponse.DelBreakageRequest): Observable<StockRequestResponse.DelBreakageResponse> {
    return this.httpService.post(ApiMethod.stock_DelBreakage, request);
  }


}
