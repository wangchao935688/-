"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var QiezziPopupConfirmComponent = (function () {
    function QiezziPopupConfirmComponent(el) {
        this.el = el;
        this.onClose = new core_1.EventEmitter();
        this.onCancel = new core_1.EventEmitter();
        this.onConfirm = new core_1.EventEmitter();
        this.onReady = new core_1.EventEmitter();
    }
    QiezziPopupConfirmComponent.prototype.ngOnInit = function () {
    };
    QiezziPopupConfirmComponent.prototype.show = function () {
        var _this = this;
        setTimeout(function () {
            _this.el.nativeElement.querySelector('.popup-confirm').setAttribute('status', 'show');
        }, 0);
    };
    QiezziPopupConfirmComponent.prototype.hide = function (callback) {
        this.el.nativeElement.querySelector('.popup-confirm').setAttribute('status', 'hide');
        setTimeout(function () {
            callback && callback();
        }, 200);
    };
    QiezziPopupConfirmComponent.prototype.ngAfterViewInit = function () {
        console.log(2);
        this.onReady.emit();
    };
    QiezziPopupConfirmComponent.prototype.setPopupWindowIndex = function (index) {
        this.hostIndex = index;
    };
    QiezziPopupConfirmComponent.prototype.setConfirmMessage = function (message) {
        this.message = message;
    };
    QiezziPopupConfirmComponent.prototype.onCloseClick = function () {
        this.onClose.emit();
    };
    QiezziPopupConfirmComponent.prototype.onCancelClick = function () {
        this.onCancel.emit();
    };
    QiezziPopupConfirmComponent.prototype.onConfirmClick = function () {
        this.onConfirm.emit();
    };
    return QiezziPopupConfirmComponent;
}());
__decorate([
    core_1.HostBinding('style.zIndex')
], QiezziPopupConfirmComponent.prototype, "hostIndex");
__decorate([
    core_1.Output()
], QiezziPopupConfirmComponent.prototype, "onClose");
__decorate([
    core_1.Output()
], QiezziPopupConfirmComponent.prototype, "onCancel");
__decorate([
    core_1.Output()
], QiezziPopupConfirmComponent.prototype, "onConfirm");
__decorate([
    core_1.Output()
], QiezziPopupConfirmComponent.prototype, "onReady");
QiezziPopupConfirmComponent = __decorate([
    core_1.Component({
        selector: 'app-popup-confirm',
        templateUrl: './qiezzi-popup-confirm.component.html',
        styleUrls: ['./qiezzi-popup-confirm.component.css']
    })
], QiezziPopupConfirmComponent);
exports.QiezziPopupConfirmComponent = QiezziPopupConfirmComponent;
//# sourceMappingURL=qiezzi-popup-confirm.component.js.map