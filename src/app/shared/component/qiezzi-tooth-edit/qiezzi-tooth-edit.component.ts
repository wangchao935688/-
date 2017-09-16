import {Component, Input, OnInit, EventEmitter, Output} from "@angular/core";
import {PopupWindowBaseComponent} from "../qiezzi-popup-window/popup-window-base/popup-window-base";
import {ProcessItemFullModel} from "../../../core/messages/model/processItem-full.model";
import {ProcessItemAddModel} from "../../../core/messages/model/process-item-add.model";
import {ProcessService} from "../../../core/service/process.service";
import {GlobalState} from "../../../global.state";
import {SystemGlobalHelper} from "../../../core/uitls/system-global-helper";
import {QiezziToothPicComponent} from "../qiezzi-tooth-pic/qiezzi-tooth-pic.component";
import {SelectItem} from "../qiezzi-drop-down-list/qiezzi-drop-down-list.component";
/**
 * 牙位编辑
 */
@Component({
  moduleId: 'module.id',
  selector: 'qiezzi-tooth-edit',
  templateUrl: 'qiezzi-tooth-edit.component.html',
  styleUrls: ['qiezzi-tooth-edit.component.scss']
})
export class QiezziToothEditComponent extends PopupWindowBaseComponent implements OnInit {

  @Input()
  processToothFullModel: ProcessItemFullModel;

  @Input()
  processToothAddModel: ProcessItemAddModel;

  @Input()
  isEdit: boolean;

  @Input()
  num: number;

  teeth: number[];

  processContentList: SelectItem[];

  colorNumberList: SelectItem[];

  @Output()
  isDeleteTooth = new EventEmitter<number>();

  constructor(private processService: ProcessService, private globalState: GlobalState) {
    super();
  }


  ngOnInit() {
    if (this.isEdit) {
      this.processContentList = [];
      this.colorNumberList = [];
      this.teeth = this.processToothAddModel.ToothPlace;
      this.processService.getOutsideProcessGetProcessContentList().subscribe(val => {
        val.forEach(item => {
          this.processContentList.push({label: item.Value, value: item.Key});
        });
      });
      this.processService.getOutsideProcessGetColorNumberList().subscribe(val => {
        val.forEach(item => {
          this.colorNumberList.push({label: item.Value, value: item.Key});
        });
      });
    } else {
      this.teeth = this.processToothFullModel.ToothPlace;
    }

  }


  /**
   * 删除
   */
  deleteProcessToothModel() {
    this.isDeleteTooth.emit(this.num);
  }


  /**
   * 打开牙位图
   * @param teeth
   */
  openToothPic(teeth: number[]) {
    if (this.isEdit) {
      SystemGlobalHelper.currentFrontLayer.openPopupWindow(QiezziToothPicComponent, '牙位', 920, 680, teeth, false).subscribe(t => {
        if (t && t != null && t.data != null) {
          this.teeth = t.data.teeth;
          // 通知牙位数量变化
          this.globalState.notifyDataChanged('teethChange', {index: this.num, teeth: this.teeth});
          console.log(t);
        }
      })
    }
  }

}
