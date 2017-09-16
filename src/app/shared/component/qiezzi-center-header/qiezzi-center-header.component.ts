import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-qiezzi-center-header',
  templateUrl: './qiezzi-center-header.component.html',
  styleUrls: ['./qiezzi-center-header.component.scss']
})
export class QiezziCenterHeaderComponent implements OnInit {

  @Input()
  showSearch: boolean = true;

  @Input()
  showFilter: boolean = true;

  @Input()
  showAdd: boolean = true;
//齿轮
  @Input()
  showOptions: boolean = true;

  @Input()
  moduleName: string = '';

  @Input()
  searchPlaceholder: string = '';

  @Input()
  controlList: string[] = [];

  centerInput: string;

  moreControlDDL: Object = {};
  showMoreControl = false;
  filterStatus = 'none';
  displayFilterStatus: Object = {color: '#999999'};

  constructor() {
  }

  ngOnInit(): void {
  }

  @Output()
  onSearch = new EventEmitter<any>();
  @Output()
  onShowFilter = new EventEmitter<string>();
  @Output()
  onControl = new EventEmitter<number>();
  @Output()
  onOptions = new EventEmitter<any>();

  onSearchClick(evt: any) {
    if (evt && evt.keyCode != 13) {
      return;
    }
    this.onSearch.emit(this.centerInput);
  }

  hideMoreList(evt: any) {
    this.moreControlDDL = {height: 0, transition: 'height .2s', border: 'none'};
    this.showMoreControl = false;
    evt && evt.stopPropagation();
  }

  onFilterClick() {
    if (this.filterStatus === 'none') {
      this.filterStatus = 'block';
      this.displayFilterStatus = {color: '#7B81FA'};
    } else {
      this.filterStatus = 'none';
      this.displayFilterStatus = {color: '#999999'};
    }
    this.onShowFilter.emit(this.filterStatus);
  }

  onOptionsClick() {
    this.onOptions.emit();
  }

  onAddClick(event: any, index: number = 0) {
    if (this.controlList.length > 1 && event && event.target.parentNode.className !== 'more-control-list') {
      if (this.showMoreControl) {
        this.moreControlDDL['overflow'] = 'hidden';

        setTimeout(() => {
          this.moreControlDDL = {height: 0, transition: 'height .2s'};
        }, 20);
      } else {
        this.moreControlDDL = {
          height: (this.controlList.length * 1.6 + 1) + 'rem',
          transition: 'height .2s',
        };
        setTimeout(() => {
          this.moreControlDDL['overflow'] = 'visible';
        }, 200);
      }
      this.showMoreControl = !this.showMoreControl;
    }
    else {
      this.hideMoreList(null);
      this.onControl.emit(index);
    }
  }
}


export declare interface IQiezziCenterHeaderComponent {
  onSearch(val: any): void;
  onShowFilter(val: any): void;
  onControl(val: any): void;
  onOptions(val: any): void;
}
