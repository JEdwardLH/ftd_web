import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FoodtypeService } from '../../service/foodtype.service';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CartService } from 'src/app/service/cart/cart.service'
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;
productList = []
ismouseenter = false
isEnglish = true
sugestionlist = []
issuggestionshow = false
searchText: string;
searchresultlist = []
specialoffertitle = ""
  category_id: string;
  lang:string;
  latitude: number;
  bannerListWeb = []
  bannerList = []
  longitude: number;
  restaurantList:any;
  categoryList:any;
  categoryName:string;
  screenWidth = window.innerWidth;
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
  constructor(private actRoute: ActivatedRoute,private foodTypeService: FoodtypeService,private StringTServiceL: StringTService,public CartService: CartService) {
    this.category_id =  atob(this.actRoute.snapshot.params.id);

    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })


  }

  ngOnInit(): void {
    if (localStorage.language == "th") {
      this.isEnglish = false
    } else {
      this.isEnglish = true
    }

    if(localStorage.latitude){
      this.latitude = Number(localStorage.latitude)
      this.longitude = Number(localStorage.longitude)
    }else{
      this.latitude = 14.216555;
      this.longitude = 121.1746182;
      localStorage.latitude = this.latitude
      localStorage.longitude = this.longitude
    }
    this.getRestobyCategory()
    this.showsuggestion()
  }
  private getRestobyCategory() {
    this.categoryList = [];
    this.restaurantList = [];
    console.log("dadada")
    this.loaddata()


  }
  public seemenu(id) {
    return btoa(id)
  }
  public seeRestoID(id) {
    window.location.href = '/promotion/' + this.seemenu(id);
  }
  loaddata(){

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
      console.log("dadada1")

      const body = { user_latitude: this.latitude,user_longitude:this.longitude,user_location:'',lang:this.lang, page	: 1,category_id:[this.category_id],flatform: 'web',key:"category-"+this.category_id}


      this.foodTypeService.getBannerSub(body, headers).subscribe((data: any) => {

        this.bannerListWeb = data.data.banner_list

      })
      const bodymobile = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang,key:"category-"+this.category_id}
      this.foodTypeService.getBannerSub(bodymobile, headers).subscribe((data: any) => {

        this.bannerList = data.data.banner_list

      })
      this.foodTypeService.categoryBasedResto(body,headers).subscribe((data: any)=>{
        if(data.code == 200){

          this.restaurantList = data.data.all_restautrant_details;

          this.categoryList = data.data.category_list;
          for(let j = 0;j< this.categoryList.length;j++){
            if(this.categoryList[j].category_id==this.category_id){
              this.categoryName = this.categoryList[j].category_name;
            }
          }
        }else{
          console.log("dadada2")
        }

      }, (error: any) => {
        console.log(error)
      })

      this.foodTypeService.specialOffer(body,headers).subscribe((data: any)=>{
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
  getRestohname(name) {
    if (name.length > 21) {
      return name.substring(0, 26) + "...";
    } else {
      return name
    }

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
  seeRestoWeb(banner) {
    if (banner.store_id != "")
      window.location.href = '/promotion/' + this.seemenu(banner.store_id);
    else {
      window.location.href = banner.link
    }
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
