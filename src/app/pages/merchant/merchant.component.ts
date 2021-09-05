import { Component, ViewChild, ElementRef, OnInit, Inject, Renderer2 } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { DelboyserviceService } from 'src/app/service/rider/delboyservice.service'
import { LoginService } from 'src/app/service/login/login.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReCaptchaV3Service } from 'ng-recaptcha';
@Component({
  selector: 'app-merchant',
  templateUrl: './merchant.component.html',
  styleUrls: ['./merchant.component.css']
})
export class MerchantComponent implements OnInit {

  @ViewChild('captcha_mer')
  public captcha_mer: ElementRef;
  // LANGUAGE
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
  iconVisible = true;
  iconVisible2 =false;
  iconVisible3 =false;
  iconVisible4 =false;
  cus_phone_code = "+66"
  countryCodeList: any;
  invalidPhone = false
  areaList = [];
  areacover = ""
  firstnameerrorshow = false
  lastnameerrorshow = false
  captcha: string
  invalidcaptcha = false
  constructor(private renderer: Renderer2, private recaptchaV3Service: ReCaptchaV3Service, private StringTServiceL: StringTService, private DelboyserviceService: DelboyserviceService, private LoginService: LoginService, public dialog: MatDialog) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;
      setTimeout(() => {
        this.createCaptcha('mer')
      }, 2000);

    })
  }
  public executeImportantAction(): void {
    this.recaptchaV3Service.execute('importantAction')
      // .subscribe((token) => this.handleToken(token));
  }
  code: string
  phonecode: string

  ngOnInit(): void {

    this.getArealist()
    this.getMeta()

  }


  ngAfterViewInit() {

  }
  checkfield() {

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
  mouseEnter() {
    console.log("mouse enter");
    this.iconVisible = true;
    this.iconVisible2 = false;
    this.iconVisible3 = false;
    this.iconVisible4 = false;
  }
  mouseEnter2() {
    console.log("mouse enter");
    this.iconVisible2 = true;
    this.iconVisible = false;
    this.iconVisible3 = false;
    this.iconVisible4 = false;
  }
  mouseEnter3() {
    console.log("mouse enter");
    this.iconVisible3 = true;
    this.iconVisible2 = false;
    this.iconVisible = false;
    this.iconVisible4 = false;
  }
  mouseEnter4() {
    console.log("mouse enter");
    this.iconVisible4 = true;
    this.iconVisible2 = false;
    this.iconVisible3 = false;
    this.iconVisible = false;
  }
  // mouseLeave() {
  //   console.log("mouse leave");
  //   this.iconVisible = false;
  // }
  // mouseLeave2() {
  //   console.log("mouse leave");
  //   this.iconVisible2 = false;
  // }
  // mouseLeave3() {
  //   console.log("mouse leave");
  //   this.iconVisible3 = false;
  // }
  // mouseLeave4() {
  //   console.log("mouse leave");
  //   this.iconVisible4 = false;
  // }
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
    localStorage.mer_phonenumber = this.cus_phone_code + this.cus_phone1;
    localStorage.mer_email = this.email;
    localStorage.mer_fname = this.fname;
    localStorage.mer_lname = this.lname;

    const body = {
      lang: this.lang, mer_email: this.email, mer_fname: this.fname, mer_lname: this.lname, mer_phone: this.mobile, servicearea: this.areacover, mer_business_type_name: "Restaurant", mer_business_type: 2,
      currency_code: '₱'
    }

    this.DelboyserviceService.SignupMerchant(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        localStorage.mer =  btoa(data.data)
        location.href = "/merchantsignup/apply/companyinfo/" + btoa(data.data)
      } else {
        this.openDialog(data.message)
      }

    }, (error: any) => {

    })
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      height: '150px',
      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

}
@Component({
  selector: 'merchant.componentsdialog',
  templateUrl: 'merchant.dialog.html',
})
export class DialogOverviewExampleDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: MerchantComponent) {
    this.message = this.data
  }


  close(): void {
    this.dialogRef.close();

  }


}
