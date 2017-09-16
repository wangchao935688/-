/**
 * Created by bingq on 2017/8/2.
 */
export class WorkerFull {
  Id:number;            //员工workerID
  UserID:number;        //userid
  HospitalCode:string;  //医院编号
  WorkerCode:string;    //员工编号
  WorkerName:string;    //员工名称
  WorkerType:number;    //类型
  Sex:number;           //性别
  BirthDate:string;     //出生日期
  JobTitle:string;      //职位
  JobTitleName:string;  //职位名称
  Tel:string;           //电话
  GraduateSchool:string;  //毕业院校
  Address:string;       //地址
  Email:string;         //邮箱
  QQ:string;            //qq
  Level:number;         //0超管
  HeadImageUrl:string;  //头像
  WorkerDepart:number;  //科室
  WorkerDepartName:string;  //科室名称
  Province:string;      //省
  City:string;          //市
  Area:string;          //区
  AccessState:number;   //员工状态：0邀请中、1正常、-1已解除、-2已冻结
}
