import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {ProfitService} from "../../../../core/service/profit.service";
import * as Profit from "../../../../core/messages/profit-request-response";
@Component({
  selector: 'profit-index',
  templateUrl: './profit-index.component.html',
  styleUrls: ['./profit-index.component.scss']
})
export class ProfitIndexComponent implements OnInit {

  displayStatus: string;

  moduleName: string = '利润';

  requestData: Profit.AccountChangeRecordGetProfitStatisticsRequest;

  responseData: Profit.AccountChangeRecordGetProfitStatisticsResponse;

  centerRouterLoading: string = 'hide';

  constructor(private router: Router, private profitService: ProfitService) {
    this.requestData = new Profit.AccountChangeRecordGetProfitStatisticsRequest();
    this.responseData = new Profit.AccountChangeRecordGetProfitStatisticsResponse();
  }

  ngOnInit() {

    let leftCanvas = <HTMLCanvasElement>document.getElementById('left-canvas');
    leftCanvas.width = 60;
    leftCanvas.height = 60;
    let rightCanvas = <HTMLCanvasElement>document.getElementById('right-canvas');
    rightCanvas.width = 60;
    rightCanvas.height = 60;
    let leftContext = <CanvasRenderingContext2D>leftCanvas.getContext('2d');
    let rightContext = <CanvasRenderingContext2D>rightCanvas.getContext('2d');
    leftContext.strokeStyle = "#57BC85";
    leftContext.fillStyle = "#57BC85";
    leftContext.moveTo(0, 0);
    leftContext.arc(leftCanvas.width - 10, leftCanvas.height - 10, 4, 180, Math.PI * 2, true);
    leftContext.closePath();
    leftContext.lineWidth = 1;
    leftContext.fill();
    leftContext.stroke();
    rightContext.strokeStyle = "#FFB564";
    rightContext.fillStyle = "#FFB564";
    rightContext.moveTo(rightCanvas.width, 0);
    rightContext.arc(10, 50, 4, 15, Math.PI * 2, true);
    rightContext.closePath();
    rightContext.lineWidth = 1;
    rightContext.fill();
    rightContext.stroke();
    this.requestData = new Profit.AccountChangeRecordGetProfitStatisticsRequest();
    this.requestData.beginTime = new Date().toLocaleDateString();
    this.requestData.endTime = new Date().toLocaleDateString();
    this.search();

  }

  /**
   * 查询
   */
  search() {
    this.centerRouterLoading = 'show';
    this.profitService.getAccountChangeRecordGetProfitStatistics(this.requestData).subscribe(val => {
      this.centerRouterLoading = 'hide';
      this.responseData = val;
    });
  }

  navigate(url: string) {
    this.router.navigate(['profit/' + url, this.requestData.beginTime, this.requestData.endTime])
  }

  /**
   * 选择日期回调
   * @param evt
   */
  selectDate(evt: any) {
    if (evt) {
      this.requestData.beginTime = evt.beginTime;
      this.requestData.endTime = evt.endTime;
      this.search();
    }
  }

}
