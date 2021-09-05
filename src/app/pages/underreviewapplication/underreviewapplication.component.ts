import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-underreviewapplication',
  templateUrl: './underreviewapplication.component.html',
  styleUrls: ['./underreviewapplication.component.css']
})
export class UnderreviewapplicationComponent implements OnInit {

    // LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

constructor(private StringTServiceL: StringTService) {
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;

    })
 }

  ngOnInit(): void {
  }
  gotohomepage(){
    if (localStorage.language == "th") {
     location.href = "/th"
    } else {
      location.href = "/en"
    }
  }
}
