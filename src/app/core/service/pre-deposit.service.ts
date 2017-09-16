/**
 * Created by 67087 on 2017-06-30.
 */
import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {
  Detail,
  PredepositList, PreFlowCount,
} from '../messages/mocks/pre-deposit-mock';
import * as PreDepositFlow from '../messages/pre-deposit-request-response';
import {Observable} from 'rxjs/Observable';
@Injectable()
export class Predepositservice {
  constructor(private http: HttpService) {
  }

  /*
   * 获取流水详情
   * @params
   * @returns
   * */
  getPredepositFlowDetail(requestData: PreDepositFlow.DetailRequest): Observable<PreDepositFlow.DetailResponse> {
    // return this.http.get(ApiMethod.accountChangeRecord_Get, requestData);
    return Observable.from(Promise.resolve(Detail));
  }

  /*
   * 获取预存款变动列表
   * @params
   * @returns
   * */
  getPredepositFlowList(requestData: PreDepositFlow.GetAdvanceMoneyListRequest): Observable<PreDepositFlow.GetAdvanceMoneyListResponse> {
    // return this.http.get(accountChangeRecord_GetAdvanceMoneyList, requestData);
    return Observable.from(Promise.resolve(PredepositList));
  }

  /*
   * 获取预存款变动统计
   * @params
   * @returns
   * */
  getPredepositFlowCount(requestData: PreDepositFlow.GetAdvanceMoneyStatisticsRequest): Observable<PreDepositFlow.GetAdvanceMoneyStatisticsResponse> {
    return this.http.get(ApiMethod.accountChangeRecord_GetAdvanceMoneyStatistics, requestData);
    // return Observable.from(Promise.resolve(PreFlowCount));
  }
}
