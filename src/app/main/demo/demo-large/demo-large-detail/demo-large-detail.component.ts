import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-demo-list-detail',
  templateUrl: './demo-large-detail.component.html',
  styleUrls: ['./demo-large-detail.component.css']
})
export class DemoLargeDetailComponent implements OnInit {
  componentName: string;
  controlList: string[];

  onClose(): void {
  }

  onBack(): void {
  }

  onControl(val: number): void {
  }

  constructor() {
  }

  ngOnInit() {
  }

}
