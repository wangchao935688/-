import { NgModule } from '@angular/core';
import {SharedComponentModule} from "../../shared/shared-component.module";
import {QiezziToothPicComponent} from "../../shared/component/qiezzi-tooth-pic/qiezzi-tooth-pic.component";
import {QiezziToothEditComponent} from "../../shared/component/qiezzi-tooth-edit/qiezzi-tooth-edit.component";
import {QiezziToothComponent} from "../../shared/component/qiezzi-tooth/qiezzi-tooth.component";

@NgModule({
  imports: [
    SharedComponentModule
  ],
  declarations: [
    QiezziToothComponent,
    QiezziToothEditComponent,
    QiezziToothPicComponent
  ],
  exports:[
    QiezziToothComponent,
    QiezziToothEditComponent,
    QiezziToothPicComponent
  ]
  ,entryComponents:[
    QiezziToothPicComponent
  ]
})
export class ToothSharedModule { }
