/**
 * Created by bingq on 2017/5/29.
 */
import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {CreateDictDetailComponent} from './component/create-dict-detail/create-dict-detail.component';
import { LoginComponent } from './component/login/login.component';
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {TestComComponent} from "./component/test-com/test-com.component";
import {OptionListComponent} from "./component/option-list/option-list.component";

const systemRouter: Routes = [
  // {path: '', component: CreateDictDetailComponent},
  // {path: 'login', component: LoginComponent}
  {
    path: '', component: QiezziMainRootComponent, children: [
    {
      path: '', redirectTo: 'create',
      pathMatch: 'full'
    },
    {
      path: 'create', component: CreateDictDetailComponent
    //   , children: [
    //   {path: '', component: QiezziNoDataComponent}
    //   // {path: 'capital-flow-detail', component: CapitalFlowDetailComponent}
    // ],
    }
    ,{
      path: 'login', component: LoginComponent
    }
    ,{
      path: 'test', component: TestComComponent
    }
    ,{
      path: 'optionlist', component: OptionListComponent
    }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(systemRouter)],
  exports: [RouterModule]
})
export class SystemRouterModule {
}
