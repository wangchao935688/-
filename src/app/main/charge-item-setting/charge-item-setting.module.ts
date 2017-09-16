import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChargeItemIndexComponent } from './component/charge-item-index/charge-item-index.component';
import { ChargeItemListComponent } from './component/charge-item-list/charge-item-list.component';
import { ChargeGroupListComponent } from './component/charge-group-list/charge-group-list.component';
import { CreateTreateChargeItemComponent } from './component/create-treate-charge-item/create-treate-charge-item.component';
import { CreateDrugChargeItemComponent } from './component/create-drug-charge-item/create-drug-charge-item.component';
import { CreateGroupChargeItemComponent } from './component/create-group-charge-item/create-group-charge-item.component';
import {ChargeItemSettingModuleRouter} from './charge-item-setting.module.router';
import {SharedComponentModule} from '../../shared/shared-component.module';

@NgModule({
  imports: [
    CommonModule,
    ChargeItemSettingModuleRouter,
    SharedComponentModule
  ],
  declarations: [
    ChargeItemIndexComponent,
    ChargeItemListComponent,
    ChargeGroupListComponent,
    CreateTreateChargeItemComponent,
    CreateDrugChargeItemComponent,
    CreateGroupChargeItemComponent
  ],
  entryComponents: [
    CreateDrugChargeItemComponent,
    CreateTreateChargeItemComponent,
    CreateGroupChargeItemComponent
  ]
})
export class ChargeItemSettingModule { }
