/**
 * Created by bingq on 2017/6/7.
 */
/**
 * 分页请求基类
 */
export class PageRequest {
  PageIndex: number = 1;
  PageSize: number = 10;
}
/**
 * 分页响应基类
 */
export class PageResponse {
  CurrentPage: number;
  TotalPages: number;
  TotalItems: number;
  ItemsPerPage: number;
}
