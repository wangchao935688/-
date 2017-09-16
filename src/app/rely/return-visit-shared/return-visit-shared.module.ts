import { NgModule } from '@angular/core';
import {ReturnVisitDetailComponent} from '../../main/return-visit/component/return-visit-detail/return-visit-detail.component';
import {ReturnVisitAddUpdateComponent} from '../../main/return-visit/component/return-visit-add-update/return-visit-add-update.component';
import {ReturnVisitHandlerComponent} from '../../main/return-visit/component/return-visit-handler/return-visit-handler.component';
import {ReturnVisitPeopleComponent} from '../../main/return-visit/component/return-visit-people/return-visit-people.component';
import {ReturnVisitCancelComponent} from '../../main/return-visit/component/return-visit-cancel/return-visit-cancel.component';
import {ReturnVisitTemplateComponent} from '../../main/return-visit/component/return-visit-template/return-visit-template.component';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {
  ReturnVisitTemplateAddUpdateComponent
} from '../../main/return-visit/component/return-visit-template-add-update/return-visit-templdate-add-update.component';
import {ToothSharedModule} from '../tooth-shared/tooth-shared.module';

@NgModule({
  imports: [
    SharedComponentModule,
    ToothSharedModule
  ],
  declarations: [
    ReturnVisitDetailComponent,
    ReturnVisitAddUpdateComponent,
    ReturnVisitHandlerComponent,
    ReturnVisitPeopleComponent,
    ReturnVisitCancelComponent,
    ReturnVisitTemplateComponent,
    ReturnVisitTemplateAddUpdateComponent
  ],
  exports: [
    ReturnVisitDetailComponent
  ],
  entryComponents: [
    ReturnVisitAddUpdateComponent,
    ReturnVisitHandlerComponent,
    ReturnVisitPeopleComponent,
    ReturnVisitCancelComponent,
    ReturnVisitTemplateComponent,
    ReturnVisitTemplateAddUpdateComponent
  ]
})
export class ReturnVisitSharedModule { }
