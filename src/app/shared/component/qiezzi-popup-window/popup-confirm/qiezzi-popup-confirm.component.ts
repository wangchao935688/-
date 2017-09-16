import {AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-popup-confirm',
  templateUrl: './qiezzi-popup-confirm.component.html',
  styleUrls: ['./qiezzi-popup-confirm.component.css']
})
export class QiezziPopupConfirmComponent implements OnInit, AfterViewInit {
  message: string;

  @HostBinding('style.zIndex')
  hostIndex: number;

  @Output()
  onClose = new EventEmitter();
  @Output()
  onCancel = new EventEmitter();
  @Output()
  onConfirm = new EventEmitter();
  @Output()
  onReady = new EventEmitter();

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
  }

  show() {
    setTimeout(() => {
      this.el.nativeElement.querySelector('.popup-confirm').setAttribute('status', 'show');
    }, 0);
  }

  hide(callback) {
    this.el.nativeElement.querySelector('.popup-confirm').setAttribute('status', 'hide');
    setTimeout(() => {
      callback && callback();
    }, 200);
  }

  ngAfterViewInit(): void {
    console.log(2);
    this.onReady.emit();
  }

  setPopupWindowIndex(index) {
    this.hostIndex = index;
  }

  setConfirmMessage(message: string): void {
    this.message = message;
  }

  onCloseClick() {
    this.onClose.emit();
  }

  onCancelClick() {
    this.onCancel.emit();
  }

  onConfirmClick() {
    this.onConfirm.emit();
  }
}
