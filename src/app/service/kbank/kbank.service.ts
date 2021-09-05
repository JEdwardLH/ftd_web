import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class KbankService {

  constructor(private httpClient: HttpClient) { }

  kbanktoken(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'k-token',body,{ headers })
  }

  cardlist(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'k-customer-inquiry',body,{ headers })
  }

  addcard(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'k-customer-add-card',body,{ headers })
  }
  addcardconfirm(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'k-customer-addcard-confirm',body,{ headers })
  }
  deletecard(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'k-customer-remove-card',body,{ headers })
  }
}
