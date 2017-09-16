import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedComponentModule} from '../../shared/shared-component.module';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';

import { StockRouterModule } from './stock.module.router';
import { GoodsComponent } from './component/goods/goods.component';
import { InputStockComponent } from './component/input-stock/input-stock.component';
import { OutputStockComponent } from './component/output-stock/output-stock.component';
import { SupplierComponent } from './component/supplier/supplier.component';
import { StockinfoComponent } from './component/stockinfo/stockinfo.component';
import { ReturnGoodsComponent } from './component/return-goods/return-goods.component';
import { CurrentStockComponent } from './component/current-stock/current-stock.component';
import { LowVolumeAlarmComponent } from './component/low-volume-alarm/low-volume-alarm.component';
import { BatchDetailQueryComponent } from './component/batch-detail-query/batch-detail-query.component';
import { GoodsListComponent } from './component/goods-list/goods-list.component';
import { CreateEditGoodsComponent } from './component/create-edit-goods/create-edit-goods.component';
import { InputStockListComponent } from './component/input-stock-list/input-stock-list.component';
import { CreateEditInputStockComponent } from './component/create-edit-input-stock/create-edit-input-stock.component';
import { InputStockQueryComponent } from './component/input-stock-query/input-stock-query.component';
import { OutputStockListComponent } from './component/output-stock-list/output-stock-list.component';
import { ReturnGoodsListComponent } from './component/return-goods-list/return-goods-list.component';
import { SupplierListComponent } from './component/supplier-list/supplier-list.component';
import { CreateEditOutputStockComponent } from './component/create-edit-output-stock/create-edit-output-stock.component';
import { OutputStockQueryComponent } from './component/output-stock-query/output-stock-query.component';
import { CreateEditReturnStockComponent } from './component/create-edit-return-stock/create-edit-return-stock.component';
import { ReturnGoodsQueryComponent } from './component/return-goods-query/return-goods-query.component';
import { CreateEditSupplierComponent } from './component/create-edit-supplier/create-edit-supplier.component';
import { SelectGoodsComponent } from './component/select-goods/select-goods.component';
import {GoodsService} from "../../core/service/goods.service";
import {StockService} from "../../core/service/stock.service";
// import {QiezziPopupConfirmComponent} from '../../shared/component/qiezzi-popup-window/popup-confirm/qiezzi-popup-confirm.component';
// import { EditPatientComponent } from './component/edit-patient/edit-patient.component';

@NgModule({
  imports: [
    CommonModule,
    StockRouterModule,

    SharedComponentModule,
    MalihuScrollbarModule.forRoot()
  ],
  providers:[
    GoodsService,
    StockService
  ],
  declarations: [
    StockinfoComponent,
    GoodsComponent,
    InputStockComponent,
    OutputStockComponent,
    SupplierComponent,
    ReturnGoodsComponent,
    CurrentStockComponent,
    LowVolumeAlarmComponent,
    BatchDetailQueryComponent,
    GoodsListComponent,
    CreateEditGoodsComponent,
    InputStockListComponent,
    CreateEditInputStockComponent,
    InputStockQueryComponent,
    OutputStockListComponent,
    ReturnGoodsListComponent,
    SupplierListComponent,
    CreateEditOutputStockComponent,
    OutputStockQueryComponent,
    CreateEditReturnStockComponent,
    ReturnGoodsQueryComponent,
    CreateEditSupplierComponent,
    SelectGoodsComponent,
    // QiezziPopupConfirmComponent,
    // EditPatientComponent
  ],
  entryComponents: [
    //  引入process的弹窗组件
    CreateEditInputStockComponent,
    CreateEditGoodsComponent,
    SelectGoodsComponent,
    CreateEditOutputStockComponent,
    CreateEditSupplierComponent,
    /*ProcessSentComponent,
     ProcessReceivedComponent,
     ProcessReworkedComponent,
     ProcessCompletedComponent,
     CreateProcessComponent,*/
  ]
})
export class StockModule { }
