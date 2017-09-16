"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var system_global_helper_1 = require("../../../core/uitls/system-global-helper");
var prompt_container_directive_1 = require("./prompt-container.directive");
var qiezzi_prompt_message_component_1 = require("../qiezzi-prompt-message/qiezzi-prompt-message.component");
var QiezziMainRootComponent = (function () {
    function QiezziMainRootComponent(app, factory) {
        this.app = app;
        this.factory = factory;
        this.promptContainer = null;
    }
    QiezziMainRootComponent.prototype.ngAfterViewInit = function () {
        this.promptContainer = this.promptLayer.vcr;
    };
    QiezziMainRootComponent.prototype.ngOnInit = function () {
        system_global_helper_1.SystemGlobalHelper.currentFrontLayer = this.frontLayer;
        this.app.frontLayer = this.frontLayer;
        this.app.main = this;
    };
    QiezziMainRootComponent.prototype.openPromptMessage = function (message, delay) {
        var _this = this;
        if (delay === void 0) { delay = 3000; }
        this.promptContainer.clear();
        this.promptStatus = 'show';
        var componentFactory = this.factory.resolveComponentFactory(qiezzi_prompt_message_component_1.PromptMessageComponent);
        var componentRef = this.promptContainer.createComponent(componentFactory);
        var promptMessage = componentRef.instance;
        promptMessage.setMessage(message);
        promptMessage.onClose.subscribe(function () {
            _this.promptStatus = 'hide';
            setTimeout(function () {
                _this.promptContainer.clear();
            }, 300);
        });
        setTimeout(function () {
            _this.promptStatus = 'hide';
            setTimeout(function () {
                _this.promptContainer.clear();
            }, 300);
        }, delay);
    };
    QiezziMainRootComponent.prototype.openErrorMessage = function (message, delay) {
        if (delay === void 0) { delay = 3000; }
        this.openPromptMessage(message, delay);
    };
    return QiezziMainRootComponent;
}());
__decorate([
    core_1.ViewChild('frontLayer')
], QiezziMainRootComponent.prototype, "frontLayer");
__decorate([
    core_1.ViewChild(prompt_container_directive_1.PromptContainerDirective)
], QiezziMainRootComponent.prototype, "promptLayer");
QiezziMainRootComponent = __decorate([
    core_1.Component({
        selector: 'app-qiezzi-main-root',
        templateUrl: './qiezzi-main-root.component.html',
        styleUrls: ['./qiezzi-main-root.component.scss']
    })
], QiezziMainRootComponent);
exports.QiezziMainRootComponent = QiezziMainRootComponent;
//# sourceMappingURL=qiezzi-main-root.component.js.map