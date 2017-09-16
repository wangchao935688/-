import {
  AfterViewInit, Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, OnInit, Output, Renderer2,
  ViewChild
} from '@angular/core';

@Component({
  selector: 'app-qiezzi-data-filter',
  templateUrl: './qiezzi-data-filter.component.html',
  styleUrls: ['./qiezzi-data-filter.component.css']
})
export class QiezziDataFilterComponent implements OnInit, AfterViewInit {
  @Input()
  filterConfig: any = null;

  conditionKeys: string[] = null;
  conditionsResult: any = {};
  conditionsStatus: any = {};
  conditionsLists: any = {};

  @ViewChild('filterBox')
  filterBox: ElementRef;

  @Output()
  onConditionChanged = new EventEmitter<any>();

  constructor(public renderer: Renderer2) {
  }

  changeStatus(val) {
    this.hostDisplay = val;
  }

  @HostBinding('style.display')
  hostDisplay = 'none';


  @HostListener('window:resize')
  onWindowResize(evt) {
    this.checkHeight();
  }

  checkHeight() {
        Object.keys(this.conditionsLists).forEach(i => {
      const ele1: Element = this.filterBox.nativeElement.querySelector('#filterConditionList_' + i);
      const ele2: Element = this.filterBox.nativeElement.querySelector('#filterConditionListBox_' + i);

      const boxHeight = parseInt(window.getComputedStyle(ele2, null).height.replace('px', ''), 10);
      const listHeight = parseInt(window.getComputedStyle(ele1, null).height.replace('px', ''), 10);

      this.conditionsStatus[i].showArrow = boxHeight > listHeight;
    });
  }

  ngOnInit() {
    this.conditionKeys = Object.keys(this.filterConfig);
    this.conditionKeys.forEach(i => {
      if (this.filterConfig[i].type === 'list') {
        this.conditionsLists[i] = {};
      }

      this.conditionsResult[i] = null;
      this.conditionsStatus[i] = {
        'conditionListArrow': 'close',
        'showArrow': false,
        'selectIndex': -1,
        'conditionText': ''
      };
    })
  }

  changeConditionListStatus(key, status) {
    const ele1: Element = this.filterBox.nativeElement.querySelector('#filterConditionList_' + key);
    this.conditionsStatus[key].conditionListArrow = status;
    if (status === 'open') {
      this.renderer.setAttribute(ele1, 'style', 'height:auto !important');
    } else {
      this.renderer.setAttribute(ele1, 'style', '');
    }
  }

  onConditionItemChange(event, key, index, title) {
    this.conditionsResult[key] = index;
    this.conditionsStatus[key].selectIndex = index;
    this.onConditionChanged.emit(this.conditionsResult);
  }

  ngAfterViewInit(): void {
    this.checkHeight();
  }
}
