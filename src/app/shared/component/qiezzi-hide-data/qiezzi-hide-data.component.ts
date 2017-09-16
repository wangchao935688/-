import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-qiezzi-hide-data',
  templateUrl: './qiezzi-hide-data.component.html',
  styleUrls: ['./qiezzi-hide-data.component.scss']
})
export class QiezziHideDataComponent implements OnInit {

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    if (this.el.nativeElement.parentNode) {
      this.el.nativeElement.parentNode.setAttribute('status', 'hide');
    }
  }
}
