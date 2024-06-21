import { Component, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from '../service/api.service';
import { DatePipe } from '@angular/common';


export interface Message {
  type: string;
  message: string;
  dateTimeStamp:string;
}

@Component({
  selector: 'app-chat-support',
  templateUrl: './chat-support.component.html',
  styleUrls: ['./chat-support.component.scss'],
})
export class ChatSupportComponent {
  isOpen = false;
  loading = false;
  currentDateTime:any;
  messages: Message[] = [];
  chatForm = new FormGroup({
    message: new FormControl('', [Validators.required]),
  });
  @ViewChild('scrollMe') private myScrollContainer: any;

  constructor(private messageService: MessageService, public datepipe: DatePipe) {
  }

  openSupportPopup() {
    this.isOpen = !this.isOpen;
  }

  sendMessage() {
    this.currentDateTime = this.getDateTimeStamp();
    const sentMessage = this.chatForm.value.message!;
    this.loading = true;
    this.messages.push({
      type: 'user',
      message: sentMessage,
      dateTimeStamp:this.currentDateTime
    });
    this.chatForm.reset();
    this.scrollToBottom();
    this.messageService.sendMessage(sentMessage).subscribe((response: any) => {
     
      for (const obj of response) {
        let value
        if (obj.hasOwnProperty('text') ) {
          value = obj['text']
          this.pushMessage(value)

        }
        if (obj.hasOwnProperty('image') ) {
          value = obj['image']
          this.pushMessage(value)
        }
      }
    });
  }

  pushMessage(message:string){
    this.currentDateTime=this.getDateTimeStamp();
     this.messages.push({
        type: 'client',
        message: message
        ,dateTimeStamp:this.currentDateTime
      });
      this.scrollToBottom();
  }

  getDateTimeStamp(){
    return this.datepipe.transform(new Date(), 'dd-MM-yyyy hh:mm:ss');
  }

  scrollToBottom() {
    setTimeout(() => {
      try {
        this.myScrollContainer.nativeElement.scrollTop =
          this.myScrollContainer.nativeElement.scrollHeight + 500;
      } catch (err) {}
    }, 150);
  }
}
