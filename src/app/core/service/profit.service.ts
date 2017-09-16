import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {ApiMethod} from "../api-method";
import * as Profit from "../messages/profit-request-response";
import {Observable} from "rxjs/Observable";
@Injectable()
export class ProfitService {
  constructor(private http: HttpService) {

  }

  /**
   * 获取利润变动列表
   */
  getAccountChangeRecordGetProfitList(requestData: Profit.AccountChangeRecordGetProfitListRequest): Observable<Profit.AccountChangeRecordGetProfitListResponse> {
    return this.http.get(ApiMethod.accountChangeRecord_GetProfitList, requestData);
  }

  /**
   * 获取利润统计
   */
  getAccountChangeRecordGetProfitStatistics(requestData: Profit.AccountChangeRecordGetProfitStatisticsRequest): Observable<Profit.AccountChangeRecordGetProfitStatisticsResponse> {
    return this.http.get(ApiMethod.accountChangeRecord_GetProfitStatistics, requestData);
  }

}
