import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { CartService } from '../../service/cart/cart.service'
import { StringTService } from '../../service/LanguageS/string-t.service'
import { ProductService } from '../../service/product/product.service';
import { CustomerService } from '../../service/customer/customer.service'
import { AddressService } from '../../service/address/address.service'
import { LoginService } from '../../service/login/login.service'
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { KbankService } from 'src/app/service/kbank/kbank.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
declare let gtag: Function;
declare let fbq: Function;
declare var $: any;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  // PHONE NUMBER
  searchcode = ""
  cus_phone_code = "";
  cus_phone1 = "";
  numberexist = false

  // MAP
  displaylongitude=12.934622;
  displaylatitude= 100.89016900000001;
  title: string = 'AGM project';
  latitude = 12.934622;
  longitude = 100.89016900000001;
  selectedlat = 0
  selectedlon = 0
  zoom = 20;
  centerlat = 0
  centerlong = 0
  testlat = 0.00
  address: string;
  cartDetails: any;
  cartGrandTotal: string;
  vouchercode = ""
  vouchercode1: string;
  vouchercode2: string;
  vouchercode3: string;
  vouchercode4: string;
  vouchercode5: string;
  cartSubTotal: string;
  vouchercode6: string;
  vouchercodeall: string
  discountValue: string;
  lang: string;
  hasCart = false
  private geoCoder;
  isLanguageLoaded = false
  LanguageText: any;
  restoName = ""
  hasDiscout = false
  hasVouch = false;
  AllOptions: any;
  deliveryAddressList = [];
  selectedAddress: any;
  selectedAddresstoedit: any
  restoid = ""
  store_name = ""
  deliverytime = ""
  selectedAddressRadio = "0"
  selectedPaymentRadio = "cod"
  selectedPaymentMethod = "Cash on delivery"
  showAddressList = true
  showAddressMap = true
  showAddressForm = false
  addressStep = 1
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
  countryCodeList = [];
  cardlist = []
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
  invalidPhone = false
  isPhoneverify = false
  isEmailverify = false
  emailOtpCodeVisible = false
  phoneOtpCodeVisible = false
  emailvcode = ""
  phonenumbervcode = ""
  iframesrc: any
  iframestate = ""
  checkoutphone = ""
  checkoutcode = ""
  kbToken = ""
  iseditingaddress = false
  deleteselected = ""
  usermarker:any
  @ViewChild('search', { read: true, static: false })
  public searchElementRef: ElementRef;

  // END MAP

  public showcontactinfo: boolean = true;
  public showdelivery: boolean = true;
  public showpaymentmethod: boolean = true;

  constructor(private ProductService: ProductService,
    private CartService: CartService,
    private StringTServiceL: StringTService,
    private CustomerService: CustomerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private AddressService: AddressService,
    private LoginService: LoginService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    public _sanitizer: DomSanitizer,
    private KbankService: KbankService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })


  }

  ngOnInit(): void {
    this.usermarker = {
      url: "/assets/images/Icon House1-6.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    setInterval(() => {

      if (localStorage.kbtkn != "" && localStorage.getItem("kbtkn") != null) {

        this.addconfirm()
      }
    }, 3000);
    this.getCartDetails()
    this.getDeliveryAddress()
    this.getMeta('province', '', 0)
    this.getPhoneCodeList()
    this.getcardlist()

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
  checkfield(){

  }

  showMapModal(){
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
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
  }
  openAddressModal() {

    document.getElementById("openModalLocation").click();
    this.showMapModal()
  }
  openPaymentModal() {

    document.getElementById("openModalPayment").click();
  }
  openAddressModalUser() {

    document.getElementById("openModalUser").click();
  }
  closeLocationModal() {

    document.getElementById("closeModalLocation").click();
    this.showAddressList = true
    this.showAddressMap = true
    this.showAddressForm = false
    this.addressStep = 1
    this.active3 = ""
    this.active2 = ""
  }
  // Get Current Location Coordinates
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }
  canceladdress(){
    this.displaylatitude =  Number(this.selectedAddress.loc_latitude)
    this.displaylongitude =  Number(this.selectedAddress.loc_logitude)
    this.iseditingaddress = false
  }
  toggleContactinfo() {
    this.showcontactinfo = !this.showcontactinfo;

  }
  toggleDelivery() {
    this.showdelivery = !this.showdelivery;
  }
  togglePaymentmethod() {
    this.showpaymentmethod = !this.showpaymentmethod;
  }
  getMeta(meta, parent, state) {

    var headers = {};
    if (meta == "province") {
      this.provinceList = []

    } else if (meta == "district") {
      this.districtList = []

    } else if (meta == "sub-district") {
      this.subdistrictList = []
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
          this.provinceList = data.data.location_meta
          if (state == 0)
            this.getMeta('district', this.provinceList[0].name, 0)
        } else if (meta == "district") {
          this.districtList = data.data.location_meta

          for (var i = 0; i < this.districtList.length; i++) {
            if (localStorage.language == "th") {
              if (this.district == this.districtList[i].name) {
                this.district = this.districtList[i].name_th
              }
            }
          }
          if (state == 0)
            this.getMeta('sub-district', this.districtList[0].name, 0)
        } else if (meta == "sub-district") {
          this.subdistrictList = data.data.location_meta
          for (var i = 0; i < this.subdistrictList.length; i++) {
            if (localStorage.language == "th") {
              if (this.subdistrict == this.subdistrictList[i].name) {
                this.subdistrict = this.subdistrictList[i].name_th
              }
            }
          }
        } else {

        }

      } else {

      }



    }, (error: any) => {

    })

  }
  checkRestoRange(address) {

    var headers = {};



    headers = headers = { 'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, user_latitude: address.loc_latitude, user_longitude: address.loc_logitude, resto_id: this.restoid }

    this.AddressService.restaurantRange(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (data.data.isReachable == "yes") {
          this.selectedAddress = address;
          this.latitude = Number(this.selectedAddress.loc_latitude)
          this.longitude = Number(this.selectedAddress.loc_logitude)
          this.displaylatitude =  Number(this.selectedAddress.loc_latitude)
          this.displaylongitude =  Number(this.selectedAddress.loc_logitude)
          this.selectedAddressRadio = this.selectedAddress.loc_id
          console.log(this.latitude + "  " + this.longitude)
          this.closeLocationModal()
        } else {
          this.openDialog("This restaurant doesn't deliver to this address ")
          this.selectedAddressRadio = this.selectedAddress.loc_id
        }

      } else {
        this.openDialog("This restaurant doesn't deliver to this address ")
        this.selectedAddressRadio = this.selectedAddress.loc_id
      }



    }, (error: any) => {
      this.openDialog("This restaurant doesn't deliver to this address ")
      this.selectedAddressRadio = this.selectedAddress.loc_id
    })

  }
  checkountRestoRange(latitude, longitude) {

    var headers = {};



    headers = headers = { 'Content-Type': 'application/json' }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, user_latitude: latitude, user_longitude: longitude, resto_id: this.restoid }

    this.AddressService.restaurantRange(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (data.data.isReachable == "yes") {
          console.log(this.latitude + "  " + this.longitude)
          this.doPlaceOrder()
        } else {
          document.getElementById("closeloading").click();
          this.openDialog("This restaurant doesn't deliver to this address ")
        }

      } else {
        document.getElementById("closeloading").click();
        this.openDialog("This restaurant doesn't deliver to this address ")
      }



    }, (error: any) => {
      this.openDialog("This restaurant doesn't deliver to this address ")
    })

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
        for (var i = 0; i < this.provinceList.length; i++) {
          if (localStorage.language == "th") {
            if (this.province == this.provinceList[i].name) {
              this.province = this.provinceList[i].name_th
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
  getPhoneCodeList() {
    this.countryCodeList = [];
    const headers = { 'Content-Type': 'application/json' }


    const body = { lang: this.lang };
    this.LoginService.getMetaCountry(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.countryCodeList = data.data.country_code_list
        if (this.phonecode == "")
          this.phonecode = data.data.country_details[0].country_dial;
      }

    }, (error: any) => {

    })
  }
  selectCode(code) {
    this.phonecode = code;
    if (this.phonenumber != "" && this.phonenumber.length > 6)
      this.CheckPhone(this.phonenumber + this.phonenumber)
  }
  public CheckPhone(number) {
    const headers = { 'Content-Type': 'application/json' }
    const body = { lang: this.lang, mobile: number };
    this.LoginService.checkPhoneIsValid(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        this.invalidPhone = false;
        this.PhoneCheck();
      } else {
        this.invalidPhone = true;
        console.log(data.data)
      }

    }, (error: any) => {
      console.log(error)
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
        if (this.provinceList[i].name_th == name) {
          name = this.provinceList[i].name;
        }
      }
    }
    this.getMeta('district', name, 0)
  }
  districtChage(name) {
    for (var i = 0; i < this.districtList.length; i++) {
      if (localStorage.language == "th") {
        if (this.districtList[i].name_th == name) {
          name = this.districtList[i].name;
        }
      }
    }
    this.getMeta('sub-district', name, 0)
  }
  showdelete(address){
    if(address.loc_id == this.deleteselected){
      return true
    }else{
      return false
    }
  }
  selectdelete(address){
    this.deleteselected = address.loc_id
  }
  canceldelete(){
    this.deleteselected =  ""
  }
  public getDeliveryAddress() {
    this.selectedAddress = {}
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
    const body = { lang: this.lang }

    this.CustomerService.getAddress(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.showAddressList = true
        this.showAddressMap = true
        this.showAddressForm = false
        this.addressStep = 1
        this.active3 = ""
        this.active2 = ""
        this.deliveryAddressList = data.data.multi_address;
        this.firstname = data.data.shipping_address.sh_cus_fname
        this.lastname = data.data.shipping_address.sh_cus_lname
        this.email = data.data.shipping_address.sh_cus_email
        this.phonenumber = data.data.shipping_address.sh_phone1
        this.phonecode = data.data.shipping_address.ship_ph1_cnty_code
        this.checkoutphonenumber = this.phonecode + this.phonenumber
        this.checkoutphone = this.phonenumber
        this.checkoutcode = this.phonecode
        this.checkoutemail = data.data.shipping_address.sh_cus_email
        this.checkoutfirstname = data.data.shipping_address.sh_cus_fname
        this.checkoutlastname = data.data.shipping_address.sh_cus_lname
        if (this.deliveryAddressList.length > 0) {

          this.selectedAddress = this.deliveryAddressList[0]
          this.selectedAddressRadio = this.deliveryAddressList[0].loc_id
          this.latitude = Number(this.selectedAddress.loc_latitude)
          this.longitude = Number(this.selectedAddress.loc_logitude)
          this.selectedlat = Number(this.selectedAddress.loc_latitude)
          this.selectedlon = Number(this.selectedAddress.loc_logitude)
          this.displaylatitude =  Number(this.selectedAddress.loc_latitude)
          this.displaylongitude =  Number(this.selectedAddress.loc_logitude)

        }
        this.PhoneCheck()
        this.EmailCheck()

      } else {

      }
    }, (error: any) => {

    })
  }
  PhoneCheck() {

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
    const body = { lang: this.lang, mobile: this.phonecode + this.phonenumber }

    this.CustomerService.isPhoneVerify(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (data.message == "verified") {
          this.isPhoneverify = true
        } else {
          this.isPhoneverify = false
        }

      } else {
        this.isPhoneverify = false
      }
    }, (error: any) => {
      this.isPhoneverify = false
    })
  }
  EmailCheck() {

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
    const body = { lang: this.lang, email: this.email }

    this.CustomerService.isEmailVerify(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (data.message == "verified") {
          this.isEmailverify = true
        } else {
          this.isEmailverify = false
        }

      } else {
        this.isEmailverify = false
      }
    }, (error: any) => {
      this.isEmailverify = false
    })
  }
  verifyEmail() {
    this.emailOtpCodeVisible = true
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
    const body = { lang: this.lang, email: this.email }

    this.CustomerService.EmailOtp(body, headers).subscribe((data: any) => {
      if (data.code == 200) {


      } else {

      }
    }, (error: any) => {

    })
  }
  verifyPhone() {
    this.phoneOtpCodeVisible = true
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
    const body = { lang: this.lang, mobile: this.phonecode + this.phonenumber }

    this.CustomerService.PhoneOtp(body, headers).subscribe((data: any) => {
      if (data.code == 200) {


      } else {

      }
    }, (error: any) => {

    })
  }
  PhoneActivate() {

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
    const body = { lang: this.lang, mobile: this.phonecode + this.phonenumber, code: this.phonenumbervcode }

    this.CustomerService.ActivatePhone(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.PhoneCheck()

        this.phoneOtpCodeVisible = false
      } else {

      }
    }, (error: any) => {

    })
  }
  EmailActivate() {

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
    const body = { lang: this.lang, email: this.email, code: this.emailvcode }

    this.CustomerService.ActivateEmail(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.EmailCheck()
        this.emailOtpCodeVisible = false
      } else {

      }
    }, (error: any) => {

    })
  }
  phoneNumberChange() {
    if (this.phonenumber != "" && this.phonenumber.length > 6)
      this.PhoneCheck()
  }
  EmailChange() {

    this.EmailCheck()
  }
  private getCartDetails() {

    var headers = {};


    this.hasDiscout = false;
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
    const body = { lang: this.lang }

    this.CartService.getCart(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        this.cartDetails = data.data.cart_details[0].added_item_details;
        let currency = data.data.currency_code;
        this.cartSubTotal = currency + data.data.cart_sub_total;
        this.cartGrandTotal = currency + data.data.total_cart_amount;
        this.restoid = data.data.cart_details[0].store_id;
        this.store_name = data.data.cart_details[0].store_name
        this.deliverytime = data.data.cart_details[0].delivery_time
        this.hasCart = true
        this.getMerchantOptions();
      } else {
        this.cartDetails = [];
        this.hasDiscout = false;
        this.hasCart = false
        window.location.href = "/cart";
      }



    })

  }

  private updateItemToBasket(cartid, options, qty) {
    // this.selectedProduct = [];
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
    const body = { cart_id: cartid, lang: this.lang, option_items_id: JSON.stringify(options), quantity: qty }

    this.CartService.updateQTY(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (this.vouchercode == "") {
          this.getCartDetails()
        } else {
          this.getCartDetailsWCoupon()
        }

        ///    this.showExtra = false;
      }


    })
  }
  applyUserInfo() {
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
    const body = { lang: this.lang, email: this.email, phonecode: this.phonecode, phonenumber: this.phonenumber, firstname: this.firstname, lastname: this.lastname }

    this.CustomerService.updateInfo(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.getDeliveryAddress()

      } else {

      }
    }, (error: any) => {

    })
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
        this.iseditingaddress = false
        if (data.code == 200) {
          console.log(data.data)

          this.getDeliveryAddress()

        } else {

        }



      }, (error: any) => {

      })
    }

  }
  deleteMultiLocation(locId) {
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
    const body = { lang: this.lang, delete_id: locId }

    this.AddressService.deleteLocation(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        this.openSnackBar()
        this.getDeliveryAddress()

      } else {

      }



    }, (error: any) => {

    })
  }
  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }


  private getCartDetailsWCoupon() {
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
    const body = { restaurant_id: this.restoid, lang: this.lang, vcode: this.vouchercode, prod_id: [] }

    this.CartService.getCartWVcode(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        this.cartDetails = data.data.cart_details[0].added_item_details;
        let currency = data.data.currency_code;
        this.cartSubTotal = currency + data.data.cart_sub_total;
        this.cartGrandTotal = currency + data.data.total_cart_amount;
        this.discountValue = currency + data.data.coupon_code_amount
        this.deliverytime = data.data.cart_details[0].delivery_time;
        this.hasDiscout = true;
        this.hasVouch = false;

        this.hasCart = true;
      } else {



        this.openDialog("(" + this.vouchercode + ")" + data.message)
          this.hasDiscout = false;
          this.vouchercode = ""
          this.vouchercode1 = ""
          this.vouchercode2 = ""
          this.vouchercode3 = ""
          this.vouchercode4 = ""
          this.vouchercode5 = ""
          this.vouchercode6 = ""
          this.vouchercodeall = ""
          document.getElementById("vouchercodeall").focus();
      }


    })

  }
  PlaceOrder() {
    if(this.deliveryAddressList.length == 0){
      this.openDialog("Please set your delivery address!")
      return
    }
    document.getElementById("showloading").click();
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
    const body = { lang: this.lang, mobile: this.checkoutphonenumber }

    this.CustomerService.isPhoneVerify(body, headers).subscribe((data: any) => {

      if (data.code == 200) {


        if (data.message == "verified") {

          this.checkountRestoRange( this.selectedAddress.loc_latitude, this.selectedAddress.loc_logitude)

        } else {
          document.getElementById("closeloading").click();
          this.openDialog("Please verify your mobile number!")
        }

      } else {
        document.getElementById("closeloading").click();
        this.openDialog("Please verify your mobile number!")
      }
    }, (error: any) => {
      document.getElementById("closeloading").click();
      this.openDialog("Please verify your mobile number!")
    })
  }
  doPlaceOrder() {

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
    var landmarkval = ""
    if (this.selectedAddress.village_name != "") {
      landmarkval += this.selectedAddress.village_name + ", "
    }
    if (this.selectedAddress.buiding_type != "") {
      landmarkval += this.selectedAddress.buiding_type + ", "
    }
    if (this.selectedAddress.land_floor != "") {
      landmarkval += "Floor " + this.selectedAddress.land_floor + ", "
    }
    if (this.selectedAddress.land_room != "") {
      landmarkval += "Room no. " + this.selectedAddress.land_room + ", "
    }
    if (this.selectedAddress.land_note != "") {
      landmarkval += "Note: " + this.selectedAddress.land_note + ", "
    }
    var plist = []
    for (var i = 0; i < this.cartDetails.length; i++) {
      plist.push(this.cartDetails[i].product_id)
    }
    var body = {};
    if (this.hasDiscout) {
      body = {
        order_from: 'Web',
        lang: this.lang,
        ord_self_pickup: 0,
        cus_name: this.checkoutfirstname,
        cus_last_name: this.checkoutlastname,
        cus_email: this.checkoutemail,
        cus_phone1: this.phonenumber,
        cus_phone2: '',
        cus_address: this.selectedAddress.loc_location,
        cus_address1: landmarkval,
        cus_lat: this.selectedAddress.loc_latitude,
        cus_long: this.selectedAddress.loc_logitude,
        use_wallet: 0,
        use_coupon: 0,
        voucher_code: this.vouchercode,
        rest_id: this.restoid,
        prod_id: plist,
        cardID: this.selectedPaymentRadio
      }
    } else {
      body = {
        order_from: 'Web',
        lang: this.lang,
        ord_self_pickup: 0,
        cus_name: this.checkoutfirstname,
        cus_last_name: this.checkoutlastname,
        cus_email: this.checkoutemail,
        cus_phone1: this.phonenumber,
        cus_phone2: '',
        cus_address: this.selectedAddress.loc_location,
        cus_address1: landmarkval,
        cus_lat: this.selectedAddress.loc_latitude,
        cus_long: this.selectedAddress.loc_logitude,
        use_wallet: 0,
        use_coupon: 0,
        rest_id: this.restoid,
        cardID: this.selectedPaymentRadio
      }
    }


    this.CartService.placeOrder(body, headers).subscribe((data: any) => {
      document.getElementById("closeloading").click();
      if (data.code == 200) {

        window.location.href = '/trackorder/' + data.transaction_id;
      } else {
        this.openDialog(data.message)
      }


    })

  }
  removeItemOnCart(cartid) {
    //this.selectedProduct = [];
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
    const body = { cart_id: cartid, lang: this.lang }

    this.CartService.removeCart(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (this.vouchercode == "") {
          this.getCartDetails()
        } else {
          this.getCartDetailsWCoupon()
        }

        //  this.showExtra = false;
      }


    })
  }
  carItemInc(cartitem) {
    console.log(cartitem)
    var optionList = [];
    if (cartitem.hasOwnProperty('order_option_items') && cartitem.order_option_items != null) {
      for (const [key, value] of Object.entries(cartitem.order_option_items)) {

        if (!optionList.includes(value))
          optionList.push(value);
      }
    }

    this.updateItemToBasket(cartitem.cart_id, optionList, cartitem.cart_quantity + 1)
  }
  carItemDec(cartitem) {
    var optionList = [];
    if (cartitem.hasOwnProperty('order_option_items') && cartitem.order_option_items != null) {

      for (const [key, value] of Object.entries(cartitem.order_option_items)) {

        if (!optionList.includes(value))
          optionList.push(value);
      }
    }

    if (cartitem.cart_quantity != 1) {
      this.updateItemToBasket(cartitem.cart_id, optionList, cartitem.cart_quantity - 1)
    } else {
      this.removeItemOnCart(cartitem.cart_id)
    }

  }
  showRequiredOptionName(optionidlist) {
    if (optionidlist != null) {
      for (let j = 0; j < this.AllOptions.length; j++) {
        if (this.AllOptions[j].required == 1) {
          if (optionidlist.includes(this.AllOptions[j].id)) {
            if (localStorage.language == "th") {
              return "(" + this.AllOptions[j].name_th + ")";
            } else {
              return "(" + this.AllOptions[j].name + ")";
            }
          }
        }
      }
      return "";
    } else {
      return ""
    }

  }
  showRequiredOptionPrice(cart) {
    let optionidlist = cart.order_option_items;
    if (optionidlist != null) {
      for (let j = 0; j < this.AllOptions.length; j++) {
        if (this.AllOptions[j].required == 1) {
          if (optionidlist.includes(this.AllOptions[j].id)) {

            return this.AllOptions[j].price

          }
        }
      }
      return cart.cart_unit_price;
    } else {
      return cart.cart_unit_price;
    }


  }
  showOptonName(optionid) {
    for (let j = 0; j < this.AllOptions.length; j++) {
      if (this.AllOptions[j].id == optionid && this.AllOptions[j].required != 1) {
        if (this.AllOptions[j].required == 3) {
          if (localStorage.language == "th") {
            return "(" + this.AllOptions[j].name_th + ")";
          } else {
            return "(" + this.AllOptions[j].name + ")";
          }
        } else {
          if (localStorage.language == "th") {
            return this.AllOptions[j].name_th;
          } else {
            return this.AllOptions[j].name;
          }
        }

      }
    }
    return ""
  }
  showOptonPrice(optionid, cart_currency) {
    var res = ""
    for (let j = 0; j < this.AllOptions.length; j++) {

      if (this.AllOptions[j].id == optionid && this.AllOptions[j].required != 1) {
        if (this.AllOptions[j].price == 0) {
          res = "";
        } else {

          res = "+" + cart_currency + "" + this.AllOptions[j].price;
        }


      }
    }
    return res;
  }
  inputVoucher() {
    this.vouchercode = ""
    this.vouchercode1 = ""
    this.vouchercode2 = ""
    this.vouchercode3 = ""
    this.vouchercode4 = ""
    this.vouchercode5 = ""
    this.vouchercode6 = ""
    this.vouchercodeall = ""
    document.getElementById("vouchercodeall").focus();
    //document.getElementById("vouchercode1").focus();
    this.hasVouch = true;
  }
  removeVoucher() {
    this.vouchercode = "";
    this.getCartDetails();
  }
  ValidateCode(code) {
    this.getCartDetailsWCoupon()
  }
  onChangeEventall(event: any) {
    console.log(event.code)
    if(event.code == "Enter"){
      this.vouchercode = this.vouchercodeall
      this.vouchercode = this.vouchercode.toUpperCase()
      this.getCartDetailsWCoupon()
      console.log(this.vouchercode);
    }



  }
  onChangeEventallapply() {
    this.vouchercode = this.vouchercodeall
    this.vouchercode = this.vouchercode.toUpperCase()
    this.getCartDetailsWCoupon()
    console.log(this.vouchercode);


  }
  onChangeEvent1(event: any) {
    if (this.vouchercode1.length == 1)
      document.getElementById("vouchercode2").focus();


  }
  onChangeEvent2(event: any) {
    if (this.vouchercode2.length == 1)
      document.getElementById("vouchercode3").focus();
    else
      document.getElementById("vouchercode1").focus();



  }
  onChangeEvent3(event: any) {
    if (this.vouchercode3.length == 1)
      document.getElementById("vouchercode4").focus();
    else
      document.getElementById("vouchercode2").focus();


  }
  onChangeEvent4(event: any) {
    if (this.vouchercode4.length == 1)
      document.getElementById("vouchercode5").focus();
    else
      document.getElementById("vouchercode3").focus();



  }
  onChangeEvent5(event: any) {
    if (this.vouchercode5.length == 1)
      document.getElementById("vouchercode6").focus();
    else
      document.getElementById("vouchercode4").focus();




  }
  onChangeEvent6(event: any) {
    if (this.vouchercode6.length == 1) {
      this.vouchercode = this.vouchercode1 + this.vouchercode2 + this.vouchercode3 + this.vouchercode4 + this.vouchercode5 + this.vouchercode6
      this.vouchercode = this.vouchercode.toUpperCase()
      this.getCartDetailsWCoupon()
      console.log(this.vouchercode);
    } else {
      document.getElementById("vouchercode5").focus();
    }

  }
  private getMerchantOptions() {
    this.AllOptions = [];
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
    const body = { store_id: this.restoid, lang: this.lang }

    this.ProductService.getProductOptionbyStore(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.AllOptions = data.data;

      }


    })

  }
  onRadioChange(address) {
    this.checkRestoRange(address)


  }
  BtnonRadioChange(address) {
    this.checkRestoRange(address)


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


  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      console.log(results);
      console.log(status);
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 20;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  isActive(address){
    if(address.loc_id==this.selectedAddress.loc_id){
      return "active"
    }else{
      return ""
    }
  }
  editAddress(address) {

    this.openAddressModal()
    this.nextStepAddress()
    this.selectedAddresstoedit = address;
    this.location_id = this.selectedAddresstoedit.loc_id
    this.addressname = this.selectedAddresstoedit.loc_address_name
    this.buildingtype = this.selectedAddresstoedit.buiding_type
    if (this.selectedAddresstoedit.village_name != "")
      this.buildingname = this.selectedAddresstoedit.village_name
    this.Address = this.selectedAddresstoedit.loc_address
    this.soi = this.selectedAddresstoedit.soi
    this.moo = this.selectedAddresstoedit.moo
    this.postalcode = this.selectedAddresstoedit.loc_zipcode
    this.houseno = this.selectedAddresstoedit.land_room
    this.note = this.selectedAddresstoedit.land_note
    this.floor = this.selectedAddresstoedit.land_floor
    this.province = this.selectedAddresstoedit.province
    this.province = ""
    for (var i = 0; i < this.provinceList.length; i++) {
      if (localStorage.language == "th") {
        if (this.selectedAddresstoedit.province == this.provinceList[i].name) {
          this.province = this.provinceList[i].name_th
        }
      } else {
        if (this.selectedAddresstoedit.province == this.provinceList[i].name) {
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
        if (this.selectedAddresstoedit.district == this.districtList[i].name) {
          this.district = this.districtList[i].name_th
        }
      } else {
        if (this.selectedAddresstoedit.district == this.districtList[i].name) {
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
        if (this.selectedAddresstoedit.subdistrict == this.subdistrictList[i].name) {
          this.subdistrict = this.subdistrictList[i].name_th
        }
      } else {
        if (this.selectedAddresstoedit.subdistrict == this.subdistrictList[i].name) {
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


    this.latitude = Number(this.selectedAddresstoedit.loc_latitude)
    this.longitude = Number(this.selectedAddresstoedit.loc_logitude)
    this.selectedlat = Number(this.selectedAddresstoedit.loc_latitude)
    this.selectedlon = Number(this.selectedAddresstoedit.loc_logitude)

    this.showAddressList = false
    this.showAddressMap = true
    this.showAddressForm = false
    this.addressStep = 2
    this.active3 = ""
    this.active2 = "active"
  }
  deleteAddress(address) {
    this.deleteMultiLocation(address.loc_id)
  }
  AddNewCard() {
    localStorage.kbtkn = ""
    this.iframestate = ""
    var url = "https://kalanbanga.co.th/api/public/kbank/payment_th.html"
    if (localStorage.language == "th") {
      url = "https://kalanbanga.co.th/api/public/kbank/payment_th.html"
    } else {
      url = "https://kalanbanga.co.th/api/public/kbank/payment.html"
    }
    this.iframesrc = this._sanitizer.bypassSecurityTrustResourceUrl(url);
    document.getElementById("openAddcardModal").click();
    //
    /// this.popupCenter({url: '/payment', title: 'xtf', w: 500, h: 500});

  }
  public currentUrl() {
    if (this.iframestate == "") {
      this.iframestate = "loaded"

    } else if (this.iframestate == "loaded") {

      this.getToken()


    }

  }
  omit_special_char(event) {
    var k;
    k = event.charCode;  //         k = event.keyCode;  (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }
  popupCenter = ({ url, title, w, h }) => {
    // Fixes dual-screen position                             Most browsers      Firefox
    const dualScreenLeft = window.screenLeft !== undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop !== undefined ? window.screenTop : window.screenY;

    const width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const systemZoom = width / window.screen.availWidth;
    const left = (width - w) / 2 / systemZoom + dualScreenLeft
    const top = (height - h) / 2 / systemZoom + dualScreenTop
    const newWindow = window.open(url, title,
      `
      scrollbars=yes,
      width=${w / systemZoom},
      height=${h / systemZoom},
      top=${top},
      left=${left}
      `
    )

    if (window.focus) newWindow.focus();
  }
  addnewaddress(){

    this.openAddressModal()
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
  }
  nextStepAddress() {
    document.getElementById("closeModalLocation").click();
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
      this.displaylatitude =  this.latitude
      this.displaylongitude = this.longitude
      this.googlegeocode(this.latitude, this.longitude)
      if (this.selectedlat != this.latitude)
        this.latlongtoaddress()
      this.showAddressList = false
      this.showAddressMap = true
      // this.showAddressForm = true
      document.getElementById("closeModalLocation").click();
      this.iseditingaddress = true
      this.active3 = "active"
    }


  }
  getcardlist() {

    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    const body = { lang: 'en', token: localStorage.kbtkn };
    this.KbankService.cardlist(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (data.data.hasOwnProperty('cards')) {
          this.cardlist = data.data.cards
        }


      } else {

      }

    }, (error: any) => {

    })
  }
  selectPayment(cardid) {

    this.selectedPaymentRadio = cardid
    if (cardid == "cod") {
      this.selectedPaymentMethod = "Cash on delivery"
    } else {
      this.selectedPaymentMethod = "Card Payment"
    }
    document.getElementById("openModalPayment").click();
  }
  deleteCard(cardid) {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    const body = { lang: 'en', cardid: cardid };
    this.KbankService.deletecard(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.openDialog("Card delete success")
        this.getcardlist()
      } else {

      }

    }, (error: any) => {

    })
  }
  getToken() {
    const headers = { 'Content-Type': 'application/json' }
    const body = { lang: 'en' };
    this.KbankService.kbanktoken(body, headers).subscribe((data: any) => {
      if (data.code == 200 && data.data != "") {
        this.kbToken = data.data
        localStorage.kbtkn = this.kbToken
        this.iframestate = "ready"
        this.AddCard(data.data)


      } else {

      }

    }, (error: any) => {

    })
  }
  AddCard(token) {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    const body = { lang: 'en', token: token };
    this.KbankService.addcard(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        // this.iframesrc = this._sanitizer.bypassSecurityTrustResourceUrl(data.data.redirect_url);
        window.location.href = data.data.redirect_url;


      } else {

      }

    }, (error: any) => {

    })
  }
  public addconfirm() {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    const body = { lang: 'en', token: localStorage.kbtkn };
    this.KbankService.addcardconfirm(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        if (data.message == "Card added successfully") {



          localStorage.kbtkn = ""
          this.openDialog(data.message)
          this.getcardlist()
        }

      } else {

      }

    }, (error: any) => {

    })
  }
  googlegeocode(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          if(this.Address == ""){
            this.Address = results[0].formatted_address
          }
          console.log(results[0].formatted_address);
        } else {
         // window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  prevStepAddress() {
    if (this.addressStep == 2) {
      this.showAddressList = true
      this.showAddressMap = true
      this.showAddressForm = false
      this.addressStep = 1
      this.active3 = ""
      this.active2 = ""
    } else if (this.addressStep == 3) {
      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = false
      this.addressStep = 2
      this.active3 = ""
      this.active2 = "active"
    }



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
      this.selectedAddressRadio = this.selectedAddress.loc_id
      if (result == "done") {
        document.getElementById("openModalPayment").click();
      } else if (result == "verify") {
        document.getElementById("openModalUser").click();
      }

    });
  }


}
@Component({
  selector: 'snack-bar-component-example-snack',
  templateUrl: 'snackbar.html',
  styles: [`
    .snackbarsuccess {
      color: hotpink;
    }
  `],
})
export class SnackComponent { }
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class ErroDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<ErroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: CheckoutComponent) {
    this.message = this.data
  }

  close(): void {
    if (this.message.errormessage == "Card added successfully") {
      this.dialogRef.close("done");
    } else if (this.message.errormessage.includes("verify")) {
      this.dialogRef.close("verify");
    } else {
      this.dialogRef.close("success");
    }


  }



}
