import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-demo-popup',
  templateUrl: './demo-has-button-popup.component.html',
  styleUrls: ['./demo-has-button-popup.component.css']
})
export class DemoHasButtonPopupComponent extends PopupWindowBaseComponent implements OnInit {
  scrollbarOptions = null;


  constructor() {
    super()
  }

  ngOnInit() {
    this.scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};
  }
}
