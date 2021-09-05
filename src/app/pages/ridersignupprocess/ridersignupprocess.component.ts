import { Component, OnInit } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { ActivatedRoute } from '@angular/router';
import { DelboyserviceService } from 'src/app/service/rider/delboyservice.service'

@Component({
  selector: 'app-ridersignupprocess',
  templateUrl: './ridersignupprocess.component.html',
  styleUrls: ['./ridersignupprocess.component.css']
})
export class RidersignupprocessComponent implements OnInit {
  // LANGUAGE
  LanguageText: any;
  isLanguageLoaded = false
  params: any
  riderid: any
  lang: any
  whatcity = "Calamba"
  yearslive: any
  yearsrider: any
  lastcompany: any
  fullname: any
  gender = "0"
  age: number
  device = "Android"
  motorbike: any
  regnumber: any
  phonenumber: any
  contactperson: any
  contactnumber: any
  address: any
  hasfileprofileImage = false
  hasfilelicense = false
  hasfilevalidId = false
  profileImage: File = null;
  license: File = null;
  riderfaqOptions={items: 1, dots: true, nav:false, autoplau:false };
  validId: File = null
  constructor(private StringTServiceL: StringTService, private actRoute: ActivatedRoute, public DelboyserviceService: DelboyserviceService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })

    if (this.actRoute.snapshot.params.hasOwnProperty("id")) {
      this.params = this.actRoute.snapshot.params.id;
      this.riderid = parseInt(atob(this.params)) || 0;

      if (this.riderid == 0) {
        window.location.href = '/ridersignup';
      }
    }
  }

  ngOnInit(): void {
  }
  updateRiderRecords() {



    const formData: FormData = new FormData();
    if(this.profileImage==null||this.license==null||this.validId==null){
      alert("Please complete all")
    }
    formData.append('profileimage', this.profileImage, this.profileImage.name);
    formData.append('license', this.license, this.license.name);
    formData.append('validId', this.validId, this.validId.name);
    formData.append('lang', "en");
    formData.append('whatcity', this.whatcity);
    formData.append('yearslive', this.yearslive);
    formData.append('yearsrider', this.yearsrider);
    formData.append('lastcompany', this.lastcompany);
    formData.append('fullname', this.fullname);
    formData.append('gender', this.gender);
    formData.append('age', ""+this.age);
    formData.append('regnumber', this.regnumber);
    formData.append('device', this.device);
    formData.append('phonenumber', this.phonenumber);
    formData.append('motorbike', this.motorbike);
    formData.append('contactperson', this.contactperson);
    formData.append('contactnumber', this.contactnumber);
    formData.append('address', this.address);
    formData.append('id', this.riderid);

    this.DelboyserviceService.uploadFile(formData).subscribe((data: any) => {
      console.log(data)
      if(data.code==200){

        window.location.href = '/riderthankyou';
      }else{
        alert(data.message)
      }
    }, (error: any) => {

    })
  }
  showfilename(file){
    if(file!=null){
      return file.name
    }else{
      return "Choose file"
    }
  }
  handleFileInput(files: FileList,filefor:String) {

    if(filefor=="profileimage"){
      this.hasfileprofileImage = true
      this.profileImage = files.item(0);
    }else if(filefor=="license"){
      this.hasfilelicense = true
      this.license = files.item(0);
    }else if(filefor=="validId"){
      this.hasfilevalidId = true
      this.validId = files.item(0);
    }


  }
}
