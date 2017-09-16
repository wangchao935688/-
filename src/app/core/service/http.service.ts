/**
 * Created by bingq on 2017/5/26.
 */
import {InterceptorService} from 'ng2-interceptors';
import {Observable} from 'rxjs/Observable';
import {Response} from '@angular/http';
import * as config from '../../../web-config';
import {HttpException} from '../messages/http-exception';
import {HttpStatusCode} from '../enums/httpStatusCode';
import {Injectable} from '@angular/core';

@Injectable()
export class HttpService {

  constructor(private http: InterceptorService) {
  }

  /**
   * 获取json对象
   * @param res
   * @returns {{}}
   */
  private extractData(res: Response) {
    let body;
    try {
      body = res.json();
    }
    catch (error) {
      return {};
    }
    return ('undefined' === typeof body || null === body) ? {} : body;
  }

  /**
   *more处理异常
   * @param error
   * @returns {any}
   */
  private handleError(error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let exception = new HttpException(HttpStatusCode.OtherError);
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
      exception.statusCode = error.status;
      exception.errorMessage = err;
    } else {
      errMsg = error.message ? error.message : error.toString();
      exception.errorMessage = errMsg;
    }
    console.error(errMsg);
    return Observable.throw(exception);
  }

  /**
   * 将json对象转成url 参数
   * @param url
   * @param obj
   * @returns {string}
   */
  private objectToUrl(url: string, obj: any): string {
    let paramStr = "";
    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean') {
      return url + '/' + obj;
    }

    paramStr = this.objectToQueryParams(obj);

    if (paramStr.length == 0) {
      return url;
    }

    return url + "?" + paramStr.substr(1);
  }

  /**
   * 将json对象转换为QueryParams
   * @param obj
   * @param key
   */
  private objectToQueryParams(obj: any, key: string = null): string {
    if (obj == null) {
      if (key !== null)
        return '&' + key + '=';
    }
    let queryParams = '';
    let t = typeof (obj);
    if (t == 'string' || t == 'number' || t == 'boolean') {
      queryParams += '&' + key + '=' + encodeURIComponent(obj);
    } else {
      for (let i in obj) {
        let k = key == null ? i : key + (obj instanceof Array ? '[' + i + ']' : '.' + i);
        queryParams += this.objectToQueryParams(obj[i], k);
      }
    }
    return queryParams;
  }

  /**
   * 得到接口的绝对地址
   * @param requestUrl
   * @returns {string}
   */
  private getAbsRequestUrl(apiMethod: string): string {
    return config.host + apiMethod;
  }

  /**
   * post 请求api
   * @param apiMethond
   * @param requestData
   * @returns {Observable<Response>}
   */
  public  post<T>(apiMethond: string, requestData: any): Observable<T> {
    return this.http.post(this.getAbsRequestUrl(apiMethond), requestData).map(this.extractData).catch(this.handleError);
  }

  /**
   * get 请求api
   * @param apiMethond
   * @param requestData
   * @returns {Observable<Response>}
   */
  public  get<T>(apiMethond: string, requestData?: any): Observable<T> {
    return this.http.get(this.objectToUrl(this.getAbsRequestUrl(apiMethond), requestData)).map(this.extractData).catch(this.handleError);
  }


}
