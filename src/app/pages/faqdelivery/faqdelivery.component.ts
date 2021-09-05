import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-faqdelivery',
  templateUrl: './faqdelivery.component.html',
  styleUrls: ['./faqdelivery.component.css']
})
export class FaqdeliveryComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

constructor(private StringTServiceL: StringTService) {
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;

    })
 }

 public isUserMode() {
  if (localStorage.usermode == "1") {
    return true;
  } else {
    return false;
  }
}

  ngOnInit(): void {
  }

}
