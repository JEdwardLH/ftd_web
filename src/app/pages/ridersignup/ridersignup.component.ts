import { Component, ViewChild, ElementRef, OnInit, Inject, Renderer2 } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { DelboyserviceService } from 'src/app/service/rider/delboyservice.service'
import { LoginService } from 'src/app/service/login/login.service'

@Component({
  selector: 'app-ridersignup',
  templateUrl: './ridersignup.component.html',
  styleUrls: ['./ridersignup.component.css']
})
export class RidersignupComponent implements OnInit {
  // LANGUAGE
  @ViewChild('captcha_mer')
  public captcha_mer: ElementRef;
  LanguageText: any;
  isLanguageLoaded = false;
  lang: any
  email = ""
  fname = ""
  lname = ""
  mobile = ""
  searchcode = ""
  servicearea = ""
  cus_phone1 = ""
  invalidemailaddress = false
  cus_phone_code = "+66"
  countryCodeList: any;
  invalidPhone = false
  areaList = [];
  areacover = ""
  firstnameerrorshow = false
  lastnameerrorshow = false
  captcha: string
  invalidcaptcha = false
  code: any
  constructor(private renderer: Renderer2, private StringTServiceL: StringTService, private DelboyserviceService: DelboyserviceService, private LoginService: LoginService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;
      setTimeout(() => {
        this.createCaptcha('mer')
      }, 2000);
    })
  }
  riderfaqOptions={items: 1, dots: true, nav:false, autoplau:false };

  ngOnInit(): void {
    this.getArealist()
    this.getMeta()

  }
  signUp() {
    if (this.captcha != this.code) {
      this.invalidcaptcha = true

      return
    } else {
      this.invalidcaptcha = false
    }
    this.createCaptcha('mer')
    var headers = {};



    headers = headers = { 'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    this.mobile = this.cus_phone_code + this.cus_phone1
    const body = { lang: this.lang, email: this.email, fname: this.fname, lname: this.lname, mobile: this.mobile, servicearea: this.areacover }

    this.DelboyserviceService.Signup(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        location.href = "/riderprocess/" + btoa(data.data)
      } else {

      }

    }, (error: any) => {

    })
  }
  firstnamechange() {
    if (!this.fname) {
      this.firstnameerrorshow = true
      return
    } else {
      this.firstnameerrorshow = false
    }
  }
  lastnamechange() {
    if (!this.lname) {
      this.lastnameerrorshow = true
      return
    } else {
      this.lastnameerrorshow = false
    }
  }
  firstnameerror() {
    if (this.fname == "") {
      return true
    } else {
      return false
    }
  }
  lastnameerror() {
    if (this.lname == "") {
      return true
    } else {
      return false
    }
  }
  getArealist() {
    var headers = {};

    headers = headers = { 'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang }

    this.DelboyserviceService.GetAreaList(body, headers).subscribe((data: any) => {
      this.areaList = data.data

    }, (error: any) => {

    })
  }
  emailchange(email) {
    if (!this.email) {
      this.invalidemailaddress = true
      return
    } else {
      this.invalidemailaddress = false
    }
    this.email = email
  }
  createCaptcha(type) {
    //clear the contents of captcha div first
    const childElements = this.captcha_mer.nativeElement.children;
    for (let child of childElements) {
      this.renderer.removeChild(this.captcha_mer.nativeElement, child);
    }
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 5;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Akronim";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");


    this.renderer.appendChild(this.captcha_mer.nativeElement, canv)

  }
  selectCode(code) {
    this.cus_phone_code = code;
    var s = this.cus_phone1
    if (this.cus_phone1 != "") {
      if (this.cus_phone_code == "+66") {
        s = s.replace(/^0+/, '');
      }
      this.CheckPhone(this.cus_phone_code + s)
    }

  }
  phoneNumberChange(number) {

    if (!this.cus_phone1) {
      this.invalidPhone = true
    } else {
      this.invalidPhone = false
      var s = this.cus_phone1
      if (this.cus_phone_code == "+66") {
        s = s.replace(/^0+/, '');
      }
      this.CheckPhone(this.cus_phone_code + s)
    }

  }
  public getMeta() {
    this.countryCodeList = [];
    const headers = { 'Content-Type': 'application/json' }


    const body = { lang: "en" };
    this.LoginService.getMetaCountry(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.countryCodeList = data.data.country_code_list
        this.cus_phone_code = data.data.country_details[0].country_dial;
      }

    }, (error: any) => {

    })
  }
  public CheckPhone(number) {

    const headers = { 'Content-Type': 'application/json' }
    const body = { lang: "en", mobile: number };
    this.LoginService.checkPhoneIsValid(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        this.invalidPhone = false;
      } else {
        this.invalidPhone = true;
        console.log(data.data)
      }

    }, (error: any) => {
      console.log(error)
    })
  }
  checkfield() {

  }
  isMatched(country) {
    if (this.searchcode == "") {
      return false
    }
    if (country.country_name.toLowerCase().includes(this.searchcode.toLowerCase()) || country.country_dial.includes(this.searchcode)) {
      return false;
    } else {
      return true;
    }
  }
}
