import { Component, HostListener, Inject,EventEmitter, OnInit, Input,Output,ViewChild, ElementRef, NgZone } from '@angular/core';

import { DOCUMENT } from '@angular/common';
// import { PressComponent } from '../../pages/press/press.component';
// import { SupportComponent } from '../../pages/support/support.component';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})



export class FooterComponent implements OnInit {
// LANGUAGE
@Input() loadstring = 0;
@Input() LanguageText:any;
@Input() isLanguageLoaded = false;

isEnglish = true

  topPosToStartShowing = 50;

  constructor(private StringTServiceL: StringTService) {

   }

gotoTop(){
    window.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

  }
  ngOnInit(): void {
    if(this.loadstring == 0){
      this.StringTServiceL.getLanguageString().subscribe((data: any) => {
        this.isLanguageLoaded = true;
        this.LanguageText = data;

      })
    }
    if (localStorage.language == "th") {
      this.isEnglish = false
    } else {
      this.isEnglish = true
    }

  }

}
