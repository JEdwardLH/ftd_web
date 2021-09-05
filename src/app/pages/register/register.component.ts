import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service'
import { SocialAuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider } from "angularx-social-login";
import { SocialUser } from "angularx-social-login";
import { StringTService } from '../../service/LanguageS/string-t.service';
import { AddressService } from 'src/app/service/address/address.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { FdatabaseService } from '../../service/firebase/fdatabase.service';
import { ActivatedRoute } from '@angular/router';
declare let gtag: Function;
declare let fbq: Function;
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})


export class RegisterComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  cus_fname: string;
  cus_lname: string;
  cus_email: string;
  emailcheck = ""
  searchcode = ""
  cus_password: string;
  invalidemailaddress = false
  emailexist = false
  numberexist = false
  mapshow = false
  cus_phone1 = "";
  verification_code = ""
  referral_code: string;
  cus_phone_code = "";
  lang: string;
  invalidPhone = false
  isverify = false
  isPhoneVerify = false
  thankyoushow = false
  clickedVerify = true
  firstnameerrorshow = false
  lastnameerrorshow = false
  showVerificationField = false
  InvalidVerificationCode = false
  isApplyShow = false
  isclicked = false
  isverifyclicked = false
  isverifyclicked2 = false
  verifynumber = ""
  user: SocialUser;
  loggedIn: boolean;
  LanguageText: any;
  timercount = 0
  isLanguageLoaded = false;
  isregisterdone = false
  ismodalshow = true
  //map
  title: string = 'AGM project';
  latitude :number
  longitude :number
  zoom = 20;
  centerlat = 0
  centerlong = 0
  testlat = 0.00
  address: string;
  cartDetails: any;
  cartGrandTotal: string;
  vouchercode: string;
  cartSubTotal: string;
  discountValue: string;

  hasCart = false
  private geoCoder;

  restoName = ""
  hasDiscout = false
  hasVouch = false;
  AllOptions: any;
  deliveryAddressList = [];
  selectedAddress: any;
  restoid = ""
  store_name = ""
  selectedAddressRadio = "0"
  showAddressList = true
  showAddressMap = true
  showAddressForm = false
  addressStep = 2
  searchlocation = ""
  location_id = ""
  addressname = "Home"
  buildingtype = "0"
  buildingname = ""
  Address = ""
  soi = ""
  moo = ""
  postalcode = ""
  houseno = ""
  note = ""
  floor = ""
  provinceList = []
  province = "0"
  districtList = []
  district = "0"
  subdistrictList = []

  subdistrict = "0"
  active2 = ""
  active3 = ""
  durationInSeconds = 5;
  firstname = ""
  lastname = ""
  email = ""
  checkoutphonenumber = ""
  checkoutemail = ""
  checkoutfirstname = ""
  checkoutlastname = ""
  phonenumber = ""
  phonecode = "+66"

  isPhoneverify = false
  isEmailverify = false
  emailOtpCodeVisible = false
  phoneOtpCodeVisible = false
  emailvcode = ""
  phonenumbervcode = ""
  latlongaddressresult = {}
  selectedlat = 0
  selectedlon = 0
  selectedaddresstodelete:any;
  referalcode = ""
  //map
  constructor(private actRoute: ActivatedRoute,public FdatabaseService:FdatabaseService,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader,private AddressService: AddressService,private LoginService: LoginService, private authService: SocialAuthService, private StringTServiceL: StringTService,public dialog: MatDialog) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })
    if (this.actRoute.snapshot.params.hasOwnProperty("id")) {
      this.referalcode = this.actRoute.snapshot.params.id;
      if (this.getMobileOperatingSystem() == "Android") {
        location.href = 'kalanbanga://kalanbanga.co.th/registration/'+this.referalcode;
      } else if (this.getMobileOperatingSystem() == "iOS") {
        location.href = 'kalanbanga://kalanbanga.co.th/registration/'+this.referalcode
      }

    }
  }
  countryCodeList: any;
  ngOnInit(): void {

    this.FdatabaseService.callmobile().subscribe((data: any) => {

      // this.invalidcreds = false
    }, (error: any) => {
      // this.invalidcreds = true
    })
    this.getMeta('province', '', 0)
    setInterval(() => {
      this.countDown()
    }, 1000);
    if (localStorage.usermode == "1") {
      if (this.isregisterdone == false)
        window.location.href = '/';
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    this.getMetaCODE();
    this.authService.authState.subscribe((user) => {
      this.user = user;
      if (user.provider == "GOOGLE") {
        this.googleRegister(this.user)
      } else {
        this.facebookRegister(this.user)
      }
      console.log(this.user)
      document.getElementById("showloadingclick").click();
      this.loggedIn = (user != null);
    });
  }
  public countDown() {
    if (this.timercount > 0) {
      this.timercount = this.timercount - 1
      console.log(this.timercount)
    }
    console.log(this.timercount)
  }
  signUpWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  signUpWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  signOut(): void {
    this.authService.signOut();
  }
  checkfield(){

  }
  isMatched(country){
    if(this.searchcode==""){
      return false
    }
    if(country.country_name.toLowerCase().includes(this.searchcode.toLowerCase())||country.country_dial.includes(this.searchcode)){
      return false;
    }else{
      return true;
    }
  }
  private googleRegister(googleuser) {
    const headers = { 'Content-Type': 'application/json' }
    const body = { google_id: googleuser.id, email: googleuser.email, name: googleuser.name, firstname: googleuser.firstName, lastname: googleuser.lastName, lang: this.lang,referby:this.referalcode };
    this.LoginService.googleRegister(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        console.log(data.data)
        localStorage.setItem("hntk", data.data.token)
        localStorage.setItem("user_email", data.data.user_email)
        localStorage.setItem("user_name", data.data.user_name)
        localStorage.setItem("usermode", "1");
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        localStorage.timeIn = currentTime;
        this.savShipping()
      }
      // this.invalidcreds = false
    }, (error: any) => {
      // this.invalidcreds = true
    })
  }
  private facebookRegister(facebookuser) {
    const headers = { 'Content-Type': 'application/json' }
    const body = { facebook_id: facebookuser.id, email: facebookuser.email, name: facebookuser.name, firstname: facebookuser.firstName, lastname: facebookuser.lastName, lang: this.lang,referby:this.referalcode };
    this.LoginService.facebookRegister(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        console.log(data.data)
        localStorage.setItem("hntk", data.data.token)
        localStorage.setItem("user_email", data.data.user_email)
        localStorage.setItem("user_name", data.data.user_name)
        localStorage.setItem("usermode", "1");
        var currentDate = new Date();
        var currentTime = currentDate.getTime();
        localStorage.timeIn = currentTime;
        this.savShipping()
      }
      //  this.invalidcreds = false
    }, (error: any) => {
      //   this.invalidcreds = true
    })
  }
  public getMetaCODE() {
    this.countryCodeList = [];
    const headers = { 'Content-Type': 'application/json' }


    const body = { lang: this.lang };
    this.LoginService.getMetaCountry(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.countryCodeList = data.data.country_code_list
        this.cus_phone_code = data.data.country_details[0].country_dial;
      }

    }, (error: any) => {

    })
  }
  public Register() {
    this.isregisterdone = true
    const headers = { 'Content-Type': 'application/json' }
    this.cus_password = btoa("hungry"+this.cus_fname + this.cus_lname+"now")
    const body = { cus_fname: this.cus_fname, cus_lname: this.cus_lname, cus_email: this.cus_email, cus_password: this.cus_password, cus_phone1_code: this.cus_phone_code, cus_phone1: this.cus_phone1, lang: this.lang, referral_code: this.referral_code,referby:this.referalcode };
    this.LoginService.userRegistration(body, headers).subscribe((data: any) => {
      this.isclicked = false
      if (data.code == 200) {


        localStorage.setItem("hntk", data.data.token)
        localStorage.setItem("user_email", data.data.user_email)
        localStorage.setItem("user_name", data.data.user_name)
        localStorage.setItem("usermode", "1");
        this.emailexist = false
        this.numberexist = false


        this.savShippingNormal()
      } else {

        if (data.message == "Email Already Exists!" || data.message == "อีเมลนี้ลงทะเบียนแล้ว") {
          this.emailexist = true
        } else {
          this.emailexist = false
        }


        if (data.message == "เบอร์นี้ลงทะเบียนแล้ว" || data.message == "Phone Number Already Exists!") {
          this.numberexist = true
        } else {
          this.numberexist = false
        }
      }

    }, (error: any) => {

      this.isclicked = false
    })
  }
  public CheckPhone(number) {
    this.numberexist = false
    this.emailexist = false
    this.invalidPhone = false;
    const headers = { 'Content-Type': 'application/json' }
    this.cus_password = btoa("hungry"+this.cus_fname + this.cus_lname+"now")
    const body = { cus_fname: this.cus_fname, cus_lname: this.cus_lname, cus_email: this.cus_email, cus_password: this.cus_password, cus_phone1_code: this.cus_phone_code, cus_phone1: this.cus_phone1, lang: "en", referral_code: this.referral_code };
    this.LoginService.checkRegister(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.numberexist = false
        this.emailexist = false
        this.invalidPhone = false;
      } else {
        if(data.message == "Invalid mobile number"){
          this.invalidPhone = true;
        }else if(data.message == "Phone Number Already Exists!"){
          this.numberexist = true
        }else if(data.message == "Email Already Exists!"){
          this.emailexist = true
        }else{

        }

        console.log(data.data)
      }

    }, (error: any) => {
      console.log(error)
    })
  }
  checkAll() {
    this.numberexist = false
    this.emailexist = false
    this.invalidPhone = false;
    const headers = { 'Content-Type': 'application/json' }
    this.cus_password = btoa("hungry"+this.cus_fname + this.cus_lname+"now")
    const body = { cus_fname: this.cus_fname, cus_lname: this.cus_lname, cus_email: this.cus_email, cus_password: this.cus_password, cus_phone1_code: this.cus_phone_code, cus_phone1: this.cus_phone1, lang: "en", referral_code: this.referral_code };
    this.LoginService.checkRegister(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        this.numberexist = false
        this.emailexist = false
        this.invalidPhone = false;
        this.isverifyclicked = true
        this.isPhoneVerify = false
        this.verifynumber = this.cus_phone_code + this.cus_phone1
        this.OTPRequest(this.cus_phone_code + this.cus_phone1)
      } else {
        if(data.message == "Invalid mobile number"){
          this.invalidPhone = true;
        }else if(data.message == "Phone Number Already Exists!"){
          this.numberexist = true
        }else if(data.message == "Email Already Exists!"){
          this.emailexist = true
        }else{

        }

        console.log(data.data)
      }

    }, (error: any) => {
      console.log(error)
    })
  }
  gotohomepage() {
    window.location.href = '/';
  }
  public OTPRequest(number) {

    this.isApplyShow = true
    const headers = { 'Content-Type': 'application/json' }
    const body = { lang: this.lang, mobile: number };
    this.LoginService.otpRequest(body, headers).subscribe((data: any) => {

      if (data.code == 200) {
        console.log(data.data)
        this.showVerificationField = true
      } else {
        this.showVerificationField = false
        console.log(data.data)
      }

    }, (error: any) => {
      this.showVerificationField = false
    })
  }
  emailchange(email) {
    if (!this.cus_email) {
      this.invalidemailaddress = true
      return
    } else {
      this.invalidemailaddress = false
    }
    this.emailcheck = email
  }
  firstnameerror() {
    if (this.cus_fname == "") {
      return true
    } else {
      return false
    }
  }
  lastnameerror() {
    if (this.cus_lname == "") {
      return true
    } else {
      return false
    }
  }
  showVerifyButton() {
    if (!this.invalidPhone) {
      console.log(this.verifynumber != this.cus_phone_code + this.cus_phone1)
      if (this.verifynumber != this.cus_phone_code + this.cus_phone1) {
        return true
      } else {
        if (this.isverifyclicked) {
          return false
        } else {
          return true
        }

      }
    } else {
      return false
    }

  }
  showverificationField() {
    return (this.showVerificationField && this.verifynumber == this.cus_phone_code + this.cus_phone1);
  }
  checkIsVerify() {
    const headers = { 'Content-Type': 'application/json' }
    const body = { lang: this.lang, mobile: this.cus_phone_code + this.cus_phone1 };
    this.LoginService.checkPhoneIsVerify(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        if (data.message == "verified") {
          this.isPhoneVerify = true
          this.isApplyShow = false
          this.InvalidVerificationCode = false

          this.Register()
        } else {

          this.isclicked = false
          this.isApplyShow = true
          this.isPhoneVerify = false
          this.InvalidVerificationCode = true
        }
      } else {

        this.isclicked = false
        this.InvalidVerificationCode = true
        this.isApplyShow = true
        this.isPhoneVerify = false
        console.log(data.data)
      }

    }, (error: any) => {

      this.isclicked = false
      this.InvalidVerificationCode = true
      this.isApplyShow = true
      this.isPhoneVerify = false
    })
  }
  checkForm() {
    if (this.cus_email == "") {
      return true
    }
    if (this.cus_fname == "") {
      return true;
    }
    return false;
  }
  verifyPhone() {
    this.checkAll()

  }
  verifyPhone2() {
    this.timercount = 30;
    this.isverifyclicked = true
    this.isPhoneVerify = false
    this.verifynumber = this.cus_phone_code + this.cus_phone1
    this.OTPRequest(this.cus_phone_code + this.cus_phone1)
  }
  selectCode(code) {
    this.searchcode = ""
    this.cus_phone_code = code;
    var s = this.cus_phone1
    if (this.cus_phone1 != ""){
      if(this.cus_phone_code == "+66"){
        s = s.replace(/^0+/, '');
      }
      this.CheckPhone(this.cus_phone_code + s)
    }

  }
  phoneNumberChange(number) {
    this.numberexist = false
    if (!this.cus_phone1){
      this.invalidPhone = true
    }else{
      this.invalidPhone = false
      var s = this.cus_phone1
      if(this.cus_phone_code == "+66"){
        s = s.replace(/^0+/, '');
      }
      this.CheckPhone(this.cus_phone_code + s)
    }

  }
  validateEmail() {
    if (this.emailcheck != "") {
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(this.emailcheck).toLowerCase());
    } else {
      return true;
    }

  }
  firstnamechange() {
    if (!this.cus_fname) {
      this.firstnameerrorshow = true
      return
    } else {
      this.firstnameerrorshow = false
    }
  }
  lastnamechange() {
    if (!this.cus_lname) {
      this.lastnameerrorshow = true
      return
    } else {
      this.lastnameerrorshow = false
    }
  }
  activatePhone() {

    console.log(this.cus_fname)

    if (!this.cus_fname) {
      this.firstnameerrorshow = true
      return
    } else {
      this.firstnameerrorshow = false
    }

    if (!this.cus_lname) {
      this.lastnameerrorshow = true
      return
    } else {
      this.lastnameerrorshow = false
    }
    if (!this.cus_email) {
      this.invalidemailaddress = true
      return
    } else {
      this.invalidemailaddress = false
    }


    this.isclicked = true
    this.InvalidVerificationCode = false
    const headers = { 'Content-Type': 'application/json' }
    const body = { lang: this.lang, mobile: this.cus_phone_code + this.cus_phone1,countrycode:this.cus_phone_code,phonenumber:this.cus_phone1, code: this.verification_code };
    this.LoginService.phoneAvtivate(body, headers).subscribe((data: any) => {
      this.checkIsVerify()

    }, (error: any) => {

      this.isclicked = false
      console.log(error)
    })
  }
  showloading(){
    this.ismodalshow = true
   // document.getElementById("showloadingclick").click();

  }
  hideloading(){
    this.ismodalshow = false
    document.getElementById("hideloading").click();

  }
  savShipping(){

    var headers = {}
    if(localStorage.usermode == "1"){
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer '+tk, 'Content-Type': 'application/json'  }
    }else{
      headers = headers = {  'Content-Type': 'application/json' }
    }
    const body = { lang: this.lang, search_latitude: 0, search_longitude: 0,location:"home" };
    this.AddressService.saveShipping(body, headers).subscribe((data: any) => {

      this.mapshow = true
      this.mapsAPILoader.load().then(() => {

        this.geoCoder = new google.maps.Geocoder;
        const input = document.getElementById("searchlocation") as HTMLInputElement;
        let autocomplete = new google.maps.places.Autocomplete(input);
        autocomplete.addListener("place_changed", () => {

          this.ngZone.run(() => {
            //get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();

            //verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            //set latitude, longitude and zoom
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.zoom = 12;

          });
        });
      });
    }, (error: any) => {

      this.mapshow = true
    })
  }

  savShippingNormal(){
    var headers = {}
    if(localStorage.usermode == "1"){
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer '+tk, 'Content-Type': 'application/json'  }
    }else{
      headers = headers = {  'Content-Type': 'application/json' }
    }
    const body = { lang: this.lang, search_latitude: 0, search_longitude: 0,location:"home" };
    this.AddressService.saveShipping(body, headers).subscribe((data: any) => {
      this.mapshow = true

    }, (error: any) => {
      this.mapshow = true
    })
  }

  getMetaName(meta) {
    if (localStorage.language == "th") {
      return meta.name_th
    } else {
      return meta.name
    }
  }
  provinceChage(name) {

    for (var i = 0; i < this.provinceList.length; i++) {
      if (localStorage.language == "th") {
        if(this.provinceList[i].name_th==name){
          name = this.provinceList[i].name;
        }
      }
    }

    this.getMeta('district', name, 0)
  }
  districtChage(name) {
    for (var i = 0; i < this.districtList.length; i++) {
      if (localStorage.language == "th") {
        if(this.districtList[i].name_th==name){
          name = this.districtList[i].name;
        }
      }
    }
    this.getMeta('sub-district', name, 0)
  }



  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
        //  window.alert('No results found');
        }
      } else {
       // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  getMeta(meta, parent, state) {



    var headers = {};
    if (meta == "province") {

      this.provinceList = []
      this.FdatabaseService.getMeta("province").subscribe((data: any) => {


        data.forEach(val => {

          this.provinceList.push(val.payload.val())



        });

        if (state == 0)
            this.getMeta('district', this.provinceList[0].name, 0)

      });
    } else if (meta == "district") {
      this.districtList = []
      this.FdatabaseService.getMeta("district/"+parent).subscribe((data: any) => {


        data.forEach(val => {

          this.districtList.push(val.payload.val())





        });

        for(var i=0;i<this.districtList.length;i++){
          if (localStorage.language == "th") {
            if(this.district==this.districtList[i].name){
              this.district=this.districtList[i].name_th
            }
          }
        }
        if (state == 0)
          this.getMeta('sub-district', this.districtList[0].name, 0)

      });

    } else if (meta == "sub-district") {
      this.subdistrictList = []
      this.FdatabaseService.getMeta("subdistrict/"+parent).subscribe((data: any) => {


        data.forEach(val => {

          this.subdistrictList.push(val.payload.val())





        });


          for(var i=0;i<this.subdistrictList.length;i++){
            if (localStorage.language == "th") {
              if(this.subdistrict==this.subdistrictList[i].name){
                this.subdistrict=this.subdistrictList[i].name_th
              }
            }
          }

      });
    } else {

    }


    headers = headers = { 'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, metaname: meta, parent: parent }

    this.AddressService.getMetaLocation(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (meta == "province") {
          // this.provinceList = data.data.location_meta
          // if (state == 0)
          //   this.getMeta('district', this.provinceList[0].name, 0)
        } else if (meta == "district") {
          // this.districtList = data.data.location_meta

          // for(var i=0;i<this.districtList.length;i++){
          //   if (localStorage.language == "th") {
          //     if(this.district==this.districtList[i].name){
          //       this.district=this.districtList[i].name_th
          //     }
          //   }
          // }
          // if (state == 0)
          //   this.getMeta('sub-district', this.districtList[0].name, 0)
        } else if (meta == "sub-district") {
          // this.subdistrictList = data.data.location_meta
          // for(var i=0;i<this.subdistrictList.length;i++){
          //   if (localStorage.language == "th") {
          //     if(this.subdistrict==this.subdistrictList[i].name){
          //       this.subdistrict=this.subdistrictList[i].name_th
          //     }
          //   }
          // }
        } else {

        }

      } else {

      }



    }, (error: any) => {

    })

  }
  editUserAddress(address) {

    this.selectedAddress = address;
    this.location_id = this.selectedAddress.loc_id
    this.addressname = this.selectedAddress.loc_address_name
    this.buildingtype = this.selectedAddress.buiding_type
    if (this.selectedAddress.village_name != "")
      this.buildingname = this.selectedAddress.village_name
    this.Address = this.selectedAddress.loc_address
    this.soi = this.selectedAddress.soi
    this.moo = this.selectedAddress.moo
    this.postalcode = this.selectedAddress.loc_zipcode
    this.houseno = this.selectedAddress.land_room
    this.note = this.selectedAddress.land_note
    this.floor = this.selectedAddress.land_floor
    this.province = this.selectedAddress.province
    this.province = ""
    for (var i = 0; i < this.provinceList.length; i++) {
      if (localStorage.language == "th") {
        if (this.selectedAddress.province == this.provinceList[i].name) {
          this.province = this.provinceList[i].name_th
        }
      } else {
        if (this.selectedAddress.province == this.provinceList[i].name) {
          this.province = this.provinceList[i].name
        }
      }

    }
    if (this.province == "" && this.provinceList.length > 0) {
      if (localStorage.language == "th") {
        this.province = this.provinceList[0].name_th
      } else {
        this.province = this.provinceList[0].name
      }

    } else {
      this.province = "0"
    }
    this.district = ""
    for (var i = 0; i < this.districtList.length; i++) {
      if (localStorage.language == "th") {
        if (this.selectedAddress.district == this.districtList[i].name) {
          this.district = this.districtList[i].name_th
        }
      } else {
        if (this.selectedAddress.district == this.districtList[i].name) {
          this.district = this.districtList[i].name
        }
      }

    }
    if (this.district == "" && this.districtList.length > 0) {
      if (localStorage.language == "th") {
        this.district = this.districtList[0].name_th
      } else {
        this.district = this.districtList[0].name
      }

    } else {
      this.district = "0"
    }

    this.subdistrict = ""
    for (var i = 0; i < this.subdistrictList.length; i++) {
      if (localStorage.language == "th") {
        if (this.selectedAddress.subdistrict == this.subdistrictList[i].name) {
          this.subdistrict = this.subdistrictList[i].name_th
        }
      } else {
        if (this.selectedAddress.subdistrict == this.subdistrictList[i].name) {
          this.subdistrict = this.subdistrictList[i].name
        }
      }

    }
    if (this.subdistrict == "" && this.districtList.length > 0) {
      if (localStorage.language == "th") {
        this.subdistrict = this.subdistrictList[0].name_th
      } else {
        this.subdistrict = this.subdistrictList[0].name
      }

    } else {
      this.subdistrict = "0"
    }


    this.latitude = Number(address.loc_latitude)
    this.longitude = Number(address.loc_logitude)
    this.selectedlat = Number(address.loc_latitude)
    this.selectedlon =  Number(address.loc_logitude)
    console.log(this.selectedAddress.loc_id+ "   "+this.latitude +"   "+this.longitude)
    this.showAddressList = false
    this.showAddressMap = true
    this.showAddressForm = false
    this.addressStep = 2
    this.active3 = ""
    this.active2 = "active"
    document.getElementById(address.loc_id).click();
  }

  nextStepAddress1() {
    this.setCurrentLocation()
    if (this.addressStep == 1 || true) {

      this.location_id = ""
      this.addressname = "Home"
      this.buildingtype = "0"
      this.buildingname = ""
      this.Address = ""
      this.soi = ""
      this.moo = ""
      this.postalcode = ""
      this.houseno = ""
      this.note = ""
      this.floor = ""

      this.province = ""

      if (this.province == "" && this.provinceList.length > 0) {
        if (localStorage.language == "th") {
          this.province = this.provinceList[0].name_th
        } else {
          this.province = this.provinceList[0].name
        }

      } else {
        this.province = "0"
      }
      this.district = ""

      if (this.district == "" && this.districtList.length > 0) {
        if (localStorage.language == "th") {
          this.district = this.districtList[0].name_th
        } else {
          this.district = this.districtList[0].name
        }

      } else {
        this.district = "0"
      }

      this.subdistrict = ""

      if (this.subdistrict == "" && this.subdistrictList.length > 0) {
        if (localStorage.language == "th") {
          this.subdistrict = this.subdistrictList[0].name_th
        } else {
          this.subdistrict = this.subdistrictList[0].name
        }

      } else {
        this.subdistrict = "0"
      }
      this.setCurrentLocation()

      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = false
      this.addressStep = 2
      this.active3 = ""
      this.active2 = "active"

    } else if (this.addressStep == 2) {
     // this.googlegeocode(this.latitude, this.longitude)
      this.latlongtoaddress()
      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = true
      this.addressStep = 3
      this.active3 = "active"
    }


  }
  Skip(){
    this.mapshow = false
    this.thankyoushow = true
  }
  latlongtoaddress() {

    var headers = {};



    headers = headers = { 'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, lat: this.latitude, lon: this.longitude }

    this.AddressService.latlongtoaddress(body).subscribe((data: any) => {
      if (data.code == 200) {

        this.province = data.data.province
        for(var i=0;i<this.provinceList.length;i++){
          if (localStorage.language == "th") {
            if(this.province==this.provinceList[i].name){
              this.province=this.provinceList[i].name_th
            }
          }
        }

        this.district = data.data.district
        this.subdistrict = data.data.sub_distrcit
        this.getMeta('district', data.data.province, 1)
        this.getMeta('sub-district', this.district, 1)

      } else {

      }



    }, (error: any) => {

    })

  }
  nextStepAddress() {

    if (this.addressStep == 1) {

      this.location_id = ""
      this.addressname = "Home"
      this.buildingtype = "0"
      this.buildingname = ""
      this.Address = ""
      this.soi = ""
      this.moo = ""
      this.postalcode = ""
      this.houseno = ""
      this.note = ""
      this.floor = ""

      this.province = ""

      if (this.province == "" && this.provinceList.length > 0) {
        if (localStorage.language == "th") {
          this.province = this.provinceList[0].name_th
        } else {
          this.province = this.provinceList[0].name
        }

      } else {
        this.province = "0"
      }
      this.district = ""

      if (this.district == "" && this.districtList.length > 0) {
        if (localStorage.language == "th") {
          this.district = this.districtList[0].name_th
        } else {
          this.district = this.districtList[0].name
        }

      } else {
        this.district = "0"
      }

      this.subdistrict = ""

      if (this.subdistrict == "" && this.subdistrictList.length > 0) {
        if (localStorage.language == "th") {
          this.subdistrict = this.subdistrictList[0].name_th
        } else {
          this.subdistrict = this.subdistrictList[0].name
        }

      } else {
        this.subdistrict = "0"
      }
      this.setCurrentLocation()

      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = false
      this.addressStep = 2
      this.active3 = ""
      this.active2 = "active"

    } else if (this.addressStep == 2) {
     // this.googlegeocode(this.latitude, this.longitude)
      if(this.selectedlat!=this.latitude)
      this.latlongtoaddress()
      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = true
      this.addressStep = 3
      this.active3 = "active"
    }


  }
  saveMultiLocation() {
    if (this.province == "" || this.district == "" || this.subdistrict == "" || this.Address == "" || this.addressname == "") {
      if (this.addressname == "") {
        this.openDialog("Please enter address name")
        return
      }
      if (this.Address == "") {
        this.openDialog("Please enter address")
        return
      }
      if (this.province == "") {
        this.openDialog("Please enter province")
        return
      }
      if (this.district == "") {
        this.openDialog("Please enter district")
        return
      }
      if (this.subdistrict == "") {
        this.openDialog("Please enter subdistrict")
        return
      }
    } else {
      var headers = {};


      if (localStorage.usermode == "1") {
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
      } else {
        headers = headers = { 'Content-Type': 'application/json' }
      }
      if (localStorage.language == "th") {
        this.lang = "th"
      } else {
        this.lang = "en"
      }
      const body = {
        lang: this.lang,
        address_type: 1,
        address_info: this.Address,
        latitude: "" + this.latitude + "",
        longitude: "" + this.longitude + "",
        address_name: this.addressname,
        edit_id: this.location_id,
        zipcode: this.postalcode,
        buiding_type: this.buildingtype,
        village_name: this.buildingname,
        moo: this.moo,
        soi: this.soi,
        province: this.province,
        district: this.district,
        subdistrict: this.subdistrict,
        land_floor: this.floor,
        land_room: this.houseno,
        land_note: this.note
      }

      this.AddressService.saveLocation(body, headers).subscribe((data: any) => {
        if (data.code == 200) {
          console.log(data.data)

         //this.getDeliveryAddress()
         this.mapshow = false
         this.thankyoushow = true

        } else {

        }



      }, (error: any) => {

      })
    }

  }
  googlegeocode(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          console.log(results[0].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  markerDragEnd($event: MouseEvent) {

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  centerChange($event) {

    this.centerlat = $event.lat;
    this.centerlong = $event.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  boundsChange($event) {
    console.log("bounce")
    // this.latitude = $event.lat;
    // this.longitude = $event.lng;
  }
  mapReady(map) {
    console.log("ready")
    map.addListener("dragend", () => {
      //the values
      this.latitude = this.centerlat;
      this.longitude = this.centerlong
      console.log(map)
    });
  }
  closeLocationModal() {

    document.getElementById("closeModalLocation").click();
    this.showAddressList = true
    this.showAddressMap = true
    this.showAddressForm = false
    this.addressStep = 2
    this.active3 = ""
    this.active2 = ""
  }
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  prevStepAddress() {
    if (this.addressStep == 2) {
      this.closeLocationModal()
    } else if (this.addressStep == 3) {
      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = false
      this.addressStep = 2
      this.active3 = ""
      this.active2 = "active"
    }



  }
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor;

    // Windows Phone must come first because its UA also contains "Android"
    if (/windows phone/i.test(userAgent)) {
      return "Windows Phone";
    }

    if (/android/i.test(userAgent)) {
      return "Android";
    }


    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      return "iOS";
    }

    return "unknown";
  }
  public searchLocation() {
    this.searchLocation
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(ErroDialog, {
      width: '300px',
      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

export class SnackComponent { }
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class ErroDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<ErroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: RegisterComponent) {
    this.message = this.data
  }

  close(): void {
    this.dialogRef.close();
  }


}
