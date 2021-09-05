import { BrowserModule,Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductsComponent } from './pages/products/products.component';
import { AdminProductsComponent } from './pages/admin/adminproducts.component';
import { OwlModule } from 'ngx-owl-carousel';
import { HomeComponent } from './pages/home/home.component';
import { IndexComponent } from './pages/index/index.component';
import { LoginComponent } from './pages/login/login.component';
import { ReferFriendComponent } from './pages/referfriend/referfriend.component';
import { ReferGoComponent } from './pages/refergo/refergo.component';
import { HttpClientModule} from "@angular/common/http";
import {DatePipe,AsyncPipe} from '@angular/common';
import { InMemoryWebApiModule } from "angular-in-memory-web-api";
import { DataserviceService } from "./service/dataservice.service";
import { MessagingService } from "./service/messaging.service"
import{AngularFireMessagingModule}from'@angular/fire/messaging';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ExtrasizeselectionComponent } from './pages/extrasizeselection/extrasizeselection.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { AdminCheckoutComponent } from './pages/admin/admincheckout.component';
import { SearchresultComponent } from './pages/searchresult/searchresult.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProfileshortComponent } from './components/profileshort/profileshort.component';
import { ProfilenavComponent } from './components/profilenav/profilenav.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { RewardsComponent } from './pages/rewards/rewards.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { RidersignupComponent } from './pages/ridersignup/ridersignup.component';
import { RidersignupprocessComponent } from './pages/ridersignupprocess/ridersignupprocess.component';
import { RiderthankyouComponent } from './pages/riderthankyou/riderthankyou.component';
import { TrackorderComponent } from './pages/trackorder/trackorder.component';
import { OrdersuccessComponent } from './pages/ordersuccess/ordersuccess.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SinglerewardComponent } from './pages/singlereward/singlereward.component';
import { PinlocationComponent } from './pages/pinlocation/pinlocation.component';
import { TermandconditionsComponent } from './pages/termandconditions/termandconditions.component';
import { JobComponent } from './pages/job/job.component';
import { CareerComponent } from './pages/career/career.component';
import { FaqComponent } from './pages/faq/faq.component';
import { PressComponent } from './pages/press/press.component';
import { PressinnerComponent } from './pages/pressinner/pressinner.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { FoundationComponent } from './pages/foundation/foundation.component';
import { SupportComponent } from './pages/support/support.component';
import { MerchantstepComponent } from './pages/merchantstep/merchantstep.component';
import { UnderreviewapplicationComponent } from './pages/underreviewapplication/underreviewapplication.component';
import { Merchantstep2Component } from './pages/merchantstep2/merchantstep2.component';
import { Merchantstep3Component } from './pages/merchantstep3/merchantstep3.component';
import { Merchantstep4Component } from './pages/merchantstep4/merchantstep4.component';
import { AuthheaderComponent } from './components/authheader/authheader.component';
import { TooltipModule } from 'ng2-tooltip-directive';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { CartComponent } from './pages/cart/cart.component';
import { QuickComponent } from './pages/quick/quick.component';
import { PaymentsuccessComponent } from './pages/paymentsuccess/paymentsuccess.component';
import { PaymentfailedComponent } from './pages/paymentfailed/paymentfailed.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { NgxImageZoomModule } from 'ngx-image-zoom';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatBadgeModule} from '@angular/material/badge';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatChipsModule} from '@angular/material/chips';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatListModule} from '@angular/material/list';
import {MatMenuModule} from '@angular/material/menu';
import {MatNativeDateModule, MatRippleModule} from '@angular/material/core';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatRadioModule} from '@angular/material/radio';
import {MatSelectModule} from '@angular/material/select';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSliderModule} from '@angular/material/slider';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTreeModule} from '@angular/material/tree';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SkeletonloaderComponent } from './pages/skeletonloader/skeletonloader.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SeeAllComponent } from './pages/see-all/see-all.component';
import { ZoomComponent } from './pages/pinlocation/zoom.componen';
import { SetpasswordComponent } from './pages/setpassword/setpassword.component';
import { FaqordersComponent } from './pages/faqorders/faqorders.component';
import { FaqdeliveryComponent } from './pages/faqdelivery/faqdelivery.component';
import { FaqpaymentComponent } from './pages/faqpayment/faqpayment.component';
import { DownloadnowComponent } from './pages/downloadnow/downloadnow.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { RECAPTCHA_V3_SITE_KEY, RecaptchaV3Module } from 'ng-recaptcha';
import { Job2Component } from './pages/job2/job2.component';
import { NewtrackorderComponent } from './pages/newtrackorder/newtrackorder.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    ProductsComponent,
    AdminProductsComponent,
    HomeComponent,
    IndexComponent,
    LoginComponent,
    RegisterComponent,
    ForgotpasswordComponent,
    ResetpasswordComponent,
    ExtrasizeselectionComponent,
    TopnavComponent,
    CheckoutComponent,
    AdminCheckoutComponent,
    SearchresultComponent,
    CategoryComponent,
    ProfileshortComponent,
    ProfilenavComponent,
    WalletComponent,
    ChangepasswordComponent,
    FavoritesComponent,
    ReviewsComponent,
    RewardsComponent,
    AddressesComponent,
    RidersignupComponent,
    RidersignupprocessComponent,
    RiderthankyouComponent,
    TrackorderComponent,
    OrdersuccessComponent,
    OrdersComponent,
    SinglerewardComponent,
    PinlocationComponent,
    TermandconditionsComponent,
    JobComponent,
    CareerComponent,
    FaqComponent,
    PressComponent,
    PressinnerComponent,
    MerchantComponent,
    FoundationComponent,
    SupportComponent,
    MerchantstepComponent,
    UnderreviewapplicationComponent,
    Merchantstep2Component,
    Merchantstep3Component,
    Merchantstep4Component,
    AuthheaderComponent,
    AboutusComponent,
    CartComponent,
    QuickComponent,
    PaymentsuccessComponent,
    PaymentfailedComponent,
    PrivacypolicyComponent,
    ContactusComponent,
    InvoiceComponent,
    SkeletonloaderComponent,
    PaymentComponent,
    SeeAllComponent,
    ZoomComponent,
    SetpasswordComponent,
    FaqordersComponent,
    FaqdeliveryComponent,
    FaqpaymentComponent,
    ReferFriendComponent,
    ReferGoComponent,
    DownloadnowComponent,
    VoucherComponent,
    Job2Component,
    NewtrackorderComponent
  ],
  imports: [
    AngularFireMessagingModule,
    BrowserModule,
    LazyLoadImageModule,
    NgxImageZoomModule,
    FormsModule,
    NgxSkeletonLoaderModule,
    RecaptchaV3Module,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAUSBquvfmOg6-YMDxAVRYkDABzk9yoO3o',
      libraries: ['places']
    }),
    SocialLoginModule,
    AppRoutingModule,
	  OwlModule,
	  HttpClientModule,
    TooltipModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,

    MatBadgeModule,
    MatBottomSheetModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    MatTreeModule,

    //InMemoryWebApiModule.forRoot(DataserviceService)
  ],
  providers: [MessagingService,AsyncPipe,Meta,DatePipe,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '673795502514-06g8lm8k4a7flq51v8nr41c8kjjcqbpo.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('690990795177771'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
    {
      provide: RECAPTCHA_V3_SITE_KEY, useValue: '6Ld2tPUZAAAAABgwZdEPmD4-fvGhCLTa3F3CHbbm'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
