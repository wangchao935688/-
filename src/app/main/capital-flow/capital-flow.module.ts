/**
 * Created by Li Jinglei on 2017/6/22.
 */
import { NgModule } from '@angular/core';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {CapitalFlowRouterModule} from './capital-flow.module.router';
import { CapitalFlowIndexComponent } from './component/capital-flow-index/capital-flow-index.component';
import {CapitalFlowTransferComponent} from './component/capital-flow-transfer/capital-flow-transfer.component';
import {FlowDetailSharedModule} from "../../rely/flow-detail-shared/flow-detail-shared.module";

@NgModule({
  imports : [
    CapitalFlowRouterModule,
    SharedComponentModule,
    FlowDetailSharedModule
  ],
  declarations: [ CapitalFlowIndexComponent, CapitalFlowTransferComponent],
  exports: [],
  providers: [],
  entryComponents: [CapitalFlowTransferComponent]
  })
export class CapitalFlowModule {
}
