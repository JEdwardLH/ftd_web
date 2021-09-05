import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CustomerService } from '../../service/customer/customer.service'
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-index',
  templateUrl: './referfriend.component.html',
  styleUrls: ['./referfriend.component.css']
})
export class ReferFriendComponent implements OnInit {
  LanguageText: any;
  isLanguageLoaded = false;
  lang = "en"
  referallink = ""
  message = ""
  email = ""
  durationInSeconds = 5;
  constructor(private StringTServiceL: StringTService, public CustomerService: CustomerService,  private _snackBar: MatSnackBar) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })
  }

  ngOnInit(): void {
    this.getReferlink()
  }
  public getReferlink() {

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
    const body = { lang: this.lang }

    this.CustomerService.getreferlink(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

          this.referallink = data.data
          this.message = data.message
      } else {

      }
    }, (error: any) => {

    })
  }
  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  sendRefer(){
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
    const body = { lang: this.lang,referral_email:this.email }

    this.CustomerService.sendEmailReferal(body, headers).subscribe((data: any) => {
      if (data.code == 200) {

        this.openSnackBar()
      } else {

      }
    }, (error: any) => {

    })
  }
  openSnackBar() {
    this._snackBar.openFromComponent(SnackComponent, {
      duration: this.durationInSeconds * 1000,
    });
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
