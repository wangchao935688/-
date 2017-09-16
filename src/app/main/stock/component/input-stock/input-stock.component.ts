import {Component, OnInit, ViewChild, AfterViewInit, ElementRef, HostListener} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import * as dic from '../../../../core/global_dic';
import {MalihuScrollbarService} from 'ngx-malihu-scrollbar';
import * as Process from '../../../../core/messages/process-request-response';
import {PatientService} from '../../../../core/service/patient.service';
import {QiezziLoadingComponent} from '../../../../shared/component/qiezzi-loading/qiezzi-loading.component';
import {ApplicationService} from '../../../../core/service/application.service';
import {PatientCenterRequest, PatientCenterResponse} from '../../../../core/messages/patient-request-response';
import {
  GetStockInRequest,
  GetStockInResponse
} from "../../../../core/messages/stock-request-response";
import {StockService} from "../../../../core/service/stock.service";

@Component({
  selector: 'app-input-stock',
  templateUrl: './input-stock.component.html',
  styleUrls: ['./input-stock.component.scss']
})
export class InputStockComponent implements OnInit, AfterViewInit {

  /*
   * TODO 设置参数类型
   * */
  getStockInRequest: GetStockInRequest=new GetStockInRequest();     //获取入库单详情请求数据
  getStockInResponse: GetStockInResponse=new GetStockInResponse();  //获取入库单详情响应
  patientName = '入库单详情';
  mainShowLoading: string;
  ctrlList: string[] = ['修改', '删除'];

  responseData: Process.OutsideProcessGetResponse;

  scrollbarOptions = {axis: 'xy', theme: 'minimal-dark'};

  tagList= [{title: '根管治疗', value: '1'}, {title:  '洗牙', value: '2'}];
  id: string;

  urlList= ['home', 'detail', 'check', 'case', 'booking', 'payment', 'return-visit', 'process', 'image'];
  patientId: string;


  showData: boolean;

  @ViewChild('rightDataLoading')
  rightDataLoading: QiezziLoadingComponent;


  constructor(private route: ActivatedRoute,
              private router: Router,
              private mScrollbarService: MalihuScrollbarService,
              private patientService: PatientService,
              private el: ElementRef,
              private stockService: StockService,
              private application: ApplicationService) {
  }

  @HostListener('click', ['$event'])
  onRightContentClick(evt) {
    if (evt.currentTarget === this.el.nativeElement) {
      evt.stopPropagation();
      evt.stopImmediatePropagation();
    }
  }

  ngOnInit(): void {
    // this.tabData.defaultIndex = 0;
    this.application.workBoard = this.el.nativeElement;
    this.route.params.subscribe(t => {
      console.log(t);
     this.getStockInRequest.id = t['id'];
      this.getGetStockIn(); // 获取入库单详情

    });
  }

  ngAfterViewInit(): void {
    this.mainShowLoading = 'show';
    setTimeout(() => {
      this.mainShowLoading = 'hide';
    }, 1000);
  }


  /**
   * 获取入库单详情
   */
  getGetStockIn(){
    this.stockService.getGetStockIn(this.getStockInRequest).subscribe(val=>{
      if(val){
        this.getStockInResponse=val;
        console.log(121,val);
      }
      else{

      }
    },error=>{

    });
  }

  onControlListClick(evt) {}



}
