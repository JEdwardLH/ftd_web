import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class MerchantService {

  constructor(private httpClient: HttpClient) { }
  restaurantDetails(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant_details',body,{ headers })
  }
  storenametostoreid(body) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'storename-to-id',body,{ })
  }
}
