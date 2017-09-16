import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CustomizeSliderService, ICustomizeSlider} from "../../../../core/service/customize-slider.service";
import {IQiezziRightHeaderComponent} from "../../../../shared/component/qiezzi-right-header/qiezzi-right-header.component";


@Component({
  selector: 'app-demo-list-detail',
  templateUrl: './demo-list-detail.component.html',
  styleUrls: ['./demo-list-detail.component.css']
})
export class DemoListDetailComponent implements OnInit, ICustomizeSlider, IQiezziRightHeaderComponent {
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  rightComponentName: string;
  controlList: string[];

  onClose(): void {
  }

  onBack(): void {
  }

  onControl(val: number): void {
  }

  constructor(private router: Router, private route: ActivatedRoute, private slider: CustomizeSliderService) {
  }

  ngOnInit() {
    this.rightComponentName = '演示中心侧滑';
    this.controlList = ['修改', '删除'];

    this.route.params.subscribe(t => {
      console.log(t['detail-id']);
    })
  }

  clickSecondRouter(event) {
    this.router.navigate(['detail-info', '95867354'], {relativeTo: this.route});
    this.slider.show(this, event);
  }
}
