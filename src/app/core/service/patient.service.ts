import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs/Observable';
import * as PatientRequestResponse from '../messages/patient-request-response';
import {SavePatientResponse} from "../messages/patient-request-response";

@Injectable()
export class PatientService {

  constructor(private httpService: HttpService) {
  }

  /**
   * 创建患者
   * @param request
   * @returns {Observable<R>}
   */
  createPatient(request: PatientRequestResponse.SavePatientRequest): Observable<SavePatientResponse> {
    return this.httpService.post(ApiMethod.patient_SavePatient, request); // .map(t => t.PatientID)
  }

  /**
   * 搜索患者
   * @param request
   * @returns {Observable<T>}
   */
  searchPatient(request: PatientRequestResponse.SearchPatientRequest): Observable<PatientRequestResponse.SearchPatientResponse> {
    return this.httpService.post(ApiMethod.patient_PatientSearch, request);
  }

  /**
   * 患者余额
   */
  getPatientBalance(requestData: PatientRequestResponse.PatientBalanceRequest): Observable<any> {
    return this.httpService.get(ApiMethod.advanceAccount_GetPatientBalance, requestData);
  }

  /**
   * 获取患者列表
   * @param request
   * @returns {Observable<T>}
   * @constructor
   */
  GetPatientList(request: PatientRequestResponse.GetPatientListRequest): Observable<PatientRequestResponse.GetPatientListResponse> {
    return this.httpService.post(ApiMethod.patient_GetPatientList, request);
  }

  /**
   *患者病历简要详情
   * @param request
   * @returns {Observable<T>}
   * @constructor
   */
  GetCasePatientSummary(request: PatientRequestResponse.CasePatientDetailsRequest): Observable<PatientRequestResponse.CasePatientDetailsResponse> {
    return this.httpService.post(ApiMethod.patient_CasePatientDetails, request);
  }

  /**
   * 获取患者个人中心
   * @param requestData
   * @returns {Observable<T>}
   */
  getPatientCenter(requestData: PatientRequestResponse.PatientCenterRequest): Observable<any> {
    return this.httpService.post(ApiMethod.patient_PatientCenter, requestData);
  }
/*
* 患者详情
* */
  getPatient(requestData: PatientRequestResponse.GetPatientRequest): Observable<PatientRequestResponse.GetPatientResponse> {
    return this.httpService.post(ApiMethod.patient_GetPatient, requestData);
  }
  /*
   * 患者就诊记录
   * */
  GetPatlogNotes(requestData: PatientRequestResponse.GetPatlogNotesRequest): Observable<PatientRequestResponse.GetPatlogNotesResponse> {
    return this.httpService.post(ApiMethod.patient_GetPatlogNotes, requestData);
  }

/*
*患者图像列表
* */
getPatientImageList(requestData: PatientRequestResponse.PatientImageListRequest): Observable<PatientRequestResponse.PatientImageListResponse> {
  return this.httpService.post(ApiMethod.patient_PatientImageList, requestData);
}

  /*
   *患者标签
   * */
  getPatientRelationTypeList(requestData: null): Observable<PatientRequestResponse.PatientRelationTypeListResponse[]> {
    return this.httpService.get(ApiMethod.patient_PatientRelationTypeList, requestData);
  }

  /*
  * 删除患者图像
  * */
  delPatientImage(requestData: any): Observable<null> {
    return this.httpService.post(ApiMethod.patient_DelPatientImage, requestData);
  }

}
