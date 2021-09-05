import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CustomerService } from '../../service/customer/customer.service'
@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent implements OnInit {
  LanguageText: any;
isLanguageLoaded = false;
lang: any
restoreviewlist = []
foodreviewlist = []
  constructor(private StringTServiceL: StringTService,public CustomerService:CustomerService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
   }

  ngOnInit(): void {
    this.getRestoRating()
    this.getFoodoRating()
  }
  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  public getRestoRating() {

    var headers = {};

    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      window.location.href = "/"
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang,type:1,id:"all",view:"all" }

    this.CustomerService.CheckRating(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data)
        this.restoreviewlist = data.data.myreview


      } else {

      }
    }, (error: any) => {

    })
  }
  public getFoodoRating() {

    var headers = {};

    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      window.location.href = "/"
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang,type:2,id:"all",view:"all" }

    this.CustomerService.CheckRating(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data)
        this.foodreviewlist = data.data.myreview


      } else {

      }
    }, (error: any) => {

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

    console.log(Number(acceptdatearray[0]) + "----" + Number(acceptdatearray[1]) + "----" + Number(acceptdatearray[2]) + "----" + Number(accepttimearray[0]) + "----" + Number(accepttimearray[1]) + "----" + Number(accepttimearray[2]))
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
}
