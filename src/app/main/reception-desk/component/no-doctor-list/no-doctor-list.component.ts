import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-no-doctor-list',
  templateUrl: './no-doctor-list.component.html',
  styleUrls: ['./no-doctor-list.component.scss']
})
export class NoDoctorListComponent implements OnInit {
  data: any;
  listData: any;

  constructor() {
  }

  ngOnInit() {
  }

  pageChange(model) {

  }
}
