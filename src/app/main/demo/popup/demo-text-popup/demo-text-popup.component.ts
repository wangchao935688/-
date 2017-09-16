import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: 'app-demo-text-popup',
  templateUrl: './demo-text-popup.component.html',
  styleUrls: ['./demo-text-popup.component.css']
})
export class DemoTextPopupComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
