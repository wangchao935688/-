import {NgModule} from '@angular/core';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {CreateEditClassComponent} from './component/create-edit-class/create-edit-class.component';
import {SortClassModuleRouter} from './sort-class.module.router';
import {CreateEditSortClassComponent} from './component/create-edit-sort-class/create-edit-sort-class.component';
import {ClassOptionComponent} from './component/class-option/class-option.component';
import {SortClassService} from 'app/core/service/sort-class.service';
import {ApplicationService} from '../../core/service/application.service';

@NgModule({
  imports: [SortClassModuleRouter, SharedComponentModule],
  declarations: [
    CreateEditSortClassComponent,
    CreateEditClassComponent,
    ClassOptionComponent
  ],
  providers: [SortClassService, ApplicationService],
  entryComponents: [
    CreateEditClassComponent,
  ]
})
export class SortClassModule {

}
