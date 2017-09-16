import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo-config',
  templateUrl: './demo-config.component.html',
  styleUrls: ['./demo-config.component.css']
})
export class DemoConfigComponent implements OnInit {
  testValue = ['',''];
  radioValue = '';
  radioValue1 = '';
  radioGroupValue = '';
  radioSelectValue = '';
  cbValue = '';
  cbValues = ['', '', ''];
  /*背景切换*/
  toggle : boolean = false;
  tagValues = [{title: '测试标签1', value: 'tag1'}, {title: '测试标签2', value: 'tag2'}, {title: '测试标签3', value: 'tag3'}];

  constructor() {
  }

  ngOnInit() {
  }

  click() {
    console.log(this.testValue);
  }

  click1() {
    this.tagValues.push({title: '测试标签5', value: 'test5'});
  }
  cascade () {
    this.toggle = !this.toggle;
  }
  clickCheckBox() {

  }
}
