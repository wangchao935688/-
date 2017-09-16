import {Component, ElementRef, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomizeSliderService} from "../../../../core/service/customize-slider.service";
import {ApplicationService} from "../../../../core/service/application.service";
import {CaseService} from "../../../../core/service/case.service";

@Component({
  selector: 'app-select-case-phrase',
  templateUrl: './select-case-phrase.component.html',
  styleUrls: ['./select-case-phrase.component.scss']
})
export class SelectCasePhraseComponent extends PopupWindowBaseComponent implements OnInit {

  constructor(public application: ApplicationService,
              private slider: CustomizeSliderService,
              private router: Router,
              private el: ElementRef,
              private route: ActivatedRoute,
              private caseService: CaseService) { super(); }

  ngOnInit() {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
  }
/*
* TODO 请求病历标签
* */
  caseRelationList() {
    this.caseService.caseRelationList(null).subscribe(val => {
      console.log(val);
      if (val && val.Items.length > 0) {

      }else {

      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
}
