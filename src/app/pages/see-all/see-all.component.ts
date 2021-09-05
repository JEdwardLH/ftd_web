
import { Component, OnInit } from '@angular/core';
import { FoodtypeService } from '../../service/foodtype.service';
import { ActivatedRoute } from '@angular/router';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CartService } from 'src/app/service/cart/cart.service'
@Component({
  selector: 'app-see-all',
  templateUrl: './see-all.component.html',
  styleUrls: ['./see-all.component.css']
})

export class SeeAllComponent implements OnInit {
lang:string;
latitude: number;
longitude: number;
ismouseenter = false
issuggestionshow = false
sugestionlist = []
usermode:boolean;
guestmode:boolean;
isEnglish = true
path:string;
pagetitle = ""
isLoaded = false
productList = []
specialoffertitle = ""
searchText: string;
searchresultlist = []
restaurantList:any;
// LANGUAGE
LanguageText: any;
screenWidth = window.innerWidth;
  bannerListWeb = []
  bannerList = []
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
  specialOptions = {
    items: 4,
    margin: 20,
    dots: true,
    stagePadding: 50,
    loop: true,
    autoplay: false,
    autoplayHoverPause: false,
    nav: true,
    navText: ["<i class='fas fa-chevron-left'></i>", "<i class='fas fa-chevron-right'></i>"],
    responsive: {
      0: {
        items: 1,
        stagePadding: 30,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      576: {
        items: 2,
        stagePadding: 50,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      766: {
        items: 1,
        stagePadding: 100,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      768: {
        items: 2,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      992: {
        items: 3,
        nav:false,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true,
      },
      1201: {
        item: 4
      }
    }
  };
isLanguageLoaded = false;
  constructor(private actRoute: ActivatedRoute,private foodTypeService: FoodtypeService,private StringTServiceL: StringTService,public CartService: CartService) {
    if(this.actRoute.snapshot.params.id) {
        console.log(this.actRoute.snapshot.params.id);
        this.path = this.actRoute.snapshot.params.id;
        if(this.path == "new_restaurant_list"){
          this.pagetitle = "New Restaurant"
        }else if(this.path == "featured_restaurant_list"){
          this.pagetitle = "Best Promotions"
        }else if(this.path == "top_restaurant_list"){
          this.pagetitle = "Top Restaurant"
        }else{
          this.pagetitle = "RECOMMENDED BY kalanbanga"
        }
    }
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
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
    this.searchRestaurant(this.path)

    if (localStorage.language == "th") {
      this.isEnglish = false
    } else {
      this.isEnglish = true
    }
    this.showsuggestion()
  }
  private searchRestaurant(path) {
    this.restaurantList = [];


      this.loadData(path)



  }
  loadData(path){
    var headers = {};
      if(localStorage.usermode == "1"){
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer '+tk, 'Content-Type': 'application/json'  }
      }else{
        headers = headers = {  'Content-Type': 'application/json' }
      }
      if(localStorage.language == "th"){
        this.lang = "th"
      }else{
        this.lang = "en"
      }
      var id = "";
      if(this.path == "new_restaurant_list"){
        id = "newcomers"
      }else if(this.path == "featured_restaurant_list"){
        id = "bestpromo"
      }else if(this.path == "top_restaurant_list"){
        id = "topbrands"
      }else{
        id = this.path
      }
      const body = { seeby:id,user_latitude: this.latitude,user_longitude:this.longitude,user_location:'test',lang:'en',flatform: 'web',key:"seeall-"+this.path}

      this.foodTypeService.getBannerSub(body, headers).subscribe((data: any) => {

        this.bannerListWeb = data.data.banner_list

      })
      const bodymobile = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang,key:"seeall-"+this.path}
      this.foodTypeService.getBannerSub(bodymobile, headers).subscribe((data: any) => {

        this.bannerList = data.data.banner_list

      })

      this.foodTypeService.seeallResto(body,headers,path).subscribe((data: any)=>{

        this.restaurantList = data.data.seeall;
        this.isLoaded = true
      })

      const body2 = { user_latitude: this.latitude,user_longitude:this.longitude,user_location:'',lang:this.lang, subpage	: "seeall",id:id}
      this.foodTypeService.specialOffer(body2,headers).subscribe((data: any)=>{
        this.specialoffertitle = data.data.special_offer_title
        this.productList = data.data.special_offer;

      })


  }

  public isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  public seemenu(id) {
    return btoa(id)
  }
  public seeRestoID(id) {
    window.location.href = '/promotion/' + this.seemenu(id);
  }
  public seeResto(resto){
    if(localStorage.language == "th"){
      this.lang = "th"
    }else{
      this.lang = "en"
    }
    window.location.href= "/"+this.lang+"/batangas/restaurant/"+resto.restaurant_name.replace("(", '%28').replace(")", '%29');
  }
  getStoreLink(resto){
    if(localStorage.language == "th"){
      this.lang = "th"
    }else{
      this.lang = "en"
    }
    return "/"+this.lang+"/batangas/restaurant/"+resto.restaurant_name.replace("(", '%28').replace(")", '%29');
  }
  seeRestoWeb(banner) {
    if (banner.store_id != "")
      window.location.href = '/promotion/' + this.seemenu(banner.store_id);
    else {
      window.location.href = banner.link
    }
  }
  checkfield(){
    this.checkKeyword()
  }
  searchResto(searchKey) {
    window.location.href = '/searchresult/' + searchKey;
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
  getCompressurl(path, type) {
    return path;
    if(type=="restaurant"){
      return "https://kalanbanga-pr.s3.ap-northeast-1.amazonaws.com/restaurant/logo/"+ this.basename(path);
    }else{
      return path;
    }

    //return "https://kalanbanga.co.th/litrato/image/" + type + "/" + this.basename(path);

  }
  basename(path) {
    return path.split('/').reverse()[0];
  }
  getRestoWeb(banner) {
    if (banner.store_id != "")
      return '/promotion/' + this.seemenu(banner.store_id);
    else {
      return banner.link
    }
  }
  mouseEnter(){
    this.ismouseenter = true
   }
   mouseout(){
     this.ismouseenter = false
    }

   onFocusEvent(event){
     if(this.searchText==""){
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
}
