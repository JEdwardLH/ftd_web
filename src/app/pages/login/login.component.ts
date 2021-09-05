import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service'
import { FormsModule  } from "@angular/forms";
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
declare let fbq: Function;
declare function GrowlNotification() : any;
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

  email:string;
  password:string;
  invalidcreds: boolean;
  user: SocialUser;
  loggedIn: boolean;
  lang:string;
  constructor(private LoginService: LoginService,private authService: SocialAuthService, private StringTServiceL: StringTService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })

  }

  ngOnInit(): void {
    if(localStorage.language == "th"){
      this.lang = "th"
    }else{
      this.lang = "en"
    }
    if(localStorage.usermode == "1"){
      window.location.href='/';
    }

    this.authService.authState.subscribe((user) => {
      this.user = user;
      if(user.provider=="GOOGLE"){
          this.googleLogin(this.user)
      }else{
          this.facebooklogin(this.user)
      }
      console.log(this.user)

      this.loggedIn = (user != null);
    });

  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signInWithFB(): void {

    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  public login(){
    const headers = {  'Content-Type': 'application/json' }
    const body = { cus_password: this.password,login_id:this.email,type:'test',lang:this.lang};
    this.LoginService.userLogin(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        localStorage.setItem("hntk",data.data.token)
        localStorage.setItem("user_email",data.data.user_email)
        localStorage.setItem("user_name",data.data.user_name)
        localStorage.setItem("usermode","1");
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        localStorage.timeIn = currentTime;
        window.location.href='/';
      }
      this.invalidcreds = false
    },(error: any) =>{
      this.invalidcreds = true
    })
  }
  private googleLogin(googleuser){
    const headers = {  'Content-Type': 'application/json' }
    const body = { google_id: googleuser.id,email:googleuser.email,name:googleuser.name,firstname:googleuser.firstName,lastname:googleuser.lastName,lang:this.lang};
    this.LoginService.googleLogin(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        console.log(data.data)
        localStorage.setItem("hntk",data.data.token)
        localStorage.setItem("user_email",data.data.user_email)
        localStorage.setItem("user_name",data.data.user_name)
        localStorage.setItem("usermode","1");
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        localStorage.timeIn = currentTime;
        window.location.href='/';
      }
      this.invalidcreds = false
    },(error: any) =>{
      this.invalidcreds = true
    })
  }
  private facebooklogin(facebookuser){
    const headers = {  'Content-Type': 'application/json' }
    const body = { facebook_id: facebookuser.id,email:facebookuser.email,name:facebookuser.name,firstname:facebookuser.firstName,lastname:facebookuser.lastName,lang:this.lang};
    this.LoginService.facebookLogin(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        console.log(data.data)
        localStorage.setItem("hntk",data.data.token)
        localStorage.setItem("user_email",data.data.user_email)
        localStorage.setItem("user_name",data.data.user_name)
        localStorage.setItem("usermode","1");
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        localStorage.timeIn = currentTime;
        window.location.href='/';
      }
      this.invalidcreds = false
    },(error: any) =>{
      this.invalidcreds = true
    })
  }
}
