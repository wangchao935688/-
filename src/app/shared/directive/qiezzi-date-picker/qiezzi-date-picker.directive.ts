import {AfterViewInit, Directive, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";

import * as moment from "moment";
import "../../../../theme/air-datepicker/js/datepicker";

import {GeneralService} from "../../../core/service/general.service";

declare var $: any;

const DATA_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => QiezziDatePickerDirective),
  multi: true
};

@Directive({
  selector: '[appQiezziDatePicker],[qiezzi-date-picker]',
  providers: [DATA_PICKER_VALUE_ACCESSOR]
})
export class QiezziDatePickerDirective implements OnInit, AfterViewInit, ControlValueAccessor {

  @Input()
  options: any;
  @Input()
  defaultDate: string;
  @Output()
  onDate: EventEmitter<string> = new EventEmitter<string>();

  public datePicker: any;

  onModelChange: Function;
  onModelTouched: Function;

  currentDate: Date;

  constructor(private input: ElementRef, private general: GeneralService) {

  }

  initDatePicker() {
    if (this.datePicker) {
      this.datePicker.destroy();
    }
    let option = {
      startDate: this.currentDate,
      autoClose: true,
      onSelect: (fd, date) => {
        this.onModelChange && this.onModelChange(fd);
        this.onDate.emit(fd);
      }
    };
    this.datePicker = $(this.input.nativeElement).datepicker(Object.assign({}, this.options || {}, option)).data('datepicker');
  }

  ngOnInit(): void {
    if (this.defaultDate) {
      this.currentDate = moment(this.defaultDate).toDate();
      this.input.nativeElement.value = moment(this.defaultDate).format('YYYY-MM-DD');
    }
    else
      this.currentDate = moment(this.general.getServerTime()).toDate();
  }

  ngAfterViewInit(): void {
    this.initDatePicker();
  }

  writeValue(obj: any): void {
    if (obj) {
      this.currentDate = moment(obj).toDate();
      this.input.nativeElement.value = moment(this.currentDate).format('YYYY-MM-DD');
    }
  }

  registerOnChange(fn: any): void {
    if (!this.onModelChange)
      this.onModelChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onModelTouched = fn;
  }
}
