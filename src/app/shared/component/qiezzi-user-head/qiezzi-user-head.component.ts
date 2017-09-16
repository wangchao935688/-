import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {SystemService} from '../../../core/service/system.service';
import {PopupWindowBaseComponent} from '../qiezzi-popup-window/popup-window-base/popup-window-base';

@Component({
  selector: 'app-qiezzi-user-head',
  templateUrl: './qiezzi-user-head.component.html',
  styleUrls: ['./qiezzi-user-head.component.scss']
})
export class QiezziUserHeadComponent extends PopupWindowBaseComponent implements OnInit, AfterViewInit {
  @ViewChild('resizeHolder')
  resizeHolder: ElementRef;

  @ViewChild('moveHolder')
  moveHolder: ElementRef;

  @ViewChild('fileSelector')
  fileSelector: ElementRef;

  @ViewChild('drawImage')
  drawImage: ElementRef;

  @ViewChild('drawClipCanvas')
  drawClipCanvas: ElementRef;

  @ViewChild('tempClipCanvas')
  tempClipCanvas: ElementRef;

  content: CanvasRenderingContext2D;
  clipContent: CanvasRenderingContext2D;
  tempContent: CanvasRenderingContext2D;

  isReady: boolean;
  viewImgDataURL: string;

  moveHolderMinTop: number;
  moveHolderMinLeft: number;

  moveHolderMaxTop: number;
  moveHolderMaxLeft: number;

  moveHolderOriginTop: number;
  moveHolderOriginLeft: number;

  moveHolderTop: number;
  moveHolderLeft: number;

  moveHolderOffsetX: number;
  moveHolderOffsetY: number;

  moveHolderClientX: number;
  moveHolderClientY: number;

  onMoveHolderMoveBinder: any;
  onMoveHolderUpBinder: any;

  resizeHolderMinSize: number;
  resizeHolderMaxSize: number;

  resizeHolderOriginSize: number;

  resizeHolderSize: number;

  resizeHolderOffsetValue: number;

  resizeHolderClientX: number;
  resizeHolderClientY: number;

  onResizeHolderMoveBinder: any;
  onResizeHolderUpBinder: any;
  closeData: any;
  constructor(private systemService: SystemService) {
    super();
  }

  ngAfterViewInit(): void {
    this.content = (<HTMLCanvasElement> this.drawImage.nativeElement).getContext('2d');
    this.clipContent = (<HTMLCanvasElement> this.drawClipCanvas.nativeElement).getContext('2d');
    this.tempContent = (<HTMLCanvasElement> this.tempClipCanvas.nativeElement).getContext('2d');
  }

  ngOnInit() {
    this.isReady = false;

    this.moveHolderMinTop = -250;
    this.moveHolderMinLeft = -250;

    this.moveHolderMaxTop = -102;
    this.moveHolderMaxLeft = -102;

    this.moveHolderOriginTop = -175;
    this.moveHolderOriginLeft = -175;

    this.moveHolderTop = -175;
    this.moveHolderLeft = -175;

    this.resizeHolderMinSize = 100;
    this.resizeHolderMaxSize = 248;
    this.resizeHolderOriginSize = 100;
    this.resizeHolderSize = 100;

    this.resizeHolderOffsetValue = 0;
  }

  onMoveHolderDown(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.onMoveHolderMoveBinder = this.onMoveHolderMove.bind(this);
    this.onMoveHolderUpBinder = this.onMoveHolderUp.bind(this);

    document.addEventListener('mousemove', this.onMoveHolderMoveBinder);
    document.addEventListener('mouseup', this.onMoveHolderUpBinder);

    this.moveHolderClientX = event.pageX;
    this.moveHolderClientY = event.pageY;
  }

  onMoveHolderMove(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.moveHolderOffsetX = event.pageX - this.moveHolderClientX;
    this.moveHolderOffsetY = event.pageY - this.moveHolderClientY;

    let tmpTop, tmpLeft;
    tmpTop = this.moveHolderOriginTop + this.moveHolderOffsetY;
    tmpLeft = this.moveHolderOriginLeft + this.moveHolderOffsetX;

    this.moveHolderTop = tmpTop < this.moveHolderMinTop ? this.moveHolderMinTop : ( tmpTop > this.moveHolderMaxTop ? this.moveHolderMaxTop : tmpTop);
    this.moveHolderLeft = tmpLeft < this.moveHolderMinLeft ? this.moveHolderMinLeft : (tmpLeft > this.moveHolderMaxLeft ? this.moveHolderMaxLeft : tmpLeft);

    let clipY = this.moveHolderTop + 250;
    let clipX = this.moveHolderLeft + 250;

    let imgData: ImageData = this.content.getImageData(clipX, clipY,
      this.resizeHolderOriginSize,
      this.resizeHolderOriginSize);

    this.clipContent.putImageData(imgData, 0, 0);
    this.viewImgDataURL = this.drawClipCanvas.nativeElement.toDataURL('image/png');
  }

  onMoveHolderUp(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    document.removeEventListener('mousemove', this.onMoveHolderMoveBinder);
    document.removeEventListener('mouseup', this.onMoveHolderUpBinder);

    this.onMoveHolderMoveBinder = null;
    this.onMoveHolderUpBinder = null;

    this.moveHolderOriginTop = this.moveHolderTop;
    this.moveHolderOriginLeft = this.moveHolderLeft;
  }

  onResizeHolderDown(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.onResizeHolderMoveBinder = this.onResizeHolderMove.bind(this);
    this.onResizeHolderUpBinder = this.onResizeHolderUp.bind(this);

    document.addEventListener('mousemove', this.onResizeHolderMoveBinder);
    document.addEventListener('mouseup', this.onResizeHolderUpBinder);

    this.resizeHolderClientX = event.pageX;
    this.resizeHolderClientY = event.pageY;
  }

  onResizeHolderMove(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    this.resizeHolderOffsetValue = Math.max(event.pageX - this.resizeHolderClientX, event.pageY - this.resizeHolderClientY);
    let tmpSize = this.resizeHolderOriginSize + this.resizeHolderOffsetValue;
    this.resizeHolderSize = tmpSize < this.resizeHolderMinSize ? this.resizeHolderMinSize : ( tmpSize > this.resizeHolderMaxSize ? this.resizeHolderMaxSize : tmpSize);

    let clipY = this.moveHolderTop + 250;
    let clipX = this.moveHolderLeft + 250;

    this.moveHolderMaxTop = -102 - (this.resizeHolderSize - 100);
    this.moveHolderMaxLeft = -102 - (this.resizeHolderSize - 100);

    if (clipY + this.resizeHolderSize > this.resizeHolderMaxSize)
      clipY = clipY + (this.resizeHolderMaxSize - clipY - this.resizeHolderSize );
    if (clipX + this.resizeHolderSize > this.resizeHolderMaxSize)
      clipX = clipX + (this.resizeHolderMaxSize - clipX - this.resizeHolderSize );

    this.moveHolderTop = clipY - 250;
    this.moveHolderLeft = clipX - 250;

    let imgData: ImageData = this.content.getImageData(clipX, clipY, this.resizeHolderSize, this.resizeHolderSize);
    this.clipContent.putImageData(imgData, 0, 0);
    this.viewImgDataURL = this.drawClipCanvas.nativeElement.toDataURL('image/png');
  }

  onResizeHolderUp(event: MouseEvent) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    event.preventDefault();

    document.removeEventListener('mousemove', this.onResizeHolderMoveBinder);
    document.removeEventListener('mouseup', this.onResizeHolderUpBinder);

    this.onResizeHolderMoveBinder = null;
    this.onResizeHolderUpBinder = null;

    this.resizeHolderOriginSize = this.resizeHolderSize;
  }

  imageRotateLeft() {
  }

  imageRotateRight() {
  }

  deleteUserHead() {
    this.content.clearRect(0, 0, 250, 250);
    this.clipContent.clearRect(0, 0,  this.resizeHolderSize,  this.resizeHolderSize);
    this.isReady = false;
    this.viewImgDataURL = '';
    (<HTMLInputElement>this.fileSelector.nativeElement).value = '';
  }

  onFileSelect(event) {
    event.stopPropagation();
    event.stopImmediatePropagation();
    let file, fileReader, img;
    if (this.fileSelector.nativeElement.files.length > 0) {
      file = this.fileSelector.nativeElement.files[0];

      fileReader = new FileReader();
      fileReader.onloadend = () => {
        fileReader.onloadend = null;
        this.isReady = true;
        img = new Image();
        img.onload = () => {
          img.onload = null;
          let dstX = 0, dstY = 0, dstWidth = 250, dstHeight = 250;
          if (img.width > img.height) {
            dstHeight = img.height / ( img.width / 250);
            dstY = (250 - dstHeight) / 2;
          } else {
            dstWidth = img.width / ( img.height / 250);
            dstX = (250 - dstWidth) / 2;
          }
          this.content.clearRect(0, 0, 250, 250);
          this.content.drawImage(img, 0, 0, img.width, img.height, dstX, dstY, dstWidth, dstHeight);

          let clipY = this.moveHolderTop + 250;
          let clipX = this.moveHolderLeft + 250;

          let imgData: ImageData = this.content.getImageData(clipX, clipY, this.resizeHolderSize, this.resizeHolderSize);

          this.clipContent.putImageData(imgData, 0, 0);
          this.viewImgDataURL = this.drawClipCanvas.nativeElement.toDataURL('image/png');
        };
        img.src = fileReader.result;
      };

      fileReader.readAsDataURL(file);
    }
  }

  onSaveClick() {
    let fileData = this.drawClipCanvas.nativeElement.toDataURL();
    let img = new Image();

    img.onload = () => {
      img.onload = null;
      this.tempContent.clearRect(0, 0, 100, 100);
      this.tempContent.drawImage(img, 0, 0, img.width, img.height, 0, 0, 100, 100);
      this.tempClipCanvas.nativeElement.toBlob((val) => {
        this.systemService.uploadImage(val).subscribe(t => {
          console.log(t);
          this.closeData = t;
        });
      }, 'image/png');
    };
    img.src = fileData;
    this.close();
    // fileData = fileData.split(',')[1];
    // fileData = window.atob(fileData);
    // let arr = new Uint8Array(fileData.length);
    // for (let i = 0; i < arr.length; i++) {
    //   arr[i] = fileData.charCodeAt(i);
    // }
    // let blob = new Blob([arr], {type: 'image/png', endings: 'transparent'});
    // this.systemService.uploadImage(blob).subscribe(t => {
    //   console.log(t)
    // });
  }
/*
* 关闭弹框
* */
  close() {
    this.close();
  }
}
