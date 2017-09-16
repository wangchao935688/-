import { NgModule } from '@angular/core';
import { ContactIndexComponent } from './component/contact-index/contact-index.component';
import { ContactPatientListComponent } from './component/contact-patient-list/contact-patient-list.component';
import { ContactWorkerListComponent } from './component/contact-worker-list/contact-worker-list.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { ContactGroupListComponent } from './component/contact-group-list/contact-group-list.component';
import { CreateEditContactComponent } from './component/create-edit-contact/create-edit-contact.component';
import { ContactComponent } from './component/contact/contact.component';
import {ContactModuleRouter} from './contact.module.router';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {ContactImportComponent} from './component/contact-import/contact-import.component';

@NgModule({
  imports: [
    ContactModuleRouter,
    SharedComponentModule,
  ],
  declarations: [
    ContactIndexComponent,
    ContactPatientListComponent,
    ContactWorkerListComponent,
    ContactListComponent,
    ContactGroupListComponent,
    CreateEditContactComponent,
    ContactImportComponent,
    ContactComponent
  ],
  entryComponents: [
    ContactGroupListComponent,
    ContactImportComponent
  ]
})
export class ContactModule { }
