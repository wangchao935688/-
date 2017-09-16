/**
 * Created by bingq on 2017/5/27.
 */
export enum HttpStatusCode {
  /*
   成功
   */
  Success = 200,
    /*
     客户端错误
     */
  ClientError = 400,
    /*
     token失效
     */
  TokenExpired = 401,
    /*
     请求被拒绝（因为权限、状态等原因）
     */
  RequestReject= 403,
    /*
     请求的数据不存在
     */
  NotFound = 404,
    /*
     服务端错误
     */
  ServerError = 500,
    /*
     其他错误
     */
  OtherError = 700
}
