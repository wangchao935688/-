/**
 * Created by bingq on 2017/5/24.
 */
import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import * as UserRequestResponse from '../messages/user-request-response';
import {ApiMethod} from '../api-method';
import {Md5Service} from '../../core/uitls/md5.service';
import * as MockUserRequestResponse from '../messages/mocks/user-request-response-mock';
import {Observable} from 'rxjs';
import * as WebConfig from '../../../web-config';
import { CookieService } from 'ngx-cookie';
import {environment} from '../../../environments/environment';
import {
  ChangePasswordRequest, ChangeTelRequest, CheckPasswordRequest, CheckVerificationCodeRequest,
  CheckVerificationCodeResponse, GetMyShiftListReponse, GetMyShiftListRequest, PersonWorkloadRequest,
  PersonWorkloadResponse,
  SendVerificationCodeRequest, VerificationCodeResponse
} from '../messages/user-request-response';
import * as MessageRequestResponse from "../messages/message-request-response";
import {ImInfoContext} from "../messages/message-request-response";
@Injectable()
export class UserService {
  constructor(private httpService: HttpService, private md5Service: Md5Service, private cookieService: CookieService) {

  }

  /**
   * 用户登录
   * @param username 用户名
   * @param password 原始的password
   * @param autoSignIn 是否自动登录
   */
  login(username: string, password: string, autoSignIn: boolean) {
    let request = new UserRequestResponse.LoginRequest();
    request.UserName = username;
    request.Password = this.md5Service.createHash(password);
    request.AutoSignIn = autoSignIn;
    return this.httpService.post<UserRequestResponse.LoginResponse>(ApiMethod.user_Login, request)
      .map(t => {
        let period = WebConfig.defaultSignTime;
        if (autoSignIn) {
          period = WebConfig.autoSignTime;
        }

        let options: any = {};
        options.expires = new Date(new Date().getTime() + period);

        console.log('enviroment is ' + environment.production);

        if (environment.production) {
          options.domain = WebConfig.domain;
        }

        this.cookieService.put('globals_user', (t.Web.UserCookie as any).Value, options);
        this.cookieService.put('globals', (t.Web.Cookie as any).Value, options);

        if (t.Workers && t.Workers.length > 0) {
          this.cookieService.putObject('currentWorker', t.Workers[0], options);
        }
        return true;
      });
  }

  /**
   * 获取当前登录诊所的员工信息
   */
  getCurrentWorkeInfo() {
    return this.cookieService.getObject('currentWorker') as UserRequestResponse.WorkerInfoModel;
  }

  /**
   * 从cookes中获取ImToken
   * @returns {MessageRequestResponse.GetUserTokenResponse}
   */
  getImContext(): MessageRequestResponse.ImInfoContext {
    let context = this.cookieService.getObject('imInfo') as ImInfoContext;
    let workerInfoContext = this.getCurrentWorkeInfo();
    if (context && workerInfoContext && workerInfoContext.WorkerCode !== context.WorkerCode) {
      this.cookieService.remove('imInfo');
      return null;
    }
    return context;
  }

  /**
   * 设置user的即时通讯的上下文信息
   * @param context
   */
  setImContext(context: ImInfoContext) {
    let options: any = {};
    options.expires = new Date(new Date().getTime() + WebConfig.autoSignTime);
    if (environment.production) {
      options.domain = WebConfig.domain;
    }
    if (context) {
      this.cookieService.putObject('imInfo', context, options);
    }
  }

  /**
   * 判断用户是否登录
   * @returns {boolean}
   */
  isLogin() {
    if (this.cookieService.get('globals')) {
      return true;
    }
    return true;
  }

  /**
   * 修改密码
   * @param requestData
   * @returns {Observable<T>}
   */
  changePassword(requestData: ChangePasswordRequest): Observable<any> {
    return this.httpService.post(ApiMethod.user_ChangePassword, requestData);
  }

  /**
   * 绑定手机
   */
  changeTel(requestData: ChangeTelRequest): Observable<any> {
    return this.httpService.post(ApiMethod.user_ChangeTel, requestData);
  }

  /**
   * 验证密码
   */
  checkPassword(requestData: CheckPasswordRequest): Observable<any> {
    return this.httpService.post(ApiMethod.user_CheckPassword, requestData);
  }

  /**
   * 获取验证码
   */
  sendVerificationCode(requestData: SendVerificationCodeRequest): Observable<any> {
    return this.httpService.post(ApiMethod.user_SendVerificationCode, requestData);
  }

  /**
   * 校验验证码
   */
  checkVerificationCode(requestData: CheckVerificationCodeRequest): Observable<CheckVerificationCodeResponse> {
    return this.httpService.post(ApiMethod.user_CheckVerificationCode, requestData);
  }

  /**
   * 获取我的排班
   */
  getMyShiftList(requestData: GetMyShiftListRequest): Observable<GetMyShiftListReponse[]> {
    return this.httpService.get(ApiMethod.shiftArrangement_GetMyShiftList, requestData);
  }

  /**
   * 图形验证码
   */
  verificationCode(requestData: any): Observable<VerificationCodeResponse> {
    return this.httpService.get(ApiMethod.user_VerificationCode, requestData);
  }
}




