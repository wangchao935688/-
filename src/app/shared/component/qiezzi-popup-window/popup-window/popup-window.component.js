"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var qiezzi_popup_window_directive_1 = require("../qiezzi-popup-window.directive");
var Observable_1 = require("rxjs/Observable");
var QiezziPopupWindowComponent = (function () {
    function QiezziPopupWindowComponent(factory, el) {
        this.factory = factory;
        this.el = el;
        this.w480 = false;
        this.w680 = false;
        this.w860 = false;
        this.w1100 = false;
        this.onPopupClose = new core_1.EventEmitter();
        this.onPopupBack = new core_1.EventEmitter();
        this.onReady = new core_1.EventEmitter();
        this.onOwnReady = new core_1.EventEmitter();
    }
    QiezziPopupWindowComponent.prototype.onHostResize = function (evt) {
        var height = parseInt(window.getComputedStyle(this.popupWindow.nativeElement, null).height.replace('px', ''), 10);
        this.contentHeight = height - 61;
    };
    QiezziPopupWindowComponent.prototype.setPopupWindowName = function (val) {
        this.popupWindowName = val;
    };
    QiezziPopupWindowComponent.prototype.setPopupWindowIndex = function (index) {
        this.hostZIndex = index;
    };
    QiezziPopupWindowComponent.prototype.ngOnInit = function () {
    };
    QiezziPopupWindowComponent.prototype.ngAfterViewInit = function () {
        this.viewContainerRef = this.popupWindowDirective.vcr;
        this.onReady.emit(null);
        this.onOwnReady.emit();
        var height = parseInt(window.getComputedStyle(this.popupWindow.nativeElement, null).height.replace('px', ''), 10);
        this.contentHeight = height - 61;
    };
    QiezziPopupWindowComponent.prototype.onCloseClick = function () {
        this.onPopupClose.emit(null);
    };
    QiezziPopupWindowComponent.prototype.onBackClick = function () {
        this.onPopupBack.emit(null);
    };
    QiezziPopupWindowComponent.prototype.open = function (componentRef, width, height, data) {
        var _this = this;
        var maxWidth;
        if (width === PopupWindowSize.BIGGER) {
            maxWidth = '1100px';
            this.w1100 = true;
        }
        else if (width === PopupWindowSize.LARGE) {
            maxWidth = '860px';
            this.w860 = true;
        }
        else if (width === PopupWindowSize.MIDDLE) {
            maxWidth = '680px';
            this.w680 = true;
        }
        else {
            maxWidth = '480px';
            this.w480 = true;
        }
        var currWidth = 'calc(100% - 160px)';
        var maxHeight = 'calc(100% - 160px)', currHeight = 'auto';
        if (typeof height !== 'string') {
            maxHeight = height + 'px';
            currHeight = 'calc(100% - 160px)';
        }
        var element = this.el.nativeElement.querySelector('.popup-window');
        element.style.maxWidth = maxWidth;
        element.style.width = currWidth;
        element.style.maxHeight = maxHeight;
        element.style.height = currHeight;
        return Observable_1.Observable.create(function (observer) {
            var compo = _this.viewContainerRef.createComponent(_this.factory.resolveComponentFactory(componentRef));
            compo.instance.onReady.subscribe(function (t) {
                _this.onReady.emit((t && { type: 'ready', data: t }) || null);
            });
            compo.instance.onSend.subscribe(function (t) {
                observer.next({ type: 'send', data: t });
            });
            compo.instance.onOpenChild.subscribe(function (t) {
                _this.displayStatus = 'show';
            });
            compo.instance.onCloseChild.subscribe(function (t) {
                _this.displayStatus = 'hide';
            });
            compo.instance.onClose.subscribe(function (t) {
                // debugger
                _this.onPopupClose.emit((t && { type: 'close', data: t }) || null);
            });
            compo.instance.data = data;
        });
    };
    return QiezziPopupWindowComponent;
}());
__decorate([
    core_1.ViewChild('popupWindow')
], QiezziPopupWindowComponent.prototype, "popupWindow");
__decorate([
    core_1.ViewChild(qiezzi_popup_window_directive_1.QiezziPopupWindowDirective)
], QiezziPopupWindowComponent.prototype, "popupWindowDirective");
__decorate([
    core_1.HostBinding('style.zIndex')
], QiezziPopupWindowComponent.prototype, "hostZIndex");
__decorate([
    core_1.HostListener('window:resize', ['$event'])
], QiezziPopupWindowComponent.prototype, "onHostResize");
__decorate([
    core_1.Output()
], QiezziPopupWindowComponent.prototype, "onPopupClose");
__decorate([
    core_1.Output()
], QiezziPopupWindowComponent.prototype, "onPopupBack");
__decorate([
    core_1.Output()
], QiezziPopupWindowComponent.prototype, "onReady");
__decorate([
    core_1.Output()
], QiezziPopupWindowComponent.prototype, "onOwnReady");
QiezziPopupWindowComponent = __decorate([
    core_1.Component({
        selector: 'app-popup-window',
        templateUrl: './popup-window.component.html',
        styleUrls: ['./popup-window.component.css']
    })
], QiezziPopupWindowComponent);
exports.QiezziPopupWindowComponent = QiezziPopupWindowComponent;
var PopupWindowSize;
(function (PopupWindowSize) {
    PopupWindowSize[PopupWindowSize["SMALL"] = 0] = "SMALL";
    PopupWindowSize[PopupWindowSize["MIDDLE"] = 1] = "MIDDLE";
    PopupWindowSize[PopupWindowSize["LARGE"] = 2] = "LARGE";
    PopupWindowSize[PopupWindowSize["BIGGER"] = 3] = "BIGGER";
})(PopupWindowSize = exports.PopupWindowSize || (exports.PopupWindowSize = {}));
//# sourceMappingURL=popup-window.component.js.map