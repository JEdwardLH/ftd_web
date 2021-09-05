import { Component, OnInit, Inject, ViewChild, ElementRef, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../service/order/order.service'
import { MapsAPILoader, MouseEvent, AgmPolyline } from '@agm/core';
import { interval } from 'rxjs';
import { map } from 'rxjs/operators'
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { Router, NavigationEnd } from '@angular/router';
import { FdatabaseService } from '../../service/firebase/fdatabase.service';
@Component({
  selector: 'app-trackorder',
  templateUrl: './trackorder.component.html',
  styleUrls: ['./trackorder.component.css']
})
export class TrackorderComponent implements OnInit {
  // LANGUAGE
  LanguageText: any;
  isLanguageLoaded = false;
  smurf = false
  params: string
  lang: string
  orderid: string
  storeid: any
  customername = ""
  customerAddress1 = ""
  customerAddress2 = ""
  customerMobile = ""
  customerEmail = ""
  order_date = ""
  productList = []
  storename = ""
  paytype = ""
  grand_sub_total = ""
  grand_total = ""
  currency = ""
  delivery_fee = ""
  coupon_used = ""
  latitude: any
  longitude: any
  focuslatitude = 0.0
  focuslongitude = 0.0
  riderlatitude = 0.0
  riderlongitude = 0.0
  fromriderlatitude = 0.0
  fromriderlongitude = 0.0
  usermarker: any
  ridermarker: any
  merchantmarker: any
  restolatitude: any
  restolongitude: any
  deliverytime: number
  restaurant_current_date = ""
  acceptedTime = ""
  waitingtime: string
  zoom = 15;
  mapready = false
  points = []
  orderStatus = []
  locationdata = {}
  position1 = 0.0
  position2 = 0.0
  deltaLat = 0.0
  deltaLng = 0.0
  numDeltas = 100;
  delay = 10; //milliseconds
  estimated_time = ""
  estimatedmin = ""

  i = 0;
  constructor(private router: Router,private actRoute: ActivatedRoute, private OrderService: OrderService, private mapsAPILoader: MapsAPILoader, private StringTServiceL: StringTService,
    private ngZone: NgZone, private FdatabaseService: FdatabaseService) {
      router.events.subscribe((y: NavigationEnd) => {
        console.log(y.url)
        if(y.url!=undefined){
          if(y.url.includes("smurftrackorder")){
            localStorage.usermode = "1"
            this.smurf = true
          }else{
            this.smurf = false
            if (localStorage.usermode == "1") {

            } else {
              if (localStorage.language == "th") {
                window.location.href = "/th"
              } else {
                window.location.href = "/en"
              }
            }
          }

        }

      })

    this.orderid = this.actRoute.snapshot.params.id;
    if (this.orderid.includes("COD-") || this.orderid.includes("CARD-")) {

    } else {
      this.orderid = atob(this.orderid)
    }

    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })

    this.FdatabaseService.trackOrder(this.orderid).subscribe((data: any) => {


      data.forEach(data => {


        this.locationdata[data.key] = data.payload.val()


      });


      if (!isNaN(Number(this.locationdata['deliver_latitude'])) && !isNaN(Number(this.locationdata['deliver_longitude']))) {
        if (this.riderlatitude == 0) {
          this.riderlatitude = Number(this.locationdata['deliver_latitude'])
          this.riderlongitude = Number(this.locationdata['deliver_longitude'])
          this.focuslatitude = this.riderlatitude
          this.focuslongitude = this.riderlongitude
        } else {
          var angle = this.bearing(this.riderlatitude, this.riderlongitude, Number(this.locationdata['deliver_latitude']), Number(this.locationdata['deliver_longitude'])) - 180
          console.log("https://kalanbanga.co.th/api/public/riderimage.php?q=" + angle)
          this.ridermarker = {
            url: "https://kalanbanga.co.th/api/public/riderimage.php?q=" + angle,
            scaledSize: {
              width: 40,
              height: 60
            },

          }
          this.transition([Number(this.locationdata['deliver_latitude']), Number(this.locationdata['deliver_longitude'])])

          console.log(this.locationdata)
        }

      }


    });

  }
  @ViewChild('line') polyLine: AgmPolyline;
  ngOnInit(): void {
    this.usermarker = {
      url: "/assets/images/Icon House1-6.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.merchantmarker = {
      url: "/assets/images/Icon House1-4.png",
      scaledSize: {
        width: 40,
        height: 60
      }
    }
    this.ridermarker = {
      url: "https://kalanbanga.co.th/api/public/riderimage.php?q=0",
      scaledSize: {
        width: 40,
        height: 60
      },

    }

    this.getOrderInvoice(this.orderid)
    this.getRestaurantDirection(this.orderid)
  }

  isUserMode() {
    if (localStorage.usermode == "1") {
      return true;
    } else {
      return false;
    }
  }
  toRadians(degrees) {
    return degrees * Math.PI / 180;
  };

  // Converts from radians to degrees.
  toDegrees(radians) {
    return radians * 180 / Math.PI;
  }


  bearing(startLat, startLng, destLat, destLng) {
    startLat = this.toRadians(startLat);
    startLng = this.toRadians(startLng);
    destLat = this.toRadians(destLat);
    destLng = this.toRadians(destLng);

    var y = Math.sin(destLng - startLng) * Math.cos(destLat);
    var x = Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    var brng = Math.atan2(y, x);
    brng = this.toDegrees(brng);
    return (brng * -1);
  }
  getRestaurantDirection(orderid) {
    var headers = {};

    if(this.smurf){
      headers = headers = { 'Content-Type': 'application/json' }
    }else{
      if (localStorage.usermode == "1") {
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
      } else {
        headers = headers = { 'Content-Type': 'application/json' }
      }
    }

    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, order_id: orderid }

    this.OrderService.restoDirection(body, headers).subscribe((data: any) => {

      if (data.status == "OK") {
        this.points = this.getpointsdecode(data.routes[0].overview_polyline.points)

      }

    }, (error: any) => {

    })
  }
  getpointsdecode(encoded) {

    // array that holds the points

    var points = []
    var index = 0, len = encoded.length;
    var lat = 0, lng = 0;
    while (index < len) {
      var b, shift = 0, result = 0;
      do {

        b = encoded.charAt(index++).charCodeAt(0) - 63;//finds ascii                                                                                    //and substract it by 63
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);


      var dlat = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = encoded.charAt(index++).charCodeAt(0) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      var dlng = ((result & 1) != 0 ? ~(result >> 1) : (result >> 1));
      lng += dlng;

      points.push({ latitude: (lat / 1E5), longitude: (lng / 1E5) })

    }
    return points
  }
  getOrderInvoice(orderid) {

    var headers = {};

    if(this.smurf){
      headers = headers = { 'Content-Type': 'application/json' }
    }else{
      if (localStorage.usermode == "1") {
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
      } else {
        headers = headers = { 'Content-Type': 'application/json' }
      }
    }

    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, order_id: orderid }

    this.OrderService.orderInvoice(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        this.customername = data.data.customerDetailArray.customeName
        this.customerAddress1 = data.data.customerDetailArray.customerAddress1
        this.customerAddress2 = data.data.customerDetailArray.customerAddress2
        this.customerMobile = data.data.customerDetailArray.customerMobile
        this.customerEmail = data.data.customerDetailArray.customerEmail
        this.order_date = data.data.order_date
        this.paytype = data.data.paytype
        this.storename = data.data.order_detailArray[0].store_name
        this.storeid = data.data.order_detailArray[0].store_id
        this.productList = data.data.order_detailArray[0].item_lists
        this.grand_sub_total = data.data.grand_sub_total
        this.grand_total = data.data.grand_total
        this.currency = data.data.currency
        this.delivery_fee = data.data.delivery_fee
        this.coupon_used = data.data.coupon_used

        this.getOrderTracking(orderid, this.storeid)
      } else {

      }
    }, (error: any) => {

    })
  }
  transition(result) {
    this.i = 0;
    this.deltaLat = (result[0] - this.position1) / this.numDeltas;
    this.deltaLng = (result[1] - this.position2) / this.numDeltas;
    this.moveMarker();
  }
  setPositionLoc(lat, lng) {
    console.log(lat + "  " + lng)
    this.riderlatitude = lat
    this.riderlongitude = lng
    this.focuslatitude = lat
    this.focuslongitude = lng
  }
  public moveMarker() {
    this.position1 += this.deltaLat;
    this.position2 += this.deltaLng;
    var angle = this.bearing(this.riderlatitude, this.riderlongitude, this.position1, this.position2) - 180
    console.log("https://kalanbanga.co.th/api/public/riderimage.php?q=" + angle)
    this.ridermarker = {
      url: "https://kalanbanga.co.th/api/public/riderimage.php?q=" + angle,
      scaledSize: {
        width: 40,
        height: 60
      },

    }

    this.setPositionLoc(this.position1, this.position2);
    if (this.i != this.numDeltas) {
      this.i++;
      setTimeout(() => {
        this.moveMarker()
      }, this.delay);
      //setTimeout(this.moveMarker, this.delay);
    }
  }

  getOrderTracking(orderid, storeid) {

    var headers = {};

    if(this.smurf){
      headers = headers = { 'Content-Type': 'application/json' }
    }else{
      if (localStorage.usermode == "1") {
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
      } else {
        headers = headers = { 'Content-Type': 'application/json' }
      }
    }

    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, order_id: orderid, store_id: storeid }

    this.OrderService.orederTracking(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        console.log(data.data)
        this.restolatitude = Number(data.data.restaurant_details.restaurant_latitude)
          this.restolongitude = Number(data.data.restaurant_details.restaurant_longitude)
          this.latitude = Number(data.data.customer_details.cus_latitude)
          this.longitude = Number(data.data.customer_details.cus_longitude)
          if (this.focuslatitude == 0.0) {
            this.focuslatitude = Number(data.data.customer_details.cus_latitude)
            this.focuslongitude = Number(data.data.customer_details.cus_longitude)
          }
          this.orderStatus = data.data.order_status_details
          this.deliverytime = data.data.restaurant_details.delivery_time
          if (!(this.isActiveStatus(8) == "active" || this.isActiveStatus(9) == "active")) {
            setTimeout(() => {
              this.BGgetOrderTracking()
            }, 2000);
          }
          this.estimated_time = data.data.restaurant_details.estimated_time
          this.estimatedmin = data.data.restaurant_details.estimated_mins
          this.acceptedTime = this.getorderAcceptedTime()
          this.restaurant_current_date = data.data.restaurant_details.restaurant_current_date
          if(this.acceptedTime!=""){
            console.log(this.acceptedTime + "  " + this.restaurant_current_date)
            var acceptdrray = this.acceptedTime.split(" ");
            var currentdarray = this.restaurant_current_date.split(" ");
            var acceptdatearray = acceptdrray[0].split("-")
            var accepttimearray = acceptdrray[1].split(":")
            var currdatearray = currentdarray[0].split("-")
            var currtimearray = currentdarray[1].split(":")

            var startTime = new Date(Number(acceptdatearray[0]), Number(acceptdatearray[1]), Number(acceptdatearray[2]), Number(accepttimearray[0]), Number(accepttimearray[1]), Number(accepttimearray[2]));
            var endTime = new Date(Number(currdatearray[0]), Number(currdatearray[1]), Number(currdatearray[2]), Number(currtimearray[0]), Number(currtimearray[1]), Number(currtimearray[2]));
            var difference = endTime.getTime() - startTime.getTime(); // This will give difference in milliseconds

            var waitingtimenum = Math.round(this.deliverytime - (difference / 60000))
            console.log(waitingtimenum)
            if (waitingtimenum < 0 || isNaN(waitingtimenum)) {
              this.waitingtime = "-"
            } else {
              this.waitingtime = waitingtimenum + ""
            }
          }



        this.mapsAPILoader.load().then(() => {


          // this.riderlatitude = Number(data.data.delivery_person_details.deliver_latitude)
          // this.riderlongitude = Number(data.data.delivery_person_details.deliver_longitude)
          this.mapready = true



        });


      } else {

      }
    }, (error: any) => {

    })
  }
  public BGgetOrderTracking() {
    console.log("dsadsada");
    var headers = {};


    if(this.smurf){
      headers = headers = { 'Content-Type': 'application/json' }
    }else{
      if (localStorage.usermode == "1") {
        var tk = localStorage.hntk;
        headers = { 'Authorization': 'Bearer ' + tk, 'Content-Type': 'application/json' }
      } else {
        headers = headers = { 'Content-Type': 'application/json' }
      }
    }
    if (localStorage.language == "th") {
      this.lang = "th"
    } else {
      this.lang = "en"
    }
    const body = { lang: this.lang, order_id: this.orderid, store_id: this.storeid }

    this.OrderService.orederTracking(body, headers).subscribe((data: any) => {
      if (data.code == 200) {
        // this.riderlatitude = Number(data.data.delivery_person_details.deliver_latitude)
        // this.riderlongitude = Number(data.data.delivery_person_details.deliver_longitude)

        this.orderStatus = data.data.order_status_details
        if (!(this.isActiveStatus(8) == "active" || this.isActiveStatus(9) == "active")) {
          setTimeout(() => {
            this.BGgetOrderTracking()
          }, 2000);
        }
        this.deliverytime = data.data.restaurant_details.delivery_time
        this.estimated_time = data.data.restaurant_details.estimated_time
        this.estimatedmin = data.data.restaurant_details.estimated_mins
        this.acceptedTime = this.getorderAcceptedTime()
        if(this.acceptedTime!=""){
          this.restaurant_current_date = data.data.restaurant_details.restaurant_current_date
          var acceptdrray = this.acceptedTime.split(" ");
          var currentdarray = this.restaurant_current_date.split(" ");
          var acceptdatearray = acceptdrray[0].split("-")
          var accepttimearray = acceptdrray[1].split(":")
          var currdatearray = currentdarray[0].split("-")
          var currtimearray = currentdarray[1].split(":")
          var startTime = new Date(Number(acceptdatearray[0]), Number(acceptdatearray[1]), Number(acceptdatearray[2]), Number(accepttimearray[0]), Number(accepttimearray[1]), Number(accepttimearray[2]));
          var endTime = new Date(Number(currdatearray[0]), Number(currdatearray[1]), Number(currdatearray[2]), Number(currtimearray[0]), Number(currtimearray[1]), Number(currtimearray[2]));
          var difference = endTime.getTime() - startTime.getTime();  // This will give difference in milliseconds
          var waitingtimenum = Math.round(this.deliverytime - (difference / 60000))
          console.log(waitingtimenum)
          if (waitingtimenum < 0 || isNaN(waitingtimenum)) {
            this.waitingtime = "-"
          } else {
            this.waitingtime = waitingtimenum + ""
          }



        }





      } else {

      }
    }, (error: any) => {

    })
  }
  isActiveStatus(number) {
    for (var i = 0; i < this.orderStatus.length; i++) {
      if (this.orderStatus[i].ord_stage == number && this.orderStatus[i].stage_completed == "Yes") {
        return "active"
      }
    }
    return ""
  }
  getorderAcceptedTime() {
    for (var i = 0; i < this.orderStatus.length; i++) {
      if (this.orderStatus[i].ord_stage == 2 && this.orderStatus[i].stage_completed == "Yes") {
        return this.orderStatus[i].ord_timing
      }
    }
    return ""
  }

}
