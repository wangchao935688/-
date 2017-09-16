import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import * as GoodsRequestResponse from '../messages/goods-request-response'
import {Observable} from "rxjs";

@Injectable()
export class GoodsService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 物品列表
   * @param request
   * @returns {Observable<T>}
   */
  getGoodsList(request: GoodsRequestResponse.GetGoodsListRequest): Observable<GoodsRequestResponse.GetGoodsListResponse> {
    return this.httpService.get(ApiMethod.goods_GetGoodsList, request);
  }

  /**
   * 当前库存
   * @param request
   * @returns {Observable<T>}
   */
  getCurrentGoodsList(request: GoodsRequestResponse.GetCurrentGoodsListRequest): Observable<GoodsRequestResponse.GetCurrentGoodsListResponse> {
    return this.httpService.get(ApiMethod.goods_GetGoodsList, request);
  }

  /**
   * 物品详情
   * @param request
   * @returns {Observable<T>}
   */
  getGoods(request: GoodsRequestResponse.GetGoodsRequest): Observable<GoodsRequestResponse.GetGoodsResponse> {
    return this.httpService.get(ApiMethod.goods_GetGoods, request);
  }

  /**
   * 添加物品
   * @param request
   * @returns {Observable<T>}
   */
  addGoods(request: GoodsRequestResponse.AddGoodsRequest): Observable<GoodsRequestResponse.AddGoodsResponse> {
    return this.httpService.post(ApiMethod.goods_AddGoods, request);
  }

  /**
   * 修改物品
   * @param request
   * @returns {Observable<T>}
   */
  editGoods(request: GoodsRequestResponse.EditGoodsRequest): Observable<GoodsRequestResponse.EditGoodsResponse> {
    return this.httpService.post(ApiMethod.goods_EditGoods, request);
  }

  /**
   * 删除物品
   * @param request
   * @returns {Observable<T>}
   */
  deleteGoods(request: GoodsRequestResponse.DeleteGoodsRequest): Observable<GoodsRequestResponse.DeleteGoodsResponse> {
    return this.httpService.post(ApiMethod.goods_DeleteGoods, request);
  }

  /**
   * 获取供应商列表
   * @param request
   * @returns {Observable<T>}
   */
  getSupplierList(request: GoodsRequestResponse.GetSupplierListRequest): Observable<GoodsRequestResponse.GetSupplierListResponse> {
    return this.httpService.get(ApiMethod.goods_GetSupplierList, request);
  }

  /**
   * 获取供应商详情
   * @param request
   * @returns {Observable<T>}
   */
  getSupplier(request: GoodsRequestResponse.GetSupplierRequest): Observable<GoodsRequestResponse.GetSupplierResponse> {
    return this.httpService.get(ApiMethod.goods_GetSupplier, request);
  }

  /**
   * 添加供应商
   * @param request
   * @returns {Observable<T>}
   */
  addSupplier(request: GoodsRequestResponse.AddSupplierRequest): Observable<GoodsRequestResponse.AddSupplierResponse> {
    return this.httpService.post(ApiMethod.goods_AddSupplier, request);
  }

  /**
   * 修改供应商
   * @param request
   * @returns {Observable<T>}
   */
  editSupplier(request: GoodsRequestResponse.EditSupplierRequest): Observable<GoodsRequestResponse.EditSupplierResponse> {
    return this.httpService.post(ApiMethod.goods_EditSupplier, request);
  }

  /**
   * 删除供应商
   * @param request
   * @returns {Observable<T>}
   */
  deleteSupplier(request: GoodsRequestResponse.DeleteSupplierRequest): Observable<GoodsRequestResponse.DeleteSupplierRequest> {
    return this.httpService.post(ApiMethod.goods_DeleteSupplier, request);
  }

}
