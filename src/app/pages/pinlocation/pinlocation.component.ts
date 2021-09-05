import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';

import { FdatabaseService } from '../../service/firebase/fdatabase.service';

import {  AngularFireDatabase ,AngularFireList} from '@angular/fire/database';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { stringify } from 'querystring';
import { ActivatedRoute } from '@angular/router';
import {Observable,of, from } from 'rxjs';
@Component({
  selector: 'app-pinlocation',
  templateUrl: './pinlocation.component.html',
  styleUrls: ['./pinlocation.component.css']
})
export class PinlocationComponent implements OnInit {
  title: string = 'AGM project';
  latitude:any
  longitude:any
  riderlatitude:any
  riderlongitude:any
  riderlatitude2:any
  riderlongitude2:any

  usermarker:any
  ridermarker: any
  merchantmarker:any
  restolatitude:any
  restolongitude:any
  zoom = 8;
  address: string;
  private geoCoder;
  province: string;
  district: string;
  subdistrict: string;
  stno:string;
  route:string
  locationdata = {}

  constructor(private actRoute: ActivatedRoute,private _sanitizer: DomSanitizer,private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,private firedatabase: AngularFireDatabase,private af: AngularFireDatabase,private FdatabaseService: FdatabaseService) {

    }

  ngOnInit(): void {
    this.usermarker  = {
      url: "/assets/images/Icon House1-6.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.merchantmarker  = {
      url: "/assets/images/Icon House1-4.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.ridermarker = {
      url: "/assets/images/Icon House1-5.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.riderlatitude2 = 12.9289863
    this.riderlongitude2 = 100.8815869
    this.restolatitude = 12.9289863
    this.restolongitude = 100.8815869
    this.latitude = 12.934744792464073
    this.longitude =100.88999156314544
    this.FdatabaseService.getLocation().subscribe((data: any)=>{

      this.locationdata = [];
      data.forEach(data => {


        this.locationdata[data.key]=data.payload.val()
        this.riderlatitude = Number(this.locationdata['lat'])
        this.riderlongitude = Number(this.locationdata['lon'])
      });

      console.log(this.locationdata)

    });
  }
  markerDragEnd($event: MouseEvent) {
    this.riderlatitude2 = $event.coords.lat;
    this.riderlongitude2 = $event.coords.lng;
    this.FdatabaseService.updaterider(this.riderlatitude2,this.riderlongitude2)

  }




}
