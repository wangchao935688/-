"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var PromptMessageComponent = (function () {
    function PromptMessageComponent() {
        this.onClose = new core_1.EventEmitter();
    }
    PromptMessageComponent.prototype.ngOnInit = function () {
    };
    PromptMessageComponent.prototype.closePrompt = function () {
        this.onClose.emit();
    };
    PromptMessageComponent.prototype.setMessage = function (val) {
        this.message = val;
    };
    return PromptMessageComponent;
}());
__decorate([
    core_1.Input()
], PromptMessageComponent.prototype, "message");
__decorate([
    core_1.Output()
], PromptMessageComponent.prototype, "onClose");
PromptMessageComponent = __decorate([
    core_1.Component({
        selector: 'app-prompt-message',
        templateUrl: './qiezzi-prompt-message.component.html',
        styleUrls: ['./qiezzi-prompt-message.component.css']
    })
], PromptMessageComponent);
exports.PromptMessageComponent = PromptMessageComponent;
//# sourceMappingURL=qiezzi-prompt-message.component.js.map