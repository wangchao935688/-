import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";

import {HospitalIndexComponent} from "./component/hospital-index/hospital-index.component";


const hospitalRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: "hospital-index", pathMatch: 'full'
    },
    {
      path: 'hospital-index', component: HospitalIndexComponent, children: [
      // {path: '', redirectTo: "current-stock", pathMatch: 'full'},

    ]
    }
  ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(hospitalRouter)],
  exports: [RouterModule]
})
export class HospitalRouterModule {
}
