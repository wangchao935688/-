/**
 * Created by bingq on 2017/6/7.
 * 收费相关服务
 */
import {Injectable} from '@angular/core';
import * as BillRequestResponse from '../messages/bill-request-response';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import {Observable} from 'rxjs';
import * as ChargeItemRequestResponse from '../messages/chargeitem-request-response';

@Injectable()
export class ChargeService {
  constructor(private httpService: HttpService) {

  }

  /**
   * 全部收费单/搜索
   * @param request
   * @returns {Observable<BillRequestResponse.GetBillListResponse>}
   * @constructor
   */
  getBillList(request: BillRequestResponse.GetBillListRequest): Observable<BillRequestResponse.GetBillListResponse> {
    return this.httpService.get<BillRequestResponse.GetBillListResponse>(ApiMethod.bill_GetBillList, request);
  }

  /**
   *收费单详情
   * @param id
   * @returns {Observable<BillRequestResponse.DetailsResponse>}
   * @constructor
   */
  getBill(requestData: BillRequestResponse.BillDetailRequest): Observable<BillRequestResponse.DetailsResponse> {
    return this.httpService.get<BillRequestResponse.DetailsResponse>(ApiMethod.bill_Details, requestData);
  }

  /**
   * 作废收费单
   * @param request
   * @returns {Observable<T>}
   * @constructor
   */
  invalid(request: BillRequestResponse.CancelRequest) {
    return this.httpService.post(ApiMethod.bill_Cancel, request);
  }

  /**
   * 创建收费单
   * @param request
   */
  create(request: BillRequestResponse.AddRequest) {
    return this.httpService.post(ApiMethod.bill_Add, request);
  }

  /**
   * 编辑收费单
   * @param request
   * @returns {Observable<T>}
   * @constructor
   */
  edit(request: BillRequestResponse.EditRequest) {
    return this.httpService.post(ApiMethod.bill_Edit, request);
  }

  /**
   * 收费单退费
   * @param request
   * @returns {Observable<T>}
   * @constructor
   */
  refund(request: BillRequestResponse.RefundRequest) {
    return this.httpService.post(ApiMethod.bill_Refund, request);
  }

  /**
   * 获取所有收费项目，按类别层次结构
   * @returns {Observable<T>}
   */
  getAllChargeItem(): Observable<ChargeItemRequestResponse.GetAllResponse> {

    return this.httpService.get(ApiMethod.chargeItem_GetAll);

  }

  /**
   * 获取简略收费项目
   * @returns {Observable<T>}
   */
  getSimpleChargeItemType(): Observable<ChargeItemRequestResponse.ChargeItemTypeModel[]> {
    return this.httpService.get(ApiMethod.chargeItem_GetChargeItemTypeList);
  }

  /**
   * 搜索收费项搜索
   * @param request
   * @returns {Observable<T>}
   */
  seacrhChargeItem(request: ChargeItemRequestResponse.ChargeItemSeacrhRequest): Observable<ChargeItemRequestResponse.ChargeItemSeacrhResponse> {
    return this.httpService.post(ApiMethod.chargeItem_ChargeItemSeacrh, request);
  }

  /**
   * 收费
   * @param request
   * @returns {Observable<T>}
   */
  charge(request: BillRequestResponse.ChargeRequest) {
    return this.httpService.post(ApiMethod.bill_Charge, request);
  }
  /**
   * 患者收费列表
   * @param request
   * @returns {Observable<T>}
   */
  GetPatientBill(request: BillRequestResponse.GetPatientBillRequest): Observable<BillRequestResponse.GetPatientBillResponse[]> {
    return this.httpService.get(ApiMethod.bill_GetPatientBill, request);
  }

}

