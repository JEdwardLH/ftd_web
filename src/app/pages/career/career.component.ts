import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-career',
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css']
})
export class CareerComponent implements OnInit {
  LanguageText: any;
  isLanguageLoaded = false;
  selectedType = 'opentype';

careeraboutus={items: 1, dots: true, nav:false};
  constructor(private StringTServiceL: StringTService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
   }

  ngOnInit(): void {
  }
  onChange(event) {
    this.selectedType = event.target.value;
  }
  someFunc(event) {
    event.preventDefault();
    // rest of your code here
  }

}
