/**
 * Created by KingKong on 2017/5/15.
 */
import {NgModule} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {HttpModule} from "@angular/http";
import {RouterModule} from "@angular/router";
import {AppMainComponent} from "./home/main-home/main-home.component";
import {MainRouterModule} from "./main-router.module";
import {CommonModule, NgSwitch, NgSwitchCase} from "@angular/common";
import {AppLeftContentComponent} from "./home/app-left-content/app-left-content.component";

import {SharedComponentModule} from "../shared/shared-component.module";
import {QiezziInvalidComponent} from "../shared/component/qiezzi-invalid/qiezzi-invalid.component";
import {CustomizeSliderService} from "../core/service/customize-slider.service";
import {ApplicationService} from "../core/service/application.service";
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";

@NgModule({
  imports: [
    HttpModule,
    RouterModule,
    MainRouterModule,
    SharedComponentModule,
    MalihuScrollbarModule
  ],
  declarations: [
    AppMainComponent,
    AppLeftContentComponent,
    QiezziInvalidComponent
  ],
  exports: [],
  providers: [
    NgSwitch,
    NgSwitchCase,
    CustomizeSliderService
  ],
  entryComponents: [
    QiezziInvalidComponent
  ]
})
export class MainModule {
}
