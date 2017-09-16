import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {SystemService} from "../../../core/service/system.service";

@Component({
  selector: 'app-qiezzi-upload',
  templateUrl: './qiezzi-upload.component.html',
  styleUrls: ['./qiezzi-upload.component.scss']
})
export class QiezziUploadComponent implements OnInit {

  @ViewChild('fileUpload')
  fileUpload: ElementRef;

  @ViewChild('fileDrag')
  fileDrag: ElementRef;

  @Input()
  multiple: string;


  constructor(private systemService: SystemService) {
  }

  ngOnInit() {
    // 阻止document的与拖拽相关的事件默认处理方式
    document.ondragleave = function (e) {
      e.preventDefault();
    };
    document.ondrop = function (e) {
      e.preventDefault();
    };
    document.ondragenter = function (e) {
      e.preventDefault();
    };
    document.ondragover = function (e) {
      e.preventDefault();
    }
  }

  onImageDropIn(evt) {
    evt.preventDefault(); //取消浏览器默认拖拽处理
    let fileList = evt.dataTransfer.files; //获取文件对象

    console.log(fileList);
  }

  onClickPost() {
    this.systemService.uploadImages((<HTMLInputElement>this.fileUpload.nativeElement).files).subscribe(t => {
      console.log(t);
    });
  }
}
