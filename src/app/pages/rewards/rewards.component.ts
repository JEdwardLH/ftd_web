import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { CustomerService } from '../../service/customer/customer.service'
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.css']
})
export class RewardsComponent implements OnInit {
  LanguageText: any;
  isLanguageLoaded = false;
  isloaded = false
  lang = "en"
  totalpoints = ""
  points1 = ""
  points2 = ""
  points3 = ""
  points4 = ""
  points5 = ""
  reward1 = ""
  reward2 = ""
  reward3 = ""
  reward4 = ""
  reward5 = ""
  reward1status = ""
  reward2status = ""
  reward3status = ""
  reward4status = ""
  reward5status = ""
  reward1statusstep = ""
  reward2statusstep = ""
  reward3statusstep = ""
  reward4statusstep = ""
  reward5statusstep = ""
  code1 = ""
  code2 = ""
  code3 = ""
  code4 = ""
  code5 = ""
  code6 = ""
  codevalid = ""
  codemessage = ""
  codetext1 = "Unlock Reward"
  codetext2 = "Unlock Reward"
  codetext3 = "Unlock Reward"
  codetext4 = "Unlock Reward"
  codetext5 = "Unlock Reward"

  constructor(private StringTServiceL: StringTService,public CustomerService:CustomerService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
   }

  ngOnInit(): void {
    this.getRewards()
  }
  public getRewards() {

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

    this.CustomerService.getRewards(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data)
        this.totalpoints = data.data.totalpoints
        this.points1 = data.data.rewards.reward1.target
        this.points2 = data.data.rewards.reward2.target
        this.points3 = data.data.rewards.reward3.target
        this.points4 = data.data.rewards.reward4.target
        this.points5 = data.data.rewards.reward5.target
        this.reward1 = data.data.rewards.reward1.rewardmoney
        this.reward2 = data.data.rewards.reward2.rewardmoney
        this.reward3 = data.data.rewards.reward3.rewardmoney
        this.reward4 = data.data.rewards.reward4.rewardmoney
        this.reward5 = data.data.rewards.reward5.rewardmoney

        if(data.data.rewards.reward1.iscomplete == true){
          this.reward1status = "active"
          this.reward1statusstep = "active"
        }
        if(data.data.rewards.reward2.iscomplete == true){
          this.reward2status = "active"
          this.reward2statusstep = "active"
          this.reward1statusstep = "active"
        }
        if(data.data.rewards.reward3.iscomplete == true){
          this.reward3status = "active"
          this.reward3statusstep = "active"
          this.reward2statusstep = "active"
          this.reward1statusstep = "active"
        }
        if(data.data.rewards.reward4.iscomplete == true){
          this.reward4status = "active"
          this.reward4statusstep = "active"
          this.reward3statusstep = "active"
          this.reward2statusstep = "active"
          this.reward1statusstep = "active"
        }
        if(data.data.rewards.reward5.iscomplete == true){
          this.reward5status = "active"
          this.reward5statusstep = "active"
          this.reward4statusstep = "active"
          this.reward3statusstep = "active"
          this.reward2statusstep = "active"
          this.reward1statusstep = "active"
        }

        if(data.data.rewards.reward1.code != ""){
          this.codetext1 = data.data.rewards.reward1.code
        }
        if(data.data.rewards.reward2.code != ""){
          this.codetext2 = data.data.rewards.reward2.code
        }
        if(data.data.rewards.reward3.code != ""){
          this.codetext3 = data.data.rewards.reward3.code
        }
        if(data.data.rewards.reward4.code != ""){
          this.codetext4 = data.data.rewards.reward4.code
        }
        if(data.data.rewards.reward5.code != ""){
          this.codetext5 = data.data.rewards.reward5.code
        }

        this.isloaded = true


      } else {

      }
    }, (error: any) => {

    })
  }
  claimRewards(number,status) {
    if(status == ""){
      return
    }
    this.code1 = ""
    this.code2 = ""
    this.code3 = ""
    this.code4 = ""
    this.code5 = ""
    this.code6 = ""
    this.codevalid = ""
    this.codemessage = ""
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
    const body = { lang: this.lang,rewardno:number }

    this.CustomerService.claimRewards(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        this.code1 = data.datawithkey.code1
        this.code2 = data.datawithkey.code2
        this.code3 = data.datawithkey.code3
        this.code4 = data.datawithkey.code4
        this.code5 = data.datawithkey.code5
        this.code6 = data.datawithkey.code6
        this.codevalid = data.validity
        this.codemessage = data.message
        this.getRewards()
        document.getElementById("openmodal").click();

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

}
