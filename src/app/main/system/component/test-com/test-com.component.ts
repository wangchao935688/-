///<reference path="../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component.ts"/>
import { Component, OnInit } from '@angular/core';
import {SelectItem} from "../../../../shared/component/qiezzi-drop-down-list/qiezzi-drop-down-list.component";
import {TestComForm} from '../../../../core/forms/system/test-com-form';
import {TagBoxItem} from "../../../../shared/component/qiezzi-tag-box-group/tag-box-group.component";
import {SelectButtonStatus} from "../../../../shared/component/qiezzi-select-button-group/select-button-group.component";
@Component({
  selector: 'app-test-com',
  templateUrl: './test-com.component.html',
  styleUrls: ['./test-com.component.scss']
})
export class TestComComponent implements OnInit {

  dropDataList: SelectItem[] = [];
  form: TestComForm = new TestComForm();
  soitem: string;
  newvalue: string;
  tagValues:TagBoxItem[]=[];


  selectButtonGroupList:SelectButtonStatus[]=[];
  constructor() {
  }


  ngOnInit() {
    this.form.label = '2';
setTimeout(()=>{
  this.dropDataList.push({label: '测试标题1', value: '1'});
  this.dropDataList.push({label: '测试标题2', value: '2'});
  this.dropDataList.push({label: '测试标题3', value: '3'});
  this.dropDataList.push({label: '测试标题4', value: '4'});
  this.dropDataList.push({label: '测试标题5', value: '5'});
},5000);



//tag box group
    this.tagValues = [{title: '测试标签1', value: 'tag1'}, {title: '测试标签2', value: 'tag2'}, {title: '测试标签3', value: 'tag3'}];

    //select button group
   this.selectButtonGroupList= [{title:'werytg',value:'1',selected:true},{title:'26y',value:'2'},{title:'emthnfbg',value:'3'},{title:'ewhned',value:'4',selected:true}];
 setTimeout(()=>{
   this.selectButtonGroupList[1].selected=true;
 },10000);
  }

  add() {

    this.dropDataList.push({label: this.soitem, value: this.soitem})
  }

  sort() {
    this.dropDataList.reverse();
  }

  setvalue() {
    this.form.label = this.newvalue;
  }

  showValue(index:number){
    if (index===0) {
      console.log(this.form.label);
    }
    else if(index===1){
      this.selectButtonGroupList.forEach(t=>{
        console.log(JSON.stringify(t));
      });
    }
    else if (index===2){
      this.tagValues.forEach(t=>{
        console.log(JSON.stringify(t));
      });
    }
  }

  change(e){
    console.log(e);
  }
}
