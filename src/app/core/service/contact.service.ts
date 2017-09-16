/**
 * Created by chengqi on 2017/7/27.
 */
import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {ApiMethod} from '../api-method';
import * as ContactRequestResponse from '../messages/contact-request-response';
import {AddGroupRequest, AddRequest} from '../messages/contact-request-response';

@Injectable()
export class ContactService {
  constructor(private http: HttpService) {
  }
  // 联系人列表
  GetList(requestData: ContactRequestResponse.GetListRequest): Observable<ContactRequestResponse.GetListResponse[]> {
    return this.http.get(ApiMethod.Contact_Get, requestData);
  }
  // 添加群组(request)
  addGroup(requestData: AddGroupRequest): Observable<any> {
    return this.http.post(ApiMethod.contacts_AddGroup, requestData);
  }
// 添加联系人
  Add(requestData: AddRequest): Observable<any> {
    return this.http.post(ApiMethod.contacts_Add, requestData);
}}
