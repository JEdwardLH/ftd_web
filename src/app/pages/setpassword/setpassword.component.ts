import { Component, OnInit, Inject , ViewChild, ElementRef, NgZone } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service'
import { CustomerService } from '../../service/customer/customer.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.css']
})
export class SetpasswordComponent implements OnInit {
// LANGUAGE
Password = ""
cPassword = ""
LanguageText: any;
isLanguageLoaded = false;
params:string
userdata:any
jsondata:any
token:string
lang:string
passworderror = false
passworderrorlimit = false
passwordmatcherror = false
ispageexpired = false
constructor(private actRoute: ActivatedRoute,private StringTServiceL: StringTService,public dialog: MatDialog,private LoginService: LoginService,private CustomerService:CustomerService) {
  this.params = this.actRoute.snapshot.params.id;
  try{
    this.userdata =  atob(this.params)
    this.jsondata = JSON.parse(this.userdata)
  }catch(err) {
    console.log(err)
    this.ispageexpired = true
  }

  console.log(this.userdata)
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;

    })
 }

  ngOnInit(): void {
    if(this.jsondata.hasOwnProperty("email")){
      const headers = {  'Content-Type': 'application/json' }
      const body = { cus_password: this.jsondata.code,login_id:this.jsondata.email,type:'test',lang:"en"};
      this.LoginService.userLogin(body,headers).subscribe((data: any)=>{
        if(data.code == 200){
          this.token = data.data.token

        }else{
          this.ispageexpired = true
        }

      },(error: any) =>{
        this.ispageexpired = true
      })
    }

  }
  changepassword(){

      if(!this.Password){
        this.passworderror = true
        return
      }
      if(this.Password!=this.cPassword){
        this.passwordmatcherror = false
        return
      }
      var headers = {};



      headers = { 'Authorization': 'Bearer ' + this.token, 'Content-Type': 'application/json' }

      if (localStorage.language == "th") {
        this.lang = "th"
      } else {
        this.lang = "en"
      }
      const body = { lang: this.lang,old_password:this.jsondata.code,new_password:this.Password}

      this.CustomerService.changepassword(body, headers).subscribe((data: any) => {
        this.openDialog(data.message)
      }, (error: any) => {
          console.log(error)
      })


  }
  textchange(){
    if(!this.Password){
      this.passworderror = true
    }else{
      if(this.Password.length>=6){
        this.passworderror = false
        this.passworderrorlimit = false
      }
      else
        this.passworderrorlimit = true
    }
  }
  checkmatch(){
    if(this.Password==this.cPassword){
      this.passwordmatcherror = false
    }else{
      this.passwordmatcherror = true
    }
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(ErroDialog, {
      width: '300px',
      data: {errormessage:errormessage}
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  gotohome(){
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    window.location.href= "/"+this.lang
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
    @Inject(MAT_DIALOG_DATA) public data: SetpasswordComponent) {
      this.message = this.data
    }

  close(): void {
    this.dialogRef.close("done");


  }



}

