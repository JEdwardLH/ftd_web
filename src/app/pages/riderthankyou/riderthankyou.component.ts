import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-riderthankyou',
  templateUrl: './riderthankyou.component.html',
  styleUrls: ['./riderthankyou.component.css']
})
export class RiderthankyouComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;
riderfaqOptions={items: 1, dots: true, nav:false, autoplau:false };

constructor(private StringTServiceL: StringTService) {
  this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
    this.isLanguageLoaded = true;
    this.LanguageText = data;

    })
 }

  ngOnInit(): void {
  }

}
