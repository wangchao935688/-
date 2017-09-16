import {Component, OnInit} from '@angular/core';
import {PopupWindowBaseComponent} from "../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base";

@Component({
  selector: 'app-demo-no-button-popup',
  templateUrl: './demo-no-button-popup.component.html',
  styleUrls: ['./demo-no-button-popup.component.css']
})
export class DemoNoButtonPopupComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() {
    super()
  }

  ngOnInit() {
  }

}
