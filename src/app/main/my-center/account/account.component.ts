import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {IQiezziCenterHeaderComponent} from "../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";
import {ApplicationService} from "../../../core/service/application.service";
import {CustomizeSliderService} from "../../../core/service/customize-slider.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements  OnInit, AfterViewInit, IQiezziCenterHeaderComponent {
/*
* 设置参数
* */
  tabData = {
    data: ['基本资料', '账号安全'],
    defaultIndex: 0
  };
  constructor(public application: ApplicationService,
              private el: ElementRef,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
  }
/*
* TODO tab切换
* */
  changeTab(index) {
    if (index.index === 0) {
      this.router.navigate(['basic'], {relativeTo: this.route});
    }else {
      this.router.navigate(['security'], {relativeTo: this.route});
    }
  }
  onControl(evt) {}
  onSearch(evt) {}
  onOptions(evt) {}
  onShowFilter(evt) {}
}
