import { Component ,Inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Meta, MetaDefinition,Title } from '@angular/platform-browser';
import { MessagingService } from 'src/app/service/messaging.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  loadAPI: Promise<any>;
  show;
  title = 'kalanbanga';
  id:any;
  titlewithstore = "";
  callscript = false
  constructor(private router: Router,public dialog: MatDialog,private metaService: Meta, private titleService: Title,private messagingService: MessagingService){


    router.events.subscribe((y: NavigationEnd) => {

      if(y.url != "/"&&y.url!=undefined&&!y.url.includes("home")){
        this.loadAPI = new Promise((resolve) => {
          if(this.callscript == false){
            this.loadScript();
          }


          resolve(true);
      });
      }
      if(y.url!=undefined){
        if(y.url.includes("/download-app")){
          if(this.getMobileOperatingSystem() == "Android"){
            location.href = 'https://play.google.com/store/apps/details?id=com.kalanbanga.customer'
          }else if(this.getMobileOperatingSystem() == "iOS"){
            location.href = 'https://apps.apple.com/ph/app/kalan-banga-food-delivery/id1494106731'
          }else{

          }
        }
        if(y.url.includes("/en/")||y.url == "/en"){

          localStorage.language = "en";
        }else if(y.url.includes("/th/")||y.url == "/th"){
          localStorage.language = "th";
        }else if(y.url==undefined){


        }else{
          if(!localStorage.language){
            var lang = window.navigator.language ;
            localStorage.language = lang
          }

        }
        if(y.url.includes("/batangas")){
          this.titlewithstore = y.url.replace("/th/batangas/","").replace("/en/batangas/","")
        }

        localStorage.setItem("currenturl",y.url)
      }



      if(y instanceof NavigationEnd){






      }
    })

    if(localStorage.timeIn){
      this.checkCacheTime();
    }else{

    }
  }
  public loadScript() {
    this.callscript = true
    var isFound = false;
    var scripts = document.getElementsByTagName("script")
    for (var i = 0; i < scripts.length; ++i) {
        if (scripts[i].getAttribute('src') != null && scripts[i].getAttribute('src').includes("loader")) {
            isFound = true;
        }
    }

    if (!isFound) {
        var dynamicScripts = ["assets/js/owl.carousel.js"];

        for (var i = 0; i < dynamicScripts.length; i++) {
            let node = document.createElement('script');
            node.src = dynamicScripts [i];
            node.type = 'text/javascript';
            node.async = false;
            node.charset = 'utf-8';
            document.getElementsByTagName('head')[0].appendChild(node);
        }

    }
}
  getMobileOperatingSystem() {
    var userAgent = navigator.userAgent || navigator.vendor ;

        // Windows Phone must come first because its UA also contains "Android"
      if (/windows phone/i.test(userAgent)) {
          return "Windows Phone";
      }

      if (/android/i.test(userAgent)) {
          return "Android";
      }


      if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
          return "iOS";
      }

      return "unknown";
  }
  ngOnInit() {
    if (localStorage.usermode == "1") {
      // this.messagingService.requestPermission()
      // this.messagingService.receiveMessage()
      // this.show = this.messagingService.currentMessage
    }

   // this.addTag()


    // this.intervalId = setInterval(() => {
    //   this.animation = this.animation === 'pulse' ? 'progress-dark' : 'pulse';
    // }, 5000);



  }

  // ngOnDestroy() {
  //   if (this.intervalId) {
  //     clearInterval(this.intervalId);
  //   }
  // }
  addTag() {
    this.titleService.setTitle("Food To Dine | "+this.titlewithstore);
    this.metaService.addTag({ name: 'description', content: 'Food To Dine' });
    this.metaService.addTag({ name: 'robots', content: 'index,follow' });
    this.metaService.addTag({ property: 'og:title', content: 'KalanBanga - Food Delivery' });
    this.metaService.addTag({ property: 'og:description', content: "Order food you love, online or with the app. We deliver from your favorite restaurants right to your doorstep." });
    this.metaService.addTag({property:'og:image:secure_url',content:"https://kalanbanga.co.th/assets/images/lp_banner-hungry%20now.png"})
    this.metaService.addTag({property:'og:image:type',content:"image/png"})
    this.metaService.addTag({property:'og:image:width',content:"400"})
    this.metaService.addTag({property:'og:image:height',content:"300"})

  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
  renewCacheTime(){
    var currentDate = new Date();
    var currentTime = currentDate.getTime();
    localStorage.timeIn = currentTime;

  }

  checkCacheTime(){

      var dateInstance = new Date();
      var timeInstance = dateInstance.getTime();
      var sessionTime = timeInstance - localStorage.timeIn;

      if(sessionTime > 4800000 ){
        //this.openDialog()

      }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '300px',
      height: '150px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }
}

@Component({
  selector: 'appcomponentsdialog',
  templateUrl: 'app.componentdialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: AppComponent) {}

  CancelApp(): void {
    console.log("Session Expire")
    localStorage.removeItem('usermode');
    localStorage.removeItem('user_name');
    localStorage.removeItem('timeIn');
    this.dialogRef.close();
  }


}
