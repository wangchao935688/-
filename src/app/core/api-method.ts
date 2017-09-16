/**
 * Created by bingq on 2017/5/26.
 */
export class ApiMethod {
  /**
   *登录
   * @type {string}
   */
  static readonly user_Login = '/User/Login';

  /**
   * 保存字典
   * @type {string}
   */
  static readonly dict_SaveDictDetail = '/Dict/SaveDictDetail';
  /**
   * 列表字典
   * @type {string}
   */
  static readonly dict_DictDetailList = '/Dict/DictDetailList';

  // /**
  //  * 上下移动字典
  //  * @type {string}
  //  */
  // static readonly dict_MoveDictDetail = '/Dict/MoveDictDetail';

  /**
   * 删除字典
   * @type {string}
   */
  static readonly dict_DelDictDetail = '/Dict/DelDictDetail';

  /**
   * 新的字典排序
   * @type {string}
   */
  static readonly dict_Reorder='/Dict/Reorder';

  /**
   * 保存患者
   * @type {string}
   */
  static readonly patient_SavePatient = '/Patient/SavePatient';

  /**
   * 患者病历简要详情
   * @type {string}
   */
  static readonly patient_CasePatientDetails = '/Patient/CasePatientDetails';

  /**
   * 获取患者病历列表
   * @type {string}
   */
  static readonly case_CaseList = '/Case/CaseList';

  /**
   * 获取病历列表
   * @type {string}
   */
  static readonly case_GetList = '/Case/GetList';

  /**
   * 新增病例
   */
  static readonly case_SaveCase = '/Case/SaveCase';

  /**
   * 标签列表
   */
  static readonly case_CaseRelationList = '/Case/CaseRelationList';

  /**
   * 标签上下移
   */
  static readonly case_ReorderCaseRelation = '/Case/ReorderCaseRelation';

  /**
   * 添加病历标签
   */
  static readonly case_AddCaseRelation = '/Case/AddCaseRelation';

  /**
   * 修改病例标签
   */
  static readonly case_EditCaseRelation = '/Case/EditCaseRelation';

  /**
   * 删除病例标签
   */
  static readonly case_DelCaseRelation = '/Case/DelCaseRelation';

  /**
   * 医嘱模板列表--医生常用语
   */
  static readonly case_GetDoctorAdviceTemplateList = '/Case/GetDoctorAdviceTemplateList';

  /**
   * 上下移医嘱模板--医生常用语
   */
  static readonly case_ReorderDoctorAdviceTemplate = '/Case/ReorderDoctorAdviceTemplate';

  /**
   * 添加医嘱模板--医生常用语
   */
  static readonly case_AddDoctorAdviceTemplate = '/Case/AddDoctorAdviceTemplate';

  /**
   * 修改医嘱模板--医生常用语
   */
  static readonly case_EditDoctorAdviceTemplate = '/Case/EditDoctorAdviceTemplate';

  /**
   * 删除医嘱模板--医生常用语
   */
  static readonly case_DelDoctorAdviceTemplate = '/Case/DelDoctorAdviceTemplate';

  /**
   * 病例模板列表/搜索
   */
  static readonly case_TemplateList = '/Case/TemplateList';

  /**
   * 病例模板详情
   */
  static readonly case_TemplateDetails = '/Case/TemplateDetails';

  /**
   *词条类别列表
   */
  static readonly case_LemmaCategoryList = '/Case/LemmaCategoryList';

  /**
   *添加词条类别
   */
  static readonly case_AddLemmaType = '/Case/AddLemmaType';

  /**
   * 修改词条类别
   */
  static readonly case_EditLemmaType = '/Case/EditLemmaType';

  /**
   * 删除词条类别
   */
  static readonly case_DelLemmaType = '/Case/DelLemmaType';

  /**
   * 词条列表
   */
  static readonly case_LemmaList = '/Case/LemmaList';

  /**
   * 添加词条
   */
  static readonly case_AddLemma = '/Case/AddLemma';

  /**
   * 修改词条
   */
  static readonly case_EditLemma = '/Case/EditLemma';

  /**
   * 删除词条
   */
  static readonly case_DelLemma = '/Case/DelLemma';

  /**
   * 回访列表
   * @type {string}
   */
  static readonly followUp_GetList = '/FollowUp/GetList';
  /**
   * 根据患者ID查询历史回访列表
   * @type {string}
   */
  static readonly followUp_GetList_patientID = '/FollowUp/GetList';
  /*
   * 回访列表模拟
   * */
  static readonly interview_interviewlist = '/Interview/InterviewList';
  /**
   * 回访详情
   * @type {string}
   */
  static readonly followUp_Get = '/FollowUp/Get';

  /**
   * 员工列表
   * @type {string}
   */
  static readonly worker_WorkerList = '/Worker/WorkerList';

  /**
   * 员工列表(多类型)
   * @type {string}
   */
  static readonly worker_GetList = '/Worker/GetList';

  static readonly worker_DoctorBookingList = '/Worker/DoctorBookingList';
  /**
   * 修改员工信息
   * @type {string}
   */
  static readonly worker_Edit = '/Worker/Edit';

  /**
   * 员工详细信息
   * @type {string}
   */
  static readonly worker_Get = '/Worker/Get';
  /**
   * 回访类型
   * @type {string}
   */
  static readonly followUp_GetTypeList = '/FollowUp/GetTypeList';

  /**
   * 添加回访
   * @type {string}
   */
  static readonly followUp_Add = '/FollowUp/Add';

  /**
   * 添加回访结果
   * @type {string}
   */
  static readonly followUp_AddResult = '/FollowUp/AddResult';

  /**
   * 完成回访
   * @type {string}
   */
  static readonly followUp_Complete = '/FollowUp/Complete';

  /**
   * 取消回访
   * @type {string}
   */
  static readonly followUp_Cancel = '/FollowUp/Cancel';

  /**
   * 修改回访
   * @type {string}
   */
  static readonly followUp_Update = '/FollowUp/Update';

  /**
   * 删除回访
   * @type {string}
   */
  static readonly followUp_Delete = '/FollowUp/Delete';

  /**
   * 获取回访模板
   * @type {string}
   */
  static readonly followUp_GetTemplateList = '/FollowUp/GetTemplateList';

  /**
   * 获取回访模板 (分页)
   * @type {string}
   */
  static readonly followUp_GetTemplatePage = 'FollowUp/GetTemplatePage';

  /**
   * 添加回访模板
   * @type {string}
   */
  static readonly followUp_AddTemplate = '/FollowUp/AddTemplate';

  /**
   * 修改回访模板
   * @type {string}
   */
  static readonly followUp_UpdateTemplate = '/FollowUp/UpdateTemplate';

  /**
   * 删除回访模板
   * @type {string}
   */
  static readonly followUp_DeleteTemplate = '/FollowUp/DeleteTemplate';

  /**
   * 回访人列表
   * @type {string}
   */
  static readonly followUp_FollewUpUserList = '/FollowUp/FollewUpUserList';
  /*
   * 选择回访人列表
   * */
  static readonly follewUp_UserList = '/FollowUp/FollewUpUserList';
  /**
   * 设置默认回访人
   * @type {string}
   */
  static readonly followUp_SetDefault = '/FollowUp/SetDefault';

  /**
   * 充值单列表
   * @type {string}
   */
  static readonly recharge_GetList = '/Recharge/GetList';

  /**
   * 充值单详情
   * @type {string}
   */
  static readonly recharge_Get = '/Recharge/Get';

  /**
   * 充值账户列表
   * @type {string}
   */
  static readonly advanceAccount_GetList = '/AdvanceAccount/GetList';

  /**
   * 充值账户详情
   * @type {string}
   */
  static readonly advanceAccount_Get = '/AdvanceAccount/Get';

  /**
   * 充值账户变动记录
   * @type {string}
   */
  static readonly advanceAccount_ChangeRecord = '/AdvanceAccount/ChangeRecord';

  /**
   * 充值
   * @type {string}
   */
  static readonly recharge_Recharge = '/Recharge/Recharge';

  /**
   * 作废
   * @type {string}
   */
  static readonly recharge_Cancel = '/Recharge/Cancel';

  /**
   * 全部收费单/搜索
   * @type {string}
   */
  static readonly bill_GetBillList = '/Bill/GetBillList';

  /**
   * 收费单详情
   * @type {string}
   */
  static readonly bill_Details = '/Bill/Details';

  /**
   * 作废收费单
   * @type {string}
   */
  static readonly bill_Cancel = '/Bill/Cancel';
  /**
   *添加收费单
   * @type {string}
   */
  static readonly bill_Add = '/Bill/Add';
  /**
   * 修改收费单
   * @type {string}
   */
  static readonly bill_Edit = '/Bill/Edit';
  /**
   * 收费
   * @type {string}
   */
  static readonly bill_Charge = '/Bill/Charge';
  /**
   * 退费
   * @type {string}
   */
  static readonly bill_Refund = '/Bill/Refund';

  /**
   * 获取所有收费项目，按类别层次结构
   * @type {string}
   */
  static readonly chargeItem_GetAll = '/ChargeItem/GetAll';
  /**
   * 获取所有收费项目分类（简略收费项目）
   * @type {string}
   */
  static readonly chargeItem_GetChargeItemTypeList = '/ChargeItem/GetChargeItemTypeList';
  /**
   * 收费项搜索
   * @type {string}
   */
  static readonly chargeItem_ChargeItemSeacrh = '/ChargeItem/ChargeItemSeacrh';

  /**
   * 患者搜索
   * @type {string}
   */
  static readonly patient_PatientSearch = '/Patient/PatientSearch';

  /**
   * 患者列表
   * @type {string}
   */
  static readonly patient_GetPatientList = '/Patient/GetPatientList';
  /**
   * 患者个人中心首页
   * @type {string}
   */
  static readonly patient_PatientCenter = '/Patient/PatientCenter';
  /**
   * 患者详情
   * @type {string}
   */
  static readonly patient_GetPatient = '/Patient/GetPatient';
  /**
   * 患者余额
   * @type {string}
   */
  static readonly advanceAccount_GetPatientBalance = '/AdvanceAccount/GetPatientBalance';

  /**
   * 账户类型列表
   * @type {string}
   */
  static readonly hospitalAccount_GetHospitalAccountTypeList = '/HospitalAccount/GetHospitalAccountTypeList';

  /**
   * 外加工列表
   */
  static readonly outsideProcess_GetList = '/OutsideProcess/GetList';

  /**
   * 外加工列表详情
   */
  static readonly outsideProcess_Get = '/OutsideProcess/Get';

  /**
   * 登记取件
   * @type {string}
   */
  static readonly outsideProcess_ChangeState_Sent = '/OutsideProcess/ChangeState_Sent';

  /**
   * 登记回件
   * @type {string}
   */
  static readonly outsideProcess_ChangeState_Received = '/OutsideProcess/ChangeState_Received';

  /**
   * 登记返工
   * @type {string}
   */
  static readonly outsideProcess_ChangeState_Reworked = '/OutsideProcess/ChangeState_Reworked';

  /**
   * 登记戴走
   * @type {string}
   */
  static readonly outsideProcess_ChangeState_Completed = '/OutsideProcess/ChangeState_Completed';

  /**
   * 获取加工内容列表
   * @type {string}
   */
  static readonly outsideProcess_GetProcessContentList = '/OutsideProcess/GetProcessContentList';

  /**
   * 获取色号列表
   * @type {string}
   */
  static readonly outsideProcess_GetColorNumberList = '/OutsideProcess/GetColorNumberList';

  /**
   * 新建外加工
   * @type {string}
   */
  static readonly outsideProcess_Add = '/OutsideProcess/Add';

  /**
   * 修改外加工
   * @type {string}
   */
  static readonly outsideProcess_Update = '/OutsideProcess/Update';

  /**
   * 删除外加工
   * @type {string}
   */
  static readonly outsideProcess_Delete = '/OutsideProcess/Delete';

  /**
   * 外加工单位列表
   * @type {string}
   */
  static readonly outsideProcess_GetCompanyList = '/OutsideProcess/GetCompanyList';

  /**
   * 添加/编辑色号
   * @type {string}
   */
  static readonly outsideProcess_EditColorNumber = '/OutsideProcess/EditColorNumber';

  /**
   * 删除色号
   * @type {string}
   */
  static readonly outsideProcess_DeleteColorNumber = '/OutsideProcess/DeleteColorNumber';

  /**
   * 添加/编辑加工内容
   * @type {string}
   */
  static readonly outsideProcess_EditProcessContent = '/OutsideProcess/EditProcessContent';

  /**
   * 加工内容上移下移
   * @type {string}
   */
  static readonly outsideProcess_ReorderProcessContent = '/OutsideProcess/ReorderProcessContent';

  /**
   * 加工色号上移下移
   * @type {string}
   */
  static readonly outsideProcess_ReorderColorNumber = '/OutsideProcess/ReorderColorNumber';

  /**
   * 删除加工内容
   * @type {string}
   */
  static readonly outsideProcess_DeleteProcessContent = '/OutsideProcess/DeleteProcessContent';

  /**
   * 日常收支列表获取
   */
  static readonly incomeAndExpenses_GetList = '/IncomeAndExpenses/GetList';

  /**
   * 日常收支详情
   */
  static readonly incomeAndExpense_Get = '/IncomeAndExpenses/Get';

  /**
   * 日常收支新增（弹框）
   */
  static readonly incomeAndExpenses_Add = '/IncomeAndExpenses/Add';

  /**
   * 日常收支作废
   */
  static readonly incomeAndExpenses_Cancel = '/IncomeAndExpenses/Cancel';

  /**
   * 日常收支类型列表
   */
  static readonly incomeAndExpenses_GetTypeList = '/IncomeAndExpenses/GetTypeList';

  /**
   * 日常收支类型编辑
   */
  static readonly incomeAndExpenses_EditType = '/IncomeAndExpenses/EditType';

  /**
   * 日常收支类型删除
   */
  static readonly incomeAndExpenses_DeleteType = '/IncomeAndExpenses/DeleteType';

  /**
   * 日常收支类型图标
   */
  static readonly incomeAndExpenses_IncomeAndExpenseIconList = '/IncomeAndExpenses/IncomeAndExpenseIconList';

  /*
   * 账户列表
   * */
  static readonly hospitalAccount_GetHospitalAccountList = '/HospitalAccount/GetHospitalAccountList';
  /*
   * 流水详情
   * */
  static readonly accountChangeRecord_Get = '/AccountChangeRecord/Get';
  /*
   * 流水列表
   * */
  static readonly accountChangeRecord_GetCashFlowList = '/AccountChangeRecord/GetCashFlowList';
  /*
   * 流水统计
   * */
  static readonly accountChangeRecord_GetCashFlowStatistics = '/AccountChangeRecord/GetCashFlowStatistics';

  /*
   * 转账
   * */
  static readonly hospitalAccount_Transfer = '/HospitalAccount/Transfer';

  /**
   * 获取利润变动列表
   */
  static readonly accountChangeRecord_GetProfitList = '/AccountChangeRecord/GetProfitList';

  /**
   * 获取利润统计
   */
  static readonly accountChangeRecord_GetProfitStatistics = '/AccountChangeRecord/GetProfitStatistics';


  /**
   * 获取患者病例详情
   */
  static readonly case_CaseDetails = '/Case/CaseDetails';

  /*
   * 患者预约列表
   * */
  static readonly booking_PatientBookingList = '/Booking/PatientBookingList';
  /*
   * 患者就诊记录
   * */
  static readonly patient_GetPatlogNotes = '/Patient/GetPatlogNotes';
  /*
   * 患者图像列表
   * */
  static readonly patient_PatientImageList = '/Patient/PatientImageList';
  /*
   * 患者收费
   * */
  static readonly bill_GetPatientBill = '/Bill/GetPatientBill';
  /*
   * 患者标签列表
   * */
  static readonly patient_PatientRelationTypeList = '/Patient/PatientRelationTypeList';
  /*
   * 删除患者图像
   * */
  static readonly patient_DelPatientImage = '/Patient/DelPatientImage';

  /**
   * 获取预存款变动列表
   */
  static readonly accountChangeRecord_GetAdvanceMoneyList = '/AccountChangeRecord/GetAdvanceMoneyList';

  /**
   * 获取预存款变动统计
   */
  static readonly accountChangeRecord_GetAdvanceMoneyStatistics = '/AccountChangeRecord/GetAdvanceMoneyStatistics';

  /*
   * 获得所有地址,省市区三级联动
   * */
  static readonly sysConfig_GetAddress = '/SysConfig/GetAddress';

  /*
   * 获得员工排班列表
   * */
  static readonly shiftArrangement_GetAllShiftList = '/ShiftArrangement/GetAllShiftList';

  /*
   * 新建或修改排班列表
   * */
  static readonly shiftArrangement_MakeShift = '/ShiftArrangement/MakeShift';

  /*
   * 删除排班
   * */
  static readonly shiftArrangement_DeleteShift = '/ShiftArrangement/DeleteShift';

  /*
   * 获取所有排班类型列表
   * */
  static readonly shiftArrangement_GetShiftTypeList = '/ShiftArrangement/GetShiftTypeList';

  /*
   * 新建或修改排班类型
   * */
  static readonly shiftArrangement_EditShiftType = '/ShiftArrangement/EditShiftType';

  /*
   * 删除排班类型
   * */
  static readonly shiftArrangement_DeleteShiftType = '/ShiftArrangement/DeleteShiftType';
  /**
   * 上传图片
   */
  static readonly SysConfig_UploadImage = '/SysConfig/UploadImage';
  /**
   * 获取验证规则
   */
  static readonly SysConfig_GetFormValidateList = '/SysConfig/FormValidateList';

  /**
   * 修改密码
   */
  static readonly user_ChangePassword = '/User/ChangePassword';

  /**
   * 绑定手机
   */
  static readonly user_ChangeTel = '/User/ChangeTel';

  /**
   * 验证密码
   */
  static readonly user_CheckPassword = '/User/CheckPassword';

  /**
   * 获取验证码
   */
  static readonly user_SendVerificationCode = '/User/SendVerificationCode';

  /**
   * 校验验证码
   */
  static readonly user_CheckVerificationCode = '/User/CheckVerificationCode';

  /**
   * 获取我的排班
   */
  static readonly shiftArrangement_GetMyShiftList = '/ShiftArrangement/GetMyShiftList';

  /**
   * 获取我的工作量,医生个人工作量
   */
  static readonly statistics_PersonWorkload = '/Statistics/PersonWorkload';


  /**
   * 主营收入统计报表
   */
  static readonly statistics_MainIncome = '/Statistics/MainIncome';
  /**
   * 资金流水统计报表
   */
  static readonly statistics_CashFlow = '/Statistics/CashFlow';
  /**
   * 预存款统计报表
   */
  static readonly statistics_AdvanceMoney = '/Statistics/AdvanceMoney';
  /**
   * 利润统计报表
   */
  static readonly statistics_Profit = '/Statistics/Profit';
  /**
   * 个人接诊
   */
  static readonly statistics_PersonReception = '/Statistics/PersonReception';
  /**
   * 全部医生接诊统计
   */
  static readonly statistics_AllReception = '/Statistics/AllReception';
  /**
   * 个人外加工
   */
  static readonly statistics_PersonProcess = '/Statistics/PersonProcess';
  /**
   * 全部医生外加工统计
   */
  static readonly statistics_AllProcess = '/Statistics/AllProcess';
  /**
   * 全部医生工作量
   */
  static readonly statistics_AllWorkload = '/Statistics/AllWorkload';

  /**
   * 门诊统计
   */
  static readonly statistics_Clinic = '/statistics/Clinic';
  /**
   * 物品列表, 当前库存
   * @type {string}
   */
  static readonly goods_GetGoodsList = '/Goods/GetList';
  /**
   * 物品详情
   * @type {string}
   */
  static readonly goods_GetGoods = '/Goods/Get';
  /**
   * 添加物品
   * @type {string}
   */
  static readonly goods_AddGoods = '/Goods/Add';
  /**
   * 修改物品
   * @type {string}
   */
  static readonly goods_EditGoods = '/Goods/Edit';
  /**
   * 删除物品
   * @type {string}
   */
  static readonly goods_DeleteGoods = '/Goods/Delete';
  /**
   *获取供应商列表
   * @type {string}
   */
  static readonly goods_GetSupplierList = '/Goods/GetSupplierList';
  /**
   *获取供应商详情
   * @type {string}
   */
  static readonly goods_GetSupplier = '/Goods/GetSupplier';
  /**
   *添加供应商
   * @type {string}
   */
  static readonly goods_AddSupplier = '/Goods/AddSupplier';
  /**
   *修改供应商
   * @type {string}
   */
  static readonly goods_EditSupplier = '/Goods/EditSupplier';

  /**
   *删除供应商
   * @type {string}
   */
  static readonly goods_DeleteSupplier = '/Goods/DelSupplier';
  /**
   *获取批次列表
   * @type {string}
   */
  static readonly stock_GoodsBatchList = '/Stock/GoodsBatchList';
  /**
   *添加批次
   * @type {string}
   */
  static readonly stock_AddGoodsBatch = '/Stock/AddGoodsBatch';
  /**
   *修改批次
   * @type {string}
   */
  static readonly stock_EditGoodsBatch = '/Stock/EditGoodsBatch';
  /**
   *删除批次
   * @type {string}
   */
  static readonly stock_DelGoodsBatch = '/Stock/DelGoodsBatch';
  /**
   *入库单列表
   * @type {string}
   */
  static readonly stock_StockInList = '/Stock/StockInList';
  /**
   *入库明细列表
   * @type {string}
   */
  static readonly stock_StockInItemList = '/Stock/StockInItemList';

  /**
   *入库单详情
   * @type {string}
   */
  static readonly stock_GetStockIn = '/Stock/GetStockIn';

  /**
   *新增入库单
   * @type {string}
   */
  static readonly stock_AddStockIn = '/Stock/AddStockIn';

  /**
   *修改入库单
   * @type {string}
   */
  static readonly stock_EditStockIn = '/Stock/EditStockIn';
  /**
   *作废
   * @type {string}
   */
  static readonly stock_DelStockIn = '/Stock/DelStockIn';

  /**
   *出库单列表
   * @type {string}
   */
  static readonly stock_StockOutList = '/Stock/StockOutList';

  /**
   *出库明细列表
   * @type {string}
   */
  static readonly stock_StockOutItemList = '/Stock/StockOutItemList';
  /**
   *出库单详情
   * @type {string}
   */
  static readonly stock_GetStockOut = '/Stock/GetStockOut';
  /**
   *添加出库单
   * @type {string}
   */
  static readonly stock_AddStockOut = '/Stock/AddStockOut';
  /**
   *修改出库单
   * @type {string}
   */
  static readonly stock_EditStockOut = '/Stock/EditStockOut';
  /**
   *删除出库单
   * @type {string}
   */
  static readonly stock_DelStockOut = '/Stock/DelStockOut';
  /**
   *退货单列表
   * @type {string}
   */
  static readonly stock_BreakageList = '/Stock/BreakageList';
  /**
   *退货单明细列表
   * @type {string}
   */
  static readonly stock_BreakageItemList = '/Stock/BreakageItemList';
  /**
   *退货单详情
   * @type {string}
   */
  static readonly stock_GetBreakage = '/Stock/GetBreakage';

  /**
   *添加退费单
   * @type {string}
   */
  static readonly stock_AddBreakage = '/Stock/AddBreakage';

  /**
   *修改退货单
   * @type {string}
   */
  static readonly stock_EditBreakage = '/Stock/EditBreakage';


  /**
   *作废退货单
   * @type {string}
   */
  static readonly stock_DelBreakage = '/Stock/DelBreakage';


  /**
   * 图形验证码
   */
  static readonly user_VerificationCode = '/User/VerificationCode';

  /**
   * 添加群组
   */
  static readonly contacts_AddGroup = '/Contacts/AddGroup';
  /*
   * 添加联系人
   * */
  static readonly contacts_Add = '/Contacts/Add';
  /**
   *
   * 省列表
   */
  static readonly sysConfig_GetProvinces = '/SysConfig/GetProvinces';

  /**
   * 市列表
   */
  static readonly sysConfig_GetCities = '/SysConfig/GetCities';

  /**
   * 区列表
   */
  static readonly sysConfig_GetDistricts = '/SysConfig/GetDistricts';

  /*
   * 短信数量统计
   * */
  static readonly sMS_SMSStatistics = '/SMS/SMSStatistics';

  /*
   * 全部模板列表
   * */
  static readonly sMS_GetTemplateList = '/SMS/GetTemplateList';

  /*
   * 修改模板
   * */
  static readonly sMS_EditTemplate = '/SMS/EditTemplate';

  /*
   * 删除模板
   * */
  static readonly sMS_DelTemplate = '/SMS/DelTemplate';

  /*
   * 添加模板
   * */
  static readonly sMS_AddTemplate = '/SMS/AddTemplate';

  /*
   * 短信回复列表
   * */
  static readonly sMS_ReplyList = '/SMS/ReplyList';

  /*
   * 发送列表
   * */
  static readonly sMS_SendList = '/SMS/SendList';

  /*
   * 发送详情
   * */
  static readonly sMS_SendDetails = '/SMS/SendDetails';

  /*
   * 充值记录列表
   * */
  static readonly sMS_GetRechargerList = '/SMS/GetRechargerList';

  /*
   * 充值记录详情
   * */
  static readonly sMS_GetRecharger = '/SMS/GetRecharger';

  /*
   * 获得调用支付宝/微信数据
   * */
  static readonly sMS_SMSRecharger = '/SMS/SMSRecharger';

  /*
   * 生成订单
   * */
  static readonly sMS_CreateRechargerRecord = '/SMS/CreateRechargerRecord';

  /*
   * 模板类别列表
   * */
  static readonly sMS_TemplateTypeList = '/SMS/TemplateTypeList';

  /*
   *  添加模板类别
   * */
  static readonly sMS_AddTemplateType = '/SMS/AddTemplateType';

  /*
   * 修改模板类别
   * */
  static readonly sMS_EditTemplateType = '/SMS/EditTemplateType';

  /*
   * 删除模板类别
   * */
  static readonly sMS_DelTemplateType = '/SMS/DelTemplateType';

  /*
   * 聊天
   * */
  static readonly sMS_GetChat = '/SMS/GetChat';

  /*
   * 群发短信
   * */
  static readonly sMS_SendGroupSMS = '/SMS/SendGroupSMS';
  /*
   * 短信包
   * */
  static readonly sMS_SMSPackageList = '/SMS/SMSPackageList';
  /*
   * 诊所认证状态
   * */
  static readonly hospital_GetAuthenticationState = '/Hospital/GetAuthenticationState';

  /*
   * 获取预约详情
   * */
  static readonly booking_BookingDetails = '/Booking/BookingDetails';

  static readonly schedule_GetSchedule = '/Schedule/GetSchedule';

  static readonly booking_BookingScheduleList = '/Booking/BookingScheduleList';

  static readonly schedule_DelSchedule = '/Schedule/DelSchedule';
  static readonly schedule_SaveSchedule = '/Schedule/SaveSchedule';
  static readonly booking_SaveBooking = '/Booking/SaveBooking';
  static readonly booking_SetStatus = '/Booking/SetStatus';
  static readonly booking_DelBooking = '/Booking/DelBooking';
  static readonly Contact_Get = '/Contacts/GetList';

  /**
   *获得用户环信token
   * @type {string}
   */
  static readonly message_GetUserToken='/Message/GetUserToken';
  /**
   *删除聊天对象
   * @type {string}
   */
  static readonly message_DeleteChat='/Message/DeleteChat';
  /**
   *接受者消息删除
   * @type {string}
   */
  static readonly message_DeleteToMessage='/Message/DeleteToMessage';
  /**
   *最近消息列表
   * @type {string}
   */
  static readonly message_GetRecentChat='/Message/GetRecentChat';
  /**
   *聊天记录
   * @type {string}
   */
  static readonly message_GetHistoryMessages='/Message/GetHistoryMessages';
  /**
   *设置已读
   * @type {string}
   */
  static readonly message_SetRead='/Message/SetRead';
  /**
   * 备份消息
   * @type {string}
   */
  static readonly message_StorageMessage='/Message/StorageMessage';
}

