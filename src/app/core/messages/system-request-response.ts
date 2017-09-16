/**
 * Created by LiJinglei on 2017/7/21.
 */
/*
* 根据省Code获取市列表
* */
export class GetCitiesRequest {
  // 省编码
  provinceCode: string;
}
/*
* 根据市获取县级市
* */
export class GetDistrictsRequest {
  // 市编码
  cityCode: string;
}
/*
* 获取省市区列表
* */
export class GetAreaResponse {
  // 编号
  Code: string;
  // 名称
  Name: string;
}
/*
* 选中省市区数据类型
* */
export  class  SelectAddress {
  province: string;
  city: string;
  area: string;
}
