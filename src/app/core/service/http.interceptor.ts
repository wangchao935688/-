/**
 * Created by bingq on 2017/5/26.
 */
import { Interceptor, InterceptedRequest, InterceptedResponse } from 'ng2-interceptors';
import {HttpStatusCode} from  '../enums/httpStatusCode';
import { CookieService } from 'ngx-cookie';
import {Injectable} from '@angular/core';
import {LocalStorageService,StorageType} from '../uitls/local-storage-service';

@Injectable()
export class HttpInterceptor implements Interceptor {
  constructor(private cookieService:CookieService,private localStorageService:LocalStorageService){

  }
  public interceptBefore(request: InterceptedRequest): InterceptedRequest {
    // Do whatever with request: get info or edit it
    request.options.headers.append("Authorization",this.cookieService.get("globals_user"));
    request.options.headers.append("Worker",this.cookieService.get("globals"));
    request.options.headers.append("Content-Type","application/json");
    return request;
    /*
     You can return:
     - Request: The modified request
     - Nothing: For convenience: It's just like returning the request
     - <any>(Observable.throw("cancelled")): Cancels the request, interrupting it from the pipeline, and calling back 'interceptAfter' in backwards order of those interceptors that got called up to this point.
     */
  }

  public interceptAfter(response: InterceptedResponse): InterceptedResponse {
    // Do whatever with response: get info or edit it

    if (response.response.status==HttpStatusCode.TokenExpired){

    }
    this.localStorageService.setStore('serverTime',response.response.headers.get('date'),StorageType.LOCAL);
    // console.log('time is '+ response.response.headers.get("Date")) ;
    return response;
    /*
     You can return:
     - Response: The modified response
     - Nothing: For convenience: It's just like returning the response
     */
  }
}
