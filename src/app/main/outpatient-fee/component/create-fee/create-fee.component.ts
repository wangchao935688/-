import { Component, OnInit , Input, ViewChild, EventEmitter, Output, AfterViewInit} from '@angular/core';
import {PopupWindowBaseComponent} from '../../../../shared/component/qiezzi-popup-window/popup-window-base/popup-window-base';
import {PatientService} from '../../../../core/service/patient.service';
import {WorkerService} from '../../../../core/service/worker.service';
import * as PatientRequestResponse from '../../../../core/messages/patient-request-response';
import * as WorkerRequestResponse from '../../../../core/messages/worker-request-response';
import * as BillRequestResponse from '../../../../core/messages/bill-request-response';
import {WorkerType} from '../../../../core/enums/worker_type';
import {CreateBillForm} from '../../../../core/forms/charge/create-bill-form';
import {WorkerSimple} from '../../../../core/messages/model/worker_simple';
import {GeneralService} from '../../../../core/service/general.service';
import {UserService} from '../../../../core/service/user.service';
import {WorkerInfoModel} from '../../../../core/messages/user-request-response';
import * as ChargeItemRequestResponse from '../../../../core/messages/chargeitem-request-response';
import {ChargeService} from '../../../../core/service/charge.service';
import {BillFormItem} from '../../../../core/forms/charge/bill-form-item';
import {StockService} from '../../../../core/service/stock.service';
import {GlobalSubscriber} from '../../../../core/uitls/global-subscriber.service';
import * as EventConstants from '../../../../core/constants/global-subscriber-events';
import {InputIcon} from '../../../../shared/component/qiezzi-icon-input/icon-input.component';
import {DoubleDate} from '../../../../shared/component/qiezzi-select-date-slot/qiezzi-select-date-slot.component';
@Component({
  selector: 'app-create-fee',
  templateUrl: './create-fee.component.html',
  styleUrls: ['./create-fee.component.scss']
})
export class CreateFeeComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {
  // 从父窗口接收的数据
  @Input()
  data: any;
  @Input()
  scrollbarOptions: MCustomScrollbar.CustomScrollbarOptions;
  Indexs: number;
// 表单
  billForm: CreateBillForm = new CreateBillForm();
  isShow = false;
  isShows = false;
  isShowH = false;
  isShowHs = false;
  inputIconList: InputIcon[];
  @Input()
  options: any = {
    leftOptions: {view: 'days', minView: 'days'}
  };
  @Output()
  onSelectLeft = new EventEmitter();
  @Input()
  defaultDate: DoubleDate = {
    leftDate: '',
    rightDate: ''
  };
  scrollbarOptionslLeft = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  scrollbarOptionsRights = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };
  scrollbarOptionsRight = {// 右侧滚动条设置
    axis: 'y', theme: 'minimal-dark', callbacks: {
      whileScrolling: function () {
        GlobalSubscriber.fire(EventConstants.SCROLL_TOP_LINE, {top: this.mcs.top});
      }
    }
  };

  // 护士列表
  nurseList: any;
// 医生列表
  doctorList= [
    {
      value: 'yan',
      label: 'djsflkdsjf'
    }
    ];

  toggle= false;
  toggles= false;
  fileToggle = false;
  // 当前登录人
  currentWorker: WorkerInfoModel;

  // 当前选中收费方式tab
  selectChargeTab= 0;

  // 选择明细收费方式
  selectChargeDetailTab = 0;

  // 明细收费keyword
  chargeDetailKeyword: string;

  // 所有的收费项目
  getAllResponse: ChargeItemRequestResponse.GetAllResponse = new ChargeItemRequestResponse.GetAllResponse();

  // 简略收费项目
  summaryChargeTypeList: ChargeItemRequestResponse.ChargeItemTypeModel[];

  // 所编辑的收费单
  editCharge: BillRequestResponse.DetailsResponse;

  // 是否编辑
  isEdit = false;

  // 是否欠款
  isArrear = false;

  // 是否加载简略收费
  isLoadSummary = false;

  // input是否选中
  isSelect = false;
chooseList = [false, false, false, false];
  // 搜索患者
  sp = '搜索';
  patientList = [];
  ctrlShow: number;

  splist(e) {
    let srcElement = e.srcElement || e.target;
    let spr = new PatientRequestResponse.SearchPatientRequest();
    spr.KeyWords = srcElement.value;
    this.patientService.searchPatient(spr).subscribe(t => {
      this.patientList = t.Items;
    });
  }
  constructor(private patientService: PatientService, private  workerService: WorkerService, private generalService: GeneralService, private userService: UserService,
              private chargeService: ChargeService, private stockService: StockService) {
    super();
  }
  ngOnInit() {
    this.nurseList = [
      {
        value: 'yan56',
        label: 'djsflkdsj565f'
      }
    ];

    // console.log(isUndefined(this.isLoadSummary));
    // debugger;
    this.currentWorker = this.userService.getCurrentWorkeInfo();
    console.log(this.currentWorker);

    this.billForm.doctorCode = this.currentWorker.WorkerCode;
    this.billForm.nurserCode = '';
    this.billForm.billTime = this.generalService.getServerTime();
    this.billForm.reducedPrice = 0.00;
    this.billForm.allDiscountRate = 100;

    this.billForm.summaryBillItemList = [];
    this.billForm.detailBillItemList = [];
    // 搜索患者

    // 医生下拉
    let getDoctorRequest = new WorkerRequestResponse.GetListRequest();
    getDoctorRequest.workerTypeArray = [WorkerType.doctor, WorkerType.nurse];
    this.workerService.getGetList(getDoctorRequest).subscribe(t => {
      t.forEach((value) => {
        if (value.WorkerType === WorkerType.doctor) {
          // this.doctorList.push(value);
        } else if (value.WorkerType === WorkerType.nurse) {
          // this.nurseList.push(value);
        }
      });
      // 默认
      /*let defaultNurse = new WorkerSimple();
      defaultNurse.WorkerCode = '';
      defaultNurse.WorkerName = '-----';
      this.nurseList.unshift(defaultNurse);*/

      // 设置默认医生
      if (Number(this.currentWorker.WorkerType) === WorkerType.doctor) {
        this.billForm.doctorCode = this.currentWorker.WorkerCode;
      } else {
        let caseReq = new PatientRequestResponse.CasePatientDetailsRequest();
        // caseReq.DoctorCode;
        // this.patientService.GetCasePatientSummary()
      }
    });


    if (this.data && this.data.feeId) {
      this.isEdit = true;
      this.chargeService.getBill(this.data.feeId).subscribe(p => {
        this.editCharge = p;
        this.billForm.patientId = this.editCharge.Bill.PatientID;
        this.billForm.billType = this.editCharge.Bill.BillType;
        this.isArrear = this.editCharge.Bill.BillStatus === 2 ? true : false;
        this.billForm.platformId = this.editCharge.Bill.PlatformId;
        this.billForm.nurserCode = this.editCharge.Bill.NurseCode;
        this.billForm.note = this.editCharge.Bill.Note;
        if (this.billForm.billType === 1) { // 明细
          this.editCharge.BillItem.forEach(item => {
            let detailItem = new BillFormItem();
            detailItem.chargeItemID = item.ChargeItemID;
            detailItem.number = item.Number;
            detailItem.chargeItemTypeID = item.ChargeItemTypeID;
            detailItem.discountRate = item.Discount;
            detailItem.reducedPrice = item.ReducedPrice;
            detailItem.connectToGoods = item.ConnectToGoods;
            detailItem.goodsId = item.GoodsId;
            detailItem.chargeItemName = item.ChargeItemName;
            detailItem.price = item.OriginalPrice;
            detailItem.billType = 1;
            detailItem.price = item.OriginalPrice;
            detailItem.displayReducedPrice = this.displayPrice(detailItem.reducedPrice);
            detailItem.displayDiscountRate = this.displayRate(detailItem.discountRate);

            this.billForm.detailBillItemList.push(detailItem);
          });
// 初始化库存信息
//           this.initEditChargeItemStockInfo();
        } else {
          this.editCharge.BillItem.forEach(item => {
            let chargeType = new BillFormItem();
            chargeType.chargeTypeName = item.ChargeItemTypeName;
            chargeType.chargeItemTypeID = item.ChargeItemTypeID;
            chargeType.reducedPrice = item.ReducedPrice;
            chargeType.displayReducedPrice = this.displayPrice(chargeType.reducedPrice);
            chargeType.billType = 0;
            this.billForm.summaryBillItemList.push(chargeType);
          });
        }
        this.generateBillInfo();

        if (this.billForm.billType == 1) {      // 加载所有明细收费项类型
          if (!this.isArrear) {
            this.loadChargeItem();
          }
        }
      });
    } else {
      this.billForm.billType = 1;
    }

    if (!this.isEdit) {
      this.loadChargeItem();
    }
  }
  // 账单日期
  onSelectDate(evt: any) {
    if (evt === 0) {
      this.onSelectLeft.emit();
    }
  }


  onInputIconClick(index) {
    this.inputIconList[index].color = '#ff6699';
    this.inputIconList = Array.from(this.inputIconList);
  }
  ngAfterViewInit(): void {

  }
  unfoldingClosure() {
    this.toggle = ! this.toggle;
    this.isShowH = !this.isShowH;
  }
  unfoldingClosures() {
    this.toggles = ! this.toggles;
    this.isShowHs = !this.isShowHs;
  }
  toggleShow(index) {
    if (this.ctrlShow === index) {
      this.chooseList[index] = !this.chooseList[index];
    }else {
        this.ctrlShow = index;
        this.chooseList[this.ctrlShow] = !this.chooseList[this.ctrlShow];
    }
  }
  /*fileToggles() {
    this.fileToggles2 = ! this.fileToggles2;
    this.fileToggle1 = !this.fileToggle1;
  }
  file() {
    this.fileToggles3 = ! this.fileToggles3;
    this.filtToggle2 = !this.filtToggle2;
  }
  fileter() {
    this.fileToggles4 = ! this.fileToggles4;
    this.filtToggle3 = !this.filtToggle3;
  }*/
  selectTab(ev) {
    // console.log(ev);
    if (ev.index === 0) {
      this.isShows = false;
    }else if (ev.index === 1) {
      this.isShows = true;
    }
  }
  selectTabIndex(evt) {
    // console.log(evt);
    if (evt.index === 0) {
      this.isShow = false;
    }else if (evt.index === 1) {
      this.isShow = true;
    }
  };
  clickItem(evt) {
    this.Indexs = evt;
  };
  // 获取明细收费项
  loadChargeItem() {
    this.chargeService.getAllChargeItem().subscribe(t => {
      this.getAllResponse = t;
    });
  }


  // 去收费按钮
  get goChargeText(): string{
    return (this.billForm.reducedPrice > 0 || this.billForm.originPrice === 0) ? '去收费' : '直接免费收费';
  }

  // 保存并打印
  get goChargePrintText(): string{
    return (this.billForm.reducedPrice > 0 || this.billForm.originPrice === 0) ? '保存并打印' : '直接免费并打印';
  }
  /**
   * 获取简率收费分类
   */
  private loadChargeItemType() {
    if (this.isLoadSummary) {
      return;
    }
    this.isLoadSummary = true;
    this.chargeService.getSimpleChargeItemType().subscribe(t => {
      this.isLoadSummary = false;
      this.summaryChargeTypeList = t;
      this.summaryChargeTypeList.forEach((value) => {
        let chargeType = new BillFormItem();
        chargeType.chargeTypeName = value.TypeName;
        chargeType.chargeItemTypeID = value.ID;
        chargeType.reducedPrice = 0.00;
        chargeType.displayReducedPrice = this.displayPrice(chargeType.reducedPrice);
        chargeType.billType = 0;
        this.billForm.summaryBillItemList.push(chargeType);
      });
    });
  }

  /**
   * 搜索收费项目
   */
  searchChargeItem() {

  }

  /**
   * 明细tab
   * @param index
   */
  chargeTypeTab(index) {
    if (this.selectChargeTab === index) {
      return false;
    }
    this.selectChargeTab = index;
    if (this.selectChargeTab === 1) {
      // 加载简略收费
      this.loadChargeItemType();
    }

    this.billForm.billType = index;
  }

  /**
   * 明细和组合切换
   * @param index
   */
  chargeDetailTab(index) {
    this.selectChargeDetailTab = index;
  }

  /**
   * 收费项目明细自动补全
   * @param e
   */
  autoChargeDetail(e) {

  }

  /**
   * 删除billformItem
   * @param item
   */
  deleteBillFormItem(formItem: BillFormItem) {
    let index = this.billForm.detailBillItemList.findIndex(t => t.chargeItemID == formItem.chargeItemID);
    if (typeof (index) === 'undefined') {
      return;
    }
    this.billForm.detailBillItemList.splice(index, 1);
    this.generateBillInfo();
  }

  /**
   * 选择selectBillItem
   * @param item
   */
  selectChargeItem(item: ChargeItemRequestResponse.ChargeItemModel) {
    console.log(item);
    this.addChargeItem(item);
    //检查库存
    this.judgeStock(item);
  }

  /**
   * 添加收费项
   * @param item
   */
  private addChargeItem(item: ChargeItemRequestResponse.ChargeItemModel) {
    let isExist = false;
    this.billForm.detailBillItemList.forEach((value) => {
      if (value.chargeItemID == item.ID) {
        // debugger;
        value.number += 1;
        isExist = true;
      }
    });

    if (!isExist) {
      let detailItem = new BillFormItem();
      detailItem.chargeItemID = item.ID;
      detailItem.number = 1;
      detailItem.chargeItemTypeID = item.ChargeItemTypeID;
      detailItem.discountRate = 100;
      detailItem.reducedPrice = item.Price;
      detailItem.connectToGoods = item.ConnectToGoods;
      detailItem.goodsId = item.GoodsId;
      detailItem.chargeItemName = item.Name;
      detailItem.price = item.Price;
      detailItem.billType = 1;
      detailItem.displayReducedPrice = '￥ ' + detailItem.reducedPrice;
      detailItem.displayDiscountRate = detailItem.discountRate + ' %';
      this.billForm.detailBillItemList.push(detailItem);

    }
    this.generateBillInfo();
  }

  /**
   * 检查库存
   * @param item
   */
  private judgeStock(item: ChargeItemRequestResponse.ChargeItemModel) {
    if (item.ConnectToGoods) {
      let formItem = this.billForm.detailBillItemList.find(t => t.chargeItemID == item.ID);
      if (formItem.isLoadingStockNumber) {
        return;
      }
      formItem.isLoadingStockNumber = true;
      if (typeof (formItem.stockNumber) === 'undefined') {
        this.stockService.getStockNumber(item.GoodsId).subscribe(t => {
          formItem.stockNumber = t;
          formItem.isLoadingStockNumber = false;
        });
      }
    }
  }

  /**
   * 选择组合收费项
   * @param item
   */
  selectChargeGroupItem(groupItem: ChargeItemRequestResponse.ChargeGroupAndItemModel) {
    groupItem.ItemList.forEach(itemMode => {
      for (let i = 0; i < itemMode.Number; i++) {
        this.selectChargeItem(itemMode.ChargeItem);
      }
    }, this);
  }

  /**
   * 隐藏展示收费项目
   * @param e
   */
  /*showChargeItem(e) {

    if (e.srcElement.nextElementSibling.style.display != 'block') {
      e.srcElement.nextElementSibling.style.display = 'block';
    }
    else {
      e.srcElement.nextElementSibling.style.display = 'none';
    let srcElement=e.srcElement||e.target;
    if (srcElement.nextElementSibling.style.display != 'block') {
      srcElement.nextElementSibling.style.display = 'block';
    }
    else {
      srcElement.nextElementSibling.style.display = 'none';
    }
  }*/

  /**
   * 创建收费单
   */
  createBill() {
    let addRequest = new BillRequestResponse.AddRequest();
    let addBillModel = new BillRequestResponse.AddBillModel();

    if (this.billForm.originPrice === 0) {
      console.log('请添加有效收费项目');
      return;
    }

    if (this.billForm.reducedPrice > 100000000) {
      console.log('账单金额必须小于1000万');
      return;
    }

    addBillModel.BillTime = this.billForm.billTime;
    addBillModel.PatientID = this.billForm.patientId;
    addBillModel.ReducedPrice = this.billForm.reducedPrice;
    addBillModel.Note = this.billForm.note;
    addBillModel.DoctorCode = this.billForm.doctorCode;
    addBillModel.NurseCode = this.billForm.nurserCode;
    addBillModel.BillType = this.billForm.billType;
    addBillModel.PlatformId = 1000;
    addRequest.BillModel = addBillModel;

    addRequest.BillItemModelList = this.getChargeItemList();

    this.chargeService.create(addRequest).subscribe(() => {
        super.close();
      },
      e => {
        console.log('异常了');
      });
  }

  /**
   * 修改收费单
   */
  editBill() {
    let request = new BillRequestResponse.EditRequest();
    let billModel = new BillRequestResponse.Bill_Update();
    billModel.ID = this.editCharge.Bill.ID;
    billModel.OriginalPrice = this.billForm.originPrice;
    billModel.ReducedPrice = this.billForm.reducedPrice;
    billModel.Note = this.billForm.note;
    billModel.Timestamp = this.editCharge.Bill.LastOperationTime;
    if (!this.editCharge.Bill.LastPayTime && this.editCharge.Bill.LastPayTime > this.editCharge.Bill.LastOperationTime) {
      billModel.Timestamp = this.editCharge.Bill.LastPayTime;
    }
    billModel.BillType = this.billForm.billType;
    billModel.PlatformId = this.billForm.platformId;

    request.BillModel = billModel;

    request.BillItemModelList = this.getChargeItemList();

    this.chargeService.edit(request).subscribe(() => {
        super.close();
      },
      e => {
        console.log('异常了');
      });

  }

  /**
   * 获取收费单收费明细
   * @returns {BillRequestResponse.BillItem_Edit[]}
   */
  private getChargeItemList(): BillRequestResponse.BillItem_Edit[]{
    let chargeItemList : BillRequestResponse.BillItem_Edit[] = [];
    if (this.billForm.billType === 1) {// 明细
      this.billForm.detailBillItemList.forEach((t) => {
        let item = new BillRequestResponse.BillItem_Edit();
        item.ChargeItemTypeID = t.chargeItemTypeID;
        item.ChargeItemID = t.chargeItemID;
        item.Number = t.number;
        item.ReducedPrice = t.reducedPrice;
        chargeItemList.push(item);
      });
    } else {
      this.billForm.summaryBillItemList.forEach((t) => {
        let item = new BillRequestResponse.BillItem_Edit();
        item.ChargeItemTypeID = t.chargeItemTypeID;
        item.ReducedPrice = t.reducedPrice;
        chargeItemList.push(item);
      });
    }
    return chargeItemList;
  }

  /**
   * 明细价格修改
   */
  changePrice(formItem: BillFormItem, e) {
    let srcElement = e.srcElement || e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    let tempValue = Number(value);
    if (isNaN(tempValue)) {
      srcElement.value = formItem.reducedPrice;
      return;
    }
    if (formItem.billType === 1) {
      if (tempValue > formItem.price) {
        tempValue = formItem.price;
      }
    } else {
      if (tempValue > 9999999.99) {
        tempValue = 9999999.99;
      }
    }
    if (tempValue < 0) {
      tempValue = 0;
    }
    formItem.reducedPrice = Number(tempValue.toFixed(2));
    srcElement.value = formItem.reducedPrice;

    formItem.discountRate = Number(formItem.reducedPrice / formItem.price * 100);
    formItem.discountRate = this.formatDecimal(formItem.discountRate);
    formItem.displayDiscountRate = this.displayRate(formItem.discountRate);
    this.generateBillInfo();
  }

  /**
   * 文本框获取焦点
   * @param e
   */
  focusInput(e) {
    let srcElement = e.srcElement || e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    srcElement.value = value;
    srcElement.select();
    this.isSelect = true;
  }

  /**
   * 取消选中
   * @param e
   */
  cancelSelect(e) {
    let srcElement = e.srcElement || e.target;
    if (this.isSelect) {
      this.isSelect = false;
      return;
    }

    srcElement.value = srcElement.value;
  }

  /**
   * 费率失去焦点
   * @param e
   */
  blurRate(e) {
    let srcElement = e.srcElement || e.target;
    srcElement.value = this.displayRate(srcElement.value);
  }

  /**
   * 明细价格失去焦点
   * @param e
   */
  blurPrice(e) {
    let srcElement = e.srcElement || e.target;
    srcElement.value = this.displayPrice(srcElement.value);
  }

  /**
   * 修改数量
   */
  changeNumber(formItem: BillFormItem, e) {
    let srcElement = e.srcElement || e.target;
    formItem.number = srcElement.value;
    this.generateBillInfo();
  }

  /**
   * 修改折扣率
   * @param formItem
   */
  changeRate(formItem: BillFormItem, e) {
    let srcElement = e.srcElement || e.target;
    let value = srcElement.value;
    let tempRate = Number(this.removeTextFormat(value));
    if (isNaN(tempRate)) {
      srcElement.value = formItem.discountRate;
      return;
    }
    if (tempRate > 100) {
      tempRate = 100;
    } else if (tempRate < 0) {
      tempRate = 0;
    }
    formItem.discountRate = tempRate;
    srcElement.value = formItem.discountRate;
    formItem.discountRate = this.formatDecimal(formItem.discountRate);
    formItem.reducedPrice = this.formatDecimal(formItem.price * formItem.discountRate / 100);
    formItem.displayReducedPrice = this.displayPrice(formItem.reducedPrice);
    this.generateBillInfo();
  }

  /**
   * 修改整单折扣率
   * @param e
   */
  changeAllRate(e) {
    let value = e.srcElement.value;
    let tempRate = Number(this.removeTextFormat(value));
    this.billForm.allDiscountRate = tempRate;
    this.billForm.reducedPrice = this.generateReducePrice();
    this.billForm.displayReducePrice = this.displayPrice(this.billForm.reducedPrice);
  }

  /**
   * 修改账单金额
   * @param e
   */
  changeAllReducePrice(e) {
    let srcElement = e.srcElement || e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    this.billForm.reducedPrice = value;
    this.billForm.allDiscountRate = this.formatDecimal((this.billForm.reducedPrice * 100 / this.billForm.firstReducePrice));
    this.billForm.displayAllDiscountRate = this.displayRate(this.billForm.allDiscountRate);
  }

  /**
   * 修改简率收费价格
   * @param e
   */
  changeSummaryReducePrice(formItem: BillFormItem, e) {
    let srcElement = e.srcElement || e.target;
    let value = srcElement.value;
    value = this.removeTextFormat(value);
    let tempValue = Number(value);
    if (isNaN(tempValue)) {
      srcElement.value = formItem.reducedPrice;
      return;
    }
    if (formItem.billType === 1) {
      if (tempValue > formItem.price) {
        tempValue = formItem.price;
      }
    } else {
      if (tempValue > 9999999.99) {
        tempValue = 9999999.99;
      }
    }
    if (tempValue < 0) {
      tempValue = 0;
    }
    formItem.reducedPrice = Number(tempValue.toFixed(2));
    srcElement.value = formItem.reducedPrice;

    this.generateBillInfo();
  }

  /**
   * 处理
   * @param num
   * @returns {boolean}
   */
  private formatDecimal(num) {
    if (num.toString().indexOf(('.'))) {
      num = Number(num.toFixed(2));
    }
    return num;
  }

  /**
   * 计算原价
   */
  private generateOriginPrice() {
    let tempPrice = 0;
    if (this.billForm.billType === 1) {
      if (typeof (this.billForm.detailBillItemList) !== 'undefined') {
        this.billForm.detailBillItemList.forEach((value) => {
          tempPrice += (value.price * value.number);
        });
      }
    } else {
      if (typeof (this.billForm.summaryBillItemList) !== 'undefined') {
        this.billForm.summaryBillItemList.forEach((value) => {
          tempPrice += (value.reducedPrice);
        });
      }
    }
    return Number(tempPrice.toFixed(2));
  }

  /**
   * 各项折后总价
   */
  private generateFirstReducePrice(): number {
    let tempPrice = 0;
    if (this.billForm.billType === 1) {
      if (typeof (this.billForm.detailBillItemList) !== 'undefined') {
        this.billForm.detailBillItemList.forEach((value) => {
          tempPrice += (value.price * value.number * value.discountRate / 100);
        });
      }
    } else {
      tempPrice = this.billForm.originPrice;
    }
    return Number(tempPrice.toFixed(2));
  }

  /**
   *生成账单金额
   * @returns {Number}
   */
  private generateReducePrice() {
    return Number(( this.billForm.firstReducePrice * this.billForm.allDiscountRate / 100).toFixed(2));
  }

  /**
   * 计算整单的信息
   */
  private generateBillInfo() {
    this.billForm.originPrice = this.generateOriginPrice();
    this.billForm.firstReducePrice = this.generateFirstReducePrice();
    this.billForm.reducedPrice = this.generateReducePrice();
    this.billForm.displayReducePrice = this.displayPrice(this.billForm.reducedPrice);
  }

  /**
   * 价格展示
   * @param value
   * @returns {string}
   */
  private  displayPrice(value) {
    return '￥ ' + value;
  }

  /**
   * 展示百分比
   * @param value
   * @returns {string}
   */
  private  displayRate(value) {
    return value + ' %';
  }

  /**
   * 清除￥,百分比
   * @param value
   * @returns {any}
   */
  private removeTextFormat(value) {
    value = value.replace('￥', '').replace(' ', '');
    value = value.replace('%', '').replace(' ', '');
    return value;
  }
  /**
   * 编辑时初始化收费项目库存信息
   */
  private initEditChargeItemStockInfo() {
    let goodsIds: string[] = [];

    this.billForm.detailBillItemList.forEach(v => {
      if (goodsIds.findIndex(t => t === v.goodsId && v.connectToGoods)) {
        goodsIds.push(v.goodsId);
      }
    });

    // 没有接口实现了一半
    this.stockService.getStockNumber('').subscribe(p => {
      this.billForm.detailBillItemList.forEach(v => {

      });
    });
  }
  /*保存*/
  accountTransfer() {
    this.close();
  };
  /*取消*/
  cancel() {
    this.close();
  }
}
