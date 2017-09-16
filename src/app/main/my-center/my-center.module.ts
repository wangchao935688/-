import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyCenterModuleRouter} from './my-center.module.router';
import { AccountComponent } from './account/account.component';
import { MySortClassComponent } from './my-sort-class/my-sort-class.component';
import { MyWorkloadComponent } from './my-workload/my-workload.component';
import { AccountBasicComponent } from './account-basic/account-basic.component';
import { AccountSecurityComponent } from './account-security/account-security.component';
import { BindMobileComponent } from './bind-mobile/bind-mobile.component';
import { EditPasswordComponent } from './edit-password/edit-password.component';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import { CheckPasswordComponent } from './check-password/check-password.component';

@NgModule({
  imports: [
    CommonModule,
    SharedComponentModule,
    MyCenterModuleRouter,
    MalihuScrollbarModule
  ],
  declarations: [
    AccountComponent,
    MySortClassComponent,
    MyWorkloadComponent,
    AccountBasicComponent,
    AccountSecurityComponent,
    BindMobileComponent,
    EditPasswordComponent,
    CheckPasswordComponent
  ],
  entryComponents: [
    BindMobileComponent,
    EditPasswordComponent,
    CheckPasswordComponent
  ]
})
export class MyCenterModule { }
