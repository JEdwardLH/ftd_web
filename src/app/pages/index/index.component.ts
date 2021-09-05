import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FoodtypeService } from '../../service/foodtype.service';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  @ViewChild('search')
  public searchElementRef: ElementRef;
  LanguageText: any;
isLanguageLoaded = false;
iconVisible = true;
iconVisible2 =false;
iconVisible3 =false;
iconVisible4 =false;
iconVisible5 =false;
loadmoreshow = true
latitude :number
longitude :number
lang:any
searchlocation = ""
zoom = 20;
centerlat = 0
centerlong = 0
errormessage = ""
Address:any
errormessageshow = false
isEnglish = true
private geoCoder;
  constructor(private StringTServiceL: StringTService,
    private mapsAPILoader: MapsAPILoader,
    public dialog: MatDialog,
    private foodTypeService: FoodtypeService,
    private ngZone: NgZone,) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;
      setTimeout(() => {
        this.showmap()
      }, 2000);
      })
   }

  ngOnInit(): void {
    localStorage.cityname = "/en/batangas/home"
          location.href = "/en/batangas/home"
    if(localStorage.cityname&&localStorage.cityname!=""){
      if (localStorage.language == "th") {
        this.lang = "th"
      } else {
        this.lang = "en"
      }
      location.href = "/"+this.lang+"/batangas/home"//localStorage.cityname
    }
    if(localStorage.location){
      this.searchlocation = localStorage.location
    }

    if (localStorage.language == "th") {
      this.isEnglish = false
    } else {
      this.isEnglish = true
    }

  }
  loadData() {
    this.errormessageshow = false
    var headers = {};
    if (localStorage.usermode == "1") {
      var tk = localStorage.hntk;
      headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
    } else {
      headers = headers = { 'Content-Type': 'application/json' }
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    //user_longitude:'14.216555',user_location:'',lang:this.lang, page	: this.currentpage}
    const body = { user_latitude: this.latitude, user_longitude: this.longitude, user_location: '', lang: this.lang, page:  1, flatform: 'web' }


    this.foodTypeService.getAllResto(body, headers).subscribe((data: any) => {
      if(data.code==200){
        localStorage.cityname = "/"+this.lang+"/batangas/"+this.convertToSlug(this.Address)
        location.href = "/"+this.lang+"/batangas/"+this.convertToSlug(this.Address)
      }else{
        this.errormessageshow = true
        this.errormessage = this.LanguageText.txt_no_restofound
        this.openDialog(this.LanguageText.txt_no_restofound)
      }


    })


  }
  getcurrentlocation() {
    this.Address = "Calamba, Laguna"
    this.latitude = 14.216555
    this.longitude = 121.1746182
   this.loadmoreshow = false
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude

    console.log( "dsadas" )
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.latitude = this.latitude
        localStorage.longitude = this.longitude
        console.log(localStorage.longitude)
        this.zoom = 15;
        console.log( "dsadas2" )
        this.googlegeocode(this.latitude, this.longitude)

      });
    }else{
      this.loadmoreshow = true
    }
  }

  gotohomecalamba(){
    this.latitude = 14.216555
    this.longitude = 121.1746182
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    location.href = "/"+this.lang+"/batangas/home"
  }
  gotocalamba(){
    this.latitude = 14.216555
    this.longitude = 121.1746182
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude
    this.zoom = 15;
    this.googlegeocode2(this.latitude, this.longitude)
  }
  mouseEnter() {
    console.log("mouse enter");
    this.iconVisible = true;
    this.iconVisible2 = false;
    this.iconVisible3 = false;
    this.iconVisible4 = false;
    this.iconVisible5 = false;
  }
  mouseEnter2() {
    console.log("mouse enter");
    this.iconVisible2 = true;
    this.iconVisible = false;
    this.iconVisible3 = false;
    this.iconVisible4 = false;
    this.iconVisible5 = false;
  }
  mouseEnter3() {
    console.log("mouse enter");
    this.iconVisible3 = true;
    this.iconVisible2 = false;
    this.iconVisible = false;
    this.iconVisible4 = false;
    this.iconVisible5 = false;
  }
  mouseEnter4() {
    console.log("mouse enter");
    this.iconVisible4 = true;
    this.iconVisible2 = false;
    this.iconVisible3 = false;
    this.iconVisible = false;
    this.iconVisible5 = false;
  }
  mouseEnter5() {
    console.log("mouse enter");
    this.iconVisible5 = true;
    this.iconVisible2 = false;
    this.iconVisible3 = false;
    this.iconVisible4 = false;
    this.iconVisible = false;
  }

  // mouseLeave() {
  //   console.log("mouse leave");
  //   this.iconVisible = false;
  // }
  // mouseLeave2() {
  //   console.log("mouse leave");
  //   this.iconVisible2 = false;
  // }
  // mouseLeave3() {
  //   console.log("mouse leave");
  //   this.iconVisible3 = false;
  // }
  // mouseLeave4() {
  //   console.log("mouse leave");
  //   this.iconVisible4 = false;
  // }
  // mouseLeave5() {
  //   console.log("mouse leave");
  //   this.iconVisible5 = false;
  // }

  googlegeocode(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.Address = results[0].formatted_address
          console.log( this.Address )
          document.getElementById("searchlocation").focus();
         this.loadmoreshow = true
        } else {
          this.loadmoreshow = true
         // window.alert('No results found');
        }
      } else {
        this.loadmoreshow = true
       // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  convertToSlug(Text)
  {
      return Text
          .toLowerCase()
          .replace(/ /g,'-')
          .replace(/[^\w-]+/g,'')
          ;
  }
  googlegeocode2(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {

      if (status === 'OK') {
        if (results[0]) {
          this.Address = results[0].formatted_address
          if (localStorage.language == "th") {
            this.lang = "th"
          } else {
            this.lang = "en"
          }
          localStorage.cityname = "/"+this.lang+"/batangas/"+this.convertToSlug(this.Address)
          location.href = "/"+this.lang+"/batangas/"+this.convertToSlug(this.Address)

        } else {
         // window.alert('No results found');
        }
      } else {
       // window.alert('Geocoder failed due to: ' + status);
      }

    });
  }
  showmap(){
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      console.log(this.searchElementRef)
      const input = document.getElementById("searchlocation") as HTMLInputElement;
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          localStorage.latitude = this.latitude
          localStorage.longitude = this.longitude
          localStorage.location = this.searchlocation

        });
      });
    });
  }
  showmap2(){
    this.mapsAPILoader.load().then(() => {

      this.geoCoder = new google.maps.Geocoder;
      console.log(this.searchElementRef)
      const input = document.getElementById("searchlocation2") as HTMLInputElement;
      let autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {

        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          localStorage.latitude = this.latitude
          localStorage.longitude = this.longitude
          localStorage.location = this.searchlocation

        });
      });
    });
  }
  gotohomepage(){
    this.errormessageshow = false
    this.errormessage = ""
    if(localStorage.latitude){
      this.loadData()
    }
    else{
      this.errormessageshow = true
      this.errormessage = this.LanguageText.txt_kalanbanga_pleasesetaddress
      this.openDialog(this.LanguageText.txt_kalanbanga_pleasesetaddress)
    }
  }
  public isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  openDialog(errormessage): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',

      data: { errormessage: errormessage }
    });

    dialogRef.afterClosed().subscribe(result => {


    });
  }
  closeLocationModal() {

    document.getElementById("closeModalLocation").click();

  }
  markerDragEnd($event: MouseEvent) {

    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    localStorage.latitude = this.latitude
    localStorage.longitude = this.longitude
    // this.getAddress(this.latitude, this.longitude);
  }
  centerChange($event) {

    this.centerlat = $event.lat;
    this.centerlong = $event.lng;
    // this.getAddress(this.latitude, this.longitude);
  }
  boundsChange($event) {
    console.log("bounce")
    // this.latitude = $event.lat;
    // this.longitude = $event.lng;
  }
  mapReady(map) {
    console.log("ready")
    map.addListener("dragend", () => {
      //the values
      this.latitude = this.centerlat;
      this.longitude = this.centerlong
      localStorage.latitude = this.latitude
      localStorage.longitude = this.longitude
      console.log(map)
    });
  }
  openMap(){
    document.getElementById("newaddress").click();
    this.showmap2()
  }
  setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        localStorage.latitude = this.latitude
        localStorage.longitude = this.longitude
        this.zoom = 15;
      });
    }
  }
}
@Component({
  selector: 'index.componentsdialog',
  templateUrl: 'index.dialog.html',
})
export class DialogOverviewExampleDialog {
  message: any
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: IndexComponent) {
    this.message = this.data
  }


  close(): void {
    this.dialogRef.close();

  }


}
