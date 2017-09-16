import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApplicationService} from '../../../../core/service/application.service';
import {CreateOptionComponent} from '../create-option/create-option.component';
import {PopupWindowSize} from '../../../../shared/component/qiezzi-popup-window/popup-window/popup-window.component';
import {DictDetailListRequest} from '../../../../core/messages/dict-request-response';
import {HospitalService} from '../../../../core/service/hospital.service';
import {DictSimpleModel} from '../../../../core/messages/model/dict-simple.model';
import {CustomizeSliderService} from '../../../../core/service/customize-slider.service';

@Component({
  selector: 'app-patient-options',
  templateUrl: './patient-options.component.html',
  styleUrls: ['./patient-options.component.scss']
})
export class PatientOptionsComponent  implements OnInit {
  /*
  * TODO 参数类型设置
  * */
  DictDetailListRequest: DictDetailListRequest; // 字典数据类型
  DictList: string[]; // 定义字典数组，用于上下移提交
  DictData: DictSimpleModel;
  isBorder= true; // 滚动条上边框
  mainShowLoading = 'hide'; // 设置加载框
  scrollbarOptions: any = null;
  moduleName= '患者管理';
  /*
  * TODO 设置Tab标签
  * TODO 修改数据类型
  * */
  contentList: any;
  buttonName= '新增来源';
  index = 0; // 默认设置0
  tabData = {
    data: ['患者来源', '亲友关系', '会员卡类型'],
    defaultIndex: 0,
    changeTab: (index) => {
      console.log(index.index);
      this.index = index.index;
      this.searchContentList();
    }
  };
  // 结束Tab标签
  constructor(private router: Router,
              private route: ActivatedRoute,
              private application: ApplicationService,
              private slider: CustomizeSliderService,
              private HospitalService: HospitalService) {}

  ngOnInit() {
    this.searchContentList();
    // 滚动条初始化
    let self = this;
    this.scrollbarOptions = {
      axis: 'y', theme: 'minimal-dark', callbacks: {
        whileScrolling: function (evt) {
          self.isBorder = this.mcs.top < -55;
        }
      }
    };
  }
  /**
   * TODO   面包屑导航，跳转到列表页
   */
  jump() {
    this.router.navigate(['../list']);
  }
  /*
  * TODO 获取字典列表,患者来源
  * */
  searchContentList() {
    // this.mainShowLoading = 'show';
    this.contentList = []; // 清空列表，防止叠加
    /*
    * TODO 访问服务器，获取列表
    * */
    this.DictDetailListRequest = { SheetCode: 'PatientsWith'}; // 请求患者来源
    this.HospitalService.getDictDetailList(this.DictDetailListRequest).subscribe(val => {
      this.mainShowLoading = 'hide';
      if (this.index === 0) {
        this.buttonName = '新增来源';
        if (val.Items && val.Items.length > 0) {
          val.Items.forEach((value, key) => {
            this.contentList.push({Value: value.Name, Key: key});
          });
        }
      }
    });
    /*this.contentList = [
      {Value: '家人', Key: '1'},
      {Value: '亲戚', Key: '2'},
      {Value: '同事', Key: '3'},
      {Value: '朋友', Key: '4'},
      {Value: '介绍人', Key: '5'},
    ];*/
    // TODO 后台未定义 亲友关系和会员类型 ，暂时用假数据
    // setTimeout(() => {
      if (this.index === 1) {
        this.buttonName = '新增亲友关系';
        this.contentList = [
          {Value: '家人', Key: '1'},
          {Value: '亲戚', Key: '2'},
          {Value: '同事', Key: '3'},
          {Value: '朋友', Key: '4'},
          {Value: '介绍人', Key: '5'},
        ];
      }else if (this.index === 2) {
        this.buttonName = '新增会员类型';
        this.contentList = [
          {Value: '铜卡会员', Key: '1'},
          {Value: '金卡会员', Key: '2'},
          {Value: '银卡会员', Key: '3'},
        ];
      }
    // }, 2000);
  }
  /*
   * TODO 添加
   * */
  add() {
    this.application.frontLayer.openPopupWindow(CreateOptionComponent, this.buttonName, PopupWindowSize.SMALL, 'auto', {index: this.index}, false).subscribe(t => {
      console.log(t);
      if (t && t != null && t.data != null) {
        this.application.main.openPromptMessage('添加成功！', 3000); // 提示删除成功
        this.searchContentList();
      }
    });
  }

  /*
   * TODO 修改字典
   * */
  update(id, value) {
    /*
     * TODO 定义字典的内容
     * */
    this.application.frontLayer.openPopupWindow(CreateOptionComponent, this.buttonName, PopupWindowSize.SMALL, 'auto', {id: id, value: value, index: this.index}, false).subscribe(t => {
      console.log(t);
      if (t && t != null && t.data != null) {
        this.application.main.openPromptMessage('修改成功！', 3000); // 提示删除成功
        this.searchContentList();
      }
    });
  }
  /*
   * TODO 删除
   * */
  delete(id: string) {
    this.application.frontLayer.openConfirmDialog('确定删除?').subscribe(t => {
      if (t != null && t) {
        this.HospitalService.delDictDetail(id).subscribe(val => {
          console.log(val);
          this.application.main.openPromptMessage('删除成功！', 3000); // 提示删除成功
          this.searchContentList();
        });
      } else if (t != null && !t) {
        console.log('取消');
      } else {
        console.log('关闭');
      }
    });
  }
  onControlClick(evt) {}
}
