import { Injectable } from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs/Observable';
import * as SMSRequestResponse from '../messages/sms-request-response';

@Injectable()
export class SmsService {

  constructor(private http: HttpService) { }
  /**
   * 短信数量统计
   */
  getSMSStatistics(requestData: any): Observable< SMSRequestResponse.SMSStatisticsResponse> {
    return this.http.get(ApiMethod.sMS_SMSStatistics, requestData);
  }

  /**
   * 全部模板列表
   */
  getTemplateList(requestData: any): Observable< SMSRequestResponse.GetTemplateListResponse> {
    return this.http.get(ApiMethod.sMS_GetTemplateList, requestData);
  }

  /**
   * 修改模板 POST api/SMS/EditTemplate
   */
  editTemplate(requestData: SMSRequestResponse.EditTemplateRequest): Observable<any> {
    return this.http.post(ApiMethod.sMS_EditTemplate, requestData);
  }

  /**
   * 删除模板 POST api/SMS/DelTemplate
   */
  delTemplate(requestData: SMSRequestResponse.DelTemplateRequest): Observable< any> {
    return this.http.post(ApiMethod.sMS_DelTemplate, requestData);
  }

  /**
   * 添加模板（短信另存为）SMS/AddTemplate
   */
  addTemplate(requestData: SMSRequestResponse.AddTemplateRequest): Observable<any> {
    return this.http.post(ApiMethod.sMS_AddTemplate, requestData);
  }

  /**
   *  短信回复列表 SMS/ReplyList
   */
  getReplyList(requestData: SMSRequestResponse.ReplyListRequest): Observable<SMSRequestResponse.ReplyListResponse> {
    return this.http.get(ApiMethod.sMS_ReplyList, requestData);
  }

  /**
   * 发送列表 GET api/SMS/SendList
   */
  sendList(requestData: SMSRequestResponse.SendListRequest): Observable< SMSRequestResponse.SendListResponse> {
    return this.http.get(ApiMethod.sMS_SendList, requestData);
  }

  /**
   * 发送详情 GET api/SMS/SendDetails/{id}
   */
  sendDetails(requestData: SMSRequestResponse.SendDetailsRequest): Observable< SMSRequestResponse.SendDetailsResponse> {
    return this.http.get(ApiMethod.sMS_SendDetails, requestData);
  }

  /**
   * 充值记录列表GET api/SMS/GetRechargerList
   */
  getRechargerList(requestData: SMSRequestResponse.GetRechargerListRequest): Observable< SMSRequestResponse.GetRechargerListResponse> {
    return this.http.get(ApiMethod.sMS_GetRechargerList, requestData);
  }

  /**
   * 充值记录详情GET api/SMS/GetRecharger/{id}
   */
  getRecharger(requestData: SMSRequestResponse.GetRechargerRequest): Observable< SMSRequestResponse.GetRechargerResponse> {
    return this.http.get(ApiMethod.sMS_GetRecharger, requestData);
  }

  /**
   * 获得调用支付宝/微信数据POST api/SMS/SMSRecharger
   */
  getSMSRecharger(requestData: SMSRequestResponse.SMSRechargerRequest): Observable< SMSRequestResponse.SMSRechargerResponse> {
    return this.http.post(ApiMethod.sMS_SMSRecharger, requestData);
  }

  /**
   * 生成订单 POST api/SMS/CreateRechargerRecord
   */
  createRechargerRecord(requestData: SMSRequestResponse.CreateRechargerRecordRequest): Observable< SMSRequestResponse.CreateRechargerRecordResponse> {
    return this.http.post(ApiMethod.sMS_CreateRechargerRecord, requestData);
  }

  /**
   * 根据模板类型code查找模板 GET api/SMS/GetTemplateList?typeCode={typeCode}
   */
  getTemplateTypeListByCode(requestData: SMSRequestResponse.GetTemplateListByCodeRequest): Observable< SMSRequestResponse.GetTemplateListByCodeResponse> {
    return this.http.get(ApiMethod.sMS_TemplateTypeList, requestData);
  }

  /**
   * 模板类别列表 GET api/SMS/TemplateTypeList
   */
  getTemplateTypeList(requestData: any): Observable< SMSRequestResponse.TemplateTypeListResponse[]> {
    return this.http.get(ApiMethod.sMS_TemplateTypeList, requestData);
  }

  /**
   * 添加模板类别 POST api/SMS/AddTemplateType
   */
  addTemplateType(requestData: SMSRequestResponse.AddTemplateTypeRequest): Observable< any> {
    return this.http.post(ApiMethod.sMS_AddTemplateType, requestData);
  }

  /**
   * 删除模板类别 POST api/SMS/DelTemplateType
   */
  delTemplateType(requestData: SMSRequestResponse.DelTemplateTypeRequest): Observable< any> {
    return this.http.post(ApiMethod.sMS_DelTemplateType, requestData);
  }

  /**
   * 修改模板类别 POST api/SMS/EditTemplateType
   */
  editTemplateType(requestData: SMSRequestResponse.EditTemplateTypeRequest): Observable< SMSRequestResponse.SMSStatisticsResponse> {
    return this.http.post(ApiMethod.sMS_EditTemplateType, requestData);
  }

  /**
   * 聊天 GET api/SMS/GetChat/{id}?pageIndex={pageIndex}&pageSize={pageSize}
   */
  getChat(requestData: SMSRequestResponse.GetChatRequest): Observable< SMSRequestResponse.GetChatResponse> {
    return this.http.get(ApiMethod.sMS_GetChat, requestData);
  }

  /**
   * 群发短信 POST api/SMS/SendGroupSMS
   */
  sendGroupSMS(requestData: SMSRequestResponse.SendGroupSMSRequest): Observable<any> {
    return this.http.post(ApiMethod.sMS_SendGroupSMS, requestData);
  }

  /**
   * 短信包
   */
  getSMSPackageList(requestData: any): Observable<SMSRequestResponse.SMSPackageListResponse[]> {
    return this.http.get(ApiMethod.sMS_SMSPackageList, requestData);
  }
}
