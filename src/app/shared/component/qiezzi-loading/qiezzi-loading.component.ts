/**
 * Created by KingKong on 2017/5/12.
 */
/**
 * Created by KingKong on 2017/5/12.
 */
import {Component, HostBinding, OnInit} from '@angular/core';

@Component({
  selector: 'qiezzi-loading',
  templateUrl: './qiezzi-loading.component.html',
  styleUrls: ['./qiezzi-loading.component.css']
})
export class QiezziLoadingComponent implements OnInit {
  @HostBinding('attr.status')
  status: string;

  ngOnInit(): void {
  }

  show() {
    this.status = 'show';
  }

  hide(callback) {
    this.status = 'hide';
    setTimeout(() => {
      callback && callback();
    }, 200)
  }
}
