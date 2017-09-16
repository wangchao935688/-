import { Component, OnInit } from '@angular/core';
import {RouterTestingModule} from "@angular/router/testing";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-case-option',
  templateUrl: './case-option.component.html',
  styleUrls: ['./case-option.component.scss']
})
export class CaseOptionComponent implements OnInit {
  /*滚动条*/
  scrollbarOptions = {
    axis: 'y', theme: 'minimal-dark'};
  tabData = {
    data: ['病历标签', '医嘱模板'],
    defaultIndex: 0
  };
  displayStatus= '';
  mainShowLoading= 'hide';
  /*
   * 参数设置
   * */
  sheetName = '回访类型';
  sheetCode = 'InterviewType';
  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit() {
  };
  /*面包屑*/
  jump() {
    this.router.navigate(['case-list']);
  }
  changeTab(index) {
    // this.selectTabIndex(this.list.findIndex(val =>{ val === index.title}));
    console.log(index.index);
  }
}
