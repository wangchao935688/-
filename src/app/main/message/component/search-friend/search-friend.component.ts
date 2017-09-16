import {Component, OnInit, forwardRef, ElementRef,EventEmitter, HostListener, Output, Input} from '@angular/core';
import {NG_VALUE_ACCESSOR, FormControl} from "@angular/forms";
import {PatientService} from "../../../../core/service/patient.service";
import {PatientModel} from "../../../../core/messages/model/patient.model";

const ICON_INPUT_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => SearchFriendComponent),
  multi: true
};

@Component({
  selector: 'app-search-friend',
  templateUrl: './search-friend.component.html',
  styleUrls: ['./search-friend.component.scss'],
  providers: [ICON_INPUT_VALUE_ACCESSOR]
})
export class SearchFriendComponent implements OnInit {

  textValue: string;
  textInput: FormControl;
  init: boolean;
  isMobile: boolean;
  patientList: PatientModel[];
  showPatientList: string;

  @Input()
  marginRight: any;
  @Input()
  placeholder: string;
  @Input()
  iconList: InputIcon[];

  @Output()
  onIconClick = new EventEmitter<number>();
  @Output()
  onPatientSelected = new EventEmitter<PatientModel>();

  onChange: Function;
  onTouched: Function;

  selected = -1;

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    const styleWidth = parseInt(window.getComputedStyle(this.el.nativeElement, null).width.replace('px', ''), 10);
    this.isMobile = styleWidth < 480;
  }

  constructor(private patient: PatientService, private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    const styleWidth = parseInt(window.getComputedStyle(this.el.nativeElement, null).width.replace('px', ''), 10);
    this.isMobile = styleWidth < 480;
  }

  onInputClick() {
    this.init = false;
    //this.isMobile = false;
  }

  onInputMaskClick() {
    this.patientList = [];
    this.showPatientList = 'hide';
    this.selected = -1;
  }

  onInputKeyDown(evt: KeyboardEvent) {
    if (this.showPatientList === 'show') {
      if (evt.keyCode === 40) {//下箭头
        if (this.selected + 1 < this.patientList.length) {
          this.selected++;
          this.onChange(this.patientList[this.selected].PatientName)
          this.textInput.setValue(this.patientList[this.selected].PatientName);
        }
      } else if (evt.keyCode === 38) {//上箭头
        if (this.selected > 0) {
          this.selected--;
          this.onChange(this.patientList[this.selected].PatientName)
          this.textInput.setValue(this.patientList[this.selected].PatientName);
        }
      } else if (evt.keyCode === 13) {
        this.patientList = [];
        this.showPatientList = 'hide';
        this.selected = -1;
      } else {
        this.init = false;
      }
    }
  }

  onPatientClick(index) {
    this.onChange(this.patientList[index].PatientName);
    this.textInput.setValue(this.patientList[index].PatientName);
    this.onPatientSelected.emit(this.patientList[index]);
    this.selected = -1;
    this.patientList = [];
    this.showPatientList = 'hide';
  }

  ngOnInit() {
    this.textInput = new FormControl();
    this.textInput.valueChanges.debounceTime(1000).distinctUntilChanged().subscribe(newValue => {
      this.onChange(newValue);
      this.textValue = newValue;
      if (!this.textValue) {
        this.patientList = [];
        this.showPatientList = 'hide';
      } else {
        if (!this.init) {
          this.patient.searchPatient({
            KeyWords: this.textValue,
            IsOnlyName: true,
            PageIndex: 1,
            PageSize: 10
          }).subscribe(t => {
            this.patientList = t.Items;
            if (this.patientList.length > 0) {
              this.showPatientList = 'show';
              this.init = true;
            }
          });
        }
      }
    });
  }

  onModelTouched() {
    this.textInput.markAsTouched();
    if (this.onTouched) {
      this.onTouched();
    }
  }

  onModelIconClick(index) {
    this.onIconClick.emit(index);
  }

  writeValue(obj: any): void {
    if (this.textValue !== obj) {
      this.textValue = obj;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
export class InputIcon {
  icon: string;
  color: string;
}
