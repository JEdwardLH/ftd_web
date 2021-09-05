import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-index',
  templateUrl: './refergo.component.html',
  styleUrls: ['./refergo.component.css']
})
export class ReferGoComponent implements OnInit {
  LanguageText: any;
isLanguageLoaded = false;
referalcode = ""
  constructor(private StringTServiceL: StringTService,private actRoute: ActivatedRoute) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
      if (this.actRoute.snapshot.params.hasOwnProperty("id")) {
        this.referalcode = this.actRoute.snapshot.params.id;
      }
   }

  ngOnInit(): void {

  }
  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  gotoRegister(){
    window.location.href = 'https://kalanbanga.co.th/registration/' + this.referalcode;
  }


}
