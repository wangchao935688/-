import {QiezziFrontLayerComponent} from "../../shared/component/qiezzi-popup-window/front-layer/qiezzi-front-layer.component";
/**
 * Created by KingKong on 2017/6/12.
 * 动态加载器的静态全局实例
 */

export class SystemGlobalHelper {
  public static mainModule = null;

  public static currentFrontLayer:QiezziFrontLayerComponent = null;
  public static currentWorkModule: any = null;
}

