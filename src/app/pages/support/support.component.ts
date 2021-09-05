import { Component, ViewChild, ElementRef, OnInit, Inject, Renderer2 } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { ActivatedRoute } from '@angular/router';
import { SupportService } from 'src/app/service/support/support.service';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})

export class SupportComponent implements OnInit {
// LANGUAGE
@ViewChild('captcha_mer')
public captcha_mer: ElementRef;
captcha: string
  invalidcaptcha = false
  code: any
LanguageText: any;
isLanguageLoaded = false;

  params:string
  ismobile = true;
  email:string;
  name:string;
  phone:string;
  message:string;
  paddingtop = "156px"
  constructor(private renderer: Renderer2,private actRoute: ActivatedRoute,private SupportService: SupportService,public dialog: MatDialog,private StringTServiceL: StringTService) {
    this.params = this.actRoute.snapshot.params.id;

    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;
      setTimeout(() => {
        this.createCaptcha('mer')
      }, 2000);
      })

    console.log(this.params)
    if(this.params=="en"||this.params=="th"){
      this.paddingtop = "0px"
      this.ismobile = false;
    }
  }
  public isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  ngOnInit(): void {

  }
  createCaptcha(type) {
    //clear the contents of captcha div first
    const childElements = this.captcha_mer.nativeElement.children;
    for (let child of childElements) {
      this.renderer.removeChild(this.captcha_mer.nativeElement, child);
    }
    var charsArray =
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@!#$%^&*";
    var lengthOtp = 5;
    var captcha = [];
    for (var i = 0; i < lengthOtp; i++) {
      //below code will not allow Repetition of Characters
      var index = Math.floor(Math.random() * charsArray.length + 1); //get the next character from the array
      if (captcha.indexOf(charsArray[index]) == -1)
        captcha.push(charsArray[index]);
      else i--;
    }
    var canv = document.createElement("canvas");
    canv.id = "captcha";
    canv.width = 100;
    canv.height = 40;
    var ctx = canv.getContext("2d");
    ctx.font = "25px Akronim";
    ctx.strokeText(captcha.join(""), 0, 30);
    //storing captcha so that can validate you can save it somewhere else according to your specific requirements
    this.code = captcha.join("");


    this.renderer.appendChild(this.captcha_mer.nativeElement, canv)

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      data: {name: this.name , animal: "test"}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }


  sendInquiry(){
    if (this.captcha != this.code) {
      this.invalidcaptcha = true

      return
    } else {
      this.invalidcaptcha = false
    }
    this.createCaptcha('mer')
    var headers = {};
      if(localStorage.usermode == "1"){
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer '+tk, 'Content-Type': 'application/json'  }
      }else{
        headers = headers = {  'Content-Type': 'application/json' }
      }

      const body = { email: this.email,name:this.name,phone:this.phone,lang:'en', message	: this.message}

      this.SupportService.sendInquiry(body,headers).subscribe((data: any)=>{

        console.log(data)
        this.openDialog()

      })
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: './support.componentdialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: SupportComponent) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

}
