import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {QiezziPaginator} from './component/qiezzi-paginator/qiezzi-paginator';
import {QiezziLoadingComponent} from './component/qiezzi-loading/qiezzi-loading.component';
import {QiezziFullMaskComponent} from './component/qiezzi-full-mask/full-mask.component';
import {QiezziInvalidPipe} from './pipe/qiezzi-invalid/qiezzi-invalid.pipe';
import {QiezziDicPipe} from './pipe/qiezzi-dic.pipe';
import {QiezziPopupWindowDirective} from './component/qiezzi-popup-window/qiezzi-popup-window.directive';
import {QiezziPopupWindowComponent} from './component/qiezzi-popup-window/popup-window/popup-window.component';
import {QiezziFrontLayerComponent} from './component/qiezzi-popup-window/front-layer/qiezzi-front-layer.component';
import {QiezziFrontLayerDirective} from './component/qiezzi-popup-window/qiezzi-front-layer.directive';
import {QiezziTabControlComponent} from './component/qiezzi-tab-control/qiezzi-tab-control.component';
import {QiezziRightHeaderComponent} from './component/qiezzi-right-header/qiezzi-right-header.component';
import {QiezziCenterHeaderComponent} from './component/qiezzi-center-header/qiezzi-center-header.component';
import {QiezziNoDataComponent} from './component/qiezzi-no-data/qiezzi-no-data.component';
import {QiezziDataFilterComponent} from './component/qiezzi-data-filter/qiezzi-data-filter.component';
import {QiezziDefault} from './pipe/qiezzi-default/qiezzi-default.pipe';
import {QiezziTextNullPipe} from './pipe/qiezzi-text-null/qiezzi-text-null.pipe';
import {QieziiMoneyPipe} from './pipe/qiezzi-moeny/qiezzi-moeny.pipe';

/****汤亮从这一行开始添加****/
import {QiezziSelectDateSlotComponent} from './component/qiezzi-select-date-slot/qiezzi-select-date-slot.component';
import {QiezziAirDatePickerDirective} from './directive/qiezzi-air-picker/qiezzi-air-picker.directive';
import {QiezziDoubleDateComponent} from './component/qiezzi-double-date/qiezzi-double-date.component';
import {QiezziDateAutoPipe} from './pipe/qiezzi-date-auto/qiezzi-date-auto.pipe';
/****汤亮结束****/
/****赵烨从这一行开始添加****/

import {TagBoxGroupComponent} from './component/qiezzi-tag-box-group/tag-box-group.component';
import {QiezziDropDownListComponent} from './component/qiezzi-drop-down-list/qiezzi-drop-down-list.component';
import {PopupWindowBaseComponent} from './component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {IconInputComponent} from './component/qiezzi-icon-input/icon-input.component';
import {QiezziMainRootComponent} from './component/qiezzi-main-root/qiezzi-main-root.component';
import {RouterModule} from '@angular/router';
import {QiezziPopupConfirmComponent} from './component/qiezzi-popup-window/popup-confirm/qiezzi-popup-confirm.component';
import {QiezziHideDataComponent} from './component/qiezzi-hide-data/qiezzi-hide-data.component';
import {PromptMessageComponent} from './component/qiezzi-prompt-message/qiezzi-prompt-message.component';
import {PromptContainerDirective} from './component/qiezzi-main-root/prompt-container.directive';
import {QiezziDataEmptyComponent} from './component/qiezzi-data-empty/qiezzi-data-empty.component';

/****赵烨结束****/
/****路遵从这一行开始添加****/
import {QiezziPatientLabelSelectComponent} from './component/qiezzi-patient-label-select/qiezzi-patient-label-select.component';
import {SelectButtonGroupComponent} from './component/qiezzi-select-button-group/select-button-group.component';

import {QiezziUploadComponent} from './component/qiezzi-upload/qiezzi-upload.component';
import {MalihuScrollbarModule} from 'ngx-malihu-scrollbar';
import {QiezziImageViewComponent} from './component/qiezzi-image-view/qiezzi-image-view.component';
import {QiezziUserHeadComponent} from './component/qiezzi-user-head/qiezzi-user-head.component';
import {QiezziProvinceCityAreaComponent} from './component/qiezzi-province-city-area/qiezzi-province-city-area.component';
import {QiezziSelectPartakerComponent} from './component/qiezzi-select-partaker/qiezzi-select-partaker.component';
import {QiezziSelectPatientComponent} from './component/qiezzi-select-patient/qiezzi-select-patient.component';
// import {QiezziDictArrayStringPipe} from './pipe/qiezzi-array-string/qiezzi-array-string.pipe';
import {QiezziArrayStringPipe} from './pipe/qiezzi-array-string/qiezzi-array-string.pipe';
import {QiezziDayWeekMonthStepComponent} from './component/qiezzi-day-week-month-step/qiezzi-day-week-month-step.component';
import {QiezziInputPopComponent} from './component/qiezzi-input-pop/qiezzi-input-pop.component';
import {QiezziDatePickerDirective} from "./directive/qiezzi-date-picker/qiezzi-date-picker.directive";
import { QiezziSettingDictListComponent } from './component/qiezzi-setting-dict-list/qiezzi-setting-dict-list.component';
import {QiezziRelativeSelectComponent} from "./component/qiezzi-relative-select/qiezzi-relative-select.component";
import {QiezziPopupBubbleDirective} from "./directive/qiezzi-popup-bubble/qiezzi-popup-bubble.directive";
/****路遵结束****/
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MalihuScrollbarModule,
  ],
  declarations: [
    QiezziPaginator,
    QiezziLoadingComponent,
    QiezziFullMaskComponent,
    QiezziInvalidPipe,
    QiezziDicPipe,
    QiezziPopupWindowDirective,
    QiezziPopupWindowComponent,
    QiezziFrontLayerComponent,
    QiezziFrontLayerDirective,
    QiezziRightHeaderComponent,
    QiezziCenterHeaderComponent,
    QiezziNoDataComponent,
    QiezziDataFilterComponent,
    /****汤亮从这一行开始添加****/
    QiezziDefault,
    QieziiMoneyPipe,
    QiezziTextNullPipe,
    QiezziSelectDateSlotComponent, // 复杂日期选择组件
    QiezziAirDatePickerDirective, // 日期组件
    QiezziDoubleDateComponent, // 双日期组件
    QiezziDateAutoPipe, // 日期格式化管道
    QiezziArrayStringPipe,
    /****汤亮结束****/

    /****赵烨从这一行开始添加****/
    QiezziHideDataComponent,
    IconInputComponent,
    TagBoxGroupComponent,
    QiezziTabControlComponent,
    TagBoxGroupComponent,
    QiezziDropDownListComponent,
    PopupWindowBaseComponent,
    QiezziMainRootComponent,
    QiezziPopupConfirmComponent,
    QiezziDataEmptyComponent,
    PromptContainerDirective,
    SelectButtonGroupComponent,
    QiezziHideDataComponent,
    /****赵烨结束****/

    /****路遵从这一行开始添加****/
    QiezziPatientLabelSelectComponent,
    PromptMessageComponent,
    /****路遵结束****/
    QiezziUploadComponent,
    QiezziImageViewComponent,
    QiezziUserHeadComponent,
    QiezziProvinceCityAreaComponent,
    QiezziSelectPartakerComponent,
    QiezziSelectPatientComponent,
    QiezziDayWeekMonthStepComponent,
    QiezziInputPopComponent,
    QiezziDatePickerDirective,
    QiezziSettingDictListComponent,
    QiezziRelativeSelectComponent,
    QiezziPopupBubbleDirective
  ],
  exports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    QiezziPaginator,
    QiezziLoadingComponent,
    QiezziFullMaskComponent,
    QiezziInvalidPipe,
    QiezziDicPipe,
    QiezziTabControlComponent,
    QiezziFrontLayerDirective,
    QiezziPopupWindowDirective,
    QiezziFrontLayerComponent,
    QiezziPopupWindowComponent,
    QiezziRightHeaderComponent,
    QiezziCenterHeaderComponent,
    QiezziNoDataComponent,
    QiezziDataFilterComponent,
    /****汤亮从这一行开始添加****/
    QiezziDefault,
    QieziiMoneyPipe,
    QiezziTextNullPipe,
    QiezziSelectDateSlotComponent, // 复杂日期选择组件
    QiezziAirDatePickerDirective,
    QiezziDoubleDateComponent,
    QiezziDateAutoPipe,
    QiezziArrayStringPipe,
    /****汤亮结束****/

    /****赵烨从这一行开始添加****/
    IconInputComponent,
    QiezziTabControlComponent,
    TagBoxGroupComponent,
    QiezziDropDownListComponent,
    PopupWindowBaseComponent,
    QiezziMainRootComponent,
    QiezziPopupConfirmComponent,
    QiezziDataEmptyComponent,
    PromptContainerDirective,
    SelectButtonGroupComponent,
    QiezziHideDataComponent,
    /****赵烨结束****/

    /****路遵从这一行开始添加****/
    QiezziPatientLabelSelectComponent,
    /****路遵结束****/
    QiezziUploadComponent,
    MalihuScrollbarModule,
    RouterModule,
    QiezziImageViewComponent,
    QiezziUserHeadComponent,
    QiezziProvinceCityAreaComponent,
    QiezziSelectPatientComponent,
    TagBoxGroupComponent,
    QiezziDayWeekMonthStepComponent,
    QiezziDatePickerDirective,
    QiezziRelativeSelectComponent,
    QiezziSettingDictListComponent,
    QiezziPopupBubbleDirective
  ],
  entryComponents: [
    QiezziPopupWindowComponent,
    QiezziUserHeadComponent,
    /****赵烨从这一行开始添加****/
    QiezziPopupConfirmComponent,
    PromptMessageComponent,
    /****赵烨结束****/

    /****路遵从这一行开始添加****/
    /****路遵结束****/
    QiezziInputPopComponent,
    SelectButtonGroupComponent,
    QiezziSelectPatientComponent,

  ]
})
export class SharedComponentModule {
}
