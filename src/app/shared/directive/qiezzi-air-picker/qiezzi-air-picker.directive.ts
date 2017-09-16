import {
  Directive, Input, ElementRef, OnChanges, SimpleChanges, Output, EventEmitter,
  AfterViewInit
} from "@angular/core";
import "../../../../theme/air-datepicker/js/datepicker";
declare var $: any;
/**
 * 日期指令
 */
@Directive({
  selector: '[qiezzi-air-datepicker]',
})
export class QiezziAirDatePickerDirective implements OnChanges,AfterViewInit {

  @Input() options: any = {};

  @Input() defaultDate: string;

  @Output() onDate = new EventEmitter();

  value: any;

  public datePicker: any;

  @Input()
  index: number;

  /* onModelChange: Function = () => {
   };
   onModelTouched: Function = () => {
   };*/

  constructor(private input: ElementRef) {
  }

  /*registerOnChange(fn: any) {
   this.onModelChange = fn;
   }

   registerOnTouched(fn: Function): void {
   this.onModelTouched = fn;
   }

   writeValue(value: any) {
   if (value && value != null) {
   this.value = value;
   this.datePicker.date = new Date(value);
   this.datePicker.selectDate(new Date(value));
   }
   }*/

  ngAfterViewInit() {
    this.initDatePicker();
    if (this.datePicker && this.defaultDate != '') {
      this.datePicker.date = new Date(this.defaultDate);
      this.datePicker.selectDate(new Date(this.defaultDate));
    }
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple.options) {
      this.options = simple.options.currentValue;
    }
    if (this.datePicker && simple.defaultDate) {
      this.datePicker.date = new Date(simple.defaultDate.currentValue);
      this.datePicker.selectDate(new Date(simple.defaultDate.currentValue));
    }
    this.initDatePicker();
  }

  /**
   * 初始化日期控件
   */
  initDatePicker() {
    if (this.datePicker) {
      this.datePicker.destroy();
    }
    let option = {
      startDate: new Date(),
      autoClose: false,
      onSelect: (fd, date) => {
        // this.onModelChange(fd);
        this.onDate.emit({date: fd, index: this.index});
      },
    };
    this.datePicker = $(this.input.nativeElement).datepicker(Object.assign({}, this.options, option)).data('datepicker');
  }

}
