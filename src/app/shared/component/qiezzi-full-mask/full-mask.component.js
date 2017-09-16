"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
/**
 * Created by KingKong on 2017/5/12.
 */
var core_1 = require("@angular/core");
var QiezziFullMaskComponent = (function () {
    function QiezziFullMaskComponent(el) {
        this.el = el;
        this.hostColor = '#333333';
        this.hostOpacity = 0.6;
    }
    Object.defineProperty(QiezziFullMaskComponent.prototype, "color", {
        set: function (value) {
            if (value !== this.hostColor) {
                this.hostColor = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QiezziFullMaskComponent.prototype, "opacity", {
        set: function (value) {
            if (value !== this.hostOpacity) {
                this.hostOpacity = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return QiezziFullMaskComponent;
}());
__decorate([
    core_1.HostBinding('style.backgroundColor')
], QiezziFullMaskComponent.prototype, "hostColor");
__decorate([
    core_1.HostBinding('style.opacity')
], QiezziFullMaskComponent.prototype, "hostOpacity");
__decorate([
    core_1.Input()
], QiezziFullMaskComponent.prototype, "color");
__decorate([
    core_1.Input()
], QiezziFullMaskComponent.prototype, "opacity");
QiezziFullMaskComponent = __decorate([
    core_1.Component({
        selector: 'qiezzi-full-mask',
        template: '',
        styles: [':host{width:100%;height:100%;display:block;position:absolute;z-index:-1;left:0;top:0;}']
    })
], QiezziFullMaskComponent);
exports.QiezziFullMaskComponent = QiezziFullMaskComponent;
//# sourceMappingURL=full-mask.component.js.map