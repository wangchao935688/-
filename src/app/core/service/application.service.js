"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var ApplicationService = (function () {
    function ApplicationService() {
        this.currentFrontLayer = null;
        this.currentMainMask = null;
        this.mainRoot = null;
        this.currentWorkBoard = null;
        this.currentWorkModule = null;
        this.appMain = null;
    }
    Object.defineProperty(ApplicationService.prototype, "frontLayer", {
        get: function () {
            return this.currentFrontLayer;
        },
        set: function (val) {
            this.currentFrontLayer = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationService.prototype, "mainMask", {
        get: function () {
            return this.currentMainMask;
        },
        set: function (val) {
            this.currentMainMask = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationService.prototype, "main", {
        get: function () {
            return this.mainRoot;
        },
        set: function (val) {
            this.mainRoot = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationService.prototype, "workBoard", {
        get: function () {
            return this.currentWorkBoard;
        },
        set: function (val) {
            this.currentWorkBoard = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationService.prototype, "workModule", {
        get: function () {
            return this.currentWorkModule;
        },
        set: function (val) {
            this.currentWorkModule = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ApplicationService.prototype, "mainModule", {
        get: function () {
            return this.appMain;
        },
        set: function (val) {
            this.appMain = val;
        },
        enumerable: true,
        configurable: true
    });
    return ApplicationService;
}());
ApplicationService = __decorate([
    core_1.Injectable()
], ApplicationService);
exports.ApplicationService = ApplicationService;
//# sourceMappingURL=application.service.js.map