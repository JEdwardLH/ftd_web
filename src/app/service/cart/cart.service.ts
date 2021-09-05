import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private httpClient: HttpClient) { }

  getCart(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'my_cart',body,{ headers })
  }
  getCartWVcode(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'check_coupon',body,{ headers })
  }
  addCart(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'add_to_cart',body,{ headers })
  }
  updateQTY(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'qty_update_cart',body,{ headers })
  }
  removeCart(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'remove_from_cart',body,{ headers })
  }
  clearCart(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'clear_cart',body,{ headers })
  }
  placeOrder(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'cod_checkout',body,{ headers })
  }
  searchResult(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant-searchsuggestion',body,{ headers })
  }
  searchSuggestion(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant-suggestion',body,{ headers })
  }

}
