import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';

import * as StatisticsRequestResponse from '../messages/statistics-request-response';
import {Observable} from "rxjs";
import {
  getStatisticsMainIncome,
  getStatisticsCashFlow,
  getStatisticsAdvanceMoney,
  getStatisticsProfit,
  getStatisticsClinic,
  getStatisticsPersonReception,
  getStatisticsAllReception,
  getStatisticsPersonWorkload,
  getStatisticsPersonProcess
} from '../messages/mocks/statistics-mock';

@Injectable()
export class StatisticsService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 主营收入统计报表
   */
  getStatisticsMainIncome(request: StatisticsRequestResponse.MainIncomeRequest): Observable<StatisticsRequestResponse.MainIncomeResponse>{
    // return this.httpService.get(ApiMethod.statistics_MainIncome,request);
    return Observable.from(Promise.resolve(getStatisticsMainIncome));
  }

  /**
   * 资金流水统计报表
   */
  getStatisticsCashFlow(request: StatisticsRequestResponse.CashFlowRequest): Observable<StatisticsRequestResponse.CashFlowResponse>{
    return this.httpService.get(ApiMethod.statistics_CashFlow,request);
  }
  /**
   * 预存款统计报表
   */
  getStatisticsAdvanceMoney(request: StatisticsRequestResponse.AdvanceMoneyRequest): Observable<StatisticsRequestResponse.AdvanceMoneyResponse>{
    return this.httpService.get(ApiMethod.statistics_AdvanceMoney,request);
  }
  /**
   * 利润统计报表
   */
  getStatisticsProfit(request: StatisticsRequestResponse.ProfitRequest): Observable<StatisticsRequestResponse.ProfitResponse>{
    return this.httpService.get(ApiMethod.statistics_Profit,request);
  }
  /**
   * 个人接诊
   */
  getStatisticsPersonReception(request: StatisticsRequestResponse.PersonReceptionRequest): Observable<StatisticsRequestResponse.PersonReceptionResponse>{
    return this.httpService.get(ApiMethod.statistics_PersonReception,request);
  }
  /**
   * 全部医生接诊统计
   */
  getStatisticsAllReception(request: StatisticsRequestResponse.AllReceptionRequest): Observable<StatisticsRequestResponse.AllReceptionResponse>{
    return this.httpService.get(ApiMethod.statistics_AllReception,request);
  }
  /**
   * 个人外加工
   */
  getStatisticsPersonProcess(request: StatisticsRequestResponse.PersonProcessRequest): Observable<StatisticsRequestResponse.PersonProcessResponse>{
    return this.httpService.get(ApiMethod.statistics_PersonProcess,request);
  }
  /**
   * 全部医生外加工统计
   */
  getStatisticsAllProcess(request: StatisticsRequestResponse.AllProcessRequest): Observable<StatisticsRequestResponse.AllProcessResponse>{
    return this.httpService.get(ApiMethod.statistics_AllProcess,request);
  }
  /**
   * 全部医生工作量
   */
  getStatisticsAllWorkload(request: StatisticsRequestResponse.AllWorkloadRequest): Observable<StatisticsRequestResponse.AllWorkloadResponse>{
    return this.httpService.get(ApiMethod.statistics_AllWorkload,request);
  }
/**
   * 医生个人工作量
   */
  getStatisticsPersonWorkload(request: StatisticsRequestResponse.PersonWorkloadRequest): Observable<StatisticsRequestResponse.PersonWorkloadResponse>{
    return this.httpService.get(ApiMethod.statistics_PersonWorkload,request);
  }
/**
   * 门诊统计
   */
  getStatisticsClinic(request: StatisticsRequestResponse.ClinicRequest): Observable<StatisticsRequestResponse.ClinicResponse>{
    return this.httpService.get(ApiMethod.statistics_Clinic,request);
  }


}
