import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
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
 gotoHome(){
  if (localStorage.language == "th") {
    window.location.href = "/th"
  } else {
    window.location.href = "/en"
  }

 }
  ngOnInit(): void {
  }

}
