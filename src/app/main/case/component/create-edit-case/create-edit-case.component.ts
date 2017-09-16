import {Component, ElementRef, OnDestroy, OnInit, HostListener} from '@angular/core';
import {SelectCaseTemplateComponent} from '../select-case-template/select-case-template.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {CustomizeFormValidateService} from '../../../../core/service/customize-form.service';
import {SelectCasePhraseComponent} from '../select-case-phrase/select-case-phrase.component';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {SelectButtonGroupComponent} from "../../../../shared/component/qiezzi-select-button-group/select-button-group.component";

@Component({
  selector: 'app-create-edit-case',
  templateUrl: './create-edit-case.component.html',
  styleUrls: ['./create-edit-case.component.scss']
})
export class CreateEditCaseComponent extends PopupWindowBaseComponent implements  OnInit, OnDestroy {
  /*
  * 设置参数
  * */
  isDisplay = false;
  displayStatus = ''; // 侧滑
  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'}; // 右侧滚动条
  teethList: any; // 牙位
  isFirstTime = true; // 是否是初诊，还是复诊
  constructor(private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private slider: CustomizeSliderService) {
    super();
  }
  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }
  ngOnInit() {
    /*初始化牙位*/
    this.teethList = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];
    /*初始化侧滑*/
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
  }
  ngOnDestroy(): void { //  生命周期结束
    this.application.workModule = null;
    this.application.workBoard = null;
  }
  /*
  * TODO 选择病历标签
  * */
  addCaseParse() {
    this.application.frontLayer.openPopupWindow(SelectCasePhraseComponent, '选择标签', PopupWindowSize.SMALL, 425, null, false).subscribe(t => {
      console.log(t);
      if (t && t.data != null) {

      }
    });
  }
  /*
  * TODO 选择病例模板
  * */
  addTemplate(evt) {
    this.isDisplay = true;
    this.router.navigate(['caseModule'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
/*
* TODO 选择是否是初诊
* */
  selectState(flag) {
    console.log(flag);
  }
  /*
  * TODO 返回列表页
  * */
  shunDown() {
    this.router.navigate(['../case-list'], {relativeTo: this.route});
  }
}
