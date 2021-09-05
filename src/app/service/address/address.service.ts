import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private httpClient: HttpClient) { }

  latlongtoaddress(body) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'geocoding',body,{  })
  }
  getMetaLocation(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'get_meta',body,{ headers })
  }
  saveLocation(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'add_multiple_ship_address',body,{ headers })
  }
  deleteLocation(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'delete_multiple_ship_address',body,{ headers })
  }
  restaurantRange(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant-range',body,{ headers })
  }

  saveShipping(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'save_shipping_address',body,{ headers })
  }


}
