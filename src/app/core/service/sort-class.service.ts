import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs/Observable';
import * as SortClass from '../messages/sort-class-request-response';

@Injectable()
export class SortClassService {

  constructor(private http: HttpService) { }

  /**
   * 员工排班列表
   * @param requestData
   * @returns {Observable<T>}
   */
  getAllShiftList(requestData: SortClass.GetAllShiftListRequest ): Observable<SortClass.GetAllShiftListResponse[]> {
    return this.http.get(ApiMethod.shiftArrangement_GetAllShiftList, requestData);
  }

  /**
   * 新建或修改员工排班
   * @param requestData
   * @returns {Observable<T>}
   */
  makeShift(requestData: SortClass.MakeShiftRequest ): Observable<any> {
    return this.http.get(ApiMethod.shiftArrangement_MakeShift, requestData);
  }

  /**
   * 删除排班
   * @param requestData
   * @returns {Observable<T>}
   */
  deleteShift(requestData: any ): Observable<any> {
    return this.http.get(ApiMethod.shiftArrangement_DeleteShift, requestData);
  }

  /**
   * 获取所有排班类型列表
   * @param requestData
   * @returns {Observable<T>}
   */
  getShiftTypeList(requestData: null): Observable<SortClass.GetShiftTypeListResponse[]> {
    return this.http.get(ApiMethod.shiftArrangement_GetShiftTypeList, requestData);
  }

  /**
   * 新建或修改排班类型
   * @param requestData
   * @returns {Observable<T>}
   */
  editShiftType(requestData: SortClass.EditShiftTypeRequest): Observable<any> {
    return this.http.get(ApiMethod.shiftArrangement_EditShiftType, requestData);
  }

  /**
   * 删除排班类型
   * @param requestData
   * @returns {Observable<T>}
   */
  deleteShiftType(requestData: any): Observable<any> {
    return this.http.get(ApiMethod.shiftArrangement_DeleteShiftType, requestData);
  }
}
