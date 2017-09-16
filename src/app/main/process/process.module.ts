import {NgModule} from '@angular/core';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {ProcessListComponent} from './component/process-list/process-list.component';
import {ProcessOptionsComponent} from './component/process-options/process-options.component';
import {ProcessModuleRouter} from './process.module.router';
import {CreateProcessColorContentComponent} from './component/create-process-color-content/create-process-color-content.component';
import {ProcessSharedModule} from "../../rely/process-shared/process-shared.module";
import {MalihuScrollbarModule} from "ngx-malihu-scrollbar";

@NgModule({
  imports: [
    ProcessModuleRouter,
    SharedComponentModule,
    ProcessSharedModule,
    MalihuScrollbarModule
  ],
  declarations: [
    ProcessListComponent,
    ProcessOptionsComponent,
    CreateProcessColorContentComponent,
  ],
  providers: [],
  entryComponents: [
    CreateProcessColorContentComponent
  ]
})
export class ProcessModule {

}
