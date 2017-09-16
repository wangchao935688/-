/**
 * Created by KingKong on 2017/5/25.
 */

import {NgModule} from '@angular/core';

import {DemoRouterModule} from './demo.module.router';

import {DemoIndexComponent} from './demo-index/demo-index.component';
import {DemoNoticeComponent} from './popup/demo-notice/demo-notice.component';
import {DemoRightDetailComponent} from './demo-index/demo-right-detail/demo-right-detail.component';
import {DemoConfigComponent} from './demo-config/demo-config.component';
import {DemoListComponent} from './demo-list/demo-list.component';
import {DemoListDetailComponent} from './demo-list/demo-list-detail/demo-list-detail.component';
import {DemoFormComponent} from './demo-form/demo-form.component';
import {DemoLargeComponent} from './demo-large/demo-large.component';
import {DemoLargeDetailComponent} from './demo-large/demo-large-detail/demo-large-detail.component';
import {DemoListDetailInfoComponent} from './demo-list/demo-list-detail/demo-list-detail-info/demo-list-detail-info.component';
import {DemoHasButtonPopupComponent} from './popup/demo-has-button-popup/demo-has-button-popup.component';
import {DemoNoButtonPopupComponent} from './popup/demo-no-button-popup/demo-no-button-popup.component';
import {DemoTextPopupComponent} from './popup/demo-text-popup/demo-text-popup.component';
import {SharedComponentModule} from '../../shared/shared-component.module';

@NgModule({
  declarations: [
    DemoIndexComponent,
    DemoNoticeComponent,
    DemoRightDetailComponent,
    DemoConfigComponent,
    DemoListComponent,
    DemoListDetailComponent,
    DemoFormComponent,
    DemoLargeComponent,
    DemoLargeDetailComponent,
    DemoListDetailInfoComponent,
    DemoHasButtonPopupComponent,
    DemoNoButtonPopupComponent,
    DemoTextPopupComponent
  ],
  imports: [
    DemoRouterModule,
    SharedComponentModule
  ],
  providers: [],
  entryComponents: [
    DemoNoticeComponent,
    DemoHasButtonPopupComponent,
    DemoNoButtonPopupComponent,
    DemoTextPopupComponent
  ]
})
export class DemoModule {
}
