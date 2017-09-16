import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {PatientService} from "../../../core/service/patient.service";
import {DictDetail_Simple} from "../../../core/messages/model/booking.model";
import {PopupWindowBaseComponent} from "../qiezzi-popup-window/popup-window-base/popup-window-base";

const SELECT_BUTTON_GROUP_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SelectButtonGroupComponent),
  multi: true
};

@Component({
  selector: 'app-select-button-group',
  templateUrl: './select-button-group.component.html',
  styleUrls: ['./select-button-group.component.css'],
  providers: [SELECT_BUTTON_GROUP_VALUE_ACCESSOR]
})
export class SelectButtonGroupComponent extends PopupWindowBaseComponent implements OnInit, ControlValueAccessor {
  private _list: SelectButtonStatus[];
  get list(): SelectButtonStatus[] {
    return this._list;
  }

  @Input()
  set list(value: SelectButtonStatus[]) {
    this._list = value;
  }
  onChange: Function;
  onTouched: Function;

  data: DictDetail_Simple[];

  constructor(private patientService: PatientService) {
    super();
  }

  ngOnInit() {
    this.patientService.getPatientRelationTypeList(null).subscribe(t => {
      this.data = t;
      let tmp: SelectButtonStatus[] = [];
      this.data.forEach(item => tmp.push({title: item.Name, value: item.Code}));
      this.list = tmp;
    });
  }

  onItemClick(item: SelectButtonStatus) {
    item.selected = !item.selected;
    if (this.onChange) {
      this.onChange(this._list);
    }
  }

  writeValue(obj: SelectButtonStatus[]): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}

export class SelectButtonStatus {
  public title: string = null;
  public value: string = null;
  public selected?: boolean = false;
}
