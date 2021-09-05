import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class FoodtypeService {


  constructor(private httpClient: HttpClient) { }

  getAllResto(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-all-restaurant',body,{ headers })
  }
  getOtherResto(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-other-store',body,{ headers })
  }
  getRecentOrder(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-recentorder',body,{ headers })
  }

  getBanner(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage_banner',body,{ headers })
  }
  getBannerSub(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage_subbanner',body,{ headers })
  }
  searchResto(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'home-search-restaurant',body,{ headers })
  }
  categoryBasedResto(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'category_based_restaurant',body,{ headers })
  }
  seeallResto(body,headers,path) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-seeall',body,{ headers })
  }
  getPromotion(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-promotion',body,{ headers })
  }
  getAdvertisement(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-advertisement',body,{ headers })
  }
  getRecomemnded(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'recommendationforyouweb',body,{ headers })
  }
  getBranchlist(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant-branch',body,{ headers })
  }

  getCategoryList(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'homepage-category-list',body,{ headers })
  }
  quickView(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'quck-view',body,{ headers })
  }
  quickSearch(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'quck-search',body,{ headers })
  }
  specialOffer(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'special-offer',body,{ headers })
  }
}
