import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {StockinfoComponent} from "./component/stockinfo/stockinfo.component";
import { CurrentStockComponent } from './component/current-stock/current-stock.component';
import { LowVolumeAlarmComponent } from './component/low-volume-alarm/low-volume-alarm.component';
import { BatchDetailQueryComponent } from './component/batch-detail-query/batch-detail-query.component';
import { GoodsListComponent } from './component/goods-list/goods-list.component';
import { GoodsComponent } from './component/goods/goods.component';
import { InputStockListComponent } from './component/input-stock-list/input-stock-list.component';
import { InputStockComponent } from './component/input-stock/input-stock.component';
import { CreateEditInputStockComponent } from './component/create-edit-input-stock/create-edit-input-stock.component';
import { InputStockQueryComponent } from './component/input-stock-query/input-stock-query.component';
import { OutputStockListComponent } from './component/output-stock-list/output-stock-list.component';
import { OutputStockComponent } from './component/output-stock/output-stock.component';
import { CreateEditOutputStockComponent } from './component/create-edit-output-stock/create-edit-output-stock.component';
import { OutputStockQueryComponent } from './component/output-stock-query/output-stock-query.component';
import { ReturnGoodsListComponent } from './component/return-goods-list/return-goods-list.component';
import { ReturnGoodsComponent } from './component/return-goods/return-goods.component';
import { CreateEditReturnStockComponent } from './component/create-edit-return-stock/create-edit-return-stock.component';
import { ReturnGoodsQueryComponent } from './component/return-goods-query/return-goods-query.component';
import { SupplierListComponent } from './component/supplier-list/supplier-list.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { CreateEditSupplierComponent } from './component/create-edit-supplier/create-edit-supplier.component';

const stockRouter: Routes = [
  {
    path: '',component: QiezziMainRootComponent,children: [
      {
        path: '',redirectTo: "stockinfo",pathMatch:'full'
      },
      {
        path: 'stockinfo',component: StockinfoComponent,children: [
        // { path: '',redirectTo: "current-stock",pathMatch:'full'},
        { path:'current-stock',component: CurrentStockComponent },
        { path:'low-volume-alarm',component: LowVolumeAlarmComponent },
        { path:'batch-detail-query',component: BatchDetailQueryComponent }
      ]
      },
      {
        path: 'goods-list',component: GoodsListComponent,children: [
        {path:'goods/:goodsId',component: GoodsComponent}
      ]
      },
      {
        path: 'input-stock-list',component: InputStockListComponent,children: [
        { path:'input-stock/:id',component: InputStockComponent },
        { path:'create-edit-input-stock',component: CreateEditInputStockComponent },

      ]
      },
      {
        path:'input-stock-query',component: InputStockQueryComponent
      },
      {
        path: 'output-stock-list',component: OutputStockListComponent,children: [
        { path:'output-stock',component: OutputStockComponent },
        { path:'create-edit-output-stock',component: CreateEditOutputStockComponent },

        ]
      },
      {
        path:'output-stock-query',component: OutputStockQueryComponent
      },
      {
        path: 'return-goods-list',component: ReturnGoodsListComponent,children: [
        { path:'create-edit-return-stock',component: CreateEditReturnStockComponent },
        { path:'return-goods',component: ReturnGoodsComponent },
        ]
      },
      {
        path:'return-goods-query',component: ReturnGoodsQueryComponent
      },
      {
        path: 'supplier-list',component: SupplierListComponent,children: [
        { path:'supplier',component: SupplierComponent },
        { path:'create-edit-supplier',component: CreateEditSupplierComponent },
      ]
      },
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(stockRouter)],
  exports: [RouterModule]
})
export class StockRouterModule {
}
