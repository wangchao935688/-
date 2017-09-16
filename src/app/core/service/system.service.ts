import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {ApiMethod} from '../api-method';
import * as DictRequestResponse from '../messages/dict-request-response';
import {Observable} from 'rxjs';
import * as config from '../../../web-config';
import {Observer} from 'rxjs/Observer';
import {ServiceTypeEnum} from '../enums/upload-service-type.enum';
import {CookieService} from 'ngx-cookie';
import {GetAreaResponse, GetCitiesRequest, GetDistrictsRequest} from '../messages/system-request-response';

@Injectable()
export class SystemService {
  static getFileMediaType(filename: string): string {
    switch (filename.split('.').reverse()[0].toLowerCase()) {
      case 'png':
        return 'image/png';
      case 'jpg':
      case 'jpeg':
        return 'image/jpeg';
      case 'bmp':
        return 'image/bmp';
      case 'gif':
        return 'image/gif';
    }

  }

  constructor(private httpService: HttpService, private cookie: CookieService) {
  }



  uploadImages(files: FileList): Observable<any> {
    let self = this;
    return Observable.create((observer: Observer<any>) => {
      let requests: FormData[] = [], len = files.length;

      for (let i = 0; i < files.length; i++) {
        let filename = files[i].name;
        let formData = new FormData();
        formData.append('Attachment', files[i]);
        formData.append('ServiceType', ServiceTypeEnum.QINIU);
        requests.push(formData)
      }

      let xhr2;

      function createHttp() {
        xhr2 = new XMLHttpRequest();
        xhr2.upload.onprogress = uploadProgress;
        xhr2.onload = uploadComplete;
        xhr2.onerror = uploadFailed;
        xhr2.onabort = uploadCanceled;
      }

      function clearHttp() {
        xhr2.upload.onprogress = null;
        xhr2.onload = null;
        xhr2.onerror = null;
        xhr2.onabort = null;
        xhr2 = null;
      }

      function uploadProgress(evt: ProgressEvent) {
        if (evt.lengthComputable) {
          console.log(Math.round(evt.loaded * 100 / evt.total) + '%');
        }
      }

      function uploadComplete(evt: Event) {
        clearHttp();
        uploadNext();
      }

      function uploadFailed(evt: Event) {
        console.log('error');
      }

      function uploadCanceled(evt: Event) {
        console.log('cancel');
      }

      function uploadNext() {
        console.log('ok111');
        let request = requests.shift();
        if (request) {
          createHttp();
          xhr2.open('POST', config.host + ApiMethod.SysConfig_UploadImage);

          xhr2.setRequestHeader('Authorization', self.cookie.get('globals_user'));
          xhr2.setRequestHeader('Worker', self.cookie.get('globals'));

          xhr2.send(request);
        } else {
          uploadAllComplete();
        }
      }

      function uploadAllComplete() {
        console.log('ok');
      }

      uploadNext();
    });

  }

  uploadImage(file: File | Blob): Observable<any> {
    let self = this;
    return Observable.create((observer: Observer<any>) => {
      let request: FormData = new FormData();
      request.append('Attachment', file, 'img_upload.png');
      request.append('ServiceType', ServiceTypeEnum.QINIU);

      let xhr2 = new XMLHttpRequest();
      xhr2.upload.onprogress = uploadProgress;
      xhr2.onload = uploadComplete;
      xhr2.onerror = uploadFailed;
      xhr2.onabort = uploadCanceled;

      xhr2.open('POST', config.host + ApiMethod.SysConfig_UploadImage);

      xhr2.setRequestHeader('Authorization', self.cookie.get('globals_user'));
      xhr2.setRequestHeader('Worker', self.cookie.get('globals'));

      xhr2.send(request);

      function clearHttp() {
        xhr2.upload.onprogress = null;
        xhr2.onload = null;
        xhr2.onerror = null;
        xhr2.onabort = null;
        xhr2 = null;
      }

      function uploadProgress(evt: ProgressEvent) {
        if (evt.lengthComputable) {
          console.log(Math.round(evt.loaded * 100 / evt.total) + '%');
        }
      }

      function uploadComplete(evt: Event) {
        observer.next(xhr2.responseText);
        observer.complete();
        clearHttp();
        request = null;
      }

      function uploadFailed(evt: Event) {
        console.log('error');
      }

      function uploadCanceled(evt: Event) {
        console.log('cancel');
      }
    });
  }

  /**
   * 获取省列表
   */
  getProvinces(requestData: any): Observable<GetAreaResponse[]> {
    return this.httpService.get(ApiMethod.sysConfig_GetProvinces, requestData);
  }
  /**
   * 获取市列表
   */
  getCities(requestData: GetCitiesRequest): Observable<GetAreaResponse[]> {
    return this.httpService.get(ApiMethod.sysConfig_GetCities, requestData);
  }
  /**
   * 获取区列表
   */
  getDistricts(requestData: GetDistrictsRequest): Observable<GetAreaResponse[]> {
    return this.httpService.get(ApiMethod.sysConfig_GetDistricts, requestData);
  }

}

