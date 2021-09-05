import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private httpClient: HttpClient) { }
  orderHistory(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'my_orders',body,{ headers })
  }
  orderInvoice(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'customer_invoice',body,{ headers })
  }
  orederTracking(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'order_tracking',body,{ headers })
  }
  restoDirection(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant-direction',body,{ headers })
  }
  repeatOrder(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'repeat_order',body,{ headers })
  }


}
