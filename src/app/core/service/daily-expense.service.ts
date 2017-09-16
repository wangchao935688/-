import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs/Observable';
import {
  getTypeListResponse,
  getListResponse,
  getResponse
} from '../messages/mocks/income-and-expenses-mock';
import {
  GetListRequest,
  AddRequest,
  GetListResponse,
  GetResponse,
  GetTypeListRequest,
  GetTypeListResponse,
  CancelRequest,
  EditTypeRequest,
  DeleteTypeRequest,
  IncomeAndExpenseIconListRequest
} from '../messages/income-and-expenses-request-response';
/**
 * 日常收支相关服务
 */
@Injectable()
export class DailyExpenseService {
  constructor(private http: HttpService) {
  }

  /**
   * 分页获取收支列表：类别、起止时间查询
   * @param requestData
   */
  GetExpenseList(requestData: GetListRequest): Observable<GetListResponse> {
    // return this.http.get(ApiMethod.incomeAndExpenses_GetList, requestData);
    return Observable.from(Promise.resolve(getListResponse));
  }

  /**
   * 日常收支详情
   * @param id
   */
  GetExpenseDetail(id: any): Observable<GetResponse> {
    // return this.http.get(ApiMethod.incomeAndExpenses_Get,id);
    return Observable.from(Promise.resolve(getResponse));
  }

  /**
   * 日常收支类型列表
   */
  getExpenseTypeList(id: GetTypeListRequest): Observable<GetTypeListResponse[]> {
    return this.http.get(ApiMethod.incomeAndExpenses_GetTypeList, id);
  }

  /**
   * 添加日常收支
   * @param requestData
   */
  saveDailyExpenseAdd(requestData: AddRequest): Observable<any> {
    return this.http.post(ApiMethod.incomeAndExpenses_Add, requestData);
  }

  /**
   * 日常收支作废
   */
  cancelExpense(requestData: CancelRequest): Observable<any> {
    return this.http.post(ApiMethod.incomeAndExpenses_Cancel, requestData);
  }

  /**
   * 日常收支类型编辑
   */
  editExpenseType(requestData: EditTypeRequest): Observable<any> {
    return this.http.post(ApiMethod.incomeAndExpenses_EditType, requestData);
  }

  /**
   * 日常收支类型删除
   */
  deleteExpenseType(requestData: DeleteTypeRequest): Observable<any> {
    return this.http.post(ApiMethod.incomeAndExpenses_DeleteType, requestData);
  }

  /**
   * 日常收支类型图标
   */
  iconListExpenseType(requestData: IncomeAndExpenseIconListRequest): Observable<any> {
    return this.http.get(ApiMethod.incomeAndExpenses_IncomeAndExpenseIconList, requestData);
    // return Observable.from(Promise.resolve(getExpenseTypeList));
  }

}
