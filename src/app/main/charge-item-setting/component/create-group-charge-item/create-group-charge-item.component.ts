import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-create-group-charge-item',
  templateUrl: './create-group-charge-item.component.html',
  styleUrls: ['./create-group-charge-item.component.scss']
})
export class CreateGroupChargeItemComponent extends PopupWindowBaseComponent implements OnInit {
  IsChooseAll = false; // 全选复选框,默认未选中
  goodsCheckedList= [];
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark',
  };
  scrollbarOptionsRight = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark',
  };
  toggle: boolean = false;
  // 类型
  nameList= [
    {
      value: 'yanyanyanyanyanyan',
      label: '请选择'
    },
    {
      value: 'yanyanyanyanyanyan',
      label: 'djsflkdsjfd'
    },
    {
      value: 'jintianshijintia',
      label: 'djsflkdsjfdjsflkdsjfdjsflkdsjfdjsflkdsjf'
    }
  ];
  constructor() { super(); }

  ngOnInit() {
  }
/*TODO 级联菜单背景*/
  cascade () {
    this.toggle = !this.toggle;
  }
  selectBox(id) {
    if ( this.goodsCheckedList.indexOf(id) > -1) {
      this.goodsCheckedList.splice(this.goodsCheckedList.indexOf(id), 1);
    }else {
      this.goodsCheckedList.push(id);
    }
    console.log(this.goodsCheckedList);
  }

}
