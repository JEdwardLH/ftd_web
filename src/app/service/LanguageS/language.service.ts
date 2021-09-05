import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(private httpClient: HttpClient) { }
  getLanguage() {
    var lang = "en";
    if(localStorage.language == "th"){
      lang = "th"
    }else{
      lang = "en"
    }
    return this.httpClient.get('https://foodtodine-text-default-rtdb.asia-southeast1.firebasedatabase.app/foodtodine/weblate/foodtodinetext/'+lang+'.json',{  })
  }

}
