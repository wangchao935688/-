import { Component , OnInit, AfterViewInit, ElementRef, } from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';
import {GetPatientListRequest} from '../../../../core/messages/patient-request-response';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import {GlobalState} from '../../../../global.state';
import {PatientService} from '../../../../core/service/patient.service';
import {HospitalService} from '../../../../core/service/hospital.service';
@Component({
  selector: 'app-create-drug-charge-item',
  templateUrl: './create-drug-charge-item.component.html',
  styleUrls: ['./create-drug-charge-item.component.scss']
})
export class CreateDrugChargeItemComponent extends PopupWindowBaseComponent implements OnInit , AfterViewInit{
// 参数声明
  displayStatus: string;
  toggle: boolean = false;
  requestData: GetPatientListRequest; // 患者列表请求数据

  // 全选复选框
  item= { Id: 1};
  IsChooseAll= false; // 全选复选框
  goodsCheckedList= [];
  selectIndex: number;
  // 左侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
c
  // 右侧顶部边框设置隐藏，监听鼠标滚动时间，top小于-55px时，显示
  scrollbarOptionsLeft = {// 左侧滚动条设置
    axis: 'y', theme: 'minimal-dark',
  };
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        // GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  // 名称列表
  nameList= [
    {
      value: 'yanyanyanyanyanyan',
      label: '请选择'
    },
    {
      value: 'yanyanyanyanyanyan',
      label: 'djsflkdsjfd'
    },
    {
      value: 'jintianshijintia',
      label: 'djsflkdsjfdjsflkdsjfdjsflkdsjfdjsflkdsjf'
    }
  ];
  constructor(private router: Router,
              private route: ActivatedRoute,
              private el: ElementRef,
              private patientService: PatientService,
              private application: ApplicationService,
              private slider: CustomizeSliderService,
              private HospitalService: HospitalService,
              private mScrollbarService: MalihuScrollbarService,
              private globalState: GlobalState) { super(); }

  ngOnInit() {
  }
  ngAfterViewInit(): void {
    this.application.workModule = this;
    this.application.workBoard = this.el.nativeElement;
  }
  /*TODO 级联菜单背景*/
  cascade () {
    this.toggle = !this.toggle;
  }
  /*
   * TODO 全选复选框
   * */
  selecctAllCheckBox(bool) {
    this.IsChooseAll = bool;
    this.goodsCheckedList = [];
    if (bool) {
      this.goodsCheckedList.push(this.item.Id);
      /*this.patientList.Items.forEach(value => {
       });*/
    }
  }
  selectBox(id) {
    if ( this.goodsCheckedList.indexOf(id) > -1) {
      this.goodsCheckedList.splice(this.goodsCheckedList.indexOf(id), 1);
    }else {
      this.goodsCheckedList.push(id);
    }
    console.log(this.goodsCheckedList);
  }


  clickFeeItem() { }
  cancel() {
    this.close();
  }
}
