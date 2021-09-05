import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor(private httpClient: HttpClient) { }
  sendInquiry(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'send_Inquiry',body,{ headers })
  }
}
