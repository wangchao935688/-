import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-option-list',
  templateUrl: './option-list.component.html',
  styleUrls: ['./option-list.component.scss']
})
export class OptionListComponent implements OnInit {

  sheetName='取消原因';
  sheetCode='BookCancelReason';

  sheetName1='取消原因';
  sheetCode1='BookCancelReason';
  constructor() { }

  ngOnInit() {
  }

  go(){
    this.sheetName=this.sheetName1;
    this.sheetCode=this.sheetCode1;
  }

}
