import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {DisinfectionModuleRouter} from './disinfection.module.router';
import { DisinfectionListComponent } from './component/disinfection-list/disinfection-list.component';
import { DisinfectionComponent } from './component/disinfection/disinfection.component';
import { CreateEditDisinfectionComponent } from './component/create-edit-disinfection/create-edit-disinfection.component';
import { DisinfectionOptionComponent } from './component/disinfection-option/disinfection-option.component';
import { CreateEditCommonThemeComponent } from './component/create-edit-common-theme/create-edit-common-theme.component';
import {CommonThemeComponent} from './component/common-theme/common-theme.component';
@NgModule({
  imports: [
    CommonModule,
    DisinfectionModuleRouter,
    SharedComponentModule
  ],
  declarations: [
    CreateEditCommonThemeComponent,
    DisinfectionListComponent,
    DisinfectionComponent,
    DisinfectionOptionComponent,
    CreateEditDisinfectionComponent,
    CommonThemeComponent,
    CreateEditCommonThemeComponent
  ],
  entryComponents: [
    CreateEditDisinfectionComponent,
    CreateEditCommonThemeComponent
  ]
})
export class DisinfectionModule { }
