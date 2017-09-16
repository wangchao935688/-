import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-select-doctor-templates',
  templateUrl: './select-doctor-templates.component.html',
  styleUrls: ['./select-doctor-templates.component.scss']
})
export class SelectDoctorTemplatesComponent implements OnInit {
  rightComponentName = '选择医嘱模板';
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  mainShowLoading= 'hide';
  constructor() { }

  ngOnInit() {
  }

}
