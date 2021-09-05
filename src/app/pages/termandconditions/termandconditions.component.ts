import { Component, OnInit } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service'
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-termandconditions',
  templateUrl: './termandconditions.component.html',
  styleUrls: ['./termandconditions.component.css']
})
export class TermandconditionsComponent implements OnInit {
LanguageText: any;
isLanguageLoaded = false;
params:string
paddingtop = "156px"
  ismobile = true;
  constructor(private StringTServiceL: StringTService,private actRoute: ActivatedRoute) {
    this.params = this.actRoute.snapshot.params.id;
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{

      this.isLanguageLoaded = true;
      this.LanguageText = data;

      })
      if(this.params=="en"||this.params=="th"){
        this.paddingtop = "0px"
        this.ismobile = false;
      }
   }
   public isUserMode(){
    if(localStorage.usermode == "1"){
      return true;
    }else{
      return false;
    }
  }
  ngOnInit(): void {
  }

}
