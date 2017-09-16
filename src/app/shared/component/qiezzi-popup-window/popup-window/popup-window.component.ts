import {
  AfterViewInit, Component, ComponentFactoryResolver, ElementRef, EventEmitter, HostBinding, HostListener, Input,
  OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {QiezziPopupWindowDirective} from "../qiezzi-popup-window.directive";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";

@Component({
  selector: 'app-popup-window',
  templateUrl: './popup-window.component.html',
  styleUrls: ['./popup-window.component.css']
})
export class QiezziPopupWindowComponent implements OnInit, AfterViewInit {
  displayStatus;
  popupWindowName;
  viewContainerRef: ViewContainerRef;

  contentHeight: number;

  w480 = false;
  w680 = false;
  w860 = false;
  w1100 = false;

  @ViewChild('popupWindow')
  popupWindow: ElementRef;

  @ViewChild(QiezziPopupWindowDirective)
  popupWindowDirective: QiezziPopupWindowDirective;

  @HostBinding('style.zIndex')
  hostZIndex: number;

  @HostListener('window:resize', ['$event'])
  onHostResize(evt) {
    let height = parseInt(window.getComputedStyle(this.popupWindow.nativeElement, null).height.replace('px', ''), 10);
    this.contentHeight = height - 61;
  }

  @Output()
  onPopupClose = new EventEmitter<any>();
  @Output()
  onPopupBack = new EventEmitter<any>();
  @Output()
  onReady = new EventEmitter<any>();

  @Output()
  onOwnReady = new EventEmitter();

  constructor(private factory: ComponentFactoryResolver, private el: ElementRef) {
  }

  setPopupWindowName(val) {
    this.popupWindowName = val;
  }

  setPopupWindowIndex(index) {
    this.hostZIndex = index;
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.popupWindowDirective.vcr;
    this.onReady.emit(null);
    this.onOwnReady.emit();

    let height = parseInt(window.getComputedStyle(this.popupWindow.nativeElement, null).height.replace('px', ''), 10);
    this.contentHeight = height - 61;
  }

  onCloseClick() {
    this.onPopupClose.emit(null);
  }

  onBackClick() {
    this.onPopupBack.emit(null);
  }

  open(componentRef: any, width: PopupWindowSize, height: number | string, data?: any): Observable<any> {
    let maxWidth;
    if (width === PopupWindowSize.BIGGER) {
      maxWidth = '1100px';
      this.w1100 = true;
    } else if (width === PopupWindowSize.LARGE) {
      maxWidth = '860px';
      this.w860 = true;
    } else if (width === PopupWindowSize.MIDDLE) {
      maxWidth = '680px';
      this.w680 = true;
    } else {
      maxWidth = '480px';
      this.w480 = true;
    }

    const currWidth = 'calc(100% - 160px)';
    let maxHeight = 'calc(100% - 160px)', currHeight = 'auto';
    if (typeof height !== 'string') {
      maxHeight = height + 'px';
      currHeight = 'calc(100% - 160px)';
    }
    const element: HTMLDivElement = <HTMLDivElement>this.el.nativeElement.querySelector('.popup-window');
    element.style.maxWidth = maxWidth;
    element.style.width = currWidth;
    element.style.maxHeight = maxHeight;
    element.style.height = currHeight;

    return Observable.create((observer: Observer<any>) => {
      let compo: any = this.viewContainerRef.createComponent(this.factory.resolveComponentFactory(componentRef));

      compo.instance.onReady.subscribe(t => {
        this.onReady.emit((t && {type: 'ready', data: t}) || null);
      });
      compo.instance.onSend.subscribe(t => {
        observer.next({type: 'send', data: t});
      });
      compo.instance.onOpenChild.subscribe(t => {
        this.displayStatus = 'show';
      });
      compo.instance.onCloseChild.subscribe(t => {
        this.displayStatus = 'hide';
      });
      compo.instance.onClose.subscribe(t => {
        // debugger
        this.onPopupClose.emit((t && {type: 'close', data: t}) || null);
      });
      compo.instance.data = data;
    });
  }
}


export enum PopupWindowSize{
  SMALL, MIDDLE, LARGE, BIGGER
}
