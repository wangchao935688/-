import { Component, OnInit } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-create-treate-charge-item',
  templateUrl: './create-treate-charge-item.component.html',
  styleUrls: ['./create-treate-charge-item.component.scss']
})
export class CreateTreateChargeItemComponent extends PopupWindowBaseComponent implements OnInit {

  constructor() { super(); }

  ngOnInit() {
  }

}
