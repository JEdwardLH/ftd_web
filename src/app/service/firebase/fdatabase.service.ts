import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import{ GlobalConstants } from 'src/app/common/global-constants';
import {  AngularFireDatabase ,AngularFireList} from '@angular/fire/database';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { stringify } from 'querystring';
import { ActivatedRoute } from '@angular/router';
import {Observable,of, from } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FdatabaseService {

  constructor(private httpClient: HttpClient,private firedatabase: AngularFireDatabase,private af: AngularFireDatabase) { }

  getLocation(){
    return this.af.list("kalanbanga/rider/edward/location/").snapshotChanges();
  }
  updaterider(lat,lon){
    this.af.database.ref("kalanbanga/rider/edward/location/lat").set(lat)
    this.af.database.ref("kalanbanga/rider/edward/location/lon").set(lon)

  }
  trackOrder(orderid){
    return this.af.list("kalanbanga/order-tracking/"+orderid).snapshotChanges();
  }
  getMeta(path){
    return this.af.list("kalanbanga/appsettings/meta/"+path).snapshotChanges();
  }
  callmobile() {
    return this.httpClient.get('kalanbanga://kalanbanga.co.th')
  }
}
