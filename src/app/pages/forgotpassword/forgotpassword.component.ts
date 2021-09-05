
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CustomerService } from '../../service/customer/customer.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Component, OnInit, Inject , ViewChild, ElementRef, NgZone } from '@angular/core';
@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;
lang = "en"
email = ""
constructor(private StringTServiceL: StringTService,private CustomerService: CustomerService,public dialog: MatDialog) {
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;

    })
 }

  ngOnInit(): void {
  }
  forgotPassword(){
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
    const body = { lang: this.lang,cus_email:this.email }
    this.CustomerService.ForgotPassword(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.openDialog(data.message)

      } else {
        this.openDialog(data.message)
      }
    }, (error: any) => {
      console.log(error)
      this.openDialog(error)
    })
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(ErroDialog, {
      width: '300px',
      data: {errormessage:errormessage}
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }

}
@Component({
  selector: 'checkoutdialog',
  templateUrl: 'dialog.html',
})
export class ErroDialog {
  message:any
  constructor(
    public dialogRef: MatDialogRef<ErroDialog>,
    @Inject(MAT_DIALOG_DATA) public data: ForgotpasswordComponent) {
      this.message = this.data
    }

  close(): void {
    this.dialogRef.close("done");


  }



}

