import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {ProcessOptionsComponent} from "./component/process-options/process-options.component";
import {ProcessComponent} from "./component/process/process.component";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {ProcessListComponent} from "./component/process-list/process-list.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";

const processRouter: Routes = [
  {
    path: '', component: QiezziMainRootComponent, children: [
    {path: '', redirectTo: 'index', pathMatch: 'full'},
    {
      path: 'index', component: ProcessListComponent,
      children: [
        {path: '', component: QiezziNoDataComponent},
        {path: 'process/:processId', component: ProcessComponent}
      ]
    },
    {
      path: 'process-options', component: ProcessOptionsComponent,
    },
  ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(processRouter)],
  exports: [RouterModule]
})
export class ProcessModuleRouter {

}
