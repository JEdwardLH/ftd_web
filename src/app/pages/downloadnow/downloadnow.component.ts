import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-downloadnow',
  templateUrl: './downloadnow.component.html',
  styleUrls: ['./downloadnow.component.css']
})
export class DownloadnowComponent implements OnInit {
  // LANGUAGE
LanguageText: any;
isLanguageLoaded = false;
isEnglish = true
constructor(private StringTServiceL: StringTService) {
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;
    console.log(this.LanguageText)

    })
 }

  ngOnInit(): void {
    if (localStorage.language == "th") {
      this.isEnglish = false
    } else {
      this.isEnglish = true
    }
  }

}
