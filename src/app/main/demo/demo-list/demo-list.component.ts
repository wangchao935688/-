import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import {DemoNoticeComponent} from '../popup/demo-notice/demo-notice.component';
import {CustomizeSliderService, ICustomizeSlider} from '../../../core/service/customize-slider.service';
import {ApplicationService} from '../../../core/service/application.service';
import {PopupWindowSize} from '../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {InputIcon} from '../../../shared/component/qiezzi-icon-input/icon-input.component';
import {
  QiezziInputPopComponent,
  InputPopData
} from '../../../shared/component/qiezzi-input-pop/qiezzi-input-pop.component';
import {InputForm} from '../../../core/forms/input.form';


@Component({
  selector: 'app-demo-list',
  templateUrl: './demo-list.component.html',
  styleUrls: ['./demo-list.component.css']
})
export class DemoListComponent implements OnInit, ICustomizeSlider {
  hideRightDetailHandler: EventListener;
  rightSliderShow: boolean;
  displayStatus: string;

  isBorder: boolean;
  scrollbarOptions: any = null;

  currWidth: string;

  inputIconList: InputIcon[];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private slider: CustomizeSliderService,
              private application: ApplicationService) {
  }

  ngOnInit() {
    this.inputIconList = [{icon: '#xe6a2', color: '#ff0000'}, {icon: 'contacts', color: '#ff0000'}];

    let self = this;
    this.scrollbarOptions = {
      axis: 'y', theme: 'minimal-dark', callbacks: {
        whileScrolling: function (evt) {
          self.isBorder = this.mcs.top < -55;
        }
      }
    };
  }
  clickListIndex(index){
console.log(index)
  }

  onInputIconClick(index) {
    this.inputIconList[index].color = '#ff6699';
    this.inputIconList = Array.from(this.inputIconList);
  }

  onClose(val: any): void {
  }

  onBack(val: any): void {
  }

  onControl(val: number): void {
  }

  onClick(evt: Event) {
    this.router.navigate(['detail', '9586735452373456'], {relativeTo: this.route});
    this.slider.show(this, evt);
  }

  onPopupWindow(event) {
    this.application.frontLayer.openPopupWindow(DemoNoticeComponent, '弹窗测试', PopupWindowSize.LARGE, 480, null, false).subscribe(t => {
      console.log(t);
    });
  }

  toggleSelected = 0; // 默认选中的
  // 切换事件
  toggleClick(index) {
    this.toggleSelected = index;
  }

  onClickCheckBox() {
    console.log('fhygbfvd');
  }

  clickPopupConfirm(evt) {
    // this.openChild();
    this.application.frontLayer.openConfirmDialog('我是测试信息，确认删除吗').subscribe(t => {
      if (t != null && t) {
        console.log('删除');
      } else if (t != null && !t) {
        console.log('不删除');
      } else {
        console.log('关闭');
      }
      // this.closeChild();
    });
  }

  /**
   * 公用单个输入框
   * @param e
   */
  demo_input_pop(e) {
  let data = new InputPopData();
  data.inputName = '测试';
  data.formName = 'InputPop';
  data.serverFormName='Interview';
  data.required = true;
  data.isTextarea =false;
  data.isShowInputName=false;
  data.formModel=new InputForm();

  data.okHandler = (formModel: InputForm) => {
    setTimeout(()=>{
      data.closeHandler(true);
      this.application.main.openPromptMessage('添加成功！');
    },5000);
    console.log(JSON.stringify(formModel));
  };
    this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, '单输入框测试', PopupWindowSize.SMALL,215, data, false
    ).subscribe(t => {
      console.log(t);
    });
  }
}
