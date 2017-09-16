/**
 * Created by LiJinglei on 2017/6/24.
 */
import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {
  CapitalFlowList,
  CapitalFlowCount,
  CapitalFlowDetail
} from '../messages/mocks/capital-cashier-mock';
import * as CapitalFlow from '../messages/capital-cashier-request-response';
import * as CapitalFlowTransfer from '../messages/account-change-record-request-response';
import {Observable} from 'rxjs/Observable';
import {HospitalAccountFull} from '../messages/hospital-account-request-response';
@Injectable()
export class AccountService {
  CapitalFlowAccount= HospitalAccountFull;
  CapitalFlowList= CapitalFlowList;
  CapitalFlowDetail= CapitalFlowDetail;
  CapitalFlowCount= CapitalFlowCount;
  constructor(private http: HttpService) {}
  /*
   * 获取流水详情
   * @params
   * @returns
   * */
  getCapitalFlowDetail(requestData: CapitalFlow.GetCashFlowDetailRequest): Observable<CapitalFlow.GetCashFlowDetailResponse> {
    // return this.http.get(ApiMethod.accountChangeRecord_Get, requestData);
    return Observable.from(Promise.resolve(CapitalFlowDetail));
  }
  /*
   * 获取流水列表
   * @params
   * @returns
   * */
  getCapitalFlowList(requestData: CapitalFlow.GetCashFlowListRequest): Observable<CapitalFlow.GetCashFlowListResponse> {
    return this.http.get(ApiMethod.accountChangeRecord_GetCashFlowList, requestData);
    //  return Observable.from(Promise.resolve(CapitalFlowList));
  }
  /*
   * 获取流水统计
   * @params
   * @returns
   * */
  getCapitalFlowCount(requestData: CapitalFlow.GetCashFlowStatisticsRequest): Observable<CapitalFlow.GetCashFlowStatisticsResponse> {
    return this.http.get(ApiMethod.accountChangeRecord_GetCashFlowStatistics, requestData);
    // return Observable.from(Promise.resolve(CapitalFlowCount));
  }

  /*
   * 获取账户列表
   * @params
   * @returns
   * */
  getCapitalFlowAccount(requestData: CapitalFlow.AccountRequest): Observable<HospitalAccountFull[]> {
    return this.http.get(ApiMethod.hospitalAccount_GetHospitalAccountList, requestData);
  }
  /*
  * 转账操作
  * */
  transfer(requestData: CapitalFlowTransfer.TransferRequest): Observable<null> {
    return this.http.post(ApiMethod.hospitalAccount_Transfer, requestData);
    // return Observable.from(Promise.resolve(null));
  }
}

