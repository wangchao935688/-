import {Injectable} from "@angular/core";
import {HttpService} from "./http.service";
import {ApiMethod} from "../api-method";
import * as Process from "../messages/process-request-response";
import {Observable} from "rxjs/Observable";
@Injectable()
export class ProcessService {

  constructor(private http: HttpService) {
  }

  /**
   * 外加工列表
   * @param requestData
   * @returns {Observable<T>}
   */
  getOutsideProcessGetList(requestData: Process.OutsideProcessGetListRequest): Observable<Process.OutsideProcessGetListResponse> {
    return this.http.get(ApiMethod.outsideProcess_GetList, requestData);
  }

  /**
   * 外加工列表 详情
   * @param requestData
   * @returns {Observable<T>}
   */
  getOutsideProcessGet(requestData: string): Observable<Process.OutsideProcessGetResponse> {
    return this.http.get(ApiMethod.outsideProcess_Get, requestData);
  }

  /**
   * 登记取件
   * @param requestData
   */
  postOutsideProcessChangeStateSent(requestData: Process.ChangeStateSentRequest) {
    return this.http.post(ApiMethod.outsideProcess_ChangeState_Sent, requestData);
  }

  /**
   * 登记回件
   * @param requestData
   */
  postOutsideProcessChangeStateReceived(requestData: Process.ChangeStateReceivedRequest) {
    return this.http.post(ApiMethod.outsideProcess_ChangeState_Received, requestData);
  }

  /**
   * 登记返工
   * @param requestData
   */
  postOutsideProcessChangeStateReworked(requestData: Process.ChangeStateReworkedRequest) {
    return this.http.post(ApiMethod.outsideProcess_ChangeState_Reworked, requestData);
  }

  /**
   * 登记返工
   * @param requestData
   */
  postOutsideProcessChangeStateCompleted(requestData: Process.ChangeStateCompletedRequest) {
    return this.http.post(ApiMethod.outsideProcess_ChangeState_Completed, requestData);
  }

  /**
   * 获取加工内容列表
   * @returns {Observable<T>}
   */
  getOutsideProcessGetProcessContentList(): Observable<Process.GetProcessContentListResponse[]> {
    return this.http.get(ApiMethod.outsideProcess_GetProcessContentList);
  }

  /**
   * 获取色号列表
   * @returns {Observable<T>}
   */
  getOutsideProcessGetColorNumberList(): Observable<Process.GetColorNumberListResponse[]> {
    return this.http.get(ApiMethod.outsideProcess_GetColorNumberList);
  }

  /**
   * 新建外加工
   * @returns {Observable<T>}
   */
  postOutsideProcessAdd(requestData: Process.OutsideProcessAddRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_Add, requestData);
  }

  /**
   * 修改外加工
   * @returns {Observable<T>}
   */
  postOutsideProcessUpdate(requestData: Process.OutsideProcessUpdateRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_Update, requestData);
  }

  /**
   * 删除外加工
   * @returns {Observable<T>}
   */
  postOutsideProcessDelete(requestData: Process.OutsideProcessDeleteRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_Delete, requestData);
  }

  /**
   * 外加工单位列表
   * @returns {Observable<T>}
   */
  getOutsideProcessGetCompanyList(): Observable<Process.OutsideProcessGetCompanyListResponse[]> {
    return this.http.get(ApiMethod.outsideProcess_GetCompanyList);
  }

  /**
   * 添加/编辑色号
   * @returns {Observable<T>}
   */
  postOutsideProcessEditColorNumber(requestData: Process.OutsideProcessEditColorNumberRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_EditColorNumber, requestData);
  }

  /**
   * 删除色号
   * @returns {Observable<T>}
   */
  postOutsideProcessDeleteColorNumber(requestData: Process.OutsideProcessDeleteColorNumberRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_DeleteColorNumber, requestData);
  }

  /**
   * 添加/编辑加工内容
   * @returns {Observable<T>}
   */
  postOutsideProcessEditProcessContent(requestData: Process.OutsideProcessEditProcessContentRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_EditProcessContent, requestData);
  }

  /**
   * 删除加工内容
   * @returns {Observable<T>}
   */
  postOutsideProcessDeleteProcessContent(requestData: Process.OutsideProcessDeleteProcessContentRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_DeleteProcessContent, requestData);
  }

  /**
   * 加工内容上移下移
   * @returns {Observable<T>}
   */
  postOutsideProcessReorderProcessContent(requestData: Process.OutsideProcessReorderProcessContentRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_ReorderProcessContent, requestData);
  }

  /**
   * 加工内容上移下移
   * @returns {Observable<T>}
   */
  postOutsideProcessReorderColorNumber(requestData: Process.OutsideProcessReorderProcessContentRequest): Observable<any> {
    return this.http.post(ApiMethod.outsideProcess_ReorderColorNumber, requestData);
  }
}
