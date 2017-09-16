import {Injectable} from "@angular/core";
import {ApiMethod} from "../api-method";
import {HttpService} from "./http.service";
import {Observable} from "rxjs/Observable";
import * as Worker from "../messages/worker-request-response";
import {WorkerSimple} from "../../core/messages/model/worker_simple";
import {DoctorBookingListResponse, DoctorBookingModel} from "../messages/worker-request-response";
import {GetListWorkerFullResponse} from "../messages/worker-request-response";

@Injectable()
export class WorkerService {
  constructor(private http: HttpService) {
  }

  /**
   * 所有员工列表 参与人
   * @param requestData
   * @returns {Observable<T>}
   */
  getWorkerList(requestData: Worker.WorkerListRequest): Observable<Worker.WorkerListResponse> {
    return this.http.post(ApiMethod.worker_WorkerList, requestData);
    // return Observable.from(Promise.resolve(getDoctor));
  }

  /**
   * 员工列表(多类型)
   * @param requestData
   */
  getGetList(requestData: Worker.GetListRequest): Observable<WorkerSimple[]> {
    return this.http.get(ApiMethod.worker_GetList, requestData);
    // return Observable.from(Promise.resolve(getDoctorType));
  }

  /**
   * 获取详细信息列表
   * @param request
   * @returns {Observable<T>}
   */
  getListWorkerFull(request:Worker.GetListWorkerFullRequest):Observable<GetListWorkerFullResponse>{
    return this.http.get(ApiMethod.worker_GetList,request);
  }

  /**
   * 员工详情
   * @param requestData
   */
  getWorkerDetail(requestData: Worker.GetWorkerDetailRequest): Observable<Worker.GetWorkerDetailResponse> {
    return this.http.get(ApiMethod.worker_Get, requestData);
  }

  /**
   * 修改员工信息
   * @param requestData
   */
  editWorker(requestData: Worker.EditWorkerRequest): Observable<any> {
    return this.http.get(ApiMethod.worker_Edit, requestData);
  }

  postWorkerDoctorBookingList(): Observable<DoctorBookingListResponse> {
    return this.http.post(ApiMethod.worker_DoctorBookingList, {});
  }
}
