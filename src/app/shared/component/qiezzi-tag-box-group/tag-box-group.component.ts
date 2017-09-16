import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

const TAG_BOX_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => TagBoxGroupComponent),
  multi: true
};

@Component({
  selector: 'app-tag-box-group',
  templateUrl: './tag-box-group.component.html',
  styleUrls: ['./tag-box-group.component.css'],
  providers: [TAG_BOX_GROUP_VALUE_ACCESSOR]
})
export class TagBoxGroupComponent implements OnInit, ControlValueAccessor {

  tagList: TagBoxItem[] = null;

  onChange: Function = null;
  onTouched: Function = null;

  constructor() {
  }

  ngOnInit() {
  }

  onDelete(index) {
    this.tagList.splice(index, 1);
    this.tagList = Array.from(this.tagList);
    this.onChange(this.tagList);
  }

  writeValue(val: TagBoxItem[]): void {
    this.tagList = val;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
export class TagBoxItem {
  public title: string = null;
  public value: string = null;
}

