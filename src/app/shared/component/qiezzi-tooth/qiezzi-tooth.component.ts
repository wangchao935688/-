import {Component, Input, OnInit} from "@angular/core";
/**
 * 外加工牙位
 */
@Component({
  selector: 'qiezzi-tooth',
  templateUrl: 'qiezzi-tooth.component.html',
  styleUrls: ['qiezzi-tooth.component.scss']
})
export class QiezziToothComponent implements OnInit {

  @Input()
  teeth: number[];

  ngOnInit() {
  }
}
