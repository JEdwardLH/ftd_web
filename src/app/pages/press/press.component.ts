import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-press',
  templateUrl: './press.component.html',
  styleUrls: ['./press.component.css']
})
export class PressComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

topnews={
  items: 2,
  dots: false,
  loop:true,
  nav:true,
  margin:10,
  autoplayHoverPause:false,
  center:true,
  responsive: {
    0: {
      items: 1,
      center:false
    },
    575: {
      items: 1,
      center:false
    },
    768: {
      items: 1,
      center:false
    },
    993: {
      items: 2
    },
    1201: {
      item: 2
    }
  }
};
constructor(private StringTServiceL: StringTService) {
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;

    })
 }

  ngOnInit(): void {
  }

}
