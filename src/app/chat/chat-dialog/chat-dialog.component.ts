import { Component, OnInit, AfterViewChecked, ElementRef, ViewChild } from '@angular/core';
import { ChatService, Message } from '../chat.service';
import { Observable} from 'rxjs/index';
import { ModalDirective } from 'ngx-bootstrap';
import {scan} from 'rxjs/internal/operators';
import { of} from 'rxjs';
declare let $: any;


@Component({
  selector: 'app-chat-dialog',
  templateUrl: './chat-dialog.component.html',
  styleUrls: ['./chat-dialog.component.css']
})
export class ChatDialogComponent implements OnInit, AfterViewChecked {

  messages: Observable<Message[]>;
  noInternetConnection = false;
  formValue: string;
  @ViewChild('chatModal', { static: false }) public chatModal: ModalDirective;
  @ViewChild('scrollMe', {static: false}) private myScrollContainer: ElementRef;

  constructor(public chat: ChatService) {
    if (navigator.onLine) {
      this.noInternetConnection = false;
    } else {
      this.noInternetConnection = true;
    }
  }

    ngOnInit() {

    // appends to array after each new message is added to feedSource
      this.messages = this.chat.conversation.asObservable().pipe(
        scan((acc, val) => acc.concat(val))
      )
      this.scrollToBottom();
    }

    openForm() {
      this.chatModal.show();
    }

    sendMessage() {
    this.chat.converse(this.formValue);
    this.formValue = '';
    const scrollDiv = $('#chatId');
    scrollDiv.animate({scrollTop: scrollDiv.prop('scrollHeight') + 100  - scrollDiv.height()});

    }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  clearOldMessage() {
    // To remove old messages
    this.messages = of([]);
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  textValidation(event: any) {
    const text = this.formValue.trim();
    if (text === '' && length === 0 && event.which === 32) {
      event.preventDefault();
      return false;
    }
    if(text === '' && event.which === 13) {
      return false;
    }
    if (event.which === 13 && !event.shiftKey) {
      return false;
    }
  }

  canSend(event: KeyboardEvent ) {
    const key = event.key;
    if (key === 'Enter' && !event.shiftKey){
      const str = $('#chatText').val();
      if (!str.replace(/\s/g, '').length) {
        return false;
      } else {
        this.sendMessage();
      }
    }
  }
}
