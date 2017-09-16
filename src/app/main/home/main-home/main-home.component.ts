/**
 * Created by KingKong on 2017/5/12.
 */
import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  HostListener,
  ComponentFactoryResolver,
  ViewContainerRef, OnInit
} from "@angular/core";
import {Router, ActivatedRoute} from "@angular/router";
import {MalihuScrollbarService} from "ngx-malihu-scrollbar";
import {ApplicationService} from "../../../core/service/application.service";
import {MessageService} from "../../../core/service/message.service";

@Component({
  selector: 'app-main',
  templateUrl: 'main-home.component.html',
  styleUrls: ['main-home.component.scss']
})
export class AppMainComponent implements OnInit, AfterViewInit {
  displayStatus: string;
  mainShowLoading: string;

  clickMask() {
    this.displayStatus = 'hide';
  }

  onRouterNavigate(event) {
  //  this.mainShowLoading = 'show';
    this.router.navigate([event])
  }

  onShowLeftNav() {
    this.displayStatus = 'show';
  }

  @HostListener('window:resize', ['$event'])
  onWindowResize() {
    if (this.displayStatus !== 'hide') {
      this.displayStatus = 'hide';
    }
  }

  hospitalName = '诊所名称诊x名称';

  options: any;

  leftNavStat = 'hide';
  navData: any[] = null;
  toggleDisplayCenterMask: any = {};

  private hideRightDetailHandler: any = null;

  currOpenIndex = null;

  isCollapsed: boolean = true;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private application: ApplicationService,
              private messageService:MessageService,
              private mScrollbarService: MalihuScrollbarService) {
  }

  ngOnInit(): void {
    this.application.mainModule = this;
    this.messageService.initWebIm();
  }

  ngAfterViewInit(): void {
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
  }

  onOptions(evt) {
    this.mScrollbarService.destroy('#malihu');
    this.mScrollbarService.destroy('#appCenterContent');
    this.mScrollbarService.destroy('#app-right-detail');
    this.mainShowLoading = 'show';
    this.router.navigate([this.options.url], {relativeTo: this.route});
  }

  isDisplayMask: boolean;


  rightDisplayToggle() {
    const appRightDetail = this.el.nativeElement.querySelector('#app-right-detail');
    const width1 = document.body.clientWidth;
    const width2 = parseInt(window.getComputedStyle(appRightDetail, null).left.replace('px', ''), 10);
    if (width1 === width2) {
      appRightDetail.style.animationName = 'right-roll-out';
      appRightDetail.style.animationDuration = '.3s';
      appRightDetail.style.animationTimingFunction = 'ease';
      appRightDetail.style.animationFillMode = 'forwards';

      this.hideRightDetailHandler = this.hideRightDetail.bind(this);
      document.addEventListener('click', this.hideRightDetailHandler);
    }
  }

  hideRightDetail(evt) {
    if (evt && evt.target.className.indexOf('click-no-hide-detail') > -1) {
      evt.stopPropagation();
      return;
    }
    document.removeEventListener('click', this.hideRightDetailHandler);
    this.hideRightDetailHandler = null;
    const appRightDetail = this.el.nativeElement.querySelector('#app-right-detail');
    const width1 = document.body.clientWidth;
    const width2 = parseInt(window.getComputedStyle(appRightDetail).left.replace('px', ''), 10);
    if (width1 !== width2) {
      appRightDetail.style.animationName = 'right-roll-in';
      appRightDetail.style.animationDuration = '.3s';
      appRightDetail.style.animationTimingFunction = 'ease';
      appRightDetail.style.animationFillMode = 'forwards';
    }
  }

  exit() {
    location.href = '/public/login.html';
  }


}
