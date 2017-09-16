import {
  Component,
  AfterViewInit,
  ElementRef,
  Input,
  HostListener,
  Output,
  EventEmitter, OnInit,
} from "@angular/core";
import {LeftNavService} from "./left-nav.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MalihuScrollbarService} from "ngx-malihu-scrollbar";
import {trigger, state, transition, style, animate, keyframes} from "@angular/animations";
import {GlobalState} from "../../../global.state";
import {GlobalStateEvent} from "../../../core/enums/global-state-event.enum";

@Component({
  selector: 'app-left-content',
  templateUrl: 'app-left-content.component.html',
  styleUrls: ['app-left-content.component.scss'],
  providers: [LeftNavService],
  animations: [
    trigger('heightFadeIn', [
      state('in', style({display: 'none'})), // 默认元素不展开
      transition('void => *', [
        animate(200, keyframes([
          style({height: '0', offset: 0}),
          style({height: '*', offset: 1})
        ]))
      ]),
      transition('* => void', [
        animate(200, keyframes([
          style({height: '*', offset: 0}),
          style({height: '0', offset: 1})
        ]))
      ])
    ]),
    trigger('fadeIn', [
      state('in', style({display: 'none'})), // 默认元素不展开
      transition('void => *', [
        animate(200, keyframes([
          style({top: '0', opacity: 0, offset: 0}),
          style({top: '*', opacity: 1, offset: 1})
        ]))
      ]),
      transition('* => void', [
        animate(200, keyframes([
          style({top: '*', opacity: 1, offset: 0}),
          style({top: '0', opacity: 0, offset: 1})
        ]))
      ])
    ]),
    trigger('widthFadeIn', [
      state('in', style({display: 'none'})), // 默认元素不展开
      transition('void => *', [
        animate(200, keyframes([
          style({width: '0', offset: 0}),
          style({width: '*', offset: 1})
        ]))
      ]),
      transition('* => void', [
        animate(200, keyframes([
          style({width: '*', offset: 0}),
          style({
            width: '0', offset: 1
          })
        ]))
      ])
    ]),

  ],
})
export class AppLeftContentComponent implements OnInit, AfterViewInit {

  leftShowLoading = 'hide';

  navData: any[] = null;

  hospitalName: string = '诊所名称诊所名称';

  patientName: string = '麦林娜';

  @Input()
  leftNavStat: string = 'hide';

  currOpenIndex = null;

  scrollbarOptions = {axis: 'y', theme: 'minimal'};

  isCollapsed: boolean = true;

  isPropagation: boolean;

  isUserOptions: boolean;

  @Output()
  onExit = new EventEmitter();
  @Output()
  onNavigate = new EventEmitter<string>();

  @Output()
  onCenterMove = new EventEmitter<any>();

  leftMainStyle: any = {display: 'none'};

  userOptions: any[];

  constructor(private leftService: LeftNavService,
              private el: ElementRef,
              private mScrollbarService: MalihuScrollbarService,
  private globalState:GlobalState) {
  }

  ngOnInit(): void {
    this.leftService.getList().then(val => {
      this.leftShowLoading = 'hide';
      this.navData = val;
    });

//定于全局的subscribe事件
    this.globalState.subscribe(GlobalStateEvent[GlobalStateEvent.imleftEvent], t => {
      if (t){

      }
      else {

      }
      console.log(JSON.stringify(t));
    });
  }

  selectRouter(evt: any) {
    this.onNavigate.emit(evt);
  }

  ngAfterViewInit() {
    this.userOptions = [
      {name: '邀请好友使用'},
      {name: '账号管理'},
      {name: '我的排班'},
      {name: '我的工作量'}
    ];

    this.leftShowLoading = 'show';


    this.scrollbar(window.innerWidth);
  }

  onMainMenuClick(evt, index) {
    if (index !== this.currOpenIndex) {
      this.currOpenIndex = index;
      this.isCollapsed = true;
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
    if (this.navData[index].twoLevel.length === 0) {
      this.selectRouter(this.navData[index].linkActive);
      if (window.innerWidth < 1000) {
        this.leftDisplayToggle();
      }
    }

  }

  onLeftNavMaskClick() {
    this.isCollapsed = !this.isCollapsed;
  }


  onSubMenuClick(evt, route, index) {
    // 阻止事件传播
    if (!this.isPropagation) {
      evt.stopPropagation();
    }
    this.selectRouter(route);
    if (window.innerWidth < 1000) {
      this.leftDisplayToggle();
    }
  }

  leftNavWidth: string;
  leftNavLeft: string;

  leftNavShow() {
    this.leftNavWidth = '9rem';
    this.leftNavLeft = '-0rem';
    this.onCenterMove.emit(this.leftNavWidth);
  }

  leftNavHide() {
    this.leftNavWidth = '0rem';
    this.leftNavLeft = '-9rem';
    this.onCenterMove.emit(this.leftNavWidth);
  }

  leftDisplayToggle(): string {
    if (this.leftNavStat === 'show') {
      this.leftNavHide();
      this.leftNavStat = 'hide';
      return 'hide';
    } else {
      this.leftNavShow();
      this.leftNavStat = 'show';
      return 'show';
    }
  }

  onUserHeadClick() {
    this.isUserOptions = !this.isUserOptions;
  }

  onUserNameClick() {
  }

  onUserExitClick() {
    this.mScrollbarService.destroy('#malihu');
    this.mScrollbarService.destroy('#appCenterContent');
    this.mScrollbarService.destroy('#app-right-detail');
    this.onExit.emit();
  }

  @HostListener('window:resize')
  onWindowResize() {
    this.scrollbar(window.innerWidth);
  }

  isMaxWidth: boolean;

  private scrollbar(width: number) {
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
    } else {
      this.isPropagation = false;
      this.mScrollbarService.initScrollbar('#malihu', {axis: 'y', theme: 'minimal'});
    }
  }
}
