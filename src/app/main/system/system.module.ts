import { NgModule } from '@angular/core';
import { CreateDictDetailComponent } from './component/create-dict-detail/create-dict-detail.component';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {SystemService} from '../../core/service/system.service';
import {SystemRouterModule} from './system.module.router';
import { LoginComponent } from './component/login/login.component';
import { TestComComponent } from './component/test-com/test-com.component';
import {QRCodeModule} from "../../rely/qrcode/index";
import { OptionListComponent } from './component/option-list/option-list.component';

@NgModule({
  imports: [
    SystemRouterModule,
    SharedComponentModule,
    QRCodeModule
  ],
  declarations: [
    CreateDictDetailComponent,
    LoginComponent,
    TestComComponent,
    OptionListComponent
    ],
  providers:[SystemService]
})
export class SystemModule { }
