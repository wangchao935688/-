import {
  AfterViewInit, Component, ComponentFactoryResolver, ComponentRef, ElementRef, HostBinding, OnDestroy, OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {QiezziFrontLayerDirective} from '../qiezzi-front-layer.directive';
import {PopupWindowSize, QiezziPopupWindowComponent} from "../popup-window/popup-window.component";
import {Observable} from "rxjs/Observable";
import {Observer} from "rxjs/Observer";
import {QiezziPopupConfirmComponent} from "../popup-confirm/qiezzi-popup-confirm.component";
import {PromptMessageComponent} from "../../qiezzi-prompt-message/qiezzi-prompt-message.component";

@Component({
  selector: 'app-front-layer',
  templateUrl: './qiezzi-front-layer.component.html',
  styleUrls: ['./qiezzi-front-layer.component.css']
})
export class QiezziFrontLayerComponent implements OnInit, AfterViewInit, OnDestroy {
  viewContainerRef: ViewContainerRef = null;
  childCount: number;

  @HostBinding('attr.status')
  displayStatus = 'hide';
  @HostBinding('style.left')
  left = '100%';
  @ViewChild(QiezziFrontLayerDirective)
  qiezziFrontLayer: QiezziFrontLayerDirective;

  constructor(private factory: ComponentFactoryResolver) {
    this.childCount = 0;
  }

  hide() {
    this.displayStatus = 'hide';
    setTimeout(() => {
      this.left = '100%';
    }, 200);
  }

  show() {
    this.left = '0';
    setTimeout(() => {
      this.displayStatus = 'show';
    }, 0);
  }

  ngAfterViewInit(): void {
    this.viewContainerRef = this.qiezziFrontLayer.vcr;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.viewContainerRef.clear()
  }

  public openConfirmDialog(message: string): Observable<boolean> {
    if (this.viewContainerRef.length === 0) {
      this.show();
    }

    return Observable.create((observer: Observer<boolean>) => {
      const componentFactory = this.factory.resolveComponentFactory(QiezziPopupConfirmComponent);
      const componentRef: ComponentRef<QiezziPopupConfirmComponent> = this.viewContainerRef.createComponent(componentFactory);
      const popupConfirm: QiezziPopupConfirmComponent = <QiezziPopupConfirmComponent>componentRef.instance;
      popupConfirm.setPopupWindowIndex(++this.childCount);
      popupConfirm.setConfirmMessage(message);
      popupConfirm.onClose.subscribe(() => {
        popupConfirm.hide(() => {
          this.viewContainerRef.remove();
          if (this.viewContainerRef.length === 0) {
            this.hide();
          }
          observer.next(null);
        });
      });
      popupConfirm.onCancel.subscribe(() => {
        popupConfirm.hide(() => {
          this.viewContainerRef.remove();
          if (this.viewContainerRef.length === 0) {
            this.hide();
          }
          observer.next(false);
        });
      });
      console.log(1);
      popupConfirm.onReady.subscribe(() => {
        console.log(3);
        popupConfirm.show();
      });
      popupConfirm.onConfirm.subscribe(() => {
        popupConfirm.hide(() => {
          this.viewContainerRef.remove();
          if (this.viewContainerRef.length === 0) {
            this.hide();
          }
          observer.next(true);
        });
      });
    });
  }

  public openPopupWindow(component: any, componentName: string, width: PopupWindowSize, height: number | string, data?: any, clearPrevious: boolean = false): Observable<any> {

    if (clearPrevious) {
      this.viewContainerRef.remove();
    }
    if (this.viewContainerRef.length === 0) {
      this.show();
    }

    return Observable.create((observer: Observer<any>) => {
      const componentFactory = this.factory.resolveComponentFactory(QiezziPopupWindowComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);
      const popup = <QiezziPopupWindowComponent>componentRef.instance;
      popup.setPopupWindowIndex(++this.childCount);
      popup.setPopupWindowName(componentName || '');
      popup.onPopupClose.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.hide();
        }
        observer.next({type: 'close', data: t || null});
      });
      popup.onPopupBack.subscribe((t) => {
        this.viewContainerRef.remove();
        if (this.viewContainerRef.length === 0) {
          this.hide();
        }
        observer.next(null);
      });
      popup.onReady.subscribe(t => {
        observer.next(t);
      });
      popup.onOwnReady.subscribe(() => {
        popup.open(component, width, height, data).subscribe(t => {
          observer.next(t);
        });
      });
    });

  }
}
