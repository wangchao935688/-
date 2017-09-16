import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-list-today',
  templateUrl: './list-today.component.html',
  styleUrls: ['./list-today.component.scss']
})
export class ListTodayComponent implements OnInit {
  data: any;
  listData: any;

  constructor() {
  }

  ngOnInit() {
  }

  pageChange(model){

  }
}
