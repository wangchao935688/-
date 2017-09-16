import { Component, Input, OnInit, EventEmitter, Output, } from '@angular/core';
import {DoubleDate} from '../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: 'create-edit-disinfection',
  templateUrl: './create-edit-disinfection.component.html',
  styleUrls: ['./create-edit-disinfection.component.scss']
})
export class CreateEditDisinfectionComponent extends PopupWindowBaseComponent  implements OnInit {
  /*医生下拉*/
  doctorList= [
    {
      value: 'yan',
      label: 'djsflkdsjf'
    }
  ];
  /*日期*/
  @Input()
  options: any = {
    leftOptions: {view: 'days', minView: 'days'},
    rightOptions: {view: 'days', minView: 'days'}
  };
  /*日期*/
  @Input()
  defaultDate: DoubleDate = {
    leftDate: '',
    rightDate: ''
  };
  @Output()
  onSelectLeft = new EventEmitter();
  constructor() { super(); }

  ngOnInit() {
  }
  onSelectDate(evt: any) {
    if (evt === 0) {
      this.onSelectLeft.emit();
    }
  }
/*单个日期*/
  onDate(evt: any) {
    if (evt.index === 0) {
      this.onSelectLeft.emit(evt.date);
      this.options.rightOptions = Object.assign({}, this.options.rightOptions, {minDate: new Date(evt.date)});
    }

  }
  /*保存*/
  accountTransfer() {
    this.close();
  };
  /*取消*/
  cancel() {
    this.close();
  }
}
