import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-newtrackorder',
  templateUrl: './newtrackorder.component.html',
  styleUrls: ['./newtrackorder.component.css']
})
export class NewtrackorderComponent implements OnInit {

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

}
