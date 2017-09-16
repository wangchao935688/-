import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs/Observable';
import {ApiMethod} from '../api-method';
import * as BookingRequestResponse from '../messages/booking-request-response';

@Injectable()
export class BookingService {
  constructor(private httpService: HttpService) {
  }

  /**
   * 患者预约列表
   * @param request
   * @returns {Observable<any>}
   */
  getPatientBookingList(request: BookingRequestResponse.PatientBookingListRequest): Observable<BookingRequestResponse.PatientBookingListResponse> {
    return this.httpService.post(ApiMethod.booking_PatientBookingList, request);
  }

  /**
   * 获取预约列表
   * @param request BookingScheduleListRequest
   * @returns {Observable<BookingScheduleListResponse>}
   * */
  getAllBooking(request: BookingRequestResponse.BookingScheduleListRequest): Observable<BookingRequestResponse.BookingScheduleListResponse> {
    return this.httpService.get(ApiMethod.booking_BookingScheduleList, request);
  }

  getBookingScheduleList(request: BookingRequestResponse.BookingScheduleListRequest): Observable<BookingRequestResponse.BookingScheduleListResponse> {
    return this.httpService.get(ApiMethod.booking_BookingScheduleList, request);
  }

  /**
   * 获取预约详情
   * @param request BookingDetailRequest
   * @returns {Observable<BookingDetailsResponse>}
   * */
  getBookingDetail(request: BookingRequestResponse.BookingDetailRequest): Observable<BookingRequestResponse.BookingDetailsResponse> {
    return this.httpService.post(ApiMethod.booking_BookingDetails, request);
  }

  /**
   * 获取日程详情
   * @param request ScheduleDetailRequest
   * @returns {Observable<BookingDetailsResponse>}
   * */
  getScheduleDetail(request: BookingRequestResponse.ScheduleDetailRequest): Observable<BookingRequestResponse.Schedule_FullDetailsResponse> {
    return this.httpService.get(ApiMethod.schedule_GetSchedule, request);
  }

  /**
   * 获取日程列表
   * @param request BookingScheduleListRequest
   * @returns {Observable<BookingScheduleListResponse>}
   * */
  getAllSchedule(request: BookingRequestResponse.BookingScheduleListRequest): Observable<BookingRequestResponse.BookingScheduleListResponse> {
    return this.httpService.get(ApiMethod.booking_BookingScheduleList, request);
  }

  /**
   * 删除日程*/
  postScheduleDelSchedule(request: BookingRequestResponse.DelScheduleRequest): Observable<any> {
    return this.httpService.post(ApiMethod.schedule_DelSchedule, request);
  }

  /**
   * 删除预约*/
  postBookingDelBooking(request: BookingRequestResponse.BookingDetailRequest): Observable<any> {
    return this.httpService.post(ApiMethod.booking_DelBooking, request);
  }

  /**
   * 新增日程*/
  postScheduleSaveSchedule(request: BookingRequestResponse.Schedule_Add): Observable<any> {
    return this.httpService.post(ApiMethod.schedule_SaveSchedule, request);
  }

  /**新增预约*/
  postBookingSaveBooking(request: BookingRequestResponse.SaveBookingRequest): Observable<any> {
    return this.httpService.post(ApiMethod.booking_SaveBooking, request);
  }

  /**修改预约状态*/
  postBookingSetStatus(request: BookingRequestResponse.SetStatusRequest): Observable<any> {
    return this.httpService.post(ApiMethod.booking_SetStatus, request);
  }

}
