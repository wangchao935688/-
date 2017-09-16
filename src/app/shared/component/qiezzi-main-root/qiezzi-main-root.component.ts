import {Component, ComponentFactoryResolver, ComponentRef, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {QiezziFrontLayerComponent} from "../qiezzi-popup-window/front-layer/qiezzi-front-layer.component";
import {SystemGlobalHelper} from "../../../core/uitls/system-global-helper";
import {ApplicationService} from "../../../core/service/application.service";
import {PromptContainerDirective} from "./prompt-container.directive";
import {PromptMessageComponent} from "../qiezzi-prompt-message/qiezzi-prompt-message.component";

@Component({
  selector: 'app-qiezzi-main-root',
  templateUrl: './qiezzi-main-root.component.html',
  styleUrls: ['./qiezzi-main-root.component.scss']
})
export class QiezziMainRootComponent implements OnInit {
  @ViewChild('frontLayer')
  frontLayer: QiezziFrontLayerComponent;

  @ViewChild(PromptContainerDirective)
  promptLayer: PromptContainerDirective;

  promptContainer: ViewContainerRef = null;
  promptStatus: string;

  constructor(private app: ApplicationService, private factory: ComponentFactoryResolver) {
  }

  ngAfterViewInit(): void {
    this.promptContainer = this.promptLayer.vcr;
  }

  ngOnInit() {
    SystemGlobalHelper.currentFrontLayer = this.frontLayer;
    this.app.frontLayer = this.frontLayer;
    this.app.main = this;
  }

  openPromptMessage(message: string, delay: number = 3000) {
    this.promptContainer.clear();
    this.promptStatus = 'show';

    const componentFactory = this.factory.resolveComponentFactory(PromptMessageComponent);
    const componentRef: ComponentRef<PromptMessageComponent> = this.promptContainer.createComponent(componentFactory);
    const promptMessage: PromptMessageComponent = <PromptMessageComponent>componentRef.instance;

    promptMessage.setMessage(message);
    promptMessage.onClose.subscribe(() => {
      this.promptStatus = 'hide';
      setTimeout(() => {
        this.promptContainer.clear();
      }, 300);
    });
    setTimeout(() => {
      this.promptStatus = 'hide';
      setTimeout(() => {
        this.promptContainer.clear();
      }, 300);
    }, delay);
  }

  openErrorMessage(message: string, delay: number = 3000) {
    this.openPromptMessage(message,delay);
  }

}
