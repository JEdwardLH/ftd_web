import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CustomerService } from '../../service/customer/customer.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import {TooltipPosition} from '@angular/material/tooltip';
import {FormControl} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-voucher',
  templateUrl: './voucher.component.html',
  styleUrls: ['./voucher.component.css']
})
export class VoucherComponent implements OnInit {
  // LANGUAGE
  isEnglish = true
  params:any
  LanguageText: any;
  isLanguageLoaded = false;
  lang:any
  couponlist = []
  positionOptions: TooltipPosition[] = ['below', 'above', 'left', 'right'];
  position = new FormControl(this.positionOptions[1]);
  constructor(private actRoute: ActivatedRoute,private StringTServiceL: StringTService,public CustomerService: CustomerService,private _snackBar: MatSnackBar,) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
      if (this.actRoute.snapshot.params.hasOwnProperty("id")) {
        this.params = this.actRoute.snapshot.params.id;

      } else {
        this.params = ""
      }
   }
   openSnackBar(code) {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: 2000,
      data:code
    });
  }
  ngOnInit(): void {
    this.getCouponCodeList()
    if (localStorage.language == "th") {
      this.isEnglish = false
    } else {
      this.isEnglish = true
    }
  }
  getdisplaydate(datet){
      var month = new Array();
      month[0] = "December";
      month[1] = "January";
      month[2] = "February";
      month[3] = "March";
      month[4] = "April";
      month[5] = "May";
      month[6] = "June";
      month[7] = "July";
      month[8] = "August";
      month[9] = "September";
      month[10] = "October";
      month[11] = "November";
      month[12] = "December";
      var acceptdrray = datet.split(" ");

      var acceptdatearray = acceptdrray[0].split("-")
      var accepttimearray = acceptdrray[1].split(":")


      var date = new Date(Number(acceptdatearray[0]), Number(acceptdatearray[1]), Number(acceptdatearray[2]), Number(accepttimearray[0]), Number(accepttimearray[1]), Number(accepttimearray[2]));
      return date.getDate()+" "+month[date.getMonth()];//+" | "+this.formatAMPM(date)
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
  showMinimum(coupon){
    if(coupon.coupon_discount_type=="Flat"){
      return ""
    }else{
      if(coupon.coupon_is_minimum=="No"){
        return "(No minimum purchase)";
      }else{
        return "(Minimum purchase of ₱"+coupon.coupon_minimum_amt+")";
      }
    }

  }
  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  getCouponCodeList(){
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
    const body = { lang: this.lang ,quickid:this.params}

    this.CustomerService.GetCouponList(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.couponlist = data.data
      } else {

      }
    }, (error: any) => {

    })
  }
  showOffer(coupon){
    if(coupon.coupon_discount_type=="Percent"){
      if(coupon.coupon_prod_id=="all"){
        return coupon.coupon_percentage+"% discount on all menu"
      }else{
        return coupon.coupon_percentage+"% discount on selected items"
      }
    }else if(coupon.coupon_discount_type=="Flat"){
      if(coupon.coupon_is_minimum == "Yes"){
        return "₱"+coupon.coupon_price_value+" discount for purchase of ₱"+coupon.coupon_minimum_amt
      }else{
        return "₱"+coupon.coupon_price_value+" discount"
      }

    }else{
      return coupon.coupon_name
    }

  }
  public VisitStore(id) {
    return '/promotion/' + this.seemenu(id);


  }
  public seemenu(id) {
    return btoa(id)
  }
  copyInputMessage(val: string){
    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.openSnackBar(val)
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
