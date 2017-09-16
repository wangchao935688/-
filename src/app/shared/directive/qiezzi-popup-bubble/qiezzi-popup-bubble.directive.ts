import {Directive, ElementRef, EventEmitter, HostListener, Input, Output} from '@angular/core';
import {ApplicationService} from "../../../core/service/application.service";

@Directive({
  selector: '[appQiezziPopupBubble],[qiezzi-popup-bubble]',
})
export class QiezziPopupBubbleDirective {
  @Input()
  options: any;
  /** TOP_RIGHT_FIXED,  BOTTOM_LEFT_FIXED , BOTTOM_CENTER*/
  /**LIST，HTML*/

  @Output()
  onListClick: EventEmitter<any> = new EventEmitter<any>();

  @Input()
  htmlText: string;

  @Input()
  listData: string[];

  handlers: any = {};

  popupBackground: any;
  popupContainer: any;
  popupBubble: any;
  popupBubbleBox: any;
  popupBubbleArrow: any;
  popupBubbleArrowMask: any;
  bubbleControlList: any;

  @HostListener('window:resize', ['$event'])
  onWindowResize(event) {
    this.hide();
  }

  @HostListener('click', ['$event'])
  onHostClick(event) {
    let x = 0, y = 0;
    let obj = event.currentTarget;
    while (obj.tagName.toUpperCase() !== 'BODY') {
      console.log(obj);
      x += obj.offsetLeft;
      y += obj.offsetTop;
      console.log(obj.offsetLeft, obj.offsetTop);
      console.log(x, y);
      obj = obj.parentNode;
    }

    // for (let i = 0; i < event.path.length; i++) {
    //   if (event.path[i] === document)
    //     break;
    //   x += event.path[i].offsetLeft;
    //   y += event.path[i].offsetTop;
    // }

    x += event.currentTarget.offsetWidth / 2;
    if (this.options && this.options['position'] && this.options.position.toUpperCase().indexOf('TOP_') === 0)
      y += event.currentTarget.offsetHeight;
    console.log(x, y);

    this.createPopupBubble();

    this.popupBackground.setAttribute('status', 'hide');
    let computedStyle = window.getComputedStyle(this.popupBubble, null);
    let width = parseInt(computedStyle.width.replace('px', ''), 10);
    let height = parseInt(computedStyle.height.replace('px', ''), 10);

    this.popupBubble.style.height = '0';
    this.popupBubble.style.paddingTop = '0';
    this.popupBubble.style.paddingBottom = '0';
    this.popupBackground.setAttribute('status', 'show');
    if (this.options.position === 'TOP_RIGHT_FIXED') {
      this.popupBubble.style.left = ( x - width + 30) + 'px';
      this.popupBubble.style.top = y + 'px';
    } else if (this.options.position === 'BOTTOM_LEFT_FIXED') {
      this.popupBubble.style.left = ( x - 30) + 'px';
      this.popupBubble.style.bottom = (document.body.offsetHeight - y) + 'px';
    } else if (this.options.position === 'BOTTOM_CENTER') {
      this.popupBubble.style.left = ( x - width / 2) + 'px';
      this.popupBubble.style.bottom = (document.body.offsetHeight - y) + 'px';
    }
    setTimeout(() => {
      this.popupBubble.style.transition = 'height 0.2s, padding-top 0.05s, padding-bottom 0.05s';
      this.popupBubble.style.height = height + 'px';
      this.popupBubble.style.paddingTop = '5px';
      this.popupBubble.style.paddingBottom = '5px';
    }, 0);
  }

  constructor(private input: ElementRef, private application: ApplicationService) {
  }

  hide() {

    this.popupBubble.style.transition = 'height 0.2s, padding-top 0.05s 0.2s, padding-bottom 0.05s';
    this.popupBubble.style.height = '0';
    this.popupBubble.style.paddingTop = '0';
    this.popupBubble.style.paddingBottom = '0';


    setTimeout(() => {
      this.popupBackground.style.display = 'none';
      let arrKeys = Object.keys(this.handlers);
      if (arrKeys.length > 0) {
        let nodeList = this.bubbleControlList.childNodes;
        for (let i = 0; i < nodeList.length; i++) {
          if (nodeList[i].hasAttribute('method-name')) {
            let funcName = nodeList[i].getAttribute('method-name');

            nodeList[i].removeEventListener('click', this.handlers[funcName]);
            this.handlers[funcName] = null;
            delete this.handlers[funcName];
          }
          this.bubbleControlList.removeChild(nodeList[i]);
        }
      }
      document.body.removeChild(this.popupBackground);
      this.popupContainer.onclick = null;
      this.popupBubble.onclick = null;

      this.popupBackground = null;
      this.popupContainer = null;
      this.popupBubble = null;
      this.popupBubbleBox = null;
      this.popupBubbleArrow = null;
      this.popupBubbleArrowMask = null;
      this.bubbleControlList = null;
    }, 300)
  }

  createPopupBubble() {
    let self = this;
    this.popupBackground = document.createElement('div');
    this.popupBackground.className = 'popup-background';

    this.popupContainer = document.createElement('div');
    this.popupContainer.className = 'popup-container';
    this.popupContainer.onclick = function (event) {
      self.hide();
    };

    this.popupBubble = document.createElement('div');
    this.popupBubble.className = 'popup-bubble';
    this.popupBubble.onclick = function (event) {
      self.hide();
    };

    this.popupBubbleBox = document.createElement('div');
    this.popupBubbleBox.className = 'popup-bubble-box';

    this.popupBubbleArrow = document.createElement('div');

    switch (this.options && this.options['position'] && this.options.position.toUpperCase()) {
      case 'BOTTOM_LEFT_FIXED':
        this.popupBubbleArrow.className = 'bubble-arrow bubble-arrow-blf';
        break;
      case 'BOTTOM_CENTER':
        this.popupBubbleArrow.className = 'bubble-arrow bubble-arrow-bc';
        break;
      case 'TOP_RIGHT_FIXED':
        this.popupBubbleArrow.className = 'bubble-arrow bubble-arrow-trf';
        break;
    }
    this.popupBubbleBox.appendChild(this.popupBubbleArrow);

    this.popupBubbleArrowMask = document.createElement('div');
    this.popupBubbleArrowMask.className = ' bubble-arrow-mask';
    this.popupBubbleBox.appendChild(this.popupBubbleArrowMask);

    if (this.options && this.options['type'] && this.options.type.toUpperCase() === 'LIST') {
      this.bubbleControlList = document.createElement('div');
      this.bubbleControlList.className = 'bubble-control-list';

      for (let i = 0; this.listData && i < this.listData.length; i++) {
        if (this.listData[i] === '')
          continue;
        let bubbleControlItem = document.createElement('div');
        bubbleControlItem.className = 'bubble-control-item';
        let methodName = 'func-' + this.application.createGUID();
        this.handlers[methodName] = this.onListItemClick.bind(this);
        bubbleControlItem.innerText = this.listData[i];
        bubbleControlItem.setAttribute('method-name', methodName);
        bubbleControlItem.setAttribute('data-index', i + '');
        bubbleControlItem.setAttribute('data-title', this.listData[i]);
        bubbleControlItem.addEventListener('click', this.handlers[methodName]);
        this.bubbleControlList.appendChild(bubbleControlItem)
      }
      this.popupBubbleBox.appendChild(this.bubbleControlList);
    } else if (this.options && this.options['type'] && this.options.type.toUpperCase() === 'HTML') {
      // bubble-html
    }
    this.popupBubble.appendChild(this.popupBubbleBox);
    this.popupContainer.appendChild(this.popupBubble);
    this.popupBackground.appendChild(this.popupContainer);
    document.body.appendChild(this.popupBackground);
  }

  onListItemClick(event) {
    event.stopPropagation();
    this.onListClick.emit(parseInt(event.srcElement.getAttribute('data-index'), 10));
    this.hide();
  }
}
