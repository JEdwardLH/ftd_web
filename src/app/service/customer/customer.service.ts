import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private httpClient: HttpClient) { }
  getAddress(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'customer_shipping_address',body,{ headers })
  }
  getUserInfo(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'customer_my_account',body,{ headers })
  }
  updateInfo(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'update_contact_info',body,{ headers })
  }
  changepassword(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'customer_reset_password',body,{ headers })
  }
  updateprofile(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'update_profile',body,{ headers })
  }
  isEmailVerify(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'email-is-verify',body,{ headers })
  }
  isPhoneVerify(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-is-verify',body,{ headers })
  }
  EmailOtp(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'email-code-request',body,{ headers })
  }
  PhoneOtp(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-otp-request',body,{ headers })
  }
  ActivatePhone(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-otp-activate',body,{ headers })
  }
  ActivateEmail(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'email-code-activate',body,{ headers })
  }
  ForgotPassword(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'customer_forgot_password',body,{ headers })
  }
  getreferlink(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'referal-link',body,{ headers })
  }
  sendEmailReferal(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'refer_friend_send_mail',body,{ headers })
  }
  getRewards(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'check-rewards',body,{ headers })
  }
  claimRewards(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'claim-rewards',body,{ headers })
  }
  FoodRating(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'food-rating',body,{ headers })
  }
  RestoRating(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'restaurant-rating',body,{ headers })
  }
  OrderRating(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'order-rating',body,{ headers })
  }
  CheckRating(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'check-rating',body,{ headers })
  }
  GetCouponList(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'getvoucher-list',body,{ headers })
  }
}
