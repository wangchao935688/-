import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {Observable} from "rxjs/Observable";
import {
  RechargeGetListRequest,
  RechargeGetListResponse,
  RechargeGetResponse,
  RechargeAccountGetListRequest,
  RechargeAccountGetListResponse,
  RechargeAccountGetRequest,
  RechargeAccountGetResponse,
  RechargeAccountChangeRecordRequest,
  RechargeAccountChangeRecordResponse,
  RechargeRechargeRequest,
  RechargeCancelRequest
} from "../messages/recharge-request-response";
import {
  getRechargeGetList,
  getRechargeGetResponse,
  getRechargeAccountGetResponse
} from "../messages/mocks/recharge-mock";
import {ApiMethod} from "../api-method";
/**
 * 充值serveice
 */
@Injectable()
export class RechargeService {

  constructor(private http: HttpService) {
  }

  /**
   * 充值单列表
   * @param requestData
   * @returns {Observable<T>}
   */
  getRechargeGetList(requestData: RechargeGetListRequest): Observable<RechargeGetListResponse> {
    return this.http.get(ApiMethod.recharge_GetList, requestData);
    // return Observable.from(Promise.resolve(getRechargeGetList));
  }

  /**
   * 充值单列表 详情
   * @param requestData
   * @returns {Observable<T>}
   */
  getRechargeGet(requestData: any): Observable<RechargeGetResponse> {
    return this.http.get(ApiMethod.recharge_Get, requestData);
    // return Observable.from(Promise.resolve(getRechargeGetResponse));
  }

  /**
   * 充值账户列表
   */
  getRechargeAccountGetList(requestData: RechargeAccountGetListRequest): Observable<RechargeAccountGetListResponse> {
    return this.http.get(ApiMethod.advanceAccount_GetList, requestData);
    // return Observable.from(Promise.resolve(getRechargeAccountGetListResponse));
  }

  /**
   * 充值账户详情
   */
  getRechargeAccountGet(requestData: RechargeAccountGetRequest): Observable<RechargeAccountGetResponse> {
    return this.http.get(ApiMethod.advanceAccount_Get, requestData);
    // return Observable.from(Promise.resolve(getRechargeAccountGetResponse));
  }

  /**
   * 充值账户变动记录
   */
  getRechargeAccountChangeRecord(requestData: RechargeAccountChangeRecordRequest): Observable<RechargeAccountChangeRecordResponse> {
    return this.http.get(ApiMethod.advanceAccount_ChangeRecord, requestData);
    // return Observable.from(Promise.resolve(getRechargeAccountChangeRecordResponse));
  }

  /**
   * 充值
   */
  createRecharge(requestData: RechargeRechargeRequest): Observable<any> {
    return this.http.post(ApiMethod.recharge_Recharge, requestData);
  }

  /**
   * 作废充值
   */
  deleteRecharge(requestData: RechargeCancelRequest): Observable<any> {
    return this.http.post(ApiMethod.recharge_Cancel, requestData);
  }


}
