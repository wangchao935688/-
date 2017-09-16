/**
 * Created by bingq on 2017/6/5.
 */
import  * as UserRequestResponse from '../user-request-response';
/**
 * 模拟登陆返回结果
 * @returns {LoginResponse}
 */
export function  loginResponse(){
  let response=new UserRequestResponse.LoginResponse();
  response.Web={
    "UserCookie": "1234567",
    "Cookie": "8888"
  }
  response.Workers=[{
    "UserID": 1,
    "HospitalCode": "sample string 2",
    "HospitalName": "sample xQ 3",
    "WorkerCode": "sample string 4",
    "WorkerName": "sample string 5",
    "WorkerID": "sample string 6",
    "WorkerType": "sample string 7",
    "HeadImageUrl": "sample string 8",
    "Province": "sample string 9",
    "City": "sample string 10",
    "Area": "sample string 11"
  }];
return response;
}
