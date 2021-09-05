import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../service/customer/customer.service'
import { LoginService } from '../../service/login/login.service'
import {FormControl} from '@angular/forms';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
@Component({
  selector: 'app-profileshort',
  templateUrl: './profileshort.component.html',
  styleUrls: ['./profileshort.component.css']
})
export class ProfileshortComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;
searchcode = ""

  constructor(private CustomerService: CustomerService, private LoginService: LoginService, private StringTServiceL: StringTService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;
      this.getUserInfo()
      this.getPhoneCodeList()
      })

  }
  date = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  lang:any
  firstname:string
  lastname:string
  phonenumber:string
  phonecode:string
  email:string
  birthday:string
  age:any
  gender:string
  isEdit = false
  countryCodeList = [];
  ngOnInit(): void {

  }
  checkfield(){

  }
  isMatched(country){
    if(this.searchcode==""){
      return false
    }
    if(country.country_name.toLowerCase().includes(this.searchcode.toLowerCase())||country.country_dial.includes(this.searchcode)){
      return false;
    }else{
      return true;
    }
  }
  getPhoneCodeList(){
    this.countryCodeList = [];
    const headers = {  'Content-Type': 'application/json' }


    const body = {lang:this.lang};
    this.LoginService.getMetaCountry(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
          this.countryCodeList = data.data.country_code_list
          this.phonecode = data.data.country_details[0].country_dial;
      }

    },(error: any) =>{

    })
  }
  phoneNumberChange(){
    // if(this.phonenumber!=""&&this.phonenumber.length>6)
    // this.PhoneCheck()
  }
  public getUserInfo() {

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
    const body = { lang: this.lang }

    this.CustomerService.getUserInfo(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.firstname = data.data.first_name
        this.lastname = data.data.last_name
        this.phonenumber= data.data.user_ph1_no_only
        this.phonecode = data.data.user_ph1_cnty_code
        this.email= data.data.user_email
        this.birthday = data.data.birthday
        this.gender = data.data.gender
        this.age = this.calculateAge(data.data.birthday)
        if(isNaN( this.age)){
          this.age ="Please set your Birthday"
        }else{
          this.age = this.age +" "+this.LanguageText.txt_profile_years
        }

      } else {

      }
    }, (error: any) => {

    })
  }
  public UpdateUserInfo() {

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
    const body = {
      lang:this.lang,
      firstname :this.firstname,
      lastname :this.lastname,
      phonecode : this.phonecode,
      phonenumber:this.phonenumber,
      email:this.email,
      gender:this.gender,
      birthday:this.birthday
      }

    this.CustomerService.updateprofile(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.getUserInfo()

      } else {

      }
    }, (error: any) => {

    })
  }
  dateChange(date){
    this.birthday = this.formatDate(date)

  }
  formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
  selectCode(code){
    this.phonecode = code;
    // if(this.phonenumber!=""&&this.phonenumber.length>6)
    // this.CheckPhone(this.phonenumber+this.phonenumber)
  }
   calculateAge(birthday) { // birthday is a date
    var bday = new Date(birthday)
    var ageDifMs = Date.now() - bday.getTime();
    var ageDate = new Date(ageDifMs); // miliseconds from epoch
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  editProfile(){
    this.isEdit = !this.isEdit
  }
  saveProfile(){
    this.isEdit = !this.isEdit
    this.UpdateUserInfo()
  }
}
