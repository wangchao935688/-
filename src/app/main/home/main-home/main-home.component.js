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
var AppMainComponent = (function () {
    function AppMainComponent(router, route, el, application, mScrollbarService) {
        this.router = router;
        this.route = route;
        this.el = el;
        this.application = application;
        this.mScrollbarService = mScrollbarService;
        this.hospitalName = '诊所名称诊x名称';
        this.leftNavStat = 'hide';
        this.navData = null;
        this.toggleDisplayCenterMask = {};
        this.hideRightDetailHandler = null;
        this.currOpenIndex = null;
        this.isCollapsed = true;
    }
    AppMainComponent.prototype.clickMask = function () {
        this.displayStatus = 'hide';
    };
    AppMainComponent.prototype.onRouterNavigate = function (event) {
        //  this.mainShowLoading = 'show';
        this.router.navigate([event]);
    };
    AppMainComponent.prototype.onShowLeftNav = function () {
        this.displayStatus = 'show';
    };
    AppMainComponent.prototype.onWindowResize = function () {
        if (this.displayStatus !== 'hide') {
            this.displayStatus = 'hide';
        }
    };
    AppMainComponent.prototype.ngOnInit = function () {
        this.application.mainModule = this;
    };
    AppMainComponent.prototype.ngAfterViewInit = function () {
        /*
         GlobalSubscriber.on(EventConstants.FRONT_LAYER_POPUP_COMPONENT, (evt) => {
         this.frontLayer.openPopupWindow(evt.component, evt.componentName, evt.width, evt.height, evt.data, evt.clearPrev);
         });
         GlobalSubscriber.on(EventConstants.FRONT_LAYER_ROLL_COMPONENT, (evt) => {
         this.frontLayer.openRollPanel(evt.data.component, evt.data.data, evt.data.clearPrev);
         });
         GlobalSubscriber.on(EventConstants.CONFIG_CURRENT_MODULE, (evt) => {
         this.centerBar.moduleName = evt.name;
         this.centerBar.placeholder = evt.placeholder;
         if (evt.filterList) {
         this.filterList = evt.filterList;
         }
         if (evt.options) {
         this.options = evt.options;
         }
         this.centerBar.setPlusList(evt.plusList);
         });
         GlobalSubscriber.on(EventConstants.TOP_ROLL_COMPONENT, (evt) => {
         this.rightContainer.open(evt.data.component, evt.data.componentName, evt.data.data, evt.data.ctrlData);
         });
         GlobalSubscriber.on(EventConstants.TOP_ROLL_COMPONENT_COMPLETE, (evt) => {
         this.rightDisplayToggle();
         });
         GlobalSubscriber.on(EventConstants.SCROLL_TOP_LINE, (evt) => {
         if (evt.top < -55) {
         this.isBorder = true;
         } else {
         this.isBorder = false;
         }
         });
         */
    };
    AppMainComponent.prototype.onOptions = function (evt) {
        this.mScrollbarService.destroy('#malihu');
        this.mScrollbarService.destroy('#appCenterContent');
        this.mScrollbarService.destroy('#app-right-detail');
        this.mainShowLoading = 'show';
        this.router.navigate([this.options.url], { relativeTo: this.route });
    };
    AppMainComponent.prototype.rightDisplayToggle = function () {
        var appRightDetail = this.el.nativeElement.querySelector('#app-right-detail');
        var width1 = document.body.clientWidth;
        var width2 = parseInt(window.getComputedStyle(appRightDetail, null).left.replace('px', ''), 10);
        if (width1 === width2) {
            appRightDetail.style.animationName = 'right-roll-out';
            appRightDetail.style.animationDuration = '.3s';
            appRightDetail.style.animationTimingFunction = 'ease';
            appRightDetail.style.animationFillMode = 'forwards';
            this.hideRightDetailHandler = this.hideRightDetail.bind(this);
            document.addEventListener('click', this.hideRightDetailHandler);
        }
    };
    AppMainComponent.prototype.hideRightDetail = function (evt) {
        if (evt && evt.target.className.indexOf('click-no-hide-detail') > -1) {
            evt.stopPropagation();
            return;
        }
        document.removeEventListener('click', this.hideRightDetailHandler);
        this.hideRightDetailHandler = null;
        var appRightDetail = this.el.nativeElement.querySelector('#app-right-detail');
        var width1 = document.body.clientWidth;
        var width2 = parseInt(window.getComputedStyle(appRightDetail).left.replace('px', ''), 10);
        if (width1 !== width2) {
            appRightDetail.style.animationName = 'right-roll-in';
            appRightDetail.style.animationDuration = '.3s';
            appRightDetail.style.animationTimingFunction = 'ease';
            appRightDetail.style.animationFillMode = 'forwards';
        }
    };
    AppMainComponent.prototype.exit = function () {
        location.href = '/public/login.html';
    };
    return AppMainComponent;
}());
__decorate([
    core_1.HostListener('window:resize', ['$event'])
], AppMainComponent.prototype, "onWindowResize");
AppMainComponent = __decorate([
    core_1.Component({
        selector: 'app-main',
        templateUrl: 'main-home.component.html',
        styleUrls: ['main-home.component.scss']
    })
], AppMainComponent);
exports.AppMainComponent = AppMainComponent;
//# sourceMappingURL=main-home.component.js.map