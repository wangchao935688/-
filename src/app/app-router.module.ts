import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";

const appRouter: Routes = [
  {path: '',  loadChildren: 'app/main/main.module#MainModule'}
];

@NgModule({
  // preloadingStrategy预加载
  imports: [RouterModule.forRoot(appRouter)],  //,  {preloadingStrategy:PreloadAllModules}
  exports: [RouterModule]
})
export class AppRoutingModule {
}
