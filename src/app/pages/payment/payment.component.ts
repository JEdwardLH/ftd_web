import { Component, OnInit } from '@angular/core';
import { KbankService } from 'src/app/service/kbank/kbank.service'
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  isFirstload = false
  iframestate = false
  gettokenstate = false
  statestring = "initial"
  addcardstate = false
  constructor(private KbankService: KbankService,private _sanitizer: DomSanitizer) { }
  token = ""
  iframesrc = this._sanitizer.bypassSecurityTrustResourceUrl("http://54.196.121.26:83/public/kbank/payment.html");
  ngOnInit(): void {
    var iframe = document.getElementById('ifff');
    console.log(iframe)
  }
  public currentUrl(){
    console.log("dasda");
    if(this.isFirstload == false){
      this.isFirstload = true
    }else{
      if(this.gettokenstate == false){

        if(this.token=="")
        this.getToken()
      }else{

      }

    }

  }

  getToken(){
    const headers = {  'Content-Type': 'application/json' }
    const body = { lang:'en'};
    this.KbankService.kbanktoken(body,headers).subscribe((data: any)=>{
      if(data.code == 200&&data.data!=""){
          this.token = data.data;
          localStorage.kbtkn = this.token
          if(this.addcardstate == false){
            this.addcardstate = true
            this.iframestate = true
            this.AddCard(this.token)
          }

          this.gettokenstate = true
      }else{

      }

    },(error: any) =>{

    })
  }
  AddCard(token){
    var headers = {};
    if(localStorage.usermode == "1"){
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer '+tk, 'Content-Type': 'application/json'  }
    }else{
      headers = headers = {  'Content-Type': 'application/json' }
    }

    const body = { lang:'en',token:token};
    this.KbankService.addcard(body,headers).subscribe((data: any)=>{
      if(data.code == 200){
        this.iframesrc = this._sanitizer.bypassSecurityTrustResourceUrl(data.data.redirect_url);
       // window.location.href=data.data.redirect_url;

      }else{

      }

    },(error: any) =>{

    })
  }
}
