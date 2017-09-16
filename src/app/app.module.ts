import {NgModule} from '@angular/core';
import {NgSwitch} from '@angular/common';
import {HttpModule} from '@angular/http';
import {BrowserModule} from '@angular/platform-browser';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-router.module';
import {CoreModule} from './core/core.module';
import {GlobalState} from './global.state';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CookieModule} from 'ngx-cookie';
import {SharedComponentModule} from './shared/shared-component.module';
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CookieModule.forRoot(),
    BrowserAnimationsModule,
    HttpModule,
    AppRoutingModule,
    CoreModule,// 核心服务模块,
    MalihuScrollbarModule.forRoot(),
    SharedComponentModule
  ],
  exports: [],
  providers: [
    NgSwitch,
    GlobalState
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {
  // Diagnostic only: inspect router configuration
  /*constructor(router: Router) {
   console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
   }*/
}
