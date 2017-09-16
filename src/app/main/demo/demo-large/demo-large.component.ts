import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {CustomizeSliderService, ICustomizeSlider} from "../../../core/service/customize-slider.service";

@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-large.component.html',
  styleUrls: ['./demo-large.component.css']
})
export class DemoLargeComponent implements OnInit, ICustomizeSlider {
  moduleName: string;
  controlList: string[];


  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  constructor(private router: Router, private route: ActivatedRoute, private slider: CustomizeSliderService) {
    this.moduleName = '演示中心';
    this.controlList = ['添加', '删除']
  }

  ngOnInit() {
  }

  onClick(evt: Event) {
    this.router.navigate(['detail', 'dejuhng'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }
}
