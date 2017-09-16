import { Component, OnInit } from '@angular/core';
import {ProcessService} from '../../../../core/service/process.service';

@Component({
  selector: 'app-patient-check',
  templateUrl: './patient-check.component.html',
  styleUrls: ['./patient-check.component.scss']
})
export class PatientCheckComponent implements OnInit {
  item: any; // 牙位图
  patientId: string;
  /*
  * TODO 设置滚动条样式
  * */
  scrollbarOptions = { // 滚动条设置
    axis: 'y', theme: 'minimal-dark'
  };
  constructor(private processService: ProcessService) { }

  ngOnInit() {
    this.item = [1, 15, 22, 33, 42];
  }
/*
* TODO 编辑修改
* */
  editCheck() {

  }
}
