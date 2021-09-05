import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { OrderService } from '../../service/order/order.service'
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

  lang:string;
  orderList = []
  activeList = []
  firsttab = "";
  isactiveTab = false
  secondtab = ""
  isActive = "true";
  isComplete = "false"
  isActiveStatus = "active"
  isCompleteStatus = ""
  constructor(private OrderService:OrderService,private datePipe: DatePipe, private StringTServiceL: StringTService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })

  }

  ngOnInit(): void {
    this.getMyOrders()
  }
  getMyOrders(){


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
    const body = { lang:this.lang}
    this.secondtab = "tab-pane fade"
    this.OrderService.orderHistory(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        for(var i =0;i<data.data.orderArray.length;i++){
          if(!data.data.orderArray[i].orderTrack)
          {
            this.orderList.push(data.data.orderArray[i])
          }else{
            this.firsttab = "tab-pane fade show active"
            this.activeList.push(data.data.orderArray[i])
          }
        }
        if(this.activeList.length==0){
          this.isActive = "false"
          this.isComplete = "true"
          this.isActiveStatus = ""
          this.isCompleteStatus = "active"
          this.secondtab = "tab-pane fade show active"
        }


      }else{
        this.orderList  = []
        this.activeList = []
      }



    },(error: any) =>{

    })
  }
  clickative(){
    this.isactiveTab = true
  }
  clickcomplete(){
    this.isactiveTab = false
  }
  public isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  gotoHome(){
    if (localStorage.language == "th") {
      window.location.href = "/th"
    } else {
      window.location.href = "/en"
    }

   }
  getStoreName(order){
    return order.store_details[0].store_name
  }
  showOrderDate(dateval){
    var date = new Date(dateval);
    return this.datePipe.transform(date,"dd MMM yyyy")
  }
  seeInvoice(order){
    location.href = '/invoice/'+order.orderId;
  }
  trackOrder(order){
    location.href = '/trackorder/'+order.orderId;

  }
  repeatOrder(order){


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
    const body = { lang:this.lang,order_id:order.orderId}
    this.secondtab = "tab-pane fade"
    this.OrderService.repeatOrder(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        window.location.href='/checkout';

      }else{

      }



    },(error: any) =>{

    })
  }

}
