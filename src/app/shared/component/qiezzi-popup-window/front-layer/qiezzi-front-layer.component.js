"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var qiezzi_front_layer_directive_1 = require("../qiezzi-front-layer.directive");
var popup_window_component_1 = require("../popup-window/popup-window.component");
var Observable_1 = require("rxjs/Observable");
var qiezzi_popup_confirm_component_1 = require("../popup-confirm/qiezzi-popup-confirm.component");
var QiezziFrontLayerComponent = (function () {
    function QiezziFrontLayerComponent(factory) {
        this.factory = factory;
        this.viewContainerRef = null;
        this.displayStatus = 'hide';
        this.left = '100%';
        this.childCount = 0;
    }
    QiezziFrontLayerComponent.prototype.hide = function () {
        var _this = this;
        this.displayStatus = 'hide';
        setTimeout(function () {
            _this.left = '100%';
        }, 200);
    };
    QiezziFrontLayerComponent.prototype.show = function () {
        var _this = this;
        this.left = '0';
        setTimeout(function () {
            _this.displayStatus = 'show';
        }, 0);
    };
    QiezziFrontLayerComponent.prototype.ngAfterViewInit = function () {
        this.viewContainerRef = this.qiezziFrontLayer.vcr;
    };
    QiezziFrontLayerComponent.prototype.ngOnInit = function () {
    };
    QiezziFrontLayerComponent.prototype.ngOnDestroy = function () {
        this.viewContainerRef.clear();
    };
    QiezziFrontLayerComponent.prototype.openConfirmDialog = function (message) {
        var _this = this;
        if (this.viewContainerRef.length === 0) {
            this.show();
        }
        return Observable_1.Observable.create(function (observer) {
            var componentFactory = _this.factory.resolveComponentFactory(qiezzi_popup_confirm_component_1.QiezziPopupConfirmComponent);
            var componentRef = _this.viewContainerRef.createComponent(componentFactory);
            var popupConfirm = componentRef.instance;
            popupConfirm.setPopupWindowIndex(++_this.childCount);
            popupConfirm.setConfirmMessage(message);
            popupConfirm.onClose.subscribe(function () {
                popupConfirm.hide(function () {
                    _this.viewContainerRef.remove();
                    if (_this.viewContainerRef.length === 0) {
                        _this.hide();
                    }
                    observer.next(null);
                });
            });
            popupConfirm.onCancel.subscribe(function () {
                popupConfirm.hide(function () {
                    _this.viewContainerRef.remove();
                    if (_this.viewContainerRef.length === 0) {
                        _this.hide();
                    }
                    observer.next(false);
                });
            });
            console.log(1);
            popupConfirm.onReady.subscribe(function () {
                console.log(3);
                popupConfirm.show();
            });
            popupConfirm.onConfirm.subscribe(function () {
                popupConfirm.hide(function () {
                    _this.viewContainerRef.remove();
                    if (_this.viewContainerRef.length === 0) {
                        _this.hide();
                    }
                    observer.next(true);
                });
            });
        });
    };
    QiezziFrontLayerComponent.prototype.openPopupWindow = function (component, componentName, width, height, data, clearPrevious) {
        var _this = this;
        if (clearPrevious === void 0) { clearPrevious = false; }
        if (clearPrevious) {
            this.viewContainerRef.remove();
        }
        if (this.viewContainerRef.length === 0) {
            this.show();
        }
        return Observable_1.Observable.create(function (observer) {
            var componentFactory = _this.factory.resolveComponentFactory(popup_window_component_1.QiezziPopupWindowComponent);
            var componentRef = _this.viewContainerRef.createComponent(componentFactory);
            var popup = componentRef.instance;
            popup.setPopupWindowIndex(++_this.childCount);
            popup.setPopupWindowName(componentName || '');
            popup.onPopupClose.subscribe(function (t) {
                _this.viewContainerRef.remove();
                if (_this.viewContainerRef.length === 0) {
                    _this.hide();
                }
                observer.next({ type: 'close', data: t || null });
            });
            popup.onPopupBack.subscribe(function (t) {
                _this.viewContainerRef.remove();
                if (_this.viewContainerRef.length === 0) {
                    _this.hide();
                }
                observer.next(null);
            });
            popup.onReady.subscribe(function (t) {
                observer.next(t);
            });
            popup.onOwnReady.subscribe(function () {
                popup.open(component, width, height, data).subscribe(function (t) {
                    observer.next(t);
                });
            });
        });
    };
    return QiezziFrontLayerComponent;
}());
__decorate([
    core_1.HostBinding('attr.status')
], QiezziFrontLayerComponent.prototype, "displayStatus");
__decorate([
    core_1.HostBinding('style.left')
], QiezziFrontLayerComponent.prototype, "left");
__decorate([
    core_1.ViewChild(qiezzi_front_layer_directive_1.QiezziFrontLayerDirective)
], QiezziFrontLayerComponent.prototype, "qiezziFrontLayer");
QiezziFrontLayerComponent = __decorate([
    core_1.Component({
        selector: 'app-front-layer',
        templateUrl: './qiezzi-front-layer.component.html',
        styleUrls: ['./qiezzi-front-layer.component.css']
    })
], QiezziFrontLayerComponent);
exports.QiezziFrontLayerComponent = QiezziFrontLayerComponent;
//# sourceMappingURL=qiezzi-front-layer.component.js.map