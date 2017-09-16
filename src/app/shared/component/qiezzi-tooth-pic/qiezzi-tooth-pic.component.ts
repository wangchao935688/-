import {Component, Input, OnInit} from "@angular/core";
import {isArray} from "util";
import {PopupWindowBaseComponent} from "../qiezzi-popup-window/popup-window-base/popup-window-base";
/**
 * 牙位图片选择
 */
@Component({
  moduleId: 'module.id',
  selector: 'qiezzi-tooth-pic',
  templateUrl: 'qiezzi-tooth-pic.component.html',
  styleUrls: ['qiezzi-tooth-pic.component.scss']
})
export class QiezziToothPicComponent extends PopupWindowBaseComponent implements OnInit {

  @Input()
  data: number[];

  // 牙齿类型 true恒牙 false乳牙
  toothState: boolean = true;

  // 选择的牙齿集合
  teeth: number[];

  // 是否全选
  isAll: boolean = true;

  // 上颚全选
  isUp: boolean = true;

  // 下颚全选
  isDown: boolean = true;

  // 上颚 恒牙
  upPermanentTeeth: number[] = [11, 12, 13, 14, 15, 16, 17, 18, 21, 22, 23, 24, 25, 26, 27, 28];

  // 下颚 恒牙
  downPermanentTeeth: number[] = [31, 32, 33, 34, 35, 36, 37, 38, 41, 42, 43, 44, 45, 46, 47, 48];

  // 全口 恒牙
  allPermanentTeeth: number[] = [...this.upPermanentTeeth, ...this.downPermanentTeeth];

  // 上颚 乳牙
  upDeciduousTooth: number[] = [51, 52, 53, 54, 55, 61, 62, 63, 64, 65];

  // 下颚 乳牙
  downDeciduousTooth: number[] = [71, 72, 73, 74, 75, 81, 82, 83, 84, 85];

  // 全口 乳牙
  allDeciduousTooth: number[] = [...this.upDeciduousTooth, ...this.downDeciduousTooth];

  amount: number[];

  constructor() {
    super();
    this.teeth = [];
  }

  ngOnInit() {
    if (this.data && isArray(this.data)) {
      this.teeth = this.data;
      this.amount = [...this.data];
      this.upPermanentTeeth.forEach((v, i) => {
        if (!this.teeth.includes(v)) {
          this.isUp = false;
        } else {
          this.toothState = true;
        }
      });
      this.downPermanentTeeth.forEach((v, i) => {
        if (!this.teeth.includes(v)) {
          this.isDown = false;
        } else {
          this.toothState = true;
        }
      });
      this.upDeciduousTooth.forEach((v, i) => {
        if (!this.teeth.includes(v)) {
          this.isUp = false;
        } else {
          this.toothState = false;
        }
      });
      this.downDeciduousTooth.forEach((v, i) => {
        if (!this.teeth.includes(v)) {
          this.isDown = false;
        } else {
          this.toothState = false;
        }
      });
    } else {
      this.isAll = false;
      this.isUp = false;
      this.isDown = false;
    }
    if (this.isDown && this.isUp) {
      this.isAll = true;
    } else {
      this.isAll = false;
    }
  }

  selectToothState(flag: boolean) {
    if (this.toothState == flag) {
      return;
    }
    this.toothState = flag;
    this.teeth = [];
    this.isAll = false;
    this.isUp = false;
    this.isDown = false;
  }

  selectTooth(id: number) {
    if (this.teeth.includes(id)) {
      let index = this.teeth.findIndex((value) => value == id);
      this.teeth.splice(index, 1);
      if (this.upPermanentTeeth.includes(id) || this.upDeciduousTooth.includes(id)) {
        this.isUp = false;
      }
      if (this.downPermanentTeeth.includes(id) || this.downDeciduousTooth.includes(id)) {
        this.isDown = false;
      }
    } else {
      this.teeth = [...this.teeth, id];
    }
    if ((this.teeth.indexOf(11) > -1 && this.teeth.indexOf(12) > -1 && this.teeth.indexOf(13) > -1 && this.teeth.indexOf(14) > -1 &&
      this.teeth.indexOf(15) > -1 && this.teeth.indexOf(16) > -1 && this.teeth.indexOf(17) > -1 && this.teeth.indexOf(18) > -1 &&
      this.teeth.indexOf(21) > -1 && this.teeth.indexOf(22) > -1 &&
      this.teeth.indexOf(23) > -1 && this.teeth.indexOf(24) > -1 && this.teeth.indexOf(25) > -1 && this.teeth.indexOf(26) > -1 &&
      this.teeth.indexOf(27) > -1 && this.teeth.indexOf(28) > -1) || (this.teeth.indexOf(51) > -1 && this.teeth.indexOf(52) > -1 &&
      this.teeth.indexOf(53) > -1 && this.teeth.indexOf(54) > -1 &&
      this.teeth.indexOf(55) > -1 && this.teeth.indexOf(61) > -1 && this.teeth.indexOf(62) > -1 && this.teeth.indexOf(63) > -1 &&
      this.teeth.indexOf(64) > -1 && this.teeth.indexOf(65) > -1)) {
      this.isUp = true;
    }
    if (this.teeth.indexOf(31) > -1 && this.teeth.indexOf(32) > -1 && this.teeth.indexOf(33) > -1 && this.teeth.indexOf(34) > -1 &&
      this.teeth.indexOf(35) > -1 && this.teeth.indexOf(36) > -1 && this.teeth.indexOf(37) > -1 && this.teeth.indexOf(38) > -1 &&
      this.teeth.indexOf(41) > -1 && this.teeth.indexOf(42) > -1 &&
      this.teeth.indexOf(43) > -1 && this.teeth.indexOf(44) > -1 && this.teeth.indexOf(45) > -1 && this.teeth.indexOf(46) > -1 &&
      this.teeth.indexOf(47) > -1 && this.teeth.indexOf(48) > -1 || (this.teeth.indexOf(71) > -1 && this.teeth.indexOf(72) > -1 &&
      this.teeth.indexOf(73) > -1 && this.teeth.indexOf(74) > -1 &&
      this.teeth.indexOf(75) > -1 && this.teeth.indexOf(81) > -1 && this.teeth.indexOf(82) > -1 && this.teeth.indexOf(83) > -1 &&
      this.teeth.indexOf(84) > -1 && this.teeth.indexOf(85) > -1)) {
      this.isDown = true;
    }
    if (this.isUp && this.isDown) {
      this.isAll = true;
    } else {
      this.isAll = false;
    }

    console.log(this.teeth);
  }

  /**
   * 全选
   */
  selectAll() {
    if (this.toothState) {
      this.setTooth(this.allPermanentTeeth);
    } else {
      this.setTooth(this.allDeciduousTooth);
    }
  }

  setTooth(arr: number[]) {
    this.teeth = [];
    if (!this.isAll) {
      this.teeth = [...this.teeth, ...arr];
      this.isAll = true;
      this.isUp = true;
      this.isDown = true;
    } else {
      this.isAll = false;
      this.isUp = false;
      this.isDown = false;
    }
  }

  /**
   * 选择上颚
   */
  selectUp() {
    if (this.isUp && this.isAll && this.isDown) {
      if (this.toothState) {
        this.teeth = this.downPermanentTeeth;
      } else {
        this.teeth = this.downDeciduousTooth
      }
      this.isUp = false;
      this.isAll = false;
    } else if (this.isUp) {
      if (this.toothState) {
        this.upPermanentTeeth.forEach((item) => {
          this.teeth = this.teeth.filter((v) => v != item);
        })
      } else {
        this.upDeciduousTooth.forEach((item) => {
          this.teeth = this.teeth.filter((v) => v != item);
        })
      }
      this.isUp = false;
      this.isAll = false;
    } else {
      if (this.toothState) {
        this.teeth = Array.from(new Set([...this.teeth, ...this.upPermanentTeeth]));
      } else {
        this.teeth = Array.from(new Set([...this.teeth, ...this.upDeciduousTooth]));
      }
      this.isUp = true;
      if (this.isDown) {
        this.isAll = true;
      }
    }
  }

  /**
   * 选择下颚
   */
  selectDown() {
    if (this.isDown && this.isAll && this.isUp) {
      if (this.toothState) {
        this.teeth = this.upPermanentTeeth;
      } else {
        this.teeth = this.upDeciduousTooth;
      }
      this.isDown = false;
      this.isAll = false;
    } else if (this.isDown) {
      if (this.toothState) {
        this.downPermanentTeeth.forEach((item) => {
          this.teeth = this.teeth.filter((v) => v != item);
        })
      } else {
        this.downDeciduousTooth.forEach((item) => {
          this.teeth = this.teeth.filter((v) => v != item);
        })
      }
      this.isDown = false;
      this.isAll = false;
    } else {
      if (this.toothState) {
        this.teeth = Array.from(new Set([...this.teeth, ...this.downPermanentTeeth]));
      } else {
        this.teeth = Array.from(new Set([...this.teeth, ...this.downDeciduousTooth]));
      }
      this.isDown = true;
      if (this.isUp) {
        this.isAll = true;
      }
    }
  }


  ok() {
    if (this.teeth.length == 0) {
      alert('请选择牙位');
    } else {
      this.sendMessage({teeth: this.teeth});
      this.onClose.emit();
    }
  }


  close() {
    this.teeth = this.amount;
    this.sendMessage({teeth: this.teeth});
    this.onClose.emit();
  }

}
