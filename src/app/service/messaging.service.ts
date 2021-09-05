import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import{ GlobalConstants } from 'src/app/common/global-constants';
import { HttpClient } from "@angular/common/http";

@Injectable()
export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging,private httpClient: HttpClient) {

    this.angularFireMessaging.messages.subscribe(
      (_messaging: AngularFireMessaging) => {
        _messaging.onMessage = _messaging.onMessage.bind(_messaging);
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);
      })
  }
  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        var headers = {};
        console.log(token);
        if (localStorage.usermode == "1") {
          var tk = localStorage.hntk;
          headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
        } else {
          headers = headers = { 'Content-Type': 'application/json' }
        }

        //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
        const body = {  lang: 'en',fcmid:token }

        this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'update-web-fcmid',body,{ headers }).subscribe((data: any) => {




        })
      });
  }

  receiveMessage() {
    this.angularFireMessaging.messages.subscribe(
      (msg) => {
        console.log("show message!", msg);

        this.currentMessage.next(msg);
      })
  }
}
