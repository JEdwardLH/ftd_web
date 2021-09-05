import { Injectable } from '@angular/core';
import {LanguageService} from 'src/app/service/LanguageS/language.service'
import{ GlobalConstants } from 'src/app/common/global-constants';
@Injectable({
  providedIn: 'root'
})
export class StringTService {

  constructor(private LanguageService: LanguageService) { }
  getLanguageString(){
    return this.LanguageService.getLanguage();
  }
   isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}
}
