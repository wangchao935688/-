import {NgModule} from '@angular/core';
import {CreateProcessComponent} from '../../main/process/component/create-process/create-process.component';
import {ProcessComponent} from '../../main/process/component/process/process.component';
import {ProcessRateComponent} from '../../main/process/component/process-rate/process-rate.component';
import {ProcessDetailComponent} from '../../main/process/component/process-detail/process-detail.component';
import {ProcessSentComponent} from '../../main/process/component/process-sent/process-sent';
import {ProcessReceivedComponent} from '../../main/process/component/process-received/process-received.component';
import {ProcessReworkedComponent} from '../../main/process/component/process-reworked/process-reworked.component';
import {ProcessCompletedComponent} from '../../main/process/component/process-completed/process-completed.component';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {ToothSharedModule} from '../tooth-shared/tooth-shared.module';

@NgModule({
  imports: [
    SharedComponentModule,
    ToothSharedModule
  ],
  declarations: [
    CreateProcessComponent,
    ProcessComponent,
    ProcessRateComponent,
    ProcessDetailComponent,
    ProcessSentComponent,
    ProcessReceivedComponent,
    ProcessReworkedComponent,
    ProcessCompletedComponent
  ],
  exports: [
    CreateProcessComponent,
    ProcessComponent,
    ProcessRateComponent,
    ProcessDetailComponent,
    ProcessSentComponent,
    ProcessReceivedComponent,
    ProcessReworkedComponent,
    ProcessCompletedComponent
  ],
  entryComponents: [
    CreateProcessComponent,
    ProcessSentComponent,
    ProcessReceivedComponent,
    ProcessReworkedComponent,
    ProcessCompletedComponent
  ]
})
export class ProcessSharedModule {
}
