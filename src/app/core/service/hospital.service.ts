import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs/Observable';
import * as HospitalAccount from '../messages/hospital-account-request-response';
import {Injectable} from '@angular/core';
import {
  AccountRequest, GetAuthenticationStateResponse,
  HospitalAccountFull
} from '../messages/hospital-account-request-response';
import * as DictRequestResponse from '../messages/dict-request-response';
import * as ProcessRequestResponse from '../messages/process-request-response';
import {SpecialSheetCode} from '../../core/enums/special_sheet_code';
import {DictionaryModelOfSystem} from "../messages/model/dictionary-model-of-system";
import {DictSimpleModel} from "../messages/model/dict-simple.model";

/**
 *  账户
 */
@Injectable()
export class HospitalService {


  constructor(private http: HttpService) {
  }

  /**
   * 账户类型列表
   * @returns {Observable<T>}
   */
  getHospitalAccountTypeList(): Observable<HospitalAccount.GetHospitalAccountTypeListResponse[]> {
    return this.http.get(ApiMethod.hospitalAccount_GetHospitalAccountTypeList);
  }

  /**
   * 获取账户列表
   * @param requestData
   * @returns {Observable<T>}
   */
  getHospitalAccountList(requestData: AccountRequest): Observable<HospitalAccountFull[]> {
    return this.http.get(ApiMethod.hospitalAccount_GetHospitalAccountList, requestData);
  }

  /**
   * 字典列表
   * @param requestData
   * @returns {Observable<T>}
   */
  getDictDetailList(requestData: DictRequestResponse.DictDetailListRequest): Observable<DictRequestResponse.DictDetailListResponse> {
    let item: DictSimpleModel;
    switch (requestData.SheetCode) {
      case SpecialSheetCode[SpecialSheetCode.colorNumber]:
        return this.http.get<DictionaryModelOfSystem[]>(ApiMethod.outsideProcess_GetColorNumberList).map(t => {
          let facadeResponse = new DictRequestResponse.DictDetailListResponse();
          facadeResponse.Items = [];
          t.forEach(t => {
            item = new DictSimpleModel();
            item.Id = t.Key.toString();
            item.Code = t.Key.toString();
            item.Name = t.Value;
            facadeResponse.Items.push(item)
          });
          return facadeResponse;
        });
      default:
        return this.http.post(ApiMethod.dict_DictDetailList, requestData);
    }
  }

  /**
   * 字典排序
   * @param order
   * @param offset
   * @param key
   * @param sheetCode
   */
  reorder(key:string,sheetCode:string,offset:number,order:number) {
    let request = new DictRequestResponse.ReorderRequest();
    request.Key = key;
    request.Offset = offset;
    request.Order = order;
    request.SheetCode = sheetCode;
    switch (sheetCode) {
      case SpecialSheetCode[SpecialSheetCode.colorNumber]:
        return this.http.post(ApiMethod.outsideProcess_ReorderColorNumber, request);
      default:
        return this.http.post(ApiMethod.dict_Reorder, request);
    }
  }

  /**
   *删除字典
   * @param id
   * @returns {Observable<T>}
   */
  delDictDetail(id: string, sheetCode?: string): Observable<any> {
    switch (sheetCode) {
      case SpecialSheetCode[SpecialSheetCode.colorNumber]:
        let color_request = new ProcessRequestResponse.OutsideProcessDeleteColorNumberRequest();
        color_request.ID = id;
        return this.http.post(ApiMethod.outsideProcess_DeleteColorNumber, color_request);
      default:
        let request = new DictRequestResponse.DelDictDetailRequest();
        request.Id = id;
        return this.http.post(ApiMethod.dict_DelDictDetail, request);
    }
  }

  /**
   * 修改字典
   * @param requestData
   * @returns {Observable<T>}
   */
  saveDictDetail(requestData: DictRequestResponse.SaveDictDetailRequest): Observable<any> {
    switch (requestData.DictSheetCode) {
      case SpecialSheetCode[SpecialSheetCode.colorNumber]:
        let colorRequest = new ProcessRequestResponse.OutsideProcessEditColorNumberRequest();
        colorRequest.DictDetailCode = Number(requestData.Id);
        colorRequest.DictDetailName = requestData.DictDetailName;
        return this.http.post(ApiMethod.outsideProcess_EditColorNumber, colorRequest);
      default:
        return this.http.post(ApiMethod.dict_SaveDictDetail, requestData);
    }
  }

  /*
   * 诊所认证状态
   * */
  getAuthenticationState(requestData: any): Observable<GetAuthenticationStateResponse> {
    return this.http.get(ApiMethod.hospital_GetAuthenticationState, requestData);
  }

}
