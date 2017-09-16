import {Component, EventEmitter, forwardRef, Input, OnInit, Output, Renderer} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

const DROP_DOWN_LIST_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QiezziDropDownListComponent),
  multi: true
};

/**
 * 下拉框
 */
@Component({
  selector: 'qiezzi-drop-down-list',
  templateUrl: './qiezzi-drop-down-list.component.html',
  styleUrls: ['./qiezzi-drop-down-list.component.css'],
  animations: [
    trigger('heightFadeIn', [
      state('in', style({transform: 'scaleY(0)'})),
      state('out', style({transform: 'scaleY(1)'})),
      transition('in => out', animate('120ms')),
      transition('out => in', animate('120ms'))
    ])],
  providers: [
    DROP_DOWN_LIST_VALUE_ACCESSOR
  ]
})
export class QiezziDropDownListComponent implements OnInit, ControlValueAccessor {
  itemList: SelectItem[] = null;
  text = '';
  status = 'in';
  maskState = 'none';

  modelValue = '';

  /**
   * @deprecated Use the `Renderer2` instead.
   */
  @Input()
  selectIndex = 0;

  @Input()
  selectedIndex = 0;

  @Input()
  required = false;

  @Input()
  placeholder = '';

  @Output()
  onChange = new EventEmitter<number>();

  onModelChange: Function = null;
  onTouched: Function = null;


  @Input()
  set dataList(val: SelectItem[]) {
    this.itemList = val || [];
    if (!this.placeholder) {
      this.placeholder = '--';
    }
    if (!this.required) {
      this.itemList.splice(0, 0, {label: this.placeholder, value: ''});
    }

  }

  constructor() {
  }

  writeValue(obj: any): void {
    if (obj === null || obj === undefined) {
      obj = ''
    }
    this.modelValue = obj;

    let item = this.itemList.find(t => t.value == this.modelValue);

    if (typeof (item) === "undefined") {
      if (this.modelValue !== '' && this.itemList && this.itemList.length > 0) {
        if (!(this.itemList.length == 1 && this.itemList[0].value === '')) {
          setTimeout(() => {
            this.onModelChange('');
          }, 0);
        }
      }
    }
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
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

  onItemClick(key, index, value) {
    this.selectIndex = index;
    this.modelValue = value;

    this.onModelChange && this.onModelChange(value);
    this.onChange.emit(index);

    this.changeStatus();
  }

  get displayText() {
    if (!this.itemList) {
      return this.text;
    }

    let item = this.itemList.find(t => t.value == this.modelValue);
    if (typeof (item) === "undefined") {
      this.text = '';
    }
    else {
      this.text = item.label;
    }
    return this.text;
  }

}

export interface SelectItem {
  label: string;
  value: any;
}
