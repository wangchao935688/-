import {Component, Input, OnInit, EventEmitter, Output, OnChanges, SimpleChanges} from "@angular/core";
import {DoubleDate} from "../qiezzi-select-date-slot/qiezzi-select-date-slot.component";

@Component({
  selector: 'qiezzi-double-date',
  templateUrl: './qiezzi-double-date.component.html',
  styleUrls: ['./qiezzi-double-date.component.scss']
})
export class QiezziDoubleDateComponent implements OnInit,OnChanges {

  @Input()
  options: any = {
    leftOptions: {view: 'days', minView: 'days'},
    rightOptions: {view: 'days', minView: 'days'}
  };
  @Input()
  defaultDate: DoubleDate = {
    leftDate: '',
    rightDate: ''
  };
  /*set defaultDate(val: DoubleDate) {
   debugger;
   this._defaultDate = val;
   this.onModelChange(this._defaultDate);
   }
   */
  @Output()
  onSelectLeft = new EventEmitter();
  @Output()
  onSelectRight = new EventEmitter();

  ngOnInit() {
  }

  ngOnChanges(simple: SimpleChanges) {
    if (simple.options) {
      this.options = simple.options.currentValue;
    }
  }

  onSelectDate(evt: any) {
    if (evt == 0) {
      this.onSelectLeft.emit();
    }
    if (evt == 1) {
      this.onSelectRight.emit();
    }
  }

  onDate(evt: any) {
    if (evt.index == 0) {
      this.onSelectLeft.emit(evt.date);
      this.options.rightOptions = Object.assign({}, this.options.rightOptions, {minDate: new Date(evt.date)});
    }
    if (evt.index == 1) {
      this.onSelectRight.emit(evt.date);
      this.options.leftOptions = Object.assign({}, this.options.leftOptions, {maxDate: new Date(evt.date)});
    }

  }
}
