
import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { StringTService } from '../../service/LanguageS/string-t.service'

import { CustomerService } from '../../service/customer/customer.service'
import { AddressService } from '../../service/address/address.service'

import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FdatabaseService } from '../../service/firebase/fdatabase.service';
declare var $: any;
@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {

  // MAP
  locationdata = {}
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
  restoid = ""
  store_name = ""
  selectedAddressRadio = "0"
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
  latlongaddressresult = {}
  selectedlat = 0
  selectedlon = 0
  selectedaddresstodelete:any;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  // END MAP

  public showcontactinfo: boolean = true;
  public showdelivery: boolean = true;
  public showpaymentmethod: boolean = true;

  constructor(
    private StringTServiceL: StringTService,
    private CustomerService: CustomerService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private AddressService: AddressService,
    private _snackBar: MatSnackBar,
    public FdatabaseService: FdatabaseService,
    public dialog: MatDialog) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })


  }

  ngOnInit(): void {


    this.getDeliveryAddress()
    this.getMeta('province', '', 0)



  }
  showmap(){
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      console.log(this.searchElementRef)
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
  openAddressModalAddress(address) {
    this.showmap()
    this.editUserAddress(address)

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
  public getDeliveryAddress() {
    this.selectedAddress = {}
    var headers = {};

    this.cartDetails = [];
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
        this.checkoutemail = data.data.shipping_address.sh_cus_email
        this.checkoutfirstname = data.data.shipping_address.sh_cus_fname
        this.checkoutlastname = data.data.shipping_address.sh_cus_lname
        if (this.deliveryAddressList.length > 0) {

          this.selectedAddress = this.deliveryAddressList[0]
          this.selectedAddressRadio = this.deliveryAddressList[0].loc_id

        }


      } else {
        this.deliveryAddressList = []
      }
    }, (error: any) => {
      this.deliveryAddressList = []
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
        if (data.code == 200) {
          console.log(data.data)
          document.getElementById("closeModalLocation").click();
          this.getDeliveryAddress()

        } else {

        }

        document.getElementById("closeModalLocation").click();

      }, (error: any) => {
        document.getElementById("closeModalLocation").click();
      })
    }

  }
  deleteconfirm(address){
    document.getElementById("closeModalLocation").click();
    this.selectedaddresstodelete = address
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
    this.showmap()
  }
  deleteAddress(address) {
    this.deleteMultiLocation(address.loc_id)
  }
  nextStepAddress1() {

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
      this.googlegeocode(this.latitude, this.longitude)
      this.latlongtoaddress()
      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = true
      this.addressStep = 3
      this.active3 = "active"
    }
    document.getElementById("newaddress").click();
    this.showmap()

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
      this.googlegeocode(this.latitude, this.longitude)
      if(this.selectedlat!=this.latitude)
      this.latlongtoaddress()
      this.showAddressList = false
      this.showAddressMap = true
      this.showAddressForm = true
      this.addressStep = 3
      this.active3 = "active"
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
          //window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
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
    @Inject(MAT_DIALOG_DATA) public data: AddressesComponent) {
    this.message = this.data
  }

  close(): void {
    this.dialogRef.close();
  }


}
