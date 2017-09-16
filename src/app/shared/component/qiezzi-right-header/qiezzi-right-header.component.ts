import {Component, ElementRef, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {environment, PlatformType} from "../../../../environments/environment";

@Component({
  selector: 'app-qiezzi-right-header',
  templateUrl: './qiezzi-right-header.component.html',
  styleUrls: ['./qiezzi-right-header.component.scss']
})
export class QiezziRightHeaderComponent implements OnInit {
  @Input()
  rightComponentName: string;

  @Input()
  set controlList(val: string[]) {
    if (environment.platform === PlatformType.PC_WEB) {
      if (val) {
        this.mobileControlList = Array.from(val);
      } else {
        this.mobileControlList = [];
      }
    } else {
      if (val) {
        this.mobileControlList = Array.from(val);
      } else {
        this.mobileControlList = [];
      }
      for (let i = 0; i < this.mobileControlList.length; i++) {
        this.mobileControlList[i] = (( this.mobileControlList[i] === '打印' || this.mobileControlList[i] === '打印设置') ? '' : this.mobileControlList[i]);
      }
    }
  }

  mobileControlList: string[];

  @Output()
  onControl = new EventEmitter<number>();

  constructor(private el: ElementRef, private router: Router, private route: ActivatedRoute) {
  }

  clickRightOne() {
    this.onControl.emit(0);
  }

  @HostListener('click', ['$event'])
  onRightHeaderClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }


  moreItemClick(evt) {
    this.onControl.emit(evt);
  }

  ngOnInit() {
  }

  onRightContainerClose(evt) {
    this.el.nativeElement.parentNode.parentNode.setAttribute('status', 'hide');
    this.router.navigate(['../../'], {relativeTo: this.route});
  }
}

export declare interface IQiezziRightHeaderComponent {
  rightComponentName: string;
  controlList: string[];

  onControl(val: number): void;
}
