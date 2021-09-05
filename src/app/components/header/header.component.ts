import { Component, HostListener, Inject,EventEmitter, OnInit, Input,Output,ViewChild, ElementRef, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service'
import { SocialAuthService } from "angularx-social-login";
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { FoodtypeService } from '../../service/foodtype.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapsAPILoader, MouseEvent } from '@agm/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  // LANGUAGE
  lang: any
  latitude = 14.216555
  longitude = 121.1746182

  active = ""
  @Input() isLanguageLoaded = false;
  @Input() loadstring = 0;
  @Input() LanguageText:any;
  @Input() categorylist = [];
  @Input() filterdata = {};
  @Input() selected = [];
  @Output("parentFun") parentFun: EventEmitter<any> = new EventEmitter();
  currentUrl = "";
  categorychecked = {}
  searchbtntext = ""
  searchbtnstate = 0
  username: string;
  language: string;
  cartcount: number;
  searchText: string;
  hasvoucher = false
  freedelivery = false
  hasdiscount = false
  pricerange = "1"
  searchresultlist = []



iconVisible = true;
iconVisible2 =false;
iconVisible3 =false;
iconVisible4 =false;
iconVisible5 =false;


searchlocation = ""
zoom = 20;
centerlat = 0
centerlong = 0
errormessage = ""
Address = ""
errormessageshow = false
private geoCoder;
  constructor(@Inject(DOCUMENT) private document: Document,public dialog: MatDialog,private ngZone: NgZone,private mapsAPILoader: MapsAPILoader, private CartService: CartService, private StringTServiceL: StringTService, private actRoute: ActivatedRoute, private authService: SocialAuthService, private foodTypeService: FoodtypeService) {

    for (let i = 0; i < this.actRoute.snapshot.url.length; i++) {
      this.currentUrl = this.currentUrl + "/" + this.actRoute.snapshot.url[i].path
    }
    console.log(this.currentUrl)
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {

    if (document.body.scrollTop > 0 ||
      document.documentElement.scrollTop > 0) {
      if (document.getElementById('header') != null)
        document.getElementById('header').classList.add('headerbg');
    }
    else {
      document.getElementById('header').classList.remove('headerbg');
    }
    if (document.body.scrollTop > 350 ||
      document.documentElement.scrollTop > 350) {
      if (document.getElementById('home') != null)
        document.getElementById('home').classList.add('showsearchbar');
    }
    else {
      if (document.getElementById('home') != null)
        document.getElementById('home').classList.remove('showsearchbar');
    }

  }

  setaddress(){
    this.parentFun.emit();
  }
  getaddress(){
    return localStorage.useraddress
  }
  isActive(currentpage){
    if(localStorage.currenturl == "/"+currentpage){
      return "active"
    }else{
      return ""
    }
  }
  openmenu() {
    if (document.getElementById('mobilesidebar') != null)
      document.getElementById('mobilesidebar').classList.add('open');
    if (document.getElementById('header') != null)
      document.getElementById('header').classList.add('menuopen');
  }
  closemenu() {
    if (document.getElementById('mobilesidebar') != null)
      document.getElementById('mobilesidebar').classList.remove('open');
    if (document.getElementById('header') != null)
      document.getElementById('header').classList.remove('menuopen');
  }
  filteropen() {
    if (document.getElementById('header') != null)
      document.getElementById('header').classList.toggle('filteropen');
    if (this.searchbtnstate == 0) {
      this.searchbtnstate = 1
      this.searchbtntext = "Apply"
    } else {
      this.searchbtnstate = 0
      this.searchbtntext = this.LanguageText['txt_header_search']
    }
  }
  ngOnInit(): void {
    if(this.loadstring == 0){
      this.StringTServiceL.getLanguageString().subscribe((data: any) => {
        this.isLanguageLoaded = true;
        this.LanguageText = data;
        this.searchbtntext = this.LanguageText.txt_header_search
      })
    }
    this.getcategoryList()
    for (var i = 0; i < this.categorylist.length; i++) {
      if (this.categorylist[i] != undefined) {
        if (this.categorylist[i].hasOwnProperty('category_id')) {
          let catid = this.categorylist[i].category_id;
          if (this.selected.includes(catid)) {
            this.categorychecked["cat" + catid] = true
          } else {
            this.categorychecked["cat" + catid] = false
          }
        }

      }


    }
    if (this.filterdata['hasvoucher'] == "1") {
      this.hasvoucher = true
    } else {
      this.hasvoucher = false
    }
    if (this.filterdata['freedelivery'] == "1") {
      this.freedelivery = true
    } else {
      this.freedelivery = false
    }
    if (this.filterdata['hasdiscount'] == "1") {
      this.hasdiscount = true
    } else {
      this.hasdiscount = false
    }
    this.pricerange = this.filterdata['pricerange'];



    if (!localStorage.language) {
      var lang = window.navigator.language;
      if (lang == "en") {
        localStorage.language = "en"
      } else {
        localStorage.language = "th"
      }
      this.language = localStorage.language
    } else {
      if (localStorage.language == "en") {
        localStorage.language = "en"
      } else {
        localStorage.language = "th"
      }
      this.language = localStorage.language
    }

  }
  googlegeocode(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.Address = results[0].formatted_address



        } else {

         // window.alert('No results found');
        }
      } else {

       // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  getcategoryList() {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }
    this.latitude = 14.216555;
    this.longitude = 121.1746182;
    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, flatform: 'web' }
    this.foodTypeService.getCategoryList(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.categorylist = data.data.category_list

      }



    })
  }
  searchResto(searchKey) {
    if (this.searchbtnstate == 1) {
      var catlist = [];

      for (var i = 0; i < this.categorylist.length; i++) {
        if (this.categorylist[i] != undefined) {
          let catid = this.categorylist[i].category_id
          if (this.categorychecked["cat" + catid] == true) {
            catlist.push(catid)
          }
        }


      }
      var hasvoucher = "0"
      var freedelivery = "0"
      var hasdiscount = "0"
      var jsondata = {}
      if (this.hasvoucher) {
        hasvoucher = "1"
      }
      if (this.freedelivery) {
        freedelivery = "1"
      }
      if (this.hasdiscount) {
        hasdiscount = "1"
      }
      jsondata['categorylist'] = catlist;
      jsondata['hasvoucher'] = hasvoucher;
      jsondata['freedelivery'] = freedelivery;
      jsondata['hasdiscount'] = hasdiscount;
      jsondata['pricerange'] = this.pricerange
      window.location.href = '/filterresult/' + btoa(JSON.stringify(jsondata));
    } else {
      window.location.href = '/searchresult/' + searchKey;
    }

  }
  setFil() {
    localStorage.language = "th";

    window.location.href = this.currentUrl.replace("/en", "/th")
  }
  setEN() {
    localStorage.language = "en";

    window.location.href = this.currentUrl.replace("/th", "/en")
    //window.location.reload
  }
  public isLangSelected(lang: string) {

    if (lang == this.language) {
      return "active";
    } else {
      return ""
    }
  }
  onCheckboxChange2(e, type) {
    let id = e.target.value
    if (e.target.checked) {
      if (type == 'voucher') {
        this.hasvoucher = true
      } else if (type == 'delivery') {
        this.freedelivery = true
      } else if (type == 'discount') {
        this.hasdiscount = true
      }

    } else {

      if (type == 'voucher') {
        this.hasvoucher = false
      } else if (type == 'delivery') {
        this.freedelivery = false
      } else if (type == 'discount') {
        this.hasdiscount = false
      }
    }
  }
  onRadioChange(num) {
    this.pricerange = num
  }
  onCheckboxChange(e) {
    console.log(e)
    let id = parseInt(e.target.value)
    if (e.target.checked) {
      this.categorychecked["cat" + id] = true

    } else {

      this.categorychecked["cat" + id] = false
    }

  }
  isFilterSeected(id) {

    return this.categorychecked["cat" + id]
  }
  checkfield() {
    this.checkKeyword()
  }
  checkKeyword() {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    const body = { lang: 'en', text: this.searchText }
    this.CartService.searchResult(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.searchresultlist = data.data

      } else {
        this.searchresultlist = []
      }


    })
  }
  clearcity(){
    localStorage.cityname = ""
    if (!localStorage.language) {
      var lang = window.navigator.language;
      if (lang == "en") {
        localStorage.language = "en"
      } else {
        localStorage.language = "th"
      }
      this.language = localStorage.language
    } else {
      if (localStorage.language == "en") {
        localStorage.language = "en"
      } else {
        localStorage.language = "th"
      }
      this.language = localStorage.language
    }
    location.href = "/"+this.language+"/batangas/home"
  }
  clearFilter() {
    this.hasvoucher = false
    this.freedelivery = false
    this.hasdiscount = false
    this.pricerange = "1"
    for (var i = 0; i < this.categorylist.length; i++) {
      if (this.categorylist[i] != undefined) {
        this.categorychecked["cat" + this.categorylist[i].category_id] = false


      }


    }

  }
  //map
  showmap2(){
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;

      const input = document.getElementById("searchlocation2") as HTMLInputElement;
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
          localStorage.latitude = this.latitude
          localStorage.longitude = this.longitude
          localStorage.location = this.searchlocation

        });
      });
    });
  }
  markerDragEnd($event: MouseEvent) {

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude
    this.googlegeocode(this.latitude, this.longitude)
    // this.getAddress(this.latitude, this.longitude);
  }
  centerChange($event) {

    this.centerlat = $event.lat;
    this.centerlong = $event.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  boundsChange($event) {

    // this.latitude = $event.lat;
    // this.longitude = $event.lng;
  }
  mapReady(map) {
    console.log("ready")
    map.addListener("dragend", () => {
      //the values
      this.latitude = this.centerlat;
      this.longitude = this.centerlong
      localStorage.latitude = this.latitude
      localStorage.longitude = this.longitude
      this.googlegeocode(this.latitude, this.longitude)
    });
  }
  openMap(){

    this.showmap2()
  }

  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.latitude = this.latitude
        localStorage.longitude = this.longitude
        this.zoom = 15;
        this.googlegeocode(this.latitude, this.longitude)
      });
    }
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',

      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  gotohomepage(){
    this.errormessageshow = false
    this.errormessage = ""
    if(localStorage.latitude){
      this.loadData()
    }
    else{
      this.errormessageshow = true
      this.errormessage = this.LanguageText['txt_kalanbanga_pleasesetaddress']
      this.openDialog(this.LanguageText['txt_kalanbanga_pleasesetaddress'])
    }
  }
  loadData() {
    this.errormessageshow = false
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
    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, page:  1, flatform: 'web' }


    this.foodTypeService.getAllResto(body, headers).subscribe((data: any) => {
      if(data.code==200){
        localStorage.latitude = this.latitude
        localStorage.longitude = this.longitude
        localStorage.cityname = "/"+this.lang+"/batangas/"+this.convertToSlug(this.Address)
        location.href = "/"+this.lang+"/batangas/"+this.convertToSlug(this.Address)
      }else{
        this.errormessageshow = true
        this.errormessage = this.LanguageText['txt_no_restofound']
        this.openDialog(this.LanguageText['txt_no_restofound'])
      }


    })


  }
  convertToSlug(Text)
  {
      return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }
}
@Component({
  selector: 'header.componentsdialog',
  templateUrl: 'header.dialog.html',
})
export class DialogOverviewExampleDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: HeaderComponent) {
    this.message = this.data
  }


  close(): void {
    this.dialogRef.close();

  }


}
