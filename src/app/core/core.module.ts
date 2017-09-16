import {NgModule, Optional, SkipSelf} from "@angular/core";
import {Md5Service} from "./uitls/md5.service";
import {MalihuScrollbarService} from "ngx-malihu-scrollbar";
import {InterceptorService} from "ng2-interceptors";
import {XHRBackend, RequestOptions} from "@angular/http";
import {UserService} from "./service/user.service";
import {HttpInterceptor} from "./service/http.interceptor";
import {SystemService} from "./service/system.service";
import {HttpService} from "./service/http.service";
import {WorkerService} from "./service/worker.service";
import {ReturnVisitService} from "./service/return-visit.service";
import {RechargeService} from "./service/recharge.service";
import {ChargeService} from "./service/charge.service";
import {LocalStorageService} from "./uitls/local-storage-service";
import {GeneralService} from './service/general.service';
import {PatientService} from "./service/patient.service";
import {HospitalService} from "./service/hospital.service";
import {StockService} from './service/stock.service';
import {DailyExpenseService} from "./service/daily-expense.service";
import {CustomizeFormValidateService} from "./service/customize-form.service";
import {FormKeyDictionaryService} from "./service/form-key-dictionary.service";
import {ProcessService} from "./service/process.service";
import {AccountService} from "./service/account.service";
import {Predepositservice} from "./service/pre-deposit.service";
import {ContactService} from "./service/contact.service";
import {MessageService} from "./service/message.service";
import {ApplicationService} from "./service/application.service";


export function interceptorFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions, httpInterceptor: HttpInterceptor) {
  let service = new InterceptorService(xhrBackend, requestOptions);
  service.addInterceptor(httpInterceptor); // Add it here
  // Add interceptors here with service.addInterceptor(interceptor)
  return service;
}

@NgModule({
  providers: [
    Md5Service,
    MalihuScrollbarService,
    HttpInterceptor, // Add it here
    {
      provide: InterceptorService,
      useFactory: interceptorFactory,
      deps: [XHRBackend, RequestOptions, HttpInterceptor] // Add it here, in the same order as the signature of interceptorFactory
    },
    HttpService,
    UserService,
    SystemService,
    WorkerService,
    ReturnVisitService,
    RechargeService,
    ChargeService,
    LocalStorageService,
    GeneralService,
    ChargeService,
    PatientService,
    HospitalService,
    StockService,
    DailyExpenseService,
    CustomizeFormValidateService,
    FormKeyDictionaryService,
    ProcessService,
    AccountService,
    Predepositservice,
    ContactService,
    MessageService,
    ApplicationService
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
