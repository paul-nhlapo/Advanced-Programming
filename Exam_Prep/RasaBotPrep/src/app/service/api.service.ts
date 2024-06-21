import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  constructor(private http: HttpClient) {}

  sendMessage(message: string) {
    return this.http.post('http://34.125.52.118:5005/webhooks/rest/webhook', { message: message });
  }
}
