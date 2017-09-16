import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-all-list',
  templateUrl: './all-list.component.html',
  styleUrls: ['./all-list.component.scss']
})
export class AllListComponent implements OnInit {
  data: any;
  listData: any;

  constructor() {
  }

  ngOnInit() {
  }

  pageChange(model){

  }
}
