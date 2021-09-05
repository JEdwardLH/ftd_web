import { Component, OnInit, Inject , ViewChild, ElementRef, NgZone } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CustomerService } from '../../service/customer/customer.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-changepassword',
  templateUrl: './changepassword.component.html',
  styleUrls: ['./changepassword.component.css']
})
export class ChangepasswordComponent implements OnInit {
  LanguageText: any;
  isLanguageLoaded = false;
  newpass = ""
  currpass = ""
  confirmnewpass = ""
  lang:any
  constructor(private StringTServiceL: StringTService,private CustomerService:CustomerService,public dialog: MatDialog,) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
   }
   public isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(ErroDialog, {
      width: '300px',
      data: {errormessage:errormessage}
    });

    dialogRef.afterClosed().subscribe(result => {
        if(result == "done"){
          document.getElementById("openModalPayment").click();
        }else if(result == "verify"){
          document.getElementById("openModalUser").click();
        }

    });
  }
  changepassword(){
    if(this.newpass==this.confirmnewpass){
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
      const body = { lang: this.lang,old_password:this.currpass,new_password:this.newpass}

      this.CustomerService.changepassword(body, headers).subscribe((data: any) => {
        this.openDialog(data.message)
      }, (error: any) => {
          console.log(error)
      })
    }else{
      this.openDialog("Password not matched")
    }

  }
  ngOnInit(): void {
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
    @Inject(MAT_DIALOG_DATA) public data: ChangepasswordComponent) {
      this.message = this.data
    }

  close(): void {
    this.dialogRef.close("done");


  }



}
