import { Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SystemService} from '../../../core/service/system.service';
import {SelectAddress} from '../../../core/messages/system-request-response';
import {ProvinceCityAreaForm} from "../../../core/forms/system/province-city-area-form";

@Component({
  selector: 'qiezzi-province-city-area',
  templateUrl: './qiezzi-province-city-area.component.html',
  styleUrls: ['./qiezzi-province-city-area.component.scss']
})
export class QiezziProvinceCityAreaComponent implements OnInit {
  provinceList = []; // 省下拉列表
  citiesList = []; // 市下拉列表
  areaList = []; // 区下拉列表
  form: ProvinceCityAreaForm = new ProvinceCityAreaForm();
  provIndex = 0;
  cityIndex = 0;
  areaIndex = 0;
  errInfo: string; // 错误提示信息
  @Input()
  selectAddress: SelectAddress; // 选中地区
  @Output()
  onChangeAddress = new EventEmitter<SelectAddress>();
  constructor( private SystemService: SystemService) { }

  ngOnInit() {
    this.form = this.selectAddress;
    this.getProvinces();

  }
  /*
  * TODO 获取省列表
  * */
  getProvinces() {
    this.SystemService.getProvinces(null).subscribe( prov => {
      if (prov && prov.length > 0) {
        let tmp = [];
        prov.forEach( item => {
          tmp.push( {value: item.Code, label: item.Name} );
        });
        this.provinceList = tmp;
        if (this.provinceList && this.selectAddress.province ) {
          this.getCities(this.selectAddress.province);
        }
      }
    }, error => {
      console.log(error);
    });
  }
  /*
  * TODO 获取市列表
  * */
  getCities(provinceCode) {
    this.SystemService.getCities({provinceCode: provinceCode}).subscribe( cities => {
      if (cities && cities.length > 0) {
        let tmp=[];
        cities.forEach( item => {
          tmp.push( {value: item.Code, label: item.Name} );
        });
        this.citiesList = tmp;
        if (this.citiesList && this.selectAddress.city ) {
          this.getDistricts(this.selectAddress.city);
        }
      }
    }, error => {
      console.log(error);
    });
  }
  /*
  * TODO 获取区列表
  * */
  getDistricts(cityCode) {
    this.SystemService.getDistricts({cityCode: cityCode}).subscribe( areas => {
      if (areas && areas.length > 0) {
        let tmp = [];
        areas.forEach( item => {
          tmp.push( {value: item.Code, label: item.Name} );
        });
        this.areaList = tmp;
      }
    }, error => {
      console.log(error);
    });
  }
  /*
  * TODO 选择省
  * */
  chooseProv(index) {
    if (index !== -1) {
      this.selectAddress.province = this.provinceList[index]['value'];
      this.selectAddress.city = null;
      this.selectAddress.area = null;
      this.citiesList = [];
      this.areaList = [];
      this.cityIndex = 0;
      this.areaIndex = 0;
      console.log(this.provinceList[index]['value']);
      this.getCities(this.provinceList[index]['value']);
      this.errInfo = '请选择市';
    }else {
      this.citiesList = [];
      this.areaList = [];
    }
    console.log(this.selectAddress);
  }
  /*
  * TODO 选择市
  * */
  chooseCity(index) {
    console.log(index);
    if (index !== -1) {
      this.selectAddress.city = this.citiesList[index]['value'];
      this.selectAddress.area = null;
      this.areaList = [];
      this.areaIndex = 0;
      this.getDistricts(this.citiesList[index]['value']);
      this.errInfo = '请选择区';
    }else {
      this.areaList = [];
    }
  }
  /*
  * TODO 选择区
  * */
  chooseArea(index) {
    // console.log(index);
    if (index !== -1) {
      this.errInfo = '';
      this.selectAddress.area = this.areaList[index]['value'];
      console.log(this.selectAddress);
      this.onChangeAddress.emit(this.selectAddress);
    }
  }
}
