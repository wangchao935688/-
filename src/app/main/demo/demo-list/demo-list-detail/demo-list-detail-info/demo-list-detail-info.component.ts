import {Component, ElementRef, HostBinding, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-demo-list-detail-info',
  templateUrl: './demo-list-detail-info.component.html',
  styleUrls: ['./demo-list-detail-info.component.css']
})
export class DemoListDetailInfoComponent implements OnInit {
  componentName: string;
  controlList: string[];

  onClose(): void {
  }

  onBack(): void {
  }

  onControl(val: number): void {
  }

  constructor(private router: Router, private route: ActivatedRoute, private el: ElementRef) {
  }

  ngOnInit() {
    this.route.params.subscribe(t => {
      console.log(t['info-id']);
    })
  }
}
