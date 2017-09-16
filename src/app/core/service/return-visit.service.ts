import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs/Observable';
import {
  getReturnVisitDetail,
  getReturnVisitTemplatePage,
  getReturnVisitTemplateList
} from '../messages/mocks/return-visit-mock';
import {
  FollowUpGetListRequest,
  FollowUpAddRequest,
  FollowUpUpdateRequest,
  FollowUpCancelRequest,
  FollowUpAddResultRequest,
  FollowUpGetTypeListResponse,
  FollowUpGetTemplateListResponse,
  FollowUpGetTemplateListRequest,
  FollowUpGetTemplatePageRequest,
  FollowUpGetTemplatePageResponse,
  InterviewListRequest,
  FollowUpGetListResponse,
  FollowUpGetResponse,
  FollowUpAddTemplateRequest,
  FollewUpUserListResponse, FollowUpGetListpatientIDRequest, FollowUpGetListpatientIDResponse, FollowUpGetRequest
} from '../messages/return-visit-request-response';
/**
 * 回访相关服务
 */
@Injectable()
export class ReturnVisitService {

  constructor(private http: HttpService) {
  }

  /**
   * 回访详情服务
   * @param id
   * @returns {{InterviewResultList: [{Id: string, Result: string, WorkerCode: string, WorkerName: string, CreateTime: string},{Id: string, Result: string, WorkerCode: string, WorkerName: string, CreateTime: string}], Id: string, PatientModel: {Id: string, PatientCode: string, PatientName: string, Sex: number, Age: number, IsImportant: boolean, IsArrearage: boolean, Image: string}, InterviewDate: string, DoctorCode: string, DoctorName: string, InterviewWorkerList: [string,string], State: number, Content: string, Note: string, Reason: string, InterviewType: number, InterviewTypeName: string, CreatorName: string, CreateTime: string}}
   */
  getReturnVisitDetail(id: string): Observable<FollowUpGetResponse> {
    const request = new FollowUpGetRequest();
    request.id = id;
    return this.http.get(ApiMethod.followUp_Get, request);
    // return Observable.from(Promise.resolve(getReturnVisitDetail));

  }

  /**
   * 分页获取回访列表：搜索、医生、回访人、回访类型、状态、起止时间
   * @param requestData
   */
  getFollowUpGetList(requestData: FollowUpGetListRequest): Observable<FollowUpGetListResponse> {
    return this.http.get(ApiMethod.followUp_GetList, requestData);
    // return getFollowUpGetList;
    // return Observable.from(Promise.resolve(getFollowUpGetList));
  }

  /*
  *
   根据患者ID查询历史回访列表
  *
  * */
  getListpatientID(patientID: string): Observable<FollowUpGetListpatientIDResponse> {
    const requestData = new FollowUpGetListpatientIDRequest();
    requestData.patientID = patientID;
    return this.http.get(ApiMethod.followUp_GetList_patientID, requestData);
  }
  /**
   * 获取所有回访类别列表
   * @returns {Observable<T>}
   */
  getReturnType(): Observable<FollowUpGetTypeListResponse[]> {
    return this.http.get(ApiMethod.followUp_GetTypeList);
    // return Observable.from(Promise.resolve(getReturnType));
  }

  /**
   * 添加回访
   * @param requestData
   */
  saveReturnVisitAdd(requestData: FollowUpAddRequest): Observable<any> {
    return this.http.post(ApiMethod.followUp_Add, requestData);
  }

  /**
   * 保存回访结果
   * @param requestData
   */
  saveReturnVisitResult(requestData: FollowUpAddResultRequest): Observable<any> {
    return this.http.post(ApiMethod.followUp_AddResult, requestData);
  }

  /**
   * 完成回访
   * @param requestData
   */
  saveReturnVisitComplete(requestData: string): Observable<any> {
    return this.http.post(ApiMethod.followUp_Complete, requestData);
  }

  /**
   * 取消回访
   * @param requestData
   */
  saveReturnVisitCancel(requestData: FollowUpCancelRequest): Observable<any> {
    return this.http.post(ApiMethod.followUp_Cancel, requestData);
  }

  /**
   * 修改回访
   * @param requestData
   */
  saveReturnVisitUpdate(requestData: FollowUpUpdateRequest): Observable<any> {
    return this.http.post(ApiMethod.followUp_Update, requestData);
  }

  /**
   * 删除回访
   * @param requestData
   */
  saveReturnVisitDelete(requestData: any): Observable<any> {
    return this.http.post(ApiMethod.followUp_Delete, requestData);
  }

  /**
   * 获取回访记录
   */
  getReturnVisitNote(requestData: FollowUpGetRequest): Observable<FollowUpGetResponse> {
    return this.http.get(ApiMethod.followUp_GetList, requestData);
   //  return Observable.from(Promise.resolve(getReturnVisitDetail));
  }

  /**
 * 获取所有回访模板
 * @param requestData 模板类型 0 回访内容模板 1 回访结果模板
 */
  getReturnVisitTemplatePage(requestData: FollowUpGetTemplatePageRequest): Observable<FollowUpGetTemplatePageResponse> {
    // return this.http.get(ApiMethod.followUp_GetTemplatePage, requestData);
    return Observable.from(Promise.resolve(getReturnVisitTemplatePage));
  }


  /*
   获取回访模板
 @param requestData 模板类型 0 回访内容模板 1 回访结果模板
*/

  getReturnVisitTemplateList(requestData: FollowUpGetTemplateListRequest): Observable<FollowUpGetTemplateListResponse[]> {
     return this.http.get(ApiMethod.followUp_GetTemplateList, requestData);
    // return Observable.from(Promise.resolve(getReturnVisitTemplatePage));
  }
  /**
   * 添加回访模板
   * @param requestData
   * @returns {Observable<T>}
   */
  saveReturnVisitTemplateAdd(requestData: FollowUpAddTemplateRequest): Observable<any> {
    return this.http.post(ApiMethod.followUp_AddTemplate, requestData);
  }

  /**
   * 修改回访模板
   * @param requestData
   * @returns {Observable<T>}
   */
  saveReturnVisitTemplateUpdate(requestData: any): Observable<any> {
    return this.http.post(ApiMethod.followUp_UpdateTemplate, requestData);
  }

  /**
   * 删除回访模板
   * @param requestData
   * @returns {Observable<T>}
   */
  saveReturnVisitTemplateDelete(requestData: any): Observable<any> {
    return this.http.post(ApiMethod.followUp_DeleteTemplate, requestData);
  }
  /*
  * 回访列表
  * */
  getInterviewList(requestData: InterviewListRequest): Observable<any> {
    return this.http.post(ApiMethod.interview_interviewlist, requestData);
  }
  /*
  * 选择回访人列表
  *
  * */
  getFollewUpUserList(requestData: any): Observable<FollewUpUserListResponse[]> {
    return this.http.get(ApiMethod.follewUp_UserList, requestData);
  }
  /*
  * 设置默认回访人
  * */
  setDefaults(requestData: any): Observable<any> {
    return this.http.post(ApiMethod.followUp_SetDefault, requestData);
  }
}
