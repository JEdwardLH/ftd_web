import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class DelboyserviceService {

  constructor(private httpClient: HttpClient) { }
  Signup(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'delivery_person_register',body,{ headers })
  }
  SignupMerchant(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'merchant_store_register',body,{ headers })
  }
  GetAreaList(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'countrycode_list',body,{ headers })
  }
  uploadFile(formData) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'delivery/delivery_uploadimage',formData,{})
  }
  merchantset_companyinfo(formData) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'merchant/update-companyinfo',formData,{})
  }
  merchantset_storeinfo(formData) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'merchant/update-storeinfo',formData,{})
  }
  merchantset_ownerinfo(formData) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'merchant/update-ownerinfo',formData,{})
  }


}
