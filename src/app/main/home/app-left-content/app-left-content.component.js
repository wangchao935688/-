"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var core_1 = require("@angular/core");
var left_nav_service_1 = require("./left-nav.service");
var animations_1 = require("@angular/animations");
var AppLeftContentComponent = (function () {
    function AppLeftContentComponent(leftService, el, mScrollbarService) {
        this.leftService = leftService;
        this.el = el;
        this.mScrollbarService = mScrollbarService;
        this.leftShowLoading = 'hide';
        this.navData = null;
        this.hospitalName = '诊所名称诊所名称';
        this.patientName = '麦林娜';
        this.leftNavStat = 'hide';
        this.currOpenIndex = null;
        this.scrollbarOptions = { axis: 'y', theme: 'minimal' };
        this.isCollapsed = true;
        this.onExit = new core_1.EventEmitter();
        this.onNavigate = new core_1.EventEmitter();
        this.onCenterMove = new core_1.EventEmitter();
        this.leftMainStyle = { display: 'none' };
    }
    AppLeftContentComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.leftService.getList().then(function (val) {
            _this.leftShowLoading = 'hide';
            _this.navData = val;
        });
    };
    AppLeftContentComponent.prototype.selectRouter = function (evt) {
        this.onNavigate.emit(evt);
    };
    AppLeftContentComponent.prototype.ngAfterViewInit = function () {
        this.userOptions = [
            { name: '邀请好友使用' },
            { name: '账号管理' },
            { name: '我的排班' },
            { name: '我的工作量' }
        ];
        this.leftShowLoading = 'show';
        this.scrollbar(window.innerWidth);
    };
    AppLeftContentComponent.prototype.onMainMenuClick = function (evt, index) {
        if (index !== this.currOpenIndex) {
            this.currOpenIndex = index;
            this.isCollapsed = true;
        }
        else {
            this.isCollapsed = !this.isCollapsed;
        }
        if (this.navData[index].twoLevel.length === 0) {
            this.selectRouter(this.navData[index].linkActive);
            if (window.innerWidth < 1000) {
                this.leftDisplayToggle();
            }
        }
    };
    AppLeftContentComponent.prototype.onLeftNavMaskClick = function () {
        this.isCollapsed = !this.isCollapsed;
    };
    AppLeftContentComponent.prototype.onSubMenuClick = function (evt, route, index) {
        // 阻止事件传播
        if (!this.isPropagation) {
            evt.stopPropagation();
        }
        this.selectRouter(route);
        if (window.innerWidth < 1000) {
            this.leftDisplayToggle();
        }
    };
    AppLeftContentComponent.prototype.leftNavShow = function () {
        this.leftNavWidth = '9rem';
        this.leftNavLeft = '-0rem';
        this.onCenterMove.emit(this.leftNavWidth);
    };
    AppLeftContentComponent.prototype.leftNavHide = function () {
        this.leftNavWidth = '0rem';
        this.leftNavLeft = '-9rem';
        this.onCenterMove.emit(this.leftNavWidth);
    };
    AppLeftContentComponent.prototype.leftDisplayToggle = function () {
        if (this.leftNavStat === 'show') {
            this.leftNavHide();
            this.leftNavStat = 'hide';
            return 'hide';
        }
        else {
            this.leftNavShow();
            this.leftNavStat = 'show';
            return 'show';
        }
    };
    AppLeftContentComponent.prototype.onUserHeadClick = function () {
        this.isUserOptions = !this.isUserOptions;
    };
    AppLeftContentComponent.prototype.onUserNameClick = function () {
    };
    AppLeftContentComponent.prototype.onUserExitClick = function () {
        this.mScrollbarService.destroy('#malihu');
        this.mScrollbarService.destroy('#appCenterContent');
        this.mScrollbarService.destroy('#app-right-detail');
        this.onExit.emit();
    };
    AppLeftContentComponent.prototype.onWindowResize = function () {
        this.scrollbar(window.innerWidth);
    };
    AppLeftContentComponent.prototype.scrollbar = function (width) {
        this.leftNavStat = 'hide';
        if (width > 1000) {
            this.isMaxWidth = true;
            this.leftNavWidth = '9rem';
            this.leftNavLeft = '-0rem';
            this.onCenterMove.emit('');
        }
        if (width < 1000) {
            if (this.isMaxWidth == true) {
                this.leftNavWidth = '0rem';
                this.leftNavLeft = '-9rem';
                this.leftNavStat = 'hide';
                this.onCenterMove.emit('');
            }
            this.isMaxWidth = false;
        }
        if (1000 < width && width < 1121) {
            this.leftNavWidth = '9rem';
            this.leftNavLeft = '-0rem';
            this.onCenterMove.emit('3rem');
            this.isPropagation = true;
            this.mScrollbarService.destroy('#malihu');
        }
        else {
            this.isPropagation = false;
            this.mScrollbarService.initScrollbar('#malihu', { axis: 'y', theme: 'minimal' });
        }
    };
    return AppLeftContentComponent;
}());
__decorate([
    core_1.Input()
], AppLeftContentComponent.prototype, "leftNavStat");
__decorate([
    core_1.Output()
], AppLeftContentComponent.prototype, "onExit");
__decorate([
    core_1.Output()
], AppLeftContentComponent.prototype, "onNavigate");
__decorate([
    core_1.Output()
], AppLeftContentComponent.prototype, "onCenterMove");
__decorate([
    core_1.HostListener('window:resize')
], AppLeftContentComponent.prototype, "onWindowResize");
AppLeftContentComponent = __decorate([
    core_1.Component({
        selector: 'app-left-content',
        templateUrl: 'app-left-content.component.html',
        styleUrls: ['app-left-content.component.scss'],
        providers: [left_nav_service_1.LeftNavService],
        animations: [
            animations_1.trigger('heightFadeIn', [
                animations_1.state('in', animations_1.style({ display: 'none' })),
                animations_1.transition('void => *', [
                    animations_1.animate(200, animations_1.keyframes([
                        animations_1.style({ height: '0', offset: 0 }),
                        animations_1.style({ height: '*', offset: 1 })
                    ]))
                ]),
                animations_1.transition('* => void', [
                    animations_1.animate(200, animations_1.keyframes([
                        animations_1.style({ height: '*', offset: 0 }),
                        animations_1.style({ height: '0', offset: 1 })
                    ]))
                ])
            ]),
            animations_1.trigger('fadeIn', [
                animations_1.state('in', animations_1.style({ display: 'none' })),
                animations_1.transition('void => *', [
                    animations_1.animate(200, animations_1.keyframes([
                        animations_1.style({ top: '0', opacity: 0, offset: 0 }),
                        animations_1.style({ top: '*', opacity: 1, offset: 1 })
                    ]))
                ]),
                animations_1.transition('* => void', [
                    animations_1.animate(200, animations_1.keyframes([
                        animations_1.style({ top: '*', opacity: 1, offset: 0 }),
                        animations_1.style({ top: '0', opacity: 0, offset: 1 })
                    ]))
                ])
            ]),
            animations_1.trigger('widthFadeIn', [
                animations_1.state('in', animations_1.style({ display: 'none' })),
                animations_1.transition('void => *', [
                    animations_1.animate(200, animations_1.keyframes([
                        animations_1.style({ width: '0', offset: 0 }),
                        animations_1.style({ width: '*', offset: 1 })
                    ]))
                ]),
                animations_1.transition('* => void', [
                    animations_1.animate(200, animations_1.keyframes([
                        animations_1.style({ width: '*', offset: 0 }),
                        animations_1.style({
                            width: '0', offset: 1
                        })
                    ]))
                ])
            ]),
        ]
    })
], AppLeftContentComponent);
exports.AppLeftContentComponent = AppLeftContentComponent;
//# sourceMappingURL=app-left-content.component.js.map