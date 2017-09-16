/**
 * Created by bingq on 2017/5/29.
 */
import * as DictRequestResponse from '../dict-request-response';
/**
 * 创建字典请求模拟数据
 * @returns {SaveDictDetailRequest}
 */
export function saveDicDetailRequest(){
  let request=new DictRequestResponse.SaveDictDetailRequest();
  request.DictDetailName='测试一';
  request.DictSheetCode='1';
  return request;
}
