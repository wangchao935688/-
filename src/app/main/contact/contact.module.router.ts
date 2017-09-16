/**
 * Created by chengqi on 2017/7/20.
 */
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QiezziMainRootComponent} from '../../shared/component/qiezzi-main-root/qiezzi-main-root.component';
import {ContactComponent} from './component/contact/contact.component';
// import {ContactImportComponent} from './component/contact-import/contact-import.component';
import {QiezziNoDataComponent} from '../../shared/component/qiezzi-no-data/qiezzi-no-data.component';
import {ContactGroupListComponent} from './component/contact-group-list/contact-group-list.component';
import {ContactIndexComponent} from './component/contact-index/contact-index.component';
import {ContactListComponent} from './component/contact-list/contact-list.component';
import {ContactPatientListComponent} from './component/contact-patient-list/contact-patient-list.component';
import {ContactWorkerListComponent} from './component/contact-worker-list/contact-worker-list.component';
import {CreateEditContactComponent} from './component/create-edit-contact/create-edit-contact.component';


const contactRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'contact-index', pathMatch: 'full'},
    {
      path: 'contact-group-list', component: ContactGroupListComponent,
    },
    {
      path: 'contact-index', component: ContactIndexComponent,
      children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'contact-patient-list', component: ContactPatientListComponent },
        {path: 'contacts', component: ContactComponent },
        {path: 'contact-list', component: ContactListComponent },
        {path: 'contact-worker-list', component: ContactWorkerListComponent }
      ]
    },
     {
      path: 'create-edit-contact', component: CreateEditContactComponent
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(contactRouter)],
  exports: [RouterModule]
})
export class ContactModuleRouter {

}
