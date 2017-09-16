import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";

import {ReceptionIndexComponent} from "./component/reception-index/reception-index.component";

const receptionDeskRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', component: ReceptionIndexComponent}]
  }
];

@NgModule({
  imports: [RouterModule.forChild(receptionDeskRouter)],
  exports: [RouterModule]
})
export class ReceptionDeskRouterModule {
}
