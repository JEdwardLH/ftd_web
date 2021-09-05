import { Component, OnInit } from '@angular/core';
import { FoodtypeService } from '../../service/foodtype.service';
import { ActivatedRoute } from '@angular/router';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { Foodtype } from '../../service/foodtype';
import { CartService } from 'src/app/service/cart/cart.service';
@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.css']
})

export class SearchresultComponent implements OnInit {
lang:string;
searchText: string;
foodTypes: Foodtype[] = [];
latitude: number;
ismouseenter = false
issuggestionshow = false
screenWidth = window.innerWidth;
longitude: number;
apicalldone = true
usermode:boolean;
guestmode:boolean;
restaurantList:any;
LanguageText: any;
sugestionlist = []
searchresultlist = []
filterquery = ""
filterdata = {}
filtercategorylist = []
issearch = 1
isLanguageLoaded = false;
  constructor(private actRoute: ActivatedRoute,private foodTypeService: FoodtypeService,private StringTServiceL: StringTService,public CartService: CartService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
    if(this.actRoute.snapshot.params.id) {
        console.log(this.actRoute.snapshot.params.id);

        try{
          this.filterquery = atob(this.actRoute.snapshot.params.id)
          this.filterdata = JSON.parse(this.filterquery)
          this.filtercategorylist = this.filterdata['categorylist']
          this.issearch = 0
        }catch(err) {
          this.issearch = 1
          this.searchText = this.actRoute.snapshot.params.id;
        }

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
    if(this.issearch==1){
      this.searchRestaurant(this.searchText)
    }else{
      this.filterResto()
    }
    this.showsuggestion()
  }
  private searchRestaurant(key) {
    this.restaurantList = [];


    this.loadData(key)


  }
  loadData(key){
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

      const body = {  user_latitude: this.latitude,user_longitude:this.longitude,lang:this.lang, search_key	: key}


      this.foodTypeService.searchResto(body,headers).subscribe((data: any)=>{
        this.apicalldone = false
        if(data.code == 200){
          this.restaurantList = data.data.search_list;
          console.log(this.restaurantList )
        }else{
          this.apicalldone = false
        }

      }, (error: any) => {
        this.apicalldone = false
    })
  }
  filterResto(){
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }
    if(localStorage.language == "th"){
      this.lang = "th"
    }else{
      this.lang = "en"
    }

    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '',category_id:this.filtercategorylist ,lang: this.lang, page: "0" }
    this.foodTypeService.getAllResto(body, headers).subscribe((data: any) => {
      this.apicalldone = false
      if(data.code == 200){
        this.restaurantList = data.data.all_restaurant;
        console.log(this.restaurantList )
        this.foodTypes = data.data.category_list
      }else{
        this.apicalldone = false
      }

    })
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
    window.location.href= "/"+this.lang+"/batangas/restaurant/"+resto.store_name.replace("(", '%28').replace(")", '%29');
  }
  public seeResto2(resto){
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
    if(this.issearch==1){
      return "/"+this.lang+"/batangas/restaurant/"+resto.store_name.replace("(", '%28').replace(")", '%29');
    }else{
      return "/"+this.lang+"/batangas/restaurant/"+resto.restaurant_name.replace("(", '%28').replace(")", '%29');
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
