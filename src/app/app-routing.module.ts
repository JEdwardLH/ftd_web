import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './pages/index/index.component';
import { HomeComponent } from './pages/home/home.component';
import { ProductsComponent} from './pages/products/products.component';
import { AdminProductsComponent} from './pages/admin/adminproducts.component';
import { AdminCheckoutComponent} from './pages/admin/admincheckout.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ExtrasizeselectionComponent } from './pages/extrasizeselection/extrasizeselection.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { SearchresultComponent } from './pages/searchresult/searchresult.component';
import { CategoryComponent } from './pages/category/category.component';
import { WalletComponent } from './pages/wallet/wallet.component';
import { ChangepasswordComponent } from './pages/changepassword/changepassword.component';
import { RidersignupComponent } from './pages/ridersignup/ridersignup.component';
import { RiderthankyouComponent } from './pages/riderthankyou/riderthankyou.component';
import { RidersignupprocessComponent } from './pages/ridersignupprocess/ridersignupprocess.component';
import { FavoritesComponent } from './pages/favorites/favorites.component';
import { ReviewsComponent } from './pages/reviews/reviews.component';
import { RewardsComponent } from './pages/rewards/rewards.component';
import { AddressesComponent } from './pages/addresses/addresses.component';
import { TrackorderComponent } from './pages/trackorder/trackorder.component';
import { OrdersuccessComponent } from './pages/ordersuccess/ordersuccess.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { SinglerewardComponent } from './pages/singlereward/singlereward.component';
import { TermandconditionsComponent } from './pages/termandconditions/termandconditions.component';
import { FaqComponent } from './pages/faq/faq.component';
import { CareerComponent } from './pages/career/career.component';
import { AboutusComponent } from './pages/aboutus/aboutus.component';
import { JobComponent } from './pages/job/job.component';
import { PressComponent } from './pages/press/press.component';
import { PressinnerComponent } from './pages/pressinner/pressinner.component';
import { FoundationComponent } from './pages/foundation/foundation.component';
import { SupportComponent } from './pages/support/support.component';
import { MerchantComponent } from './pages/merchant/merchant.component';
import { UnderreviewapplicationComponent } from './pages/underreviewapplication/underreviewapplication.component';
import { MerchantstepComponent } from './pages/merchantstep/merchantstep.component';
import { Merchantstep2Component } from './pages/merchantstep2/merchantstep2.component';
import { Merchantstep3Component } from './pages/merchantstep3/merchantstep3.component';
import { Merchantstep4Component } from './pages/merchantstep4/merchantstep4.component';
import { CartComponent } from './pages/cart/cart.component';
import { QuickComponent } from './pages/quick/quick.component';
import { PrivacypolicyComponent } from './pages/privacypolicy/privacypolicy.component';
import { PaymentsuccessComponent } from './pages/paymentsuccess/paymentsuccess.component';
import { PaymentfailedComponent } from './pages/paymentfailed/paymentfailed.component';
import { ContactusComponent } from './pages/contactus/contactus.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SkeletonloaderComponent } from './pages/skeletonloader/skeletonloader.component';
import { PaymentComponent } from './pages/payment/payment.component';
import { SeeAllComponent } from './pages/see-all/see-all.component';
import { SetpasswordComponent } from './pages/setpassword/setpassword.component';
import { FaqdeliveryComponent } from './pages/faqdelivery/faqdelivery.component';
import { FaqordersComponent } from './pages/faqorders/faqorders.component';
import { FaqpaymentComponent } from './pages/faqpayment/faqpayment.component';
import { ReferFriendComponent } from './pages/referfriend/referfriend.component';
import { ReferGoComponent } from './pages/refergo/refergo.component';
import { DownloadnowComponent } from './pages/downloadnow/downloadnow.component';
import { VoucherComponent } from './pages/voucher/voucher.component';
import { NewtrackorderComponent } from './pages/newtrackorder/newtrackorder.component';

const routes: Routes = [
{   path: 'en/batangas/:id',
    component: HomeComponent,
},
{   path: 'th/batangas/:id',
    component: HomeComponent,
},
{   path: 'referafriend',
    component: ReferFriendComponent,
},
{   path: 'download',
    component: DownloadnowComponent,
},
{   path: 'newtrackorder',
    component: NewtrackorderComponent,
},
{   path: 'voucher',
    component: VoucherComponent,
},
{   path: 'voucher/:id',
    component: VoucherComponent,
},
{   path: 'refergo/:id',
    component: ReferGoComponent,
},
{   path: '',
    component: IndexComponent,
},
{   path: 'download-app',
    component: HomeComponent,
},
{   path: 'en',
    component: IndexComponent,
},
{   path: 'th',
    component: IndexComponent,
},
{   path: 'cart',
    component: CartComponent,
},
{   path: 'quick/:id',
    component: QuickComponent,
},
{   path: 'setpassword',
    component: SetpasswordComponent,
},
{   path: 'set-password/:id',
    component: SetpasswordComponent,
},
{   path: 'faqorders',
    component: FaqordersComponent,
},
{   path: 'faqdelivery',
    component: FaqdeliveryComponent,
},
{   path: 'faqpayment',
    component: FaqpaymentComponent,
},
{   path: 'payment',
    component: PaymentComponent,
},
{   path: 'skeletonloader',
    component: SkeletonloaderComponent,
},
{   path: 'invoice/:id',
    component: InvoiceComponent,
},
{   path: 'contactus',
    component: ContactusComponent,
},
{   path: 'paymentsuccess',
    component: PaymentsuccessComponent,
},
{   path: 'paymentfailed',
    component: PaymentfailedComponent,
},
{   path: 'privacypolicy',
    component: PrivacypolicyComponent,
},
{   path: 'page/:id',
    component: HomeComponent,
},
{   path: 'login',
    component: LoginComponent,
},
{   path: 'register',
    component: RegisterComponent,
},
{   path: 'registration/:id',
    component: RegisterComponent,
},
{   path: 'forgotpassword',
    component: ForgotpasswordComponent,
},
{   path: 'resetpassword',
    component: ResetpasswordComponent,
},
{   path: 'extrasizeselection',
    component: ExtrasizeselectionComponent,
},
{   path: 'promotion/:id',
    component: ProductsComponent,
},
{   path: ':lang/batangas/restaurant/:storename',
    component: ProductsComponent,
},
{   path: 'checkout',
    component: CheckoutComponent,
},
{   path: 'searchresult/:id',
    component: SearchresultComponent,
},
{   path: 'filterresult/:id',
    component: SearchresultComponent,
},
{   path: 'seeall/:id',
    component: SeeAllComponent,
},
{
    path: 'category/:id',
    component: CategoryComponent,
},
{
    path: 'wallet',
    component: WalletComponent,
},
{
    path: 'changepassword',
    component: ChangepasswordComponent,
},
{
    path: 'ridersignup',
    component: RidersignupComponent,
},
{
    path: 'riderprocess/:id',
    component: RidersignupprocessComponent,
},
{
    path: 'riderthankyou',
    component: RiderthankyouComponent,
},
{
    path: 'favorites',
    component: FavoritesComponent,
},
{
    path: 'addresses',
    component: AddressesComponent,
},
{
    path: 'reviews',
    component: ReviewsComponent,
},
{
    path: 'rewards',
    component: RewardsComponent,
},
{
    path: 'trackorder/:id',
    component: TrackorderComponent,
},
{
  path: 'smurftrackorder/:id',
  component: TrackorderComponent,
},
{
  path: 'track-order/:id',
  component: TrackorderComponent,
},
{
    path: 'ordersuccess',
    component: OrdersuccessComponent,
},
{
    path: 'orders',
    component: OrdersComponent,
},
{
    path: 'singlereward',
    component: SinglerewardComponent,
},
{
    path: 'termandconditions',
    component: TermandconditionsComponent,
},
{
  path: 'mobiletermandconditions/:id',
  component: TermandconditionsComponent,
},
{
    path: 'faq',
    component: FaqComponent,
},
{
    path: 'aboutus',
    component: AboutusComponent,
},
{
  path: 'mobileaboutus',
  component: AboutusComponent,
},
{
    path: 'career',
    component: CareerComponent,
},
{
    path: 'job',
    component: JobComponent,
},
{
    path: 'press',
    component: PressComponent,
},
{
    path: 'pressinner',
    component: PressinnerComponent,
},
{
    path: 'foundation',
    component: FoundationComponent,
},
{
    path: 'support',
    component: SupportComponent,
},
{
    path: 'mobilesupport/:id',
    component: SupportComponent,
},
{
  path: 'merchant',
  component: MerchantComponent,
},
{
path: 'merchantsignup',
component: MerchantComponent,
},
{
  path: 'thankyoumerchant',
  component:UnderreviewapplicationComponent,
},
{
  path: 'merchantsignup/apply/companyinfo/:id',
  component:MerchantstepComponent,
},
{
  path: 'merchantsignup/apply/storeinfo/:id',
  component:Merchantstep2Component,
},
{
  path: 'merchantsignup/apply/ownerinfo/:id',
  component:Merchantstep3Component,
},
{
  path: 'merchantsignup/apply/agreement/:id',
  component:Merchantstep4Component,
},
{   path: 'adminresto/:id',
    component: AdminProductsComponent,
},
{   path: 'admincheckout',
    component: AdminCheckoutComponent,
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled', relativeLinkResolution: "legacy" })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
