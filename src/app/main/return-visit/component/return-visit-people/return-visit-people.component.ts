import {Component, Input, OnInit} from '@angular/core';
import {WorkerPeople} from '../../../../core/messages/worker-request-response';
import {WorkerService} from '../../../../core/service/worker.service';
import {GlobalState} from '../../../../global.state';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {FollewUpUserListResponse} from '../../../../core/messages/return-visit-request-response';
import {ReturnVisitService} from '../../../../core/service/return-visit.service';
import * as GlobalDic from '../../../../core/global_dic';
import {ApplicationService} from "../../../../core/service/application.service";
@Component({
  selector: 'return-visit-people',
  templateUrl: 'return-visit-people.component.html',
  styleUrls: ['return-visit-people.component.scss']
})
export class ReturnVisitPeopleComponent extends PopupWindowBaseComponent implements OnInit {
  @Input()
    data: any;
  onParentClose: Function;
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  IsChooseAll: boolean; // 全选复选框
  checkBoxList = []; // 所有多选框选中状态
  patientCheckedList= [];
  /*
  * TODO 类型
  * */
  workerType = GlobalDic.workerType;
  workers: WorkerPeople[];
  /*滑过*/
  Mouse: false;
  /*选择回访人*/
  responseData: FollewUpUserListResponse[];
  id: string;
  requestData: any;
  selectWorker: string[];
  KeyWords: string;
  dataLoading: string;

  constructor(private workerService: WorkerService,
              private globalState: GlobalState,
              private returnVisit: ReturnVisitService,
              private application: ApplicationService) {
    super();
  }

  ngOnInit() {
    this.workerService.getGetList({workerTypeArray: [0, 1]}).subscribe(val => this.workers = val);
    this.getFollewUpUserList();
  }
/*
* TODO 请求回访人列表
* */
  getFollewUpUserList() {
    this.returnVisit.getFollewUpUserList(null).subscribe(val => {
      console.log(val);
      this.responseData = val;
      if (this.data.length > 0) {
        this.responseData.forEach( value => {
          let canAdd = false;
          this.data.forEach(item => {
            if (value.WorkerId === item.value) {
              canAdd = true;
            }
          });
          this.checkBoxList.push(canAdd);
        } );
        this.checkAllChoose();
        this.patientCheckedList = this.data;
      }else {
        this.responseData.forEach( value => {
          this.checkBoxList.push(false);
        } );
      }
    }, error => {
      this.application.main.openErrorMessage(error.errorMessage);
    });
  }
  setDefault(id, isDefault) {
    isDefault = !isDefault;
    this.returnVisit.setDefaults({WorkerID: id}).subscribe(val => {
      console.log(val);
      this.getFollewUpUserList();
    }, error => {
      console.log(error);
    });
    this.returnVisit.getFollewUpUserList(null).subscribe(val => {
      console.log(val);
      this.responseData = val;
    });
  }
  /*
   * TODO 全选复选框
   * */
  selecctAllCheckBox(bool) {
    this.IsChooseAll = bool;
    this.patientCheckedList = [];
    this.checkBoxList = [];
    if (bool) {
      this.responseData.forEach(value => {
        this.patientCheckedList.push({title: value.WorkerName, value: value.WorkerId});
        this.checkBoxList.push(true);
      });
    }else {
      this.patientCheckedList.forEach(value => {
        this.checkBoxList.push(false);
      });
    }
  }
  selectBox(name, id, index) {
    let canAdd = true;
    this.patientCheckedList.forEach((val, key) => {
      if (val.value === id) {
        this.patientCheckedList.splice(key, 1);
        this.checkBoxList[index] = false;
        canAdd = false;
      }
    });
    if (canAdd) {
      this.patientCheckedList.push({title: name, value: id});
      this.checkBoxList[index] = true;
    }
    this.checkAllChoose();
  }
  /*
  * TODO 检查是否全选
  * */
  checkAllChoose () {
    this.IsChooseAll = true;
    this.checkBoxList.forEach(value => {
      if (!value) {
        this.IsChooseAll = false;
      }
    });
  }
  /*
  * TODO 保存
  * */
  accountTransfer() {
    this.close(this.patientCheckedList);
  };

  /*取消*/
  cancel() {
    this.close();
  }

  // 搜索
  searchPeople() {

  }
}
