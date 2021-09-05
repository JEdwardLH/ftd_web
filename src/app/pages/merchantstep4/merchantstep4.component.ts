
import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { ActivatedRoute } from '@angular/router';
import { DelboyserviceService } from 'src/app/service/rider/delboyservice.service'
import { FdatabaseService } from '../../service/firebase/fdatabase.service';

@Component({
  selector: 'app-merchantstep4',
  templateUrl: './merchantstep4.component.html',
  styleUrls: ['./merchantstep4.component.css']
})
export class Merchantstep4Component implements OnInit {
  LanguageText: any;
  isLanguageLoaded = false;
  merchantid: any
  params: any
  idcard: File = null;
  poacertificate: File = null;
  hasfileidcard = false
  hasfilepoacertificate = false
  provinceList = []
  province = "0"
  districtList = []
  district = "0"
  subdistrictList = []
  subdistrict = "0"
  phonenumber = ""
  email = ""
  buildingtype = ""
  buildingname = ""
  houseno = ""
  address = ""
  soi = ""
  moo = ""
  branchid=""
  postalcode = ""
  firstname = ""
  lastname = ""
  idnumber = ""
  datetoday = ""
  agree1 = false
  agree2 = false
  constructor(private router: Router, private StringTServiceL: StringTService, private actRoute: ActivatedRoute, public DelboyserviceService: DelboyserviceService,
    public FdatabaseService: FdatabaseService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })

    if(localStorage.mer){
      this.merchantid = parseInt(atob(localStorage.mer)) || 0;
      if (this.merchantid == 0) {
        this.router.navigate(['/merchantsignup']);

      }
    }else{
      if (this.actRoute.snapshot.params.hasOwnProperty("id")) {
        this.params = this.actRoute.snapshot.params.id;
        this.merchantid = parseInt(atob(this.params)) || 0;

        if (this.merchantid == 0) {
          this.router.navigate(['/merchantsignup']);

        }
      }
    }

  }

  ngOnInit(): void {
    if (localStorage.mer_phonenumber) {
      this.phonenumber = localStorage.mer_phonenumber
    }
    if (localStorage.mer_email) {
      this.email = localStorage.mer_email
    }

    if (localStorage.mer_fname) {
      this.firstname = localStorage.mer_fname
    }
    if (localStorage.mer_lname) {
      this.lastname = localStorage.mer_lname
    }
    this.getMeta('province', '', 0)
    var date = new Date();
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    this.datetoday =  date.getDate()+" "+month[date.getMonth()]+"  "+this.formatAMPM(date)
  }
  finish(){
    localStorage.clear()
    location.href = "/thankyoumerchant"
  }
  handleFileInputidcard(files: FileList) {

    this.hasfileidcard = true
    this.idcard = files.item(0);


  }
  handleFileInputpoacertificate(files: FileList) {

    this.hasfilepoacertificate = true
    this.poacertificate = files.item(0);


  }
  updateownerInfo() {



    const formData: FormData = new FormData();
    if (this.idcard != null) {
      formData.append('idcard', this.idcard, this.idcard.name);
    }
    if (this.poacertificate != null) {
      formData.append('poacertificate', this.poacertificate, this.poacertificate.name);
    }
    formData.append('lang', 'en');

    formData.append('phonenumber', this.phonenumber);
    formData.append('email', this.email);
    formData.append('lastname', this.lastname);
    formData.append('idnum', this.idnumber);
    formData.append('firstname', this.firstname);

    formData.append('address', this.address);
    formData.append('soi', this.soi);
    formData.append('moo', this.moo);
    formData.append('province', this.province);
    formData.append('district', this.district);
    formData.append('subdistrict', this.subdistrict);
    formData.append('postalcode', this.postalcode);
    formData.append('branch_id', this.branchid);
    formData.append('mer_id', this.merchantid);


    this.DelboyserviceService.merchantset_ownerinfo(formData).subscribe((data: any) => {
      console.log(data)
      if (data.code == 200) {


        location.href = '/merchantsignup/apply/agreement/' + this.merchantid
      } else {
        alert(data.message)
      }
    }, (error: any) => {

    })
  }
  showfilename(file) {
    if (file != null) {
      return file.name
    } else {
      return "Choose file"
    }
  }

  getMetaName(meta) {
    if (localStorage.language == "th") {
      return meta.name_th
    } else {
      return meta.name
    }
  }
  provinceChage(name) {

    for (var i = 0; i < this.provinceList.length; i++) {
      if (localStorage.language == "th") {
        if(this.provinceList[i].name_th==name){
          name = this.provinceList[i].name;
        }
      }
    }

    this.getMeta('district', name, 0)
  }
  districtChage(name) {
    for (var i = 0; i < this.districtList.length; i++) {
      if (localStorage.language == "th") {
        if(this.districtList[i].name_th==name){
          name = this.districtList[i].name;
        }
      }
    }
    this.getMeta('sub-district', name, 0)
  }
  getMeta(meta, parent, state) {



    var headers = {};
    if (meta == "province") {

      this.provinceList = []
      this.FdatabaseService.getMeta("province").subscribe((data: any) => {


        data.forEach(val => {

          this.provinceList.push(val.payload.val())



        });

        if (state == 0)
            this.getMeta('district', this.provinceList[0].name, 0)

      });
    } else if (meta == "district") {
      this.districtList = []
      this.FdatabaseService.getMeta("district/"+parent).subscribe((data: any) => {


        data.forEach(val => {

          this.districtList.push(val.payload.val())





        });

        for(var i=0;i<this.districtList.length;i++){
          if (localStorage.language == "th") {
            if(this.district==this.districtList[i].name){
              this.district=this.districtList[i].name_th
            }
          }
        }
        if (state == 0)
          this.getMeta('sub-district', this.districtList[0].name, 0)

      });

    } else if (meta == "sub-district") {
      this.subdistrictList = []
      this.FdatabaseService.getMeta("subdistrict/"+parent).subscribe((data: any) => {


        data.forEach(val => {

          this.subdistrictList.push(val.payload.val())





        });


          for(var i=0;i<this.subdistrictList.length;i++){
            if (localStorage.language == "th") {
              if(this.subdistrict==this.subdistrictList[i].name){
                this.subdistrict=this.subdistrictList[i].name_th
              }
            }
          }

      });
    } else {

    }






  }

  formatAMPM(date) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  }
}
