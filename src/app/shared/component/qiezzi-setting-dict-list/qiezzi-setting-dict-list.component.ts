import {Component, OnInit, Output, Input} from '@angular/core';
import * as DictRequestResponse from '../../../core/messages/dict-request-response';
import {ApplicationService} from "../../../core/service/application.service";
import {HospitalService} from "../../../core/service/hospital.service";
import {InputPopData, QiezziInputPopComponent} from "../qiezzi-input-pop/qiezzi-input-pop.component";
import {InputForm} from "../../../core/forms/input.form";
import {DictSimpleModel} from "../../../core/messages/model/dict-simple.model";
import {PopupWindowSize} from "../qiezzi-popup-window/popup-window/popup-window.component";

@Component({
  selector: 'app-qiezzi-setting-dict-list',
  templateUrl: './qiezzi-setting-dict-list.component.html',
  styleUrls: ['./qiezzi-setting-dict-list.component.scss']
})
export class QiezziSettingDictListComponent implements OnInit {
  private _sheetCode: string;
  /**
   * 字典的code
   */
  @Input()
  set sheetCode(sheetCode: string) {
    setTimeout(() => {
      this._sheetCode = sheetCode;
      this.loadList();
    }, 0)
  }

  /**
   * 排序方式
   * @type {number}
   */
  @Input()
sort:number=1
  /**
   * 默认输入框的名称
   * @type {string}
   */
  @Input()
  inputName: string = '名称';
  /**
   * 服务端验证的表单名称
   */
  @Input()
  serverFormName: string;
  /**
   * 是否是多行文本
   * @type {boolean}
   */
  @Input()
  isTextarea: boolean = false;
  /**
   * sheet名称
   */
  @Input()
  sheetName: string;

  // 是否显示没有数据
  showEmpty = false;
  // 分页显示
  showOrHide: any = {};

// 数据加载中状态
  dataLoading: string;
//添加名称
  get addSheetName(): string {
    return '添加' + this.sheetName;
  }

  //修改名称
  get editSheetName(): string {
    return '修改' + this.addSheetName;
  }

  response: DictRequestResponse.DictDetailListResponse = new DictRequestResponse.DictDetailListResponse();
  request: DictRequestResponse.DictDetailListRequest = new DictRequestResponse.DictDetailListRequest();

  constructor(private application: ApplicationService,
              private hospitalService: HospitalService) {
  }

  ngOnInit() {
    this.loadList();
  }

  /**
   * 新增
   */
  add() {
    let data = new InputPopData();
    data.inputName = this.inputName;
    data.formName = 'InputPop';
    data.serverFormName = this.serverFormName;
    data.required = true;
    data.isTextarea = false;
    data.isShowInputName = true;
    data.formModel = new InputForm();
    data.okHandler = (formModel: InputForm) => {
      let saveRequest = new DictRequestResponse.SaveDictDetailRequest();
      saveRequest.DictDetailName = formModel.field;
      saveRequest.DictSheetCode = this._sheetCode;
      this.hospitalService.saveDictDetail(saveRequest).subscribe(t => {
          data.closeHandler(true);
          this.application.main.openPromptMessage('添加成功');
          this.loadList();
        },
        error => {
          this.application.main.openErrorMessage(error.errorMessage);
        });
    };
    this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, this.editSheetName, PopupWindowSize.SMALL, this.isTextarea ? 300 : 215, data, false
    ).subscribe(t => {
      console.log(t);
    });
  }

  /**
   * 上移
   */
  up(key: string) {
    this.hospitalService.reorder(key, this._sheetCode, 1, this.sort).subscribe(t => {
        this.application.main.openPromptMessage('操作成功');
      },
      error => {
        this.application.main.openErrorMessage(error.errorMessage);
      });
    this.loadList();
  }

  /**
   * 下移
   */
  down(key: string) {
    this.hospitalService.reorder(key, this._sheetCode, -1, this.sort).subscribe(t => {
        this.application.main.openPromptMessage('操作成功');
      },
      error => {
        this.application.main.openErrorMessage(error.errorMessage);
      });
    this.loadList();
  }

  /**
   * 修改
   */
  update(item: DictSimpleModel) {
    let data = new InputPopData();
    data.inputName = '名称';
    data.formName = 'ProcessCompleted';
    data.serverFormName = 'ProcessCompleted';
    data.required = true;
    data.isTextarea = false;
    data.isShowInputName = true;
    data.formModel = new InputForm(item.Name);
    data.okHandler = (formModel: InputForm) => {
      let saveRequest = new DictRequestResponse.SaveDictDetailRequest();
      saveRequest.Id = item.Id;
      saveRequest.DictSheetCode = this._sheetCode;
      saveRequest.DictDetailName = formModel.field;
      this.hospitalService.saveDictDetail(saveRequest).subscribe(t => {
          data.closeHandler(true);
          this.application.main.openPromptMessage('修改成功');
          this.loadList();
        },
        error => {
          this.application.main.openErrorMessage(error.errorMessage);
        });

    };
    this.application.frontLayer.openPopupWindow(QiezziInputPopComponent, this.editSheetName, PopupWindowSize.SMALL, this.isTextarea ? 300 : 215, data, false
    ).subscribe(t => {
      console.log(t);
    });
  }

  /**
   * 删除
   */
  delete(id: string) {
    this.application.frontLayer.openConfirmDialog('确认删除?').subscribe(t => {
      if (t === true) {
        this.hospitalService.delDictDetail(id).subscribe(t => {
            this.application.main.openPromptMessage('删除成功');
            this.loadList();
          },
          error => {
            this.application.main.openErrorMessage(error.errorMessage);
          });
      }
      else if (t === false) {
        console.log('取消删除');
      }
      else {
        console.log('主动关闭');
      }
    });
  }

  /**
   * 加载列表
   */
  private loadList() {
    if (!this._sheetCode) {
      return;
    }
    this.request.SheetCode = this._sheetCode;
    this.dataLoading = 'show';
    this.hospitalService.getDictDetailList(this.request).subscribe(t => {
      this.dataLoading = 'hide';
      this.response = t;
      if (this.response.Items && this.response.Items.length > 0) {
        this.showEmpty = false;
      }
      else {
        this.showEmpty = true;
      }
    });
  }
}
