import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  rightComponentName = '联系人详情';
  controlList: string[]= [''];
  constructor() { }

  ngOnInit() {
  }
  onControl(val: number): void {
  }
}
