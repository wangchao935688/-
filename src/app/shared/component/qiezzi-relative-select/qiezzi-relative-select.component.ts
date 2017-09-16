import {Component, forwardRef, Input, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";
import {RelativeSelectValue} from "../../../core/forms/booking/create-schedule-form";

const REL_SELECT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QiezziRelativeSelectComponent),
  multi: true
};

@Component({
  selector: 'app-qiezzi-rel-select',
  templateUrl: './qiezzi-relative-select.component.html',
  styleUrls: ['./qiezzi-relative-select.component.css'],
  animations: [
    trigger('heightFadeIn', [
      state('in', style({transform: 'scaleY(0)'})),
      state('out', style({transform: 'scaleY(1)'})),
      transition('in => out', animate('120ms')),
      transition('out => in', animate('120ms'))
    ])],
  providers: [REL_SELECT_VALUE_ACCESSOR]
})
export class QiezziRelativeSelectComponent implements OnInit, ControlValueAccessor {
  _dataList: { [key: string]: string[] } = null;
  leftList: string[] = null;
  rightList: string[] = null;

  rightIndex = 0;

  text = '';
  status = 'in';
  maskState = 'none';

  @Input()
  selectIndex = 0;

  @Input()
  placeholder = '';

  @Output()
  value: RelativeSelectValue = null;

  @Input()
  set dataList(val: { [key: string]: string[] }) {
    this._dataList = val;
    this.leftList = Object.keys(val);
  }

  onChange: any = null;
  onTouched: any = null;

  constructor() {
  }

  ngOnInit() {
  }

  changeStatus() {
    if (this.status === 'in') {
      this.status = 'out';
      this.maskState = 'block';
    } else {
      this.status = 'in';
      this.maskState = 'none';
    }
  }

  onLeftClick(item, index) {
    if (this._dataList[item].length === 0) {
      this.selectIndex = index;
      this.text = item;
      this.changeStatus();
      this.onChange({LeftValue: 0, RightValue: ''});
    }
    this.rightList = this._dataList[item];
    this.selectIndex = index;
  }

  onRightClick(index) {
    this.rightIndex = index;
    this.text = this.rightList[index];
    this.changeStatus();
    this.onChange({LeftValue: this.selectIndex, RightValue: index});
  }

  writeValue(obj: RelativeSelectValue): void {
    if (obj) {
      this.value = obj;
      this.selectIndex = parseInt(obj.LeftValue, 10);
      let leftList = Object.keys(this._dataList);
      if (this._dataList[leftList[this.selectIndex]]) {
        this.rightIndex = parseInt(obj.RightValue, 10);
        this.text = this._dataList[leftList[this.selectIndex]][this.rightIndex];
      } else {
        this.text = leftList[this.selectIndex];
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
