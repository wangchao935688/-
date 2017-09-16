import {Component, OnInit, AfterViewInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {PatientService} from '../../../../core/service/patient.service';
import {ApplicationService} from '../../../../core/service/application.service';
import {CustomizeFormValidateService, ICustomizeFormValidate} from '../../../../core/service/customize-form.service';
import {WorkerService} from '../../../../core/service/worker.service';
import {HospitalService} from '../../../../core/service/hospital.service';
import {SystemService} from '../../../../core/service/system.service';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {GoodsService} from '../../../../core/service/goods.service';
import {
  AddGoodsRequest,
  AddGoodsResponse
} from '../../../../core/messages/goods-request-response';

@Component({
  selector: 'app-create-edit-goods',
  templateUrl: './create-edit-goods.component.html',
  styleUrls: ['./create-edit-goods.component.scss']
})
export class CreateEditGoodsComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit, ICustomizeFormValidate  {
  /*
   * TODO 设置表单验证参数
   * */
  formName: string;
  formGroup: FormGroup;
  formModel: any;
  formErrors: {[p: string]: string};
  formPlaceholder: {[p: string]: string};
  validationMessages: {[p: string]: {[p: string]: string}};


  //设置参数
  addGoodsRequest:AddGoodsRequest=new AddGoodsRequest();  //新增物品请求参数
  addGoodsResponse:AddGoodsResponse=new AddGoodsResponse();//新增物品响应

  MgtSwitch:boolean=true;  //管理启用
  BatchSwitch:boolean=true;//保质期/批号
  isProcessing= false; // 表单提交是否在进行中

  scrollbarOptions: any = null;
  dataLoading = 'hide';


  constructor(private application: ApplicationService,
              private form: CustomizeFormValidateService,
              private WorkerService: WorkerService,
              private HospitalService: HospitalService,
              private SystemService: SystemService,
              private goodsService: GoodsService,
  ) {
    super();
  }

  ngOnInit() {
    let self = this;
    this.scrollbarOptions = {
      axis: 'y', theme: 'minimal-dark', callbacks: {
        whileScrolling: function (evt) {
          // self.onScroll({top: this.mcs.top});
        }
      }
    };
  }


  ngAfterViewInit() {
    this.dataLoading = 'show';
  }

  /**
   * 新增物品
   */
  addGoods(){
    this.goodsService.addGoods(this.addGoodsRequest).subscribe(val=>{

    },error=>{

    });
  }

  //表单验证--input离焦
  onInputElementBlur(name) {
    const input = this.formGroup.get(name);
    if (input) {
      input.markAsTouched(true);
      input.markAsDirty(true);
      input.patchValue(this.formModel[name] || '');
    }
  }

  //开关按钮
  selectState(i:number,flag: boolean) {
    if(i==1){
      if (this.MgtSwitch == flag) {
        return;
      }
      this.MgtSwitch = flag;
    }
    else{
      if (this.BatchSwitch == flag) {
        return;
      }
      this.BatchSwitch = flag;
    }
  }

  /*
   * TODO 提交新增物品
   * */
  save(){
    console.log('save保存退出');
    this.close();
    // console.log(this.formModel);
    /*this.PatientService.createPatient(this.formModel).subscribe(val => {
      /!*
       * TODO 关闭页面
       * TODO 提示成功或失败
       * TODO 关闭弹框，并发送消息
       * *!/
      this.close(val['PatientID']);
      console.log(val['PatientID']);
    });*/
  }

  /*
   * TODO 取消患者
   * */
  cancel(){
    /*
     * TODO 关闭弹框
     * */
    console.log('cancel取消退出');
    this.close();
  }




}
