import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }
  getAllProductByResto(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'all_product',body,{ headers })
  }
  getProductDetails(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'item_details',body,{ headers })
  }
  getProductOptionbyStore(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'get-product-option-by-store',body,{ headers })
  }
}
