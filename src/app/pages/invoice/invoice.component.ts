import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../service/order/order.service'
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

  params: string
  lang:string
  orderid: string
  customername = ""
  customerAddress1 = ""
  customerAddress2 = ""
  customerMobile = ""
  customerEmail = ""
  order_date = ""
  productList = []
  storename = ""
  paytype = ""
  grand_sub_total = ""
  grand_total = ""
  currency = ""
  delivery_fee = ""
  coupon_used = ""
  constructor(private actRoute: ActivatedRoute,private OrderService:OrderService,private StringTServiceL: StringTService) {
    this.orderid = this.actRoute.snapshot.params.id;

    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })

  }

  ngOnInit(): void {
    this.getOrderInvoice(this.orderid)
  }
  isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  hasRequired(item_name){
    for(var i = 0 ;i<this.productList.length;i++){
      for(var j = 0;j<this.productList[i].product_option_items.length;j++){
        if(this.productList[i].product_option_items[j].required==1&&this.productList[i].item_name == item_name){
          return true;
        }
      }
    }
    return false
  }
  getOrderInvoice(orderid){

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
    const body = { lang:this.lang,order_id:orderid}

    this.OrderService.orderInvoice(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
          console.log(data.data)
          this.customername = data.data.customerDetailArray.customeName
          this.customerAddress1 = data.data.customerDetailArray.customerAddress1
          this.customerAddress2 = data.data.customerDetailArray.customerAddress2
          this.customerMobile = data.data.customerDetailArray.customerMobile
          this.customerEmail = data.data.customerDetailArray.customerEmail
          this.order_date = data.data.order_date
          this.paytype = data.data.paytype
          this.storename = data.data.order_detailArray[0].store_name
          this.productList = data.data.order_detailArray[0].item_lists
          this.grand_sub_total = data.data.grand_sub_total
          this.grand_total = data.data.grand_total
          this.currency = data.data.currency
          this.delivery_fee = data.data.delivery_fee
          this.coupon_used = data.data.coupon_used

      }else{

      }
    },(error: any) =>{

    })
  }


}
