import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private httpClient: HttpClient) { }

  userLogin(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'user_login',body,{ headers })
  }
  googleLogin(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'google_signin',body,{ headers })
  }
  facebookLogin(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'facebook_signin',body,{ headers })
  }
  googleRegister(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'google_register',body,{ headers })
  }
  facebookRegister(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'facebook_register',body,{ headers })
  }
  userRegistration(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'registration',body,{ headers })
  }
  getMetaCountry(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'country_list',body,{ headers })

  }
  checkPhoneIsValid(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-is-valid',body,{ headers })

  }
  checkPhoneIsVerify(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-is-verify',body,{ headers })

  }
  otpRequest(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-otp-request',body,{ headers })

  }
  phoneAvtivate(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPointCustomer + 'phone-otp-activate',body,{ headers })

  }
  checkRegister(body,headers) {
    return this.httpClient.post(GlobalConstants.APIEndPoint + 'checkregistration',body,{ headers })

  }
}
