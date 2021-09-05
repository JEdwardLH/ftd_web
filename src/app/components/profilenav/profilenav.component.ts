import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import{ GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';

@Component({
  selector: 'app-profilenav',
  templateUrl: './profilenav.component.html',
  styleUrls: ['./profilenav.component.css']
})
export class ProfilenavComponent implements OnInit {
// LANGUAGE
LanguageText: any;
isLanguageLoaded = false;

  public href: string = "";
  constructor(private router: Router,private StringTServiceL: StringTService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any)=>{
      this.isLanguageLoaded = true;
      this.LanguageText = data;
  
      })
   }
  changepassword()
  {
  this.router.navigate(['/changepassword']);
  }
  favorites()
  {
  this.router.navigate(['/favorites']);
  }
  paymentmethod()
  {
  this.router.navigate(['/paymentmethod']);
  }
  addresses()
  {
  this.router.navigate(['/addresses']);
  }
  wallet()
  {
  this.router.navigate(['/wallet']);
  }
  reviews()
  {
  this.router.navigate(['/reviews']);
  }
  rewards()
  {
  this.router.navigate(['/rewards']);
  }
  ngOnInit(): void {
   this.href = this.router.url;
  }

}
