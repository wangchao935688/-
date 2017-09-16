import {Component, HostBinding, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-data-empty',
  templateUrl: './qiezzi-data-empty.component.html',
  styleUrls: ['./qiezzi-data-empty.component.css']
})
export class QiezziDataEmptyComponent implements OnInit {
  constructor() {
  }

  ngOnInit() {
  }

  @HostBinding('style.display')
  showStatus: string;

  @Input()
  set showEmpty(val: boolean) {
    this.showStatus = val ? 'block' : 'none';
  }
}
