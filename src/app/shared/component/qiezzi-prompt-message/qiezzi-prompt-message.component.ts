import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-prompt-message',
  templateUrl: './qiezzi-prompt-message.component.html',
  styleUrls: ['./qiezzi-prompt-message.component.css']
})
export class PromptMessageComponent implements OnInit {
  @Input()
  message: string;

  @Output()
  onClose = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  closePrompt() {
    this.onClose.emit();
  }

  setMessage(val: string) {
    this.message = val;
  }
}
