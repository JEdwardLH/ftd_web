// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, Inject, NgZone } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../service/merchant/merchant.service';
import { ProductService } from '../../service/product/product.service';
import { CartService } from '../../service/cart/cart.service'
import { MapsAPILoader } from '@agm/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service'
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CustomerService } from '../../service/customer/customer.service'
declare let gtag: Function;
declare let fbq: Function;
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  // LANGUAGE
  LanguageText: any;
  isLanguageLoaded = false;
  categorylist = ""
  hotpromotionscarousel = {
    items: 4,
    margin: 20,
    dots: false,
    loop: true,
    autoplay: false,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
    nav: true,
    responsive: {
      0: {
        items: 2,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      425: {
        items: 2,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      575: {
        items: 2,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      768: {
        items: 3,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      993: {
        items: 3
      },
      1201: {
        item: 3
      }
    }
  };

  mostpopularcarousel = {
    items: 4,
    margin: 20,
    dots: false,
    loop: true,
    autoplay: false,
    autoplayHoverPause: false,
    mouseDrag: false,
    touchDrag: false,
    pullDrag: false,
    navText: ["<i class='fas fa-angle-left'></i>", "<i class='fas fa-angle-right'></i>"],
    nav: true,
    responsive: {
      0: {
        items: 2,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      575: {
        items: 2,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      768: {
        items: 3,
        mouseDrag: true,
        touchDrag: true,
        pullDrag: true
      },
      993: {
        items: 3
      },
      1201: {
        item: 3
      }
    }
  };


  // MAP
  restoreviewlist = []
  title: string = 'AGM project';
  optionselecteditemm = {}
  showuserlocation = false
  latitude = 12.934744792464073;
  longitude = 100.88999156314544;
  restolatitude = 12.934622;
  restolongitude = 100.89016900000001;

  zoom = 20;
  address: string;
  private geoCoder;

  @ViewChild('search')
  public searchElementRef: ElementRef;
  // END MAP
  AllOptions: any;
  params: string
  lang: string;
  stID: number;
  restoName: string;
  restoImage = "";
  restaurant_desc: string;
  restoid: number;
  cartstoreid = 0
  cartstorename: string
  rating: string;
  deliverytime: string;
  restoCategory: string;
  restoDesc = "";
  productListWithCategory: any;
  selectedCategory = 0
  categoryList = [];
  categoryNameList = [];
  categoryYpos = [];
  catidlist = [];
  workingHours = []
  isDescMore = false;
  showExtra = false;
  hasVouch = false;
  hasDiscout = false;
  hasCart = false;
  selectedProduct: any;
  selectedCategoryName: string;
  productisLoaded = false;
  checkOption: any;
  checkOptionSelected: any;
  selectedProdImg: string;
  cartDetails = []
  cartGrandTotal: string;
  vouchercode: string;
  cartSubTotal: string;
  discountValue: string;
  specialinstruction: string;
  orderQty: number;
  cartid: number;
  selectedProName: string;
  selectedProDesc: string;
  selectedRequiredOpt: any;
  discountList = []
  topProducts = []
  promoshowall = false
  popularshowall = false
  usermarker: any
  magnify = false
  checcartdone = false
  img = ""
  merchantmarker: any
  storename = ""
  pagenotfound = false
  mycomment = "--"
  myrating = ""
  mycreate_time = ""
  mycfoodreate_time = ""
  avgrating = ""
  foodavgrating = ""
  star1 = ""
  star2 = ""
  star3 = ""
  star4 = ""
  star5 = ""
  reviewcomment = ""
  storeratingvalue = 5
  reviewsuccessmessage =""
  productreviewcount = ""
  foodviewlist = []
  myfoodcomment = "--"
  myfoodrating = ""
  foodratingvalue = 5
  foodreviewcomment = ""
  productidtorate = ""

  mySlideOptions = { items: 7, dots: false, nav: true, navText: ["<img src='../../../assets/images/prev-arrow.png'>", "<img src='../../../assets/images/next-arrow.png'>"] };
  constructor(
    private actRoute: ActivatedRoute,
    private MerchantService: MerchantService,
    private ProductService: ProductService,
    private StringTServiceL: StringTService,
    public dialog: MatDialog,
    private CartService: CartService,
    public CustomerService:CustomerService
  ) {

    // LANGUAGE
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })


    if (this.actRoute.snapshot.params.hasOwnProperty("id")) {
      this.params = this.actRoute.snapshot.params.id;
      this.restoid = parseInt(atob(this.params)) || 0;
      if (this.restoid == 0) {
        window.location.href = '/';
      }
    } else {

      this.lang = this.actRoute.snapshot.params.lang;
      if (this.lang == "en" || this.lang == "th") {
        this.storename = this.actRoute.snapshot.params.storename;
        localStorage.language = this.lang
      } else {
        this.pagenotfound = true
      }

    }

  }

  ngOnInit(): void {
    this.usermarker = {
      url: "/assets/images/Icon House1-6.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.merchantmarker = {
      url: "/assets/images/Icon House1-4.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    window.addEventListener('scroll', this.scroll, true);
    this.vouchercode = ""

    if (this.storename == "") {
      this.getMerchantDetails()

      this.getMerchantOptions()
      this.getRestoRating(this.restoid)
    } else {
      const body = { lang: "en", storename: this.storename.replace("HHH","(").replace("NNN",")") }

      this.MerchantService.storenametostoreid(body).subscribe((data: any) => {
        if (data.code == 200) {
          this.restoid = data.data;
          this.getMerchantDetails()

          this.getMerchantOptions()
          this.getRestoRating(this.restoid)
        } else {
          this.pagenotfound = true
        }
      }, (error: any) => {
        this.pagenotfound = true
      })
    }


  }

  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(DialogMessage, {
      width: '300px',
      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {

      if (result == "yes") {
        this.clearCart()
      }


    });
  }
  writeRestoReview(){
    var number = this.storeratingvalue
    if(number==1){
      this.star1 = " darked"
      this.star2 = ""
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==2){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==3){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = ""
      this.star5 = ""
    }else if(number==4){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = ""
    }else if(number==5){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = " darked"
    }
    document.getElementById("openmodalreview").click();
  }

  writeFoodReview(){
    var number = this.foodratingvalue
    if(number==1){
      this.star1 = " darked"
      this.star2 = ""
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==2){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==3){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = ""
      this.star5 = ""
    }else if(number==4){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = ""
    }else if(number==5){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = " darked"
    }
    document.getElementById("openmodalreviewfood").click();
  }

  ratestar(number){
    this.storeratingvalue = number

    if(number==1){
      this.star1 = " darked"
      this.star2 = ""
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==2){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==3){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = ""
      this.star5 = ""
    }else if(number==4){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = ""
    }else if(number==5){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = " darked"
    }

  }

  ratestarfood(number){
    this.foodratingvalue = number

    if(number==1){
      this.star1 = " darked"
      this.star2 = ""
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==2){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = ""
      this.star4 = ""
      this.star5 = ""

    }else if(number==3){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = ""
      this.star5 = ""
    }else if(number==4){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = ""
    }else if(number==5){
      this.star1 = " darked"
      this.star2 = " darked"
      this.star3 = " darked"
      this.star4 = " darked"
      this.star5 = " darked"
    }

  }

  submitrating(){
    document.getElementById("closereview").click();
    var headers = {};

    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      return
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang,rating:this.storeratingvalue,restaurant_id:this.restoid,comment:this.reviewcomment}

    this.CustomerService.RestoRating(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        document.getElementById("openmodalsuccess").click();
        this.reviewsuccessmessage = data.message
        this.getRestoRating(this.restoid)


      } else {

      }
    }, (error: any) => {

    })
  }
  submitfoodrating(){
    document.getElementById("foodclosereview").click();
    var headers = {};

    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      return
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang,rating:this.foodratingvalue,product_id:this.productidtorate,comment:this.foodreviewcomment}

    this.CustomerService.FoodRating(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        document.getElementById("openmodalsuccess").click();
        this.reviewsuccessmessage = data.message
        this.getFoodRating(this.productidtorate)


      } else {

      }
    }, (error: any) => {

    })
  }
  getRestoRating(storeid) {

    var headers = {};

    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      return
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang,type:1,id:storeid,view:"all" }

    this.CustomerService.CheckRating(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        this.restoreviewlist = data.data.other_review
        this.mycomment = data.data.your_review.comment
        this.myrating = data.data.your_review.rating
        if(data.data.your_review.comment != "--"){
          this.storeratingvalue = data.data.your_review.rating
          this.reviewcomment = data.data.your_review.comment
        } else{
          this.storeratingvalue = 5
          this.reviewcomment = ""
        }




        this.mycreate_time = data.data.your_review.create_time
        this.avgrating = data.data.avgrating


      } else {

      }
    }, (error: any) => {

    })
  }

  getFoodRating(prodid) {
    this.productidtorate = prodid
    var headers = {};

    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      return
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang,type:2,id:prodid,view:"all" }
    this.myfoodcomment = "--"
    this.myfoodrating = ""
    this.foodratingvalue = 5
    this.foodreviewcomment = ""
    this.CustomerService.CheckRating(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        this.foodviewlist = data.data.other_review
        this.myfoodcomment = data.data.your_review.comment
        this.myfoodrating = data.data.your_review.rating
        if(data.data.your_review.comment != "--"){
          this.foodratingvalue = data.data.your_review.rating
          this.foodreviewcomment = data.data.your_review.comment
        } else{
          this.foodratingvalue = 5
          this.foodreviewcomment = ""
        }




        this.mycfoodreate_time = data.data.your_review.create_time
        this.foodavgrating = data.data.avgrating


      } else {

      }
    }, (error: any) => {

    })
  }
  private getMerchantDetails() {
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
    const body = { restaurant_id: this.restoid, lang: this.lang }

    this.MerchantService.restaurantDetails(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        if (localStorage.language == "th") {
          this.categorylist = data.data.restaurant_info.restaurant_category_thai.split(",")
        } else {
          this.categorylist = data.data.restaurant_info.restaurant_category.split(",");
        }

        for (let j = 0; j < data.data.category_list.length; j++) {
          this.categoryList.push({ categoryid: data.data.category_list[j].main_category_id, categoryname: data.data.category_list[j].main_category_name })

        }
        this.restolatitude = Number(data.data.restaurant_info.st_latitude)
        this.restolongitude = Number(data.data.restaurant_info.st_longitude)
        this.restoName = data.data.restaurant_info.restaurant_name;
        this.restoImage = data.data.restaurant_info.restaurant_logo;
        this.stID = data.data.restaurant_info.restaurant_id;
        this.rating = data.data.restaurant_info.restaurant_rating;
        this.deliverytime = data.data.restaurant_info.delivery_time;
        this.restoCategory = data.data.restaurant_info.restaurant_category;
        this.restoDesc = data.data.restaurant_info.restaurant_desc;
        var daylist = [];
        for (var i = 0; i < data.data.working_hours.length; i++) {
          if (!daylist.includes(data.data.working_hours[i].working_date)) {
            daylist.push(data.data.working_hours[i].working_date)
            this.workingHours.push(data.data.working_hours[i])
          }
        }



        this.getProducts()

      }


    })

  }
  getdisplaydate(datet){
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var acceptdrray = datet.split(" ");

    var acceptdatearray = acceptdrray[0].split("-")
    var accepttimearray = acceptdrray[1].split(":")


    var date = new Date(Number(acceptdatearray[0]), Number(acceptdatearray[1]), Number(acceptdatearray[2]), Number(accepttimearray[0]), Number(accepttimearray[1]), Number(accepttimearray[2]));
    return date.getDate()+" "+month[date.getMonth()]+" | "+this.formatAMPM(date)
  }
  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  showproduct(type, status) {
    if (type == "promo") {
      this.promoshowall = status
    } else {
      this.popularshowall = status
    }


  }
  gotohomepage() {
    window.location.href = '/';
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
  private getCartDetails() {
    this.orderQty = 1
    var headers = {};


    this.checkOptionSelected = [];
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
    const body = { restaurant_id: this.restoid, lang: this.lang }
    this.cartGrandTotal = ""
    this.cartSubTotal = ""
    this.CartService.getCart(body, headers).subscribe((data: any) => {
      this.checcartdone = true
      if (data.code == 200) {

        this.cartstoreid = data.data.cart_details[0].store_id;
        this.cartDetails = data.data.cart_details[0].added_item_details;
        this.cartstorename = data.data.cart_details[0].store_name
        let currency = data.data.currency_code;
        this.cartSubTotal = currency + data.data.cart_sub_total;
        this.cartGrandTotal = currency + data.data.total_cart_amount;
        if (data.data.cart_details.length > 0) {
          for (let j = 0; j < data.data.cart_details[0].added_item_details.length; j++) {

            if (data.data.cart_details[0].added_item_details[j].order_option_items != null) {
              for (let i = 0; i < data.data.cart_details[0].added_item_details[j].order_option_items.length; i++) {
                this.checkOptionSelected.push(data.data.cart_details[0].added_item_details[j].order_option_items[i])

              }
            }

          }
        }

        this.hasCart = true;
      } else {
        this.cartDetails = [];
        this.hasCart = false;
      }



    })

  }
  private getCartDetailsWCoupon() {
    var headers = {};
    this.orderQty = 1
    this.cartDetails = [];

    this.checkOptionSelected = [];
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
        this.hasDiscout = true;
        this.hasVouch = false;
        for (let j = 0; j < data.data.cart_details[0].added_item_details.length; j++) {

          for (let i = 0; i < data.data.cart_details[0].added_item_details[j].order_option_items.length; i++) {
            this.checkOptionSelected.push(data.data.cart_details[0].added_item_details[j].order_option_items[i])

          }
        }
        this.hasCart = true;
      } else {
        this.hasDiscout = false;
        this.hasCart = false;
      }


    })

  }
  getProductname(name) {
    if (name.length > 7) {
      return name.substring(0, 8) + "..";
    } else {
      return name
    }

  }
  getCategoryname(categoryid) {
    for (let j = 0; j < this.categoryList.length; j++) {
      if (this.categoryList[j].categoryid == categoryid) {
        return this.categoryList[j].categoryname;
      }
    }
    return this.getCategoryname2(categoryid)
  }
  getCategoryname2(categoryid) {
    for (let j = 0; j < this.categoryList.length; j++) {
      if (this.categoryList[j].categoryid == categoryid) {
        return this.categoryList[j].categoryname;
      }
    }
    return ""
  }
  private getProducts() {
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
    const body = { restaurant_id: this.restoid, lang: this.lang, main_category_id: "0", sub_category_id: "", sort_by: "", search_text: "", item_type: "", page_no: "*", all: "0" }

    this.ProductService.getAllProductByResto(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.productListWithCategory = data.data.item_lists;
        for (let i = 0; i < this.productListWithCategory.length; i++) {

          this.categoryNameList.push({ categoryid: this.productListWithCategory[i].category_id, categoryname: this.getCategoryname(this.productListWithCategory[i].category_id) })

        }
        this.topProducts = data.data.topProducts
        this.discountList = data.data.discountList;
        this.getCartDetails()
      }


    })
  }
  private getProductDetail(product) {
    this.getFoodRating(product.item_id)
    this.productreviewcount = ""
    this.selectedProduct = [];
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
    const body = { item_id: product.item_id, lang: this.lang, review_page_no: "1" }

    this.ProductService.getProductDetails(body, headers).subscribe((data: any) => {
      window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      if (data.code == 200) {
        this.checkOption = [];
        this.selectedProduct = data.data;
        this.selectedProName = data.data.itemt_info.item_name
        this.selectedProDesc = data.data.itemt_info.item_desc
        this.productreviewcount = data.data.reviewcount


        this.productisLoaded = true;
        this.selectedProdImg = data.data.itemt_info.item_image[0]
        this.img = this.getCompressurl(this.selectedProdImg);//+"?height=700&width=700"
        var productname = this.selectedProduct.itemt_info.item_name

      }
      this.orderQty = 1;
      this.cartid = 0;
      for (let j = 0; j < this.cartDetails.length; j++) {
        if (this.selectedProduct.itemt_info.item_id == this.cartDetails[j].product_id) {
          this.cartid = this.cartDetails[j].cart_id;
          this.orderQty = this.cartDetails[j].cart_quantity;
          for (let i = 0; i < this.cartDetails[j].order_option_items.length; i++) {
            if (!this.checkIfOptionRequired(this.cartDetails[j].order_option_items[i]))
              this.checkOption.push(this.cartDetails[j].order_option_items[i])
          }
        }

      }
      this.selectedRequiredOpt = {};
      for (let j = 0; j < this.selectedProduct.product_options.length; j++) {
        this.optionselecteditemm[this.selectedProduct.product_options[j].id] = 0;
        if (this.selectedProduct.product_options[j].required == 1 || this.selectedProduct.product_options[j].required == 3) {
          this.selectedRequiredOpt[this.selectedProduct.product_options[j].id] = this.getSelectedOptionRequired(this.selectedProduct.product_options[j].items);


        }
      }

    })
  }
  getSelectedOptionRequired(options) {
    for (let j = 0; j < this.cartDetails.length; j++) {
      for (let i = 0; i < options.length; i++) {
        if (this.cartDetails[j].order_option_items != null) {
          if (this.cartDetails[j].order_option_items.includes(options[i].id)) {
            return options[i].id;
          }
        }

      }
    }
    return options[0].id;
  }
  checkIfOptionRequired(optionID) {
    for (let i = 0; i < this.selectedProduct.product_options.length; i++) {
      for (let j = 0; j < this.selectedProduct.product_options[i].items.length; j++) {
        if (optionID == this.selectedProduct.product_options[i].items[j].id) {
          if (this.selectedProduct.product_options[i].required == 1 || this.selectedProduct.product_options[i].required == 3) {
            return true
          }
        }

      }

    }
    return false;
  }
  Showlimit(productoption,max){
    if(productoption.option_item_limit==0){
      return ""
    }else{
      return max+" "+productoption.option_item_limit
    }
  }
  isDisable(productoption, item) {
    var optionselecteditemm = {}
    if(productoption.option_item_limit ==0){
      return false
    }
    for (let i = 0; i < this.selectedProduct.product_options.length; i++) {
      optionselecteditemm[this.selectedProduct.product_options[i].id]=0
    }

    const index = this.checkOptionSelected.indexOf(item);
    if (index > -1) {
      return false
    }
    for (let i = 0; i < this.selectedProduct.product_options.length; i++) {
      for (let j = 0; j < this.selectedProduct.product_options[i].items.length; j++) {
        const index = this.checkOptionSelected.indexOf(this.selectedProduct.product_options[i].items[j].id);
        if (index > -1) {
          optionselecteditemm[this.selectedProduct.product_options[i].id]++;
        } else {

        }

      }
    }

    if(optionselecteditemm[productoption.id]>=productoption.option_item_limit    ){
      return true
    }else{
      return false
    }


  }
  private addItemToBasket(productid, options, qty) {

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
    const body = { choices_id: [], lang: this.lang, option_items_id: options, item_id: productid, quantity: qty, special_notes: this.specialinstruction, st_id: this.stID }

    this.CartService.addCart(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        var productname = this.selectedProduct.itemt_info.item_name


        if (this.vouchercode == "") {
          this.getCartDetails()
        } else {
          this.getCartDetailsWCoupon()
        }

        this.showExtra = false;
      }


    })
  }

  private updateItemToBasket(cartid, options, qty) {
    this.selectedProduct = [];
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

        this.showExtra = false;
      }


    })
  }
  showMagnify(state) {
    this.magnify = state
  }
  removeItemOnCart(cartid) {
    this.selectedProduct = [];
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

        this.showExtra = false;
      }


    })
  }
  getPrice(prod) {
    let product = prod || [];
    if (product.hasOwnProperty("item_has_discount")) {
      if (product.item_has_discount == "Yes") {
        return product.item_currency + "" + product.item_discount_price;
      } else {
        return product.item_currency + "" + product.item_original_price;
      }
    } else {
      return "";
    }

  }
  getPriceDiscount(prod) {
    let product = prod || [];
    if (product.hasOwnProperty("item_has_discount")) {
      if (product.item_has_discount == "Yes") {
        return product.item_currency + "" + product.item_original_price;
      } else {
        return "";
      }
    } else {
      return "";
    }

  }

  scrollToCategory(categoryid, basecategoryid) {
    var elmnt0 = document.getElementById("cate-" + basecategoryid);
    var topPos0 = elmnt0.offsetTop;
    this.showExtra = false;
    this.selectedCategory = categoryid;

    var elmnt = document.getElementById("cate-" + categoryid);
    var topPos = elmnt.offsetTop;


    window.scrollTo({
      top: topPos + topPos0 - 140,
      left: 0,
      behavior: 'smooth'
    });

  }
  isCategoryActive(categoryid) {
    if (this.selectedCategory == categoryid) {
      return "active";
    } else {
      return "";
    }
  }
  scroll = (event): void => {

    var minval = 0;
    for (let j = 0; j < this.categoryList.length; j++) {

      let elmnt = document.getElementById("cate-" + this.categoryList[j].categoryid);
      let elementpos = this.position(elmnt)[1]

      if (!this.catidlist.includes(this.categoryList[j].categoryid)) {
        this.catidlist.push(this.categoryList[j].categoryid)
        this.categoryYpos.push({ catid: this.categoryList[j].categoryid, posY: elementpos })
      }


      if (minval == 0) {
        minval = elementpos
      } else {
        if (minval > elementpos) {
          minval = elementpos;
        }
      }


    }
    this.categoryYpos.sort(function (a, b) {
      return parseFloat(a.posY) - parseFloat(b.posY);
    });

    var screenPosition = event.target.scrollingElement.scrollTop - (minval + 120)//document.getElementById('product-data-list').scrollTop + minval;


    for (let i = 0; i < this.categoryYpos.length; i++) {

      if (this.categoryYpos[i].posY < screenPosition + 930) {
        this.selectedCategory = this.categoryYpos[i].catid;
      }
    }
  };
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
  onScroll(event: Event) {

    var minval = 0;
    for (let j = 0; j < this.categoryList.length; j++) {

      let elmnt = document.getElementById("cate-" + this.categoryList[j].categoryid);
      let elementpos = this.position(elmnt)[1]
      if (!this.catidlist.includes(this.categoryList[j].categoryid)) {
        this.catidlist.push(this.categoryList[j].categoryid)
        this.categoryYpos.push({ catid: this.categoryList[j].categoryid, posY: elementpos })
      }


      if (minval == 0) {
        minval = elementpos
      } else {
        if (minval > elementpos) {
          minval = elementpos;
        }
      }


    }
    this.categoryYpos.sort(function (a, b) {
      return parseFloat(a.posY) - parseFloat(b.posY);
    });

    var screenPosition = document.getElementById('product-data-list').scrollTop + minval;


    for (let i = 0; i < this.categoryYpos.length; i++) {

      if (this.categoryYpos[i].posY < screenPosition + 200) {
        this.selectedCategory = this.categoryYpos[i].catid;
      }
    }

  }
  position(el) {
    for (var pos = [0, 0]; el; el = el.offsetParent) {
      pos[0] += el.offsetLeft - el.scrollLeft;
      pos[1] += el.offsetTop - el.scrollTop;
    }
    return pos;
  }
  showDescription(desc) {
    if (desc.length > 100) {
      if (this.isDescMore) {
        return desc;
      } else {
        return desc.substring(0, 120) + "....";
      }
    } else {
      return desc
    }


  }
  isdescriptionMore(desc) {
    if (this.isDescMore) {
      return false
    } else {
      if (desc.length > 100) {
        return true
      } else {
        return false
      }
    }

  }
  getCompressurl(path) {
    return path;
    //return "https://kalanbanga.co.th/litrato/image/product/" + this.basename(path);
  }
  basename(path) {
    var bs = path.split('/').reverse()[0];
    if(bs == ""){
      return "noproduct.png"
    }else{
      return path.split('/').reverse()[0];
    }

  }
  showMoreDesc() {
    this.isDescMore = true;
  }
  AddProductToCart(prod, categoryname) {

    this.selectedCategoryName = categoryname;
    this.productisLoaded = false;
    this.getProductDetail(prod)
    this.showExtra = true;
  }
  backToProdutList() {
    this.showExtra = false;
  }
  getOptionName(option) {

    return option.name;

  }
  isRequired(extraOption) {
    if (extraOption.required == 1 || extraOption.required == 3) {
      return true;
    } else {
      return false;
    }
  }
  getOptionPrice(option, extraOption, currency) {
    if (option.price == 0) {
      return "";
    }
    if (extraOption.required == 1 || extraOption.required == 3) {
      return currency + option.price;
    } else {
      return "+" + currency + option.price
    }
  }
  increaseOrder() {
    this.orderQty = this.orderQty + 1
  }
  decreaseOrder() {
    this.orderQty = this.orderQty - 1
  }
  clearCart() {

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
    const body = { cart_id: '', lang: this.lang, }

    this.CartService.clearCart(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        var optionList = [];
        for (const [key, value] of Object.entries(this.selectedRequiredOpt)) {

          if (!optionList.includes(value))
            optionList.push(value);
        }
        for (const [key, value] of Object.entries(this.checkOption)) {

          if (!optionList.includes(value))
            optionList.push(value);
        }
        if (this.orderQty > 0)
          this.addItemToBasket(this.selectedProduct.itemt_info.item_id, optionList, this.orderQty)


      }


    })
  }
  addItemToCart() {
    if (localStorage.usermode == "1") {
      if (this.restoid == this.cartstoreid || this.cartstoreid == 0) {
        var optionList = [];
        for (const [key, value] of Object.entries(this.selectedRequiredOpt)) {

          if (!optionList.includes(value))
            optionList.push(value);
        }
        for (const [key, value] of Object.entries(this.checkOption)) {

          if (!optionList.includes(value))
            optionList.push(value);
        }
        if (this.orderQty > 0)
          this.addItemToBasket(this.selectedProduct.itemt_info.item_id, optionList, this.orderQty)
      } else {
        this.openDialog("You have item on cart from " + this.cartstorename + " do you want to clear your cart?")
        return
      }

    } else {
      this.openDialog("Please login")
    }

  }
  updatItemToCart() {
    var optionList = [];
    for (const [key, value] of Object.entries(this.selectedRequiredOpt)) {

      if (!optionList.includes(value))
        optionList.push(value);
    }
    for (const [key, value] of Object.entries(this.checkOption)) {

      if (!optionList.includes(value))
        optionList.push(value);
    }
    this.updateItemToBasket(this.cartid, optionList, this.orderQty)
  }
  carItemInc(cartitem) {
    var optionList = [];
    for (const [key, value] of Object.entries(cartitem.order_option_items)) {

      if (!optionList.includes(value))
        optionList.push(value);
    }
    this.updateItemToBasket(cartitem.cart_id, optionList, cartitem.cart_quantity + 1)
  }
  carItemDec(cartitem) {

    var optionList = [];
    for (const [key, value] of Object.entries(cartitem.order_option_items)) {

      if (!optionList.includes(value))
        optionList.push(value);
    }
    if (cartitem.cart_quantity != 1) {
      this.updateItemToBasket(cartitem.cart_id, optionList, cartitem.cart_quantity - 1)
    } else {
      this.removeItemOnCart(cartitem.cart_id)
    }

  }
  inputVoucher() {
    this.hasVouch = true;
  }
  removeVoucher() {
    this.vouchercode = "";
    this.getCartDetails();
  }
  ValidateCode(code) {
    this.getCartDetailsWCoupon()
  }
  onRadioChange(option, key) {
    this.selectedRequiredOpt[key] = option;


  }
  onCheckboxChange(e) {

    let id = parseInt(e.target.value)
    if (e.target.checked) {

      this.checkOption.push(id);
      this.checkOptionSelected.push(id);
    } else {
      const index = this.checkOption.indexOf(id);
      const index2 = this.checkOptionSelected.indexOf(id);
      if (index > -1) {
        this.checkOption.splice(index, 1);
        this.checkOptionSelected.splice(index2, 1);
      }

    }

  }
  clickCheckboxChange(e) {

    let id = parseInt(e.target.value)
    if (e.target.checked) {

      this.checkOption.push(id);
      this.checkOptionSelected.push(id);
    } else {
      const index = this.checkOption.indexOf(id);
      const index2 = this.checkOptionSelected.indexOf(id);
      if (index > -1) {
        this.checkOption.splice(index, 1);
        this.checkOptionSelected.splice(index2, 1);
      }

    }

  }
  isOptionSelected(id) {
    const index = this.checkOptionSelected.indexOf(id);
    if (index > -1) {
      return true
    } else {
      return false;
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
  }
  showOptonPrice(optionid, cart_currency) {
    for (let j = 0; j < this.AllOptions.length; j++) {
      if (this.AllOptions[j].id == optionid && this.AllOptions[j].required != 1) {
        if (this.AllOptions[j].price == 0) {
          return "";
        } else {
          return "+" + cart_currency + "" + this.AllOptions[j].price;
        }


      }
    }
    return "";
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

}
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class DialogMessage {
  message: any
  login = false;
  constructor(
    public dialogRef: MatDialogRef<DialogMessage>,
    @Inject(MAT_DIALOG_DATA) public data: ProductsComponent) {
    this.message = this.data
    if (this.message.errormessage == "Please login") {
      this.login = true
    } else {
      this.login = false
    }
  }
  gotologin(): void {
    window.location.href = '/login';
  }
  close(): void {
    this.dialogRef.close("no");
  }
  proceed(): void {
    if (this.message.errormessage == "Please login") {
      window.location.href = '/login';
    } else {
      this.dialogRef.close("yes");
    }

  }


}
