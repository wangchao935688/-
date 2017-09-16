import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

@Component({
  selector: 'app-qiezzi-tab-control',
  templateUrl: './qiezzi-tab-control.component.html',
  styleUrls: ['./qiezzi-tab-control.component.scss']
})
export class QiezziTabControlComponent implements OnInit, AfterViewInit {

  @Input()
  tabData: string[] = null;
  @Input()
  defaultSelectedIndex: number;

  currentSelectedIndex: number = 0;
  barStyleObject: any = {};

  @Output()
  onTabIndexChange = new EventEmitter<{ [key: string]: string }>();

  @ViewChild('tabCtrlList')
  tabCtrlList: ElementRef;

  constructor(private el: ElementRef) {
  }

  ngAfterViewInit(): void {
    this.selectTabIndex(this.defaultSelectedIndex);
    this.changeBarState();
  }

  ngOnInit() {
  }

  changeBarState() {
    this.barStyleObject = {};
    let nodeList = this.tabCtrlList.nativeElement.querySelectorAll('.tab-ctrl-item');
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].className.indexOf('tab-ctrl-item') > -1 && this.currentSelectedIndex === i) {
        this.barStyleObject['width'] = nodeList[i].scrollWidth + 'px';
        this.barStyleObject['left'] = nodeList[i].offsetLeft + 'px';
        this.barStyleObject['transition'] = 'width 0.2s,left 0.2s';
      }
    }
  }

  selectTabIndex(index) {
    this.onTabIndexChange.emit({index: index, title: this.tabData[index]});
    if (this.currentSelectedIndex === index)
      return;
    this.currentSelectedIndex = index;
    this.changeBarState()
  }
}

export declare class IQiezziTabControlComponent {
  onTabIndexChange(event: Event): void;
}
