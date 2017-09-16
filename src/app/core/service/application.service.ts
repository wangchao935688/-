import {Injectable} from '@angular/core';

import {QiezziFrontLayerComponent} from "../../shared/component/qiezzi-popup-window/front-layer/qiezzi-front-layer.component";
import {QiezziFullMaskComponent} from "../../shared/component/qiezzi-full-mask/full-mask.component";
import {QiezziMainRootComponent} from "../../shared/component/qiezzi-main-root/qiezzi-main-root.component";
import {AppMainComponent} from "../../main/home/main-home/main-home.component";

@Injectable()
export class ApplicationService {
  private currentFrontLayer: QiezziFrontLayerComponent = null;

  set frontLayer(val: QiezziFrontLayerComponent) {
    this.currentFrontLayer = val;
  }

  get frontLayer(): QiezziFrontLayerComponent {
    return this.currentFrontLayer;
  }

  private currentMainMask: QiezziFullMaskComponent = null;

  set mainMask(val: QiezziFullMaskComponent) {
    this.currentMainMask = val;
  }

  get mainMask(): QiezziFullMaskComponent {
    return this.currentMainMask;
  }

  private mainRoot: any = null;

  set main(val: QiezziMainRootComponent) {
    this.mainRoot = val;
  }

  get main(): QiezziMainRootComponent {
    return this.mainRoot;
  }

  private currentWorkBoard: any = null;

  set workBoard(val: any) {
    this.currentWorkBoard = val;
  }

  get workBoard(): any {
    return this.currentWorkBoard;
  }


  private currentWorkModule: any = null;

  set workModule(val: any) {
    this.currentWorkModule = val;
  }

  get workModule(): any {
    return this.currentWorkModule;
  }

  private appMain: AppMainComponent = null;

  set mainModule(val: any) {
    this.appMain = val;
  }

  get mainModule(): any {
    return this.appMain;
  }

  /**
   * webIm Instance
   */
  imConn: any;

  createGUID() {
    function str4() {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    }
    return (str4() + str4() + "-" + str4() + "-" + str4() + "-" + str4() + "-" + str4() + str4() + str4());
  }
}
