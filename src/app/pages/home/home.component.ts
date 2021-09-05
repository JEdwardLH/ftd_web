import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';

import { FoodtypeService } from '../../service/foodtype.service';
import { Foodtype } from '../../service/foodtype';
import { RestaurantList } from '../../service/RestaurantList';
import { RecentProductList } from '../../service/RecentProductList';
import { BannerList } from '../../service/BannerList';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { stringify } from 'querystring';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CartService } from 'src/app/service/cart/cart.service'
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  isLanguageLoaded = false;
  isLanguageLoadedd = false
  issuggestionshow = false
  loadmoreshow = true
  branch = ""
  branchcategory = ""
  searchlocation = ""
  zoom = 20;
  centerlat = 0
  centerlong = 0
  errormessage = ""
  Address:any
  errormessageshow = false

  animation = 'pulse';
  contentLoaded = false;
  searchresultlist = []
  sugestionlist = []
  screenWidth = window.innerWidth;
  intervalId;
  foodTypes: Foodtype[] = [];
  fastdeallist=  [];
  fastdealstart = ""
  fastdealend = ""
  promoloaded = true
  fastdealname = ""
  fastdealcurrentdate = ""
  restaurantList= [];
  quicksearchList = []
  quicksearchorig = []
  quicksearchListmobile = []
  recommendedRestaurant= [];
  promoRestoList = [];
  topRestoList = [];
  newComersList = [];
  recentProductList: RecentProductList[] = [];
  latitude = 14.216555
  longitude = 121.1746182
  showall = true//false
  usermode: boolean;
  guestmode: boolean;
  lastpage: number
  currentpage: number;
  hasOrder: boolean;
  lang: string;
  private geoCoder;
  advertisement = {}
  advertisementurl = ""
  bannerList = []
  bannerListWeb = []
  firstpagenumber: number;
  lastpagenumber: number;
  secondpagenumber: number;
  thirdpagenumber: number;
  todos$: AngularFireList<any[]>;
  searchText: string;
  LanguageText: any;
  ismouseenter = false
  isDataLoaded = false;
  branchlist = []
  countdowndata = {}
  countdowndata2 = {}
  isfastdeal = false
  loadAPI: Promise<any>;
  homenavOptions = {
    items: 7,
    dots: true,
    stagePadding: 50,
    margin:15,
    nav: true,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"], responsive: {
      0: {
        items: 2,
        stagePadding: 40,
        nav:false
      },
      575: {
        items: 3,
        stagePadding: 40,
        nav:false
      },
      768: {
        items: 3
      },
      992: {
        items: 5
      }
    }
  };
  recentOptions = {
    items: 4, margin: 15, dots: true, stagePadding: 50, nav: true, navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"], responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        nav:false
      },
      576: {
        items: 1,
        stagePadding: 90,
        nav:false
      },
      766: {
        items: 1,
        stagePadding: 100
      },
      768: {
        items: 2,
        nav:false
      },
      992: {
        items: 3
      },
      1201: {
        item: 4
      }
    }
  };
  promotionsOptions = {
    items: 4, margin: 15, dots: false, stagePadding: 50, nav: true, navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"], responsive: {
      0: {
        items: 1,
        nav:false,
        stagePadding: 30,
      },
      576: {
        items: 1,
        stagePadding: 90,
        nav:false
      },
      766: {
        items: 1,
        stagePadding: 100
      },
      768: {
        items: 2,
        nav:false
      },
      993: {
        items: 3
      },
      1201: {
        item: 4
      }
    }
  };
  bannerlilOptions = {
    items: 4, margin: 15, dots: false, stagePadding: 50, nav: true, navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"], responsive: {
      0: {
        items: 2,
        nav:false,
        stagePadding: 30
      },
      576: {
        items: 3,
        nav:false
      },
      767: {
        items: 3
      },
      768: {
        items: 3,
        nav:false
      },
      993: {
        items: 3
      },
      1201: {
        item: 4
      }
    }
  };
  topbrandsOptions = {
    items: 4, margin: 15, dots: true, stagePadding: 50, nav: true, navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"], responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        nav:false
      },
      576: {
        items: 1,
        stagePadding: 90,
        nav:false
      },
      766: {
        items: 1,
        stagePadding: 100
      },
      768: {
        items: 2,
        nav:false
      },
      993: {
        items: 3
      },
      1201: {
        item: 4
      }
    }
  };

  mobilecarousel = {
    items: 1,
    margin: 30,
    dots: true,
    loop: true,
    autoplay: true,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    nav: false,
    responsive: {
      0: {
        items: 1,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: true
      },
      575: {
        items: 1,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: true
      },
      768: {
        items: 1,
        touchDrag: true,
        pullDrag: true,
        mouseDrag: true
      },
      993: {
        items: 1
      },
      1201: {
        item: 4
      }
    }
  };



  constructor(private actRoute: ActivatedRoute, private StringTServiceL: StringTService, private foodTypeService: FoodtypeService, private _sanitizer: DomSanitizer, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone, private firedatabase: AngularFireDatabase, private af: AngularFireDatabase, public dialog: MatDialog,public CartService: CartService) {
    // if(this.iOS()){
    //   this.openDialog()

    // }
    if (this.getMobileOperatingSystem() == "Android") {
      this.openAppAndroid()
    } else if (this.getMobileOperatingSystem() == "iOS") {
      // this.openDialog()
    }
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.isLanguageLoadedd = true;
      this.LanguageText = data;

    })
    this.currentpage = 1;
    // if (this.actRoute.snapshot.params.id) {
    //   this.currentpage = this.actRoute.snapshot.params.id;

    // } else {
    //   this.currentpage = 1;
    // }
    this.firstpagenumber = this.currentpage - 1

    this.secondpagenumber = this.currentpage
    this.thirdpagenumber = this.currentpage + 1

  }

  arrayOne(n: number): any[] {

    return Array(n);
  }
  isActive(n: number) {
    if (this.currentpage == n + 1) {
      return "active";
    } else {
      return "";
    }
  }
  ngOnInit(): void {

    if(localStorage.latitude){
      this.latitude = Number(localStorage.latitude)
      this.longitude = Number(localStorage.longitude)
    }else{
      this.latitude = 14.216555;
      this.longitude = 121.1746182;
      localStorage.latitude = this.latitude
      localStorage.longitude = this.longitude
    }
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      this.googlegeocode2(this.latitude, this.longitude)
    });




    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    if (localStorage.usermode == "1") {
      this.usermode = true;
      this.guestmode = false;

    } else {
      this.usermode = false;
      this.guestmode = true
    }

    this.getHomepageRestoList();
    window.addEventListener('scroll', this.scroll, true);
    this.showsuggestion();

  }
  mouseEnter(){
   this.ismouseenter = true
  }
  mouseout(){
    this.ismouseenter = false
   }

  onFocusEvent(event){
    if(this.searchText==""||!this.searchText){
      this.issuggestionshow = true
    }
    else{
      this.issuggestionshow = false
    }
  }
  onFocusOutEvent(event){
    if(!this.ismouseenter)
    this.issuggestionshow = false
  }
  scroll = (event): void => {

    var minval = 0;
    this.showall = true
    if ((window.innerWidth > 2000 )) {
      this.showall = true
    }
    if (event.target.scrollingElement.scrollTop > 0) {
      this.showall = true
    } else {
      this.showall = true//false
    }

  };
  private getHomepageRestoList() {


    this.loadData()


  }
  openAppAndroid(): void {

    location.href = 'batangas://batangas.co.th';
    // setTimeout("window.location = 'https://play.google.com/store/apps/details?id=com.batangas.customer';", 2000);
  }
  loadmore(){
    this.loadmoreshow = false
    this.currentpage ++;
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }


    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, page: this.currentpage, flatform: 'web' }
    this.foodTypeService.getAllResto(body, headers).subscribe((data: any) => {
      this.loadmoreshow = true
      this.isDataLoaded = true
      for(var i = 0 ;i<data.data.all_restaurant.length;i++){
        this.restaurantList.push(data.data.all_restaurant[i])
      }

      this.lastpage = data.data.lastpage



    })
  }
  public countdownBg() {
        if(this.fastdealend.includes(" ")){
          var acceptdrray = this.fastdealend.split(" ");

          var acceptdatearray = acceptdrray[0].split("-")
          var accepttimearray = acceptdrray[1].split(":")

          var startTime = new Date(Number(acceptdatearray[0]), Number(acceptdatearray[1])-1, Number(acceptdatearray[2]), Number(accepttimearray[0]), Number(accepttimearray[1]), Number(accepttimearray[2]));
          var endTime = new Date()//Number(currdatearray[0]), Number(currdatearray[1]), Number(currdatearray[2]), Number(currtimearray[0]), Number(currtimearray[1]), Number(currtimearray[2]));
          var difference =   startTime.getTime()- endTime.getTime();
          var waitingtimenum = Math.floor(difference / 1000)

          if(waitingtimenum>0){
            this.isfastdeal = true
            this.countdowndata = this.secondsToHoursMinutesSeconds(waitingtimenum)
            this.countdowndata2 = this.secondsToHoursMinutesSeconds2(waitingtimenum)

          }else{
            this.isfastdeal = false
          }
        }




        setTimeout(() => {
          this.countdownBg()
        }, 1000);
  }
  public loadScript() {
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["assets/js/owl.carousel.js"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
}
  secondsToHoursMinutesSeconds (seconds) {
    var json = {};
    var hour = Math.floor(seconds / 3600)
    if (hour <10){
      json['h'] = "0"+hour
    }else{
      json['h'] = ""+hour
    }

    var min = Math.floor((seconds % 3600) / 60)
    if (min <10){
      json['m'] = "0"+min
    }else{
      json['m'] = ""+min
    }
    var sec = Math.floor((seconds % 3600) % 60)
    if (sec <10){
      json['s'] = "0"+sec
    }else{
      json['s'] = ""+sec
    }
    if(hour ==0 && min ==0 && sec ==0){

        this.quicksearchList = []
            for(var i = 0;i<this.quicksearchorig.length;i++){
              this.quicksearchList.push(this.quicksearchorig[i]);

            }
    }

    return json
  }
  secondsToHoursMinutesSeconds2 (seconds) {
    var json = {};
    var hour = Math.floor(seconds / 3600)
    if (hour <10){
      json['h1'] = "0"
      json['h2'] = hour
    }else{
      json['h1'] = hour.toString().substring(0,1)
      json['h2'] = hour.toString().substring(1)
    }

    var min = Math.floor((seconds % 3600) / 60)

    if (min <10){
      json['m1'] = "0"
      json['m2'] = min
    }else{
      json['m1'] = min.toString().substring(0,1)
      json['m2'] = min.toString().substring(1,2)
    }
    var sec = Math.floor((seconds % 3600) % 60)

    if (sec <10){
      json['s1'] = "0"
      json['s2'] = sec
    }else{
      json['s1'] = sec.toString().substring(0,1)
      json['s2'] = sec.toString().substring(1,2)
    }


    return json
  }
  loadData() {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, page: this.currentpage, flatform: 'web' }
    const body2 = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, page: this.currentpage, platform: 'web' }

    this.foodTypeService.getPromotion(body2, headers).subscribe((data1: any) => {
      if(data1.code==200){
        this.fastdeallist = data1.data.fastdeal
        this.fastdealstart = data1.data.fastdealstart
        this.fastdealend = data1.data.fastdealend
        this.fastdealname = data1.data.fastdealname
        this.fastdealcurrentdate = data1.data.currentdate
        this.promoRestoList = data1.data.bestpromotion
        this.promoloaded = true
        setTimeout(() => {
          this.countdownBg()
        }, 1000);



      }



    })

    if(localStorage.alreadyvisit != "1"&&false){

      this.foodTypeService.getAdvertisement(body, headers).subscribe((data: any) => {
        if(data.code==200){
          this.advertisement = data.data
          this.advertisementurl = this.advertisement['urlimage']

          document.getElementById("adsmodal").click();
        }else{
          this.advertisement = {}
        }



      })
    }
    this.foodTypeService.getCategoryList(body, headers).subscribe((data: any) => {
      if(data.code==200){
        this.foodTypes = data.data.category_list
      }



    })
    this.foodTypeService.getAllResto(body, headers).subscribe((data: any) => {
      this.isDataLoaded = true
      this.restaurantList = data.data.all_restaurant
      this.lastpage = data.data.lastpage



    })
    const bodymobile = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, page: this.currentpage }
    if(this.screenWidth>575){
      this.foodTypeService.getBanner(body, headers).subscribe((data: any) => {
        this.isDataLoaded = true
        if(data.code == 200){
          this.bannerListWeb = data.data.banner_list
        }else{
          this.bannerListWeb = []
        }


      })
    }else{
      this.foodTypeService.getBanner(bodymobile, headers).subscribe((data: any) => {
        this.isDataLoaded = true

        if(data.code == 200){
          this.bannerList = data.data.banner_list
        }else{
          this.bannerList = []
        }

      })
    }





    this.foodTypeService.getOtherResto(body, headers).subscribe((data: any) => {

      this.isDataLoaded = true

      this.topRestoList = data.data.top_restaurant

      this.newComersList = data.data.new_restaurant


    })
    if (localStorage.usermode == "1") {
      this.foodTypeService.getRecentOrder(body, headers).subscribe((data: any) => {

        if(data.code == 200){
          this.recentProductList = data.data.recent_orders
          if (this.recentProductList.length == 0) {
            this.hasOrder = false;
          } else {
            this.hasOrder = true;
          }
        }else{
          this.recentProductList = []
          this.hasOrder = false
        }


      })
    }


    this.foodTypeService.getRecomemnded(body, headers).subscribe((data: any) => {
      if(data.code==200){
      this.recommendedRestaurant = data.data.recommendation_for_you
      }



    })


    this.foodTypeService.quickSearch(body, headers).subscribe((data: any) => {
      if(data.code==200){
      this.quicksearchorig= data.data.quicksearch
      for(var i = 0;i<data.data.quicksearch.length;i++){
        this.quicksearchList.push(data.data.quicksearch[i]);

      }

      }



    })
    this.loadAPI = new Promise((resolve) => {
      this.loadScript();
       resolve(true);
   });

  }

  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  public seeResto(id) {
    window.location.href = '/promotion/' + this.seemenu(id);
  }
  viewquick(quick){
    if(quick.viewall_id==3){
      window.location.href = "/voucher/"+quick.viewall_id
    }else if(quick.viewall_id==14){
      this.scrollToCategory("newcomerssection")
    }else if(quick.viewall_id==0){
      this.scrollToCategory("categorylisting")
    }else{
      window.location.href =  "/quick/"+btoa(quick.viewall_id)
    }

  }
  scrollToCategory(sectionid) {
    var elmnt0 = document.getElementById(sectionid);
    var topPos0 = elmnt0.offsetTop;

    var elmnt = document.getElementById(sectionid);
    var topPos = elmnt.offsetTop;


    window.scrollTo({
      top: topPos,
      left: 0,
      behavior: 'smooth'
    });

  }
  checkquicksearch(quicksearc){
    return true
  }
  public VisitStore(resto) {
    if(resto.branch_id == 0){
      if (localStorage.language == "th") {
        this.lang = "th"
      } else {
        this.lang = "en"
      }
      window.location.href = "/" + this.lang + "/batangas/restaurant/" + resto.restaurant_name.replace("(", '%28').replace(")", '%29');;
    }else{
      this.showbranch(resto.branch_id)

    }


  }
  public visitBranch(resto) {
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    window.location.href = "/" + this.lang + "/batangas/restaurant/" + resto.restaurant_name.replace("(", '%28').replace(")", '%29');;


  }

  getQuicksearchname(name) {
    if (name.length > 14) {
      return name.substring(0, 15) + "..";
    } else {
      return name
    }

  }

  getStoreLink(resto) {
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    return "/" + this.lang + "/batangas/restaurant/" + resto.restaurant_name.replace("(", '%28').replace(")", '%29');
  }
  seeRestoWeb(banner) {
    if (banner.store_id != "")
      window.location.href = '/promotion/' + this.seemenu(banner.store_id);
    else {
      window.location.href = banner.link
    }
  }
  seeAds(ads) {
    window.location.href = '/promotion/' + this.seemenu(ads.storeid);
  }
  getRestoWeb(banner) {
    if (banner.store_id != "")
      return '/promotion/' + this.seemenu(banner.store_id);
    else {
      return banner.link
    }
  }
  checkfield(){
    if(this.searchText==""){
      this.issuggestionshow = true
    }
    else{
      this.issuggestionshow = false
    }
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

    const body = { lang: 'en' ,text:this.searchText}
    this.CartService.searchResult(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.searchresultlist = data.data

      } else {
        this.searchresultlist = []
      }


    })
  }
  showsuggestion() {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    const body = { lang: 'en' ,text:this.searchText}
    this.CartService.searchSuggestion(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.sugestionlist = data.data

      } else {
        this.sugestionlist = []
      }


    })
  }
  public seemenu(id) {
    return btoa(id)
  }
  seeCategory(categoryid) {
    return btoa(categoryid)
  }
  public setPage(page: number) {
    //window.location.href = '/page/' + page;
  }
  searchResto(searchKey) {
    window.location.href = '/searchresult/' + searchKey;
  }
  convertToSlug(Text)
  { return Text
      return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }
  getCompressurl(path, type) {
    return path.replace("batangas-pr.s3.ap-northeast-1.amazonaws.com","d3a6jy2n0epncv.cloudfront.net");
   // https://gexpress.ph/imahe/public/images/quicksearch/12.12+Sale.png
    if(type=="restaurant"){
      return "https://batangas-pr.s3.ap-northeast-1.amazonaws.com/restaurant/logo/"+ this.basename(path);
    }else{
      return path;
    }

    //return "https://batangas.co.th/litrato/image/" + type + "/" + this.basename(path);

  }
  getcurrentlocation() {
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
  gotohomepage(){
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude
    this.googlegeocode(this.latitude, this.longitude)
    document.getElementById("closeModalLocation").click();
  }
  googlegeocode(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.Address = results[0].formatted_address

         localStorage.useraddress = this.Address
          location.reload()
        } else {
        //  window.alert('No results found');
        }
      } else {
        //window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  googlegeocode2(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.Address = results[0].formatted_address

         localStorage.useraddress = this.Address

        } else {
         // window.alert('No results found');
        }
      } else {
      // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  parentFun(){
    document.getElementById("newaddress").click();
    this.showmap2()
  }
  showmap(){
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
          localStorage.latitude = this.latitude
          localStorage.longitude = this.longitude
          localStorage.location = this.searchlocation

        });
      });
    });
  }
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
  closeLocationModal() {

    document.getElementById("closeModalLocation").click();

  }
  markerDragEnd($event: MouseEvent) {

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude
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

    map.addListener("dragend", () => {
      //the values
      this.latitude = this.centerlat;
      this.longitude = this.centerlong
      localStorage.latitude = this.latitude
      localStorage.longitude = this.longitude

    });
  }
  openMap(){
    document.getElementById("newaddress").click();
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
      });
    }
  }
  showbranch(branchid) {
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }

    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang,branchid:branchid }


      this.foodTypeService.getBranchlist(body, headers).subscribe((data: any) => {
        if(data.code==200){
          this.branch = data.data.branchname
          this.branchcategory = ""
          this.branchlist = data.data.branches
          document.getElementById("branchmodalbtn").click();
        }else{
          this.advertisement = {}
        }



      })

  }
  basename(path) {
    return path.split('/').reverse()[0];
  }
  iOS() {
    return [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.platform)
      // iPad on iOS 13 detection
      || (navigator.userAgent.includes("Mac") && "ontouchend" in document)
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
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}
@Component({
  selector: 'home.componentsdialog',
  templateUrl: 'home.componentsdialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: HomeComponent) { }

  CancelApp(): void {
    this.dialogRef.close();
  }
  openApp(): void {
    this.dialogRef.close();
    location.href = 'batangas://batangas.co.th';
    setTimeout("window.location = 'itms-apps://itunes.apple.com/app/kalan-banga/id1494106731?ls=1';", 1000);
  }


}
