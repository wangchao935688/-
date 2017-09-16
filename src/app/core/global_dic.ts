/**
 * Created by bingq on 2017/6/12.
 */

// interface dic {
//        [index: string]: string;
//    }
/**
 * 性别
 * @type {{0: string; 1: string}}
 */
export const gender = {
  '0': '男',
  '1': '女',
  null: '未设置'
};

export const invalid = {
  true: '已作废',
  false: '正常'
};


export const processStatus = {
  '0': '待派送',
  '1': '已派送',
  '2': '已回件',
  '3': '已试戴',
  '4': '返工',
  '5': '已戴走'
};

/**
 *账单状态
 * @type {{0: string; 1: string; 2: string; 3: string; 4: string; 5: string; 6: string}}
 */
export const billStatus = {
  '0': '待收费',
  '1': '已付清',
  '2': '欠费',
  '3': '退费',
  '4': '作废',
  '5': '已关闭',
  '6': '已锁定'
};

export const tradetypeStatus = {
  '0': '账户初始化',
  '1': '预收费充值',
  '2': '预收费消费',
  '3': '收费单',
  '4': '日常收入支出单',
  '5': '.转账'
};

export const workerType = {
  '0': '医生',
  '1': '护士',
  '2': '前台',
  '3': '其他'
};
export const bookingScheduleType = {
  '1': '预约', '2': '挂号', '3': '日程'
};
export const bookingSchedulePatlogType = {
  '0': '初诊', '1': '复诊', null: '未设置'
};
export const bookingScheduleTimeType = {
  '0': '不提醒', '1': '分钟', '2': '小时', '3': '天'
};

export const bookingStatus = {
  '0': '未到达', '1': '候诊中', '2': '治疗中', '3': '已完成', '-1': '取消'
};


export const dict = {
  getDictByKey: function (key) {
    return this[key];
  },
  gender: {
    '0': '男',
    '1': '女'
  },

  invalid: {
    true: '已作废',
    false: '正常'
  }, processStatus: {
    '0': '待派送',
    '1': '已派送',
    '2': '已回件',
    '3': '已试戴',
    '4': '返工',
    '5': '已戴走'
  }, billStatus: {
    '0': '待收费',
    '1': '已付清',
    '2': '欠费',
    '3': '退费',
    '4': '作废',
    '5': '已关闭',
    '6': '已锁定'
  }, tradetypeStatus: {
    '0': '账户初始化',
    '1': '预收费充值',
    '2': '预收费消费',
    '3': '收费单',
    '4': '日常收入支出单',
    '5': '.转账'
  }, workerType: {
    '0': '医生',
    '1': '护士',
    '2': '前台',
    '3': '其他'
  }, bookingScheduleType: {
    '1': '预约', '2': '挂号', '3': '日程'
  }, bookingSchedulePatlogType: {
    '0': '初诊', '1': '复诊', null: '未设置'
  }, bookingScheduleTimeType: {
    '0': '不提醒', '1': '分钟', '2': '小时', '3': '天'
  }, bookingStatus: {
    '0': '未到达', '1': '候诊中', '2': '治疗中', '3': '已完成', '-1': '取消'
  }
};
