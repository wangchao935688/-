import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {WorkerService} from "../../../../core/service/worker.service";
import {IQiezziCenterHeaderComponent} from "../../../../shared/component/qiezzi-center-header/qiezzi-center-header.component";

@Component({
  selector: 'app-reception-index',
  templateUrl: './reception-index.component.html',
  styleUrls: ['./reception-index.component.scss']
})
export class ReceptionIndexComponent implements OnInit, AfterViewInit,IQiezziCenterHeaderComponent {
  onSearch(val: any): void {
  }

  onShowFilter(val: any): void {
  }

  onControl(val: any): void {
  }

  onOptions(val: any): void {
  }

  noSelectDoctorCount: number;
  displayStatus: string;


  @ViewChild('tabListContainer')
  tabListContainer: ElementRef;

  barStyleObject: any = {};

  currentTabIndex: number;
  currentDisplayState: number;

  constructor() {
  }

  ngOnInit() {
    this.barStyleObject = {};
    this.currentDisplayState = 0;
  }

  ngAfterViewInit(): void {
    this.onTabClick(0)
  }

  onTabClick(index) {
    if (this.currentTabIndex === index)
      return;
    this.currentTabIndex = index;
    this.barStyleObject = {};
    let nodeList = this.tabListContainer.nativeElement.querySelectorAll('.tab-item');
    for (let i = 0; i < nodeList.length; i++) {
      if (nodeList[i].className === 'tab-item' && index === i) {
        this.barStyleObject['width'] = nodeList[i].scrollWidth + 'px';
        this.barStyleObject['left'] = nodeList[i].offsetLeft + 'px';
        this.barStyleObject['transition'] = 'width 0.2s,left 0.2s';
      }
    }
  }

  changeDisplayState(index) {
    this.onTabClick(0);
    this.currentDisplayState = index;
  }
}
