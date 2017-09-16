import {NgModule} from '@angular/core';
import {ReturnVisitManageComponent} from './component/return-visit-manage/return-visit-manage.component';
import {ReturnVisitRouterModule} from './return-visit-module.router';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {ReturnVisitOptionsComponent} from './component/return-visit-options/return-visit-options.component';
import {ReturnVisitComponent} from './return-visit.component';
import {ReturnVisitSharedModule} from '../../rely/return-visit-shared/return-visit-shared.module';
import {ReturnVisitService} from '../../core/service/return-visit.service';
import {CaseService} from '../../core/service/case.service';
import {ReturnVisitHandlerComponent} from './component/return-visit-handler/return-visit-handler.component';
import {ReturnVisitDetailComponent} from './component/return-visit-detail/return-visit-detail.component';
import {ScheduleSharedModule} from '../../rely/schedule-shared/schedule-shared.module';
import {BookingService} from '../../core/service/booking.service';
@NgModule({
  imports: [
    ReturnVisitRouterModule,
    SharedComponentModule,
    ReturnVisitSharedModule,
    ScheduleSharedModule
  ],
  declarations: [
    ReturnVisitComponent,
    ReturnVisitManageComponent,
    ReturnVisitOptionsComponent,
  ],
  providers: [
    ReturnVisitService,
    CaseService,
    BookingService
  ],
  entryComponents: []
})
export class ReturnVisitModule {

}
