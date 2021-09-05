// import { Component, OnInit } from '@angular/core';
import { Component, OnInit, ViewChild, ElementRef, Inject ,NgZone } from '@angular/core';
import { LoginService } from 'src/app/service/login/login.service'
import { ActivatedRoute } from '@angular/router';
import { MerchantService } from '../../service/merchant/merchant.service';
import { ProductService } from '../../service/product/product.service';
import { CartService } from '../../service/cart/cart.service'
import { MapsAPILoader } from '@agm/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-products',
  templateUrl: './adminproducts.component.html',
  styleUrls: ['./products.component.css']
})
export class AdminProductsComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

hotpromotionscarousel={
  items: 4,
  margin:30,
  dots: false,
  loop: true,
  autoplay:false,
  autoplayHoverPause:false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  navText: ["<i class='fas fa-angle-left'></i>","<i class='fas fa-angle-right'></i>"],
  nav:true,
  responsive:{
  0:{
      items:3
  },
  575:{
      items:3
  },
  768:{
      items:3
  },
993:{
      items:3
  },
1201:{
 item:3
}
}};

mostpopularcarousel={
  items: 4,
  margin:30,
  dots: false,
  loop: true,
  autoplay:false,
  autoplayHoverPause:false,
  mouseDrag: false,
  touchDrag: false,
  pullDrag: false,
  navText: ["<i class='fas fa-angle-left'></i>","<i class='fas fa-angle-right'></i>"],
  nav:true,
  responsive:{
  0:{
      items:3
  },
  575:{
      items:3
  },
  768:{
      items:3
  },
993:{
      items:3
  },
1201:{
 item:3
}
}};


// MAP
title: string = 'AGM project';
latitude = 12.934622;
longitude = 100.89016900000001;
zoom = 8;
address: string;
private geoCoder;

@ViewChild('search')
public searchElementRef: ElementRef;
// END MAP
AllOptions:any;
params: string
lang:string;
stID: number;
restoName:string;
restoImage:string;
restaurant_desc:string;
restoid:string;
cartstoreid = ""
cartstorename:string
rating:string;
deliverytime:string;
restoCategory:string;
restoDesc = "";
productListWithCategory:any;
selectedCategory = 0
categoryList = [];
categoryNameList = [];
categoryYpos = [];
catidlist = [];
isDescMore = false;
showExtra = false;
hasVouch = false;
hasDiscout = false;
hasCart = false;
selectedProduct : any;
selectedCategoryName:string;
productisLoaded = false;
checkOption: any;
checkOptionSelected:any;
selectedProdImg: string;
cartDetails:any;
cartGrandTotal:string;
vouchercode: string;
cartSubTotal:string;
discountValue:string;
specialinstruction: string;
orderQty: number;
cartid: number;
selectedProName:string;
selectedProDesc:string;
selectedRequiredOpt:any;
discountList = []
topProducts = []
mySlideOptions={items: 7, dots: false, nav:true,  navText: ["<img src='../../../assets/images/prev-arrow.png'>","<img src='../../../assets/images/next-arrow.png'>"]};
  constructor(
    private actRoute: ActivatedRoute,
    private MerchantService: MerchantService,
    private ProductService: ProductService,
    private StringTServiceL: StringTService,
    public dialog: MatDialog,
    private CartService: CartService,
    private LoginService :LoginService
    ) {

    // LANGUAGE
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })


    this.params = this.actRoute.snapshot.params.id;
    try {
      var jsonparams = atob(this.params)
      var obj = JSON.parse(jsonparams)
      this.restoid = obj.restoid
      this.login(obj.u,obj.s)
    }
    catch(err) {

    }




  }
  public login(email,password){
      const headers = {  'Content-Type': 'application/json' }
      const body = { cus_password: password,login_id:email,type:'admin',lang:"en"};
      this.LoginService.userLogin(body,headers).subscribe((data: any)=>{
        if(data.code == 200){
          localStorage.setItem("hntk",data.data.token)
          localStorage.setItem("user_email",data.data.user_email)
          localStorage.setItem("user_name",data.data.user_name)
          localStorage.setItem("usermode","1");
          this.vouchercode = ""
          this.getMerchantDetails()
          this.getProducts()
          this.getMerchantOptions()
        }

      },(error: any) =>{

      })
    }
  ngOnInit(): void {
    window.addEventListener('scroll', this.scroll, true);
  }

  public isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(DialogMessage, {
      width: '300px',
      data: {errormessage:errormessage}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
      if(result == "yes"){
        this.clearCart()
      }


    });
  }
  private getMerchantDetails(){
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
    const body = { restaurant_id: this.restoid,lang:this.lang}

    this.MerchantService.restaurantDetails(body,headers).subscribe((data: any)=>{
      if(data.code == 200){

        this.restoName = data.data.restaurant_info.restaurant_name;
        this.restoImage = data.data.restaurant_info.restaurant_logo;
        this.stID = data.data.restaurant_info.restaurant_id;
        this.rating = data.data.restaurant_info.restaurant_rating;
        this.deliverytime = data.data.restaurant_info.delivery_time;
        this.restoCategory = data.data.restaurant_info.restaurant_category;
        this.restoDesc = data.data.restaurant_info.restaurant_desc;
        for(let j = 0;j< data.data.category_list.length;j++){
          this.categoryList.push({categoryid:data.data.category_list[j].main_category_id,categoryname:data.data.category_list[j].main_category_name})

        }

      }


    })

  }
  private getMerchantOptions(){
    this.AllOptions = [];
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
    const body = { store_id: this.restoid,lang:this.lang}

    this.ProductService.getProductOptionbyStore(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        this.AllOptions = data.data;

      }


    })

  }
  private getCartDetails(){
    this.orderQty = 1
    var headers = {};

    this.cartDetails = [];
    this.checkOptionSelected = [];
    this.hasDiscout = false;
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
    const body = { restaurant_id: this.restoid,lang:this.lang}

    this.CartService.getCart(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        this.cartstoreid = data.data.cart_details[0].store_id;
        this.cartDetails = data.data.cart_details[0].added_item_details;
        this.cartstorename = data.data.cart_details[0].store_name
        let currency = data.data.currency_code;
        this.cartSubTotal = currency+data.data.cart_sub_total;
        this.cartGrandTotal = currency+data.data.total_cart_amount;
        for(let j = 0;j< data.data.cart_details[0].added_item_details.length;j++){


          for(let i = 0;i< data.data.cart_details[0].added_item_details[j].order_option_items.length;i++){
            this.checkOptionSelected.push(data.data.cart_details[0].added_item_details[j].order_option_items[i])

          }
        }
       this.hasCart = true;
      }else{
        this.hasCart = false;
      }
      console.log(this.checkOptionSelected)


    })

  }
  private getCartDetailsWCoupon(){
    var headers = {};
    this.orderQty = 1
    this.cartDetails = [];

    this.checkOptionSelected = [];
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
    const body = { restaurant_id: this.restoid,lang:this.lang,vcode:this.vouchercode,prod_id:[]}

    this.CartService.getCartWVcode(body,headers).subscribe((data: any)=>{
      if(data.code == 200){

        this.cartDetails = data.data.cart_details[0].added_item_details;
        let currency = data.data.currency_code;
        this.cartSubTotal = currency+data.data.cart_sub_total;
        this.cartGrandTotal = currency+data.data.total_cart_amount;
        this.discountValue = currency+data.data.coupon_code_amount
        this.hasDiscout = true;
        this.hasVouch = false;
        for(let j = 0;j< data.data.cart_details[0].added_item_details.length;j++){

          for(let i = 0;i< data.data.cart_details[0].added_item_details[j].order_option_items.length;i++){
            this.checkOptionSelected.push(data.data.cart_details[0].added_item_details[j].order_option_items[i])

          }
        }
        this.hasCart = true;
      }else{
        this.hasDiscout = false;
        this.hasCart = false;
      }


    })

  }
  getCategoryname(categoryid){
    for(let j = 0;j< this.categoryList.length;j++){
      if(this.categoryList[j].categoryid == categoryid){
        return this.categoryList[j].categoryname;
      }
    }
    return "--";
  }
  private getProducts(){
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
    const body = { restaurant_id: this.restoid,lang:this.lang,main_category_id:"0",sub_category_id:"",sort_by:"",search_text:"",item_type:"",page_no:"*",all:"0"}

    this.ProductService.getAllProductByResto(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        this.productListWithCategory = data.data.item_lists;
        for (let i = 0; i < this.productListWithCategory.length; i++) {

          this.categoryNameList.push({categoryid:this.productListWithCategory[i].category_id,categoryname:this.getCategoryname(this.productListWithCategory[i].category_id)})

        }
        this.topProducts = data.data.topProducts
        this.discountList = data.data.discountList;
        this.getCartDetails()
      }


    })
  }
  private getProductDetail(product){
    this.selectedProduct = [];
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
    const body = { item_id: product.item_id,lang:this.lang,review_page_no:"1"}

    this.ProductService.getProductDetails(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        this.checkOption = [];
        this.selectedProduct = data.data;
        this.selectedProName = data.data.itemt_info.item_name
        this.selectedProDesc = data.data.itemt_info.item_desc


        this.productisLoaded = true;
        this.selectedProdImg = data.data.itemt_info.item_image[0]
      }
      this.orderQty = 1;
      this.cartid = 0;
      for(let j = 0;j< this.cartDetails.length;j++){
        if(this.selectedProduct.itemt_info.item_id == this.cartDetails[j].product_id){
          this.cartid = this.cartDetails[j].cart_id;
          this.orderQty = this.cartDetails[j].cart_quantity;
          for(let i = 0;i< this.cartDetails[j].order_option_items.length;i++){
            if(!this.checkIfOptionRequired(this.cartDetails[j].order_option_items[i]))
              this.checkOption.push(this.cartDetails[j].order_option_items[i])
          }
        }

      }
      this.selectedRequiredOpt = {};
      for(let j = 0;j< this.selectedProduct.product_options.length;j++){
          if(this.selectedProduct.product_options[j].required == 1|| this.selectedProduct.product_options[j].required == 3){
            this.selectedRequiredOpt[this.selectedProduct.product_options[j].id]=this.getSelectedOptionRequired(this.selectedProduct.product_options[j].items);


          }
      }
      console.log(this.selectedRequiredOpt)
    })
  }
  getSelectedOptionRequired(options){
    for(let j = 0;j< this.cartDetails.length;j++){
      for(let i = 0;i< options.length;i++){
        if(this.cartDetails[j].order_option_items.includes(options[i].id)){
          return options[i].id;
        }
      }
    }
    return options[0].id;
  }
  checkIfOptionRequired(optionID){
    for(let i = 0;i< this.selectedProduct.product_options.length;i++){
      for(let j = 0;j< this.selectedProduct.product_options[i].items.length;j++){
        if(optionID == this.selectedProduct.product_options[i].items[j].id){
          if(this.selectedProduct.product_options[i].required == 1||this.selectedProduct.product_options[i].required == 3){
            return true
          }
        }

      }

    }
    return false;
  }
  private addItemToBasket(productid,options,qty){
    this.selectedProduct = [];
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
    const body = { choices_id: [],lang:this.lang,option_items_id:options,item_id:productid,quantity:qty,special_notes:this.specialinstruction,st_id:this.stID}

    this.CartService.addCart(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
       if( this.vouchercode == ""){
          this.getCartDetails()
       }else{
         this.getCartDetailsWCoupon()
       }

       this.showExtra = false;
      }


    })
  }

  private updateItemToBasket(cartid,options,qty){
    this.selectedProduct = [];
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
    const body = { cart_id: cartid,lang:this.lang,option_items_id:JSON.stringify(options),quantity:qty}

    this.CartService.updateQTY(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
       if( this.vouchercode == ""){
          this.getCartDetails()
       }else{
         this.getCartDetailsWCoupon()
       }

       this.showExtra = false;
      }


    })
  }
  removeItemOnCart(cartid){
    this.selectedProduct = [];
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
    const body = { cart_id: cartid,lang:this.lang}

    this.CartService.removeCart(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
       if( this.vouchercode == ""){
          this.getCartDetails()
       }else{
         this.getCartDetailsWCoupon()
       }

       this.showExtra = false;
      }


    })
  }
  getPrice(prod){
    let product = prod || [];
    if(product.hasOwnProperty("item_has_discount")){
      if(product.item_has_discount == "Yes"){
        return product.item_currency+""+product.item_discount_price;
      }else{
        return product.item_currency+""+product.item_original_price;
      }
    }else{
      return "";
    }

  }
  getPriceDiscount(prod){
    let product = prod || [];
    if(product.hasOwnProperty("item_has_discount")){
      if(product.item_has_discount == "Yes"){
        return product.item_currency+""+product.item_original_price;
      }else{
        return "";
      }
    }else{
      return "";
    }

  }

  scrollToCategory(categoryid,basecategoryid){
    var elmnt0 = document.getElementById("cate-"+basecategoryid);
    var topPos0 = elmnt0.offsetTop;
    this.showExtra = false;
    this.selectedCategory = categoryid;
    console.log(topPos0)
    var elmnt = document.getElementById("cate-"+categoryid);
    var topPos = elmnt.offsetTop;


    window.scrollTo({
      top: topPos+topPos0-200,
      left: 0,
      behavior: 'smooth'
    });

  }
  isCategoryActive(categoryid){
      if(this.selectedCategory == categoryid){
        return "active";
      }else{
        return "";
      }
  }
  scroll = (event): void => {

    var minval = 0;
    for(let j = 0;j< this.categoryList.length;j++){

      let elmnt = document.getElementById("cate-"+this.categoryList[j].categoryid);
      let elementpos = this.position(elmnt)[1]

      if(!this.catidlist.includes(this.categoryList[j].categoryid)){
        this.catidlist.push(this.categoryList[j].categoryid)
        this.categoryYpos.push({catid:this.categoryList[j].categoryid,posY:elementpos})
      }


      if(minval == 0){
        minval = elementpos
      }else{
        if(minval > elementpos){
          minval = elementpos;
        }
      }


    }
    this.categoryYpos.sort(function(a, b) {
      return parseFloat(a.posY) - parseFloat(b.posY);
    });

    var screenPosition = event.target.scrollingElement.scrollTop-(minval+120)//document.getElementById('product-data-list').scrollTop + minval;


    for(let i = 0;i<this.categoryYpos.length;i++){

      if (this.categoryYpos[i].posY<screenPosition+930 ){
        this.selectedCategory =  this.categoryYpos[i].catid;
      }
    }
  };
  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
  onScroll(event: Event) {

    var minval = 0;
    for(let j = 0;j< this.categoryList.length;j++){

      let elmnt = document.getElementById("cate-"+this.categoryList[j].categoryid);
      let elementpos = this.position(elmnt)[1]
      if(!this.catidlist.includes(this.categoryList[j].categoryid)){
        this.catidlist.push(this.categoryList[j].categoryid)
        this.categoryYpos.push({catid:this.categoryList[j].categoryid,posY:elementpos})
      }


      if(minval == 0){
        minval = elementpos
      }else{
        if(minval > elementpos){
          minval = elementpos;
        }
      }


    }
    this.categoryYpos.sort(function(a, b) {
      return parseFloat(a.posY) - parseFloat(b.posY);
    });

    var screenPosition = document.getElementById('product-data-list').scrollTop + minval;


    for(let i = 0;i<this.categoryYpos.length;i++){

      if (this.categoryYpos[i].posY<screenPosition+200){
        this.selectedCategory =  this.categoryYpos[i].catid;
      }
    }

  }
  position(el){
    for (var pos=[0,0];el;el=el.offsetParent){
      pos[0] +=  el.offsetLeft-el.scrollLeft;
      pos[1] +=  el.offsetTop-el.scrollTop;
    }
    return pos;
  }
  showDescription(desc){
    if(this.isDescMore){
      return desc;
    }else{
      return desc.substring(0,120)+"....";
    }

  }
  showMoreDesc(){
    this.isDescMore = true;
  }
  AddProductToCart(prod,categoryname){

    this.selectedCategoryName = categoryname;
    this.productisLoaded = false;
    this.getProductDetail(prod)
    this.showExtra = true;
  }
  backToProdutList(){
    this.showExtra = false;
  }
  getOptionName(option){

      return option.name;

  }
  isRequired(extraOption){
    if(extraOption.required == 1 || extraOption.required == 3){
      return true;
    }else{
      return false;
    }
  }
  getOptionPrice(option,extraOption,currency){
    if(option.price == 0){
      return "";
    }
    if(extraOption.required == 1 || extraOption.required == 3){
      return currency+option.price;
    }else{
      return "+"+currency+option.price
    }
  }
  increaseOrder(){
    this.orderQty = this.orderQty + 1
  }
  decreaseOrder(){
    this.orderQty = this.orderQty - 1
  }
  clearCart(){

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
    const body = { cart_id: '',lang:this.lang,}

    this.CartService.clearCart(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        var  optionList = [];
        for (const [key, value] of Object.entries(this.selectedRequiredOpt)) {
          console.log(key, value);
          if(!optionList.includes(value))
          optionList.push(value);
        }
        for (const [key,value] of Object.entries(this.checkOption)) {
          console.log( value);
          if(!optionList.includes(value))
          optionList.push(value);
        }
        if(this.orderQty>0)
        this.addItemToBasket(this.selectedProduct.itemt_info.item_id,optionList,this.orderQty)


      }


    })
  }
  addItemToCart(){

    if(this.restoid==this.cartstoreid||this.cartstoreid == ""){
      var  optionList = [];
      for (const [key, value] of Object.entries(this.selectedRequiredOpt)) {
        console.log(key, value);
        if(!optionList.includes(value))
        optionList.push(value);
      }
      for (const [key,value] of Object.entries(this.checkOption)) {
        console.log( value);
        if(!optionList.includes(value))
        optionList.push(value);
      }
      if(this.orderQty>0)
      this.addItemToBasket(this.selectedProduct.itemt_info.item_id,optionList,this.orderQty)
    }else{
      this.openDialog("This user has item on "+this.cartstorename+" do you want to clear cart and proceed?")
      return
    }

  }
  updatItemToCart(){
    var  optionList = [];
    for (const [key, value] of Object.entries(this.selectedRequiredOpt)) {
      console.log(key, value);
      if(!optionList.includes(value))
      optionList.push(value);
    }
    for (const [key,value] of Object.entries(this.checkOption)) {
      console.log( value);
      if(!optionList.includes(value))
      optionList.push(value);
    }
    this.updateItemToBasket(this.cartid,optionList,this.orderQty)
  }
  carItemInc(cartitem){
    var  optionList = [];
    for (const [key, value] of Object.entries(cartitem.order_option_items)) {
      console.log(key, value);
      if(!optionList.includes(value))
      optionList.push(value);
    }
    this.updateItemToBasket(cartitem.cart_id,optionList,cartitem.cart_quantity+1)
  }
  carItemDec(cartitem){
    var  optionList = [];
    for (const [key, value] of Object.entries(cartitem.order_option_items)) {
      console.log(key, value);
      if(!optionList.includes(value))
      optionList.push(value);
    }
    if(cartitem.cart_quantity!=1){
      this.updateItemToBasket(cartitem.cart_id,optionList,cartitem.cart_quantity-1)
    }else{
      this.removeItemOnCart(cartitem.cart_id)
    }

  }
  inputVoucher(){
    this.hasVouch = true;
  }
  removeVoucher(){
    this.vouchercode = "";
    this.getCartDetails();
  }
  ValidateCode(code){
    this.getCartDetailsWCoupon()
  }
  onRadioChange(option,key){
    this.selectedRequiredOpt[key] = option;

    console.log(this.selectedRequiredOpt)
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
    console.log(this.checkOption);
  }
  isOptionSelected(id){
      const index = this.checkOptionSelected.indexOf(id);
        if (index > -1) {
          return true
        }else{
          return false;
        }
  }

  showOptonName(optionid){
    for(let j = 0;j< this.AllOptions.length;j++){
      if(this.AllOptions[j].id==optionid&&this.AllOptions[j].required!=1){
        if(this.AllOptions[j].required == 3){
          if(localStorage.language == "th"){
            return "("+this.AllOptions[j].name_th+")";
          }else{
            return "("+this.AllOptions[j].name+")";
          }
        }else{
          if(localStorage.language == "th"){
            return this.AllOptions[j].name_th;
          }else{
            return this.AllOptions[j].name;
          }
        }

      }
    }
  }
  showOptonPrice(optionid,cart_currency){
    for(let j = 0;j< this.AllOptions.length;j++){
      if(this.AllOptions[j].id==optionid&&this.AllOptions[j].required!=1){
          if(this.AllOptions[j].price==0){
            return "";
          }else{
            return "+"+cart_currency+""+this.AllOptions[j].price;
          }


      }
    }
    return "";
  }
  showRequiredOptionName(optionidlist){
    for(let j = 0;j< this.AllOptions.length;j++){
      if(this.AllOptions[j].required==1){
        if(optionidlist.includes(this.AllOptions[j].id)){
          if(localStorage.language == "th"){
            return "("+this.AllOptions[j].name_th+")";
          }else{
            return "("+this.AllOptions[j].name+")";
          }
        }
      }
    }
    return "";
  }
  showRequiredOptionPrice(cart){
    let optionidlist = cart.order_option_items;
    for(let j = 0;j< this.AllOptions.length;j++){
      if(this.AllOptions[j].required==1){
        if(optionidlist.includes(this.AllOptions[j].id)){

            return this.AllOptions[j].price

        }
      }
    }
    return cart.cart_unit_price;
  }

}
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class DialogMessage {
  message:any
  constructor(
    public dialogRef: MatDialogRef<DialogMessage>,
    @Inject(MAT_DIALOG_DATA) public data: AdminProductsComponent) {
      this.message = this.data
    }

  close(): void {
    this.dialogRef.close("no");
  }
  proceed(): void {
    this.dialogRef.close("yes");
  }


}
