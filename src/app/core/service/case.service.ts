import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {ApiMethod} from '../api-method';
import * as CaseRequestResponse from '../messages/case-request-response';

@Injectable()
export class CaseService {

  constructor(private httpService: HttpService) { }
  /**
   * 获取病例详情
   * @param request
   * @returns {Observable<R>}
   */
  getCaseDetails(request: CaseRequestResponse.CaseDetailsRequest): Observable<CaseRequestResponse.CaseDetailsResponse> {
    return this.httpService.post(ApiMethod.case_CaseDetails, request);
  }

  /**
   * 获取患者病例列表
   * @param request
   * @returns {Observable<R>}
   */
  getCaseList(request: CaseRequestResponse.CaseListRequest): Observable<any> {
    return this.httpService.get(ApiMethod.case_CaseList, request);
  }

  /**
   * 获取所有病例列表
   */
  getAllCaseList(request: CaseRequestResponse.GetCaseListByRequest): Observable<CaseRequestResponse.GetCaseListByResponse> {
    return this.httpService.get(ApiMethod.case_GetList, request);
  }

  /**
   * 新增病例
   */
  saveCase(request: CaseRequestResponse.SaveCaseRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_SaveCase, request);
  }

  /**
   * 标签列表
   */
  caseRelationList(request: CaseRequestResponse.CaseRelationListRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_CaseRelationList, request);
  }

  /**
   * 标签上下移
   */
  reorderCaseRelation(request: CaseRequestResponse.ReorderCaseRelationRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_ReorderCaseRelation, request);
  }

  /**
   * 添加病历标签
   */
  addCaseRelation(request: CaseRequestResponse.AddCaseRelationRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_AddCaseRelation, request);
  }

  /**
   * 修改病例标签
   */
  editCaseRelation(request: CaseRequestResponse.EditCaseRelationRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_EditCaseRelation, request);
  }

  /**
   * 删除病例标签
   */
  delCaseRelation(request: CaseRequestResponse.DelCaseRelationRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_DelCaseRelation, request);
  }

  /**
   * 医嘱模板列表--医生常用语
   */
  getDoctorAdviceTemplateList(request: CaseRequestResponse.GetDoctorAdviceTemplateListRequest): Observable< CaseRequestResponse.GetDoctorAdviceTemplateListResponse> {
    return this.httpService.get(ApiMethod.case_GetDoctorAdviceTemplateList, request);
  }

  /**
   * 上下移医嘱模板--医生常用语
   */
  reorderDoctorAdviceTemplate(request: CaseRequestResponse.ReorderDoctorAdviceTemplateRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_ReorderDoctorAdviceTemplate, request);
  }

  /**
   * 添加医嘱模板--医生常用语
   */
  addDoctorAdviceTemplate(request: CaseRequestResponse.AddDoctorAdviceTemplateRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_AddDoctorAdviceTemplate, request);
  }

  /**
   * 修改医嘱模板--医生常用语
   */
  editDoctorAdviceTemplate(request: CaseRequestResponse.EditDoctorAdviceTemplateRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_EditDoctorAdviceTemplate, request);
  }

  /**
   * 删除医嘱模板--医生常用语
   */
  delDoctorAdviceTemplate(request: CaseRequestResponse.DelDoctorAdviceTemplateRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_DelDoctorAdviceTemplate, request);
  }

  /**
   * 病例模板列表/搜索
   */
  getTemplateList(request: CaseRequestResponse.TemplateListRequest): Observable< CaseRequestResponse.TemplateListResponse> {
    return this.httpService.post(ApiMethod.case_TemplateList, request);
  }

  /**
   * 病例模板详情
   */
  getTemplateDetails(request: CaseRequestResponse.TemplateDetailsRequest): Observable<CaseRequestResponse.TemplateDetailsResponse> {
    return this.httpService.post(ApiMethod.case_TemplateDetails, request);
  }

  /**
   * 词条类别列表
   */
  getLemmaCategoryList(request: CaseRequestResponse.LemmaCategoryListRequest): Observable<CaseRequestResponse.LemmaCategoryListResponse> {
    return this.httpService.post(ApiMethod.case_LemmaCategoryList, request);
  }

  /**
   * 添加词条类别
   */
  addLemmaType(request: CaseRequestResponse.AddLemmaTypeRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_AddLemmaType, request);
  }

  /**
   * 修改词条类别
   */
  editLemmaType(request: CaseRequestResponse.EditLemmaTypeRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_EditLemmaType, request);
  }

  /**
   * 删除词条类别
   */
  delLemmaType(request: CaseRequestResponse.DelLemmaTypeRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_DelLemmaType, request);
  }

  /**
   * 词条列表
   */
  getLemmaList(request: CaseRequestResponse.LemmaListRequest): Observable<CaseRequestResponse.LemmaListResponse> {
    return this.httpService.post(ApiMethod.case_LemmaList, request);
  }

  /**
   * 添加词条
   */
  addLemma(request: CaseRequestResponse.AddLemmaRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_AddLemma, request);
  }

  /**
   * 修改词条
   */
  editLemma(request: CaseRequestResponse.EditLemmaRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_EditLemma, request);
  }

  /**
   * 删除词条
   */
  delLemma(request: CaseRequestResponse.DelLemmaRequest): Observable<any> {
    return this.httpService.post(ApiMethod.case_DelLemma, request);
  }
}
