import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  API_URL: string = "http://54.196.121.26/api/customer/";
  //API_URL2: string = "https://kalanbanga.co.th/api/customer/";
  constructor(private httpClient: HttpClient) { }

  getHomepageList(body,headers) {
    return this.httpClient.post(this.API_URL + 'homepage_list',body,{ headers })
  }
}
