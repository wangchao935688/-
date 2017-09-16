/**
 * Created by KingKong on 2017/6/21.
 */
import {Injectable} from '@angular/core';
import {QiezziNoDataComponent} from "../../shared/component/qiezzi-no-data/qiezzi-no-data.component";

/**
 * 侧滑功能服务类，提供侧滑的打开关闭两个功能
 * **/
@Injectable()
export class CustomizeSliderService {

  show(parent: any, event: Event) {
    if (!parent) {
      return;
    }
    if (event) {
      event.stopImmediatePropagation();
      event.stopPropagation();
    }

    if (event === null) {
      if (parent.route.children.length > 0 && parent.route.children[0].component !== QiezziNoDataComponent) {
        if (!parent.rightSliderShow) {
          parent.displayStatus = 'show';
          parent.rightSliderShow = true;
          parent.hideRightDetailHandler = this.hide.bind(this, parent);
          if (parent.application)
            parent.application.workBoard.addEventListener('click', parent.hideRightDetailHandler);
        }
      }
    } else {
      if (!parent.rightSliderShow) {
        parent.displayStatus = 'show';
        parent.rightSliderShow = true;
        parent.hideRightDetailHandler = this.hide.bind(this, parent);
        if (parent.application)
          parent.application.workBoard.addEventListener('click', parent.hideRightDetailHandler);
      }
    }
  }


  hide(parent: any, event: Event) {
    if (!parent) {
      return;
    }
    const ele = event && <Element>event.target;
    if (event && (ele.className.indexOf('click-no-hide-detail') > -1 || ele.id.indexOf('app-right-container') > -1)) {
      event.stopPropagation();
      return;
    }
    if (event && (ele.nodeName === 'APP-POPUP-WINDOW')) {
      event.stopPropagation();
      return;
    }
    parent.displayStatus = 'hide';
    parent.rightSliderShow = false;
    document.removeEventListener('click', parent.hideRightDetailHandler);
    parent.hideRightDetailHandler = null;
  }
}

export declare interface ICustomizeSlider {
  displayStatus: string;
}
