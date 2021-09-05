import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalConstants } from 'src/app/common/global-constants';
import { StringTService } from '../../service/LanguageS/string-t.service';
import { ActivatedRoute } from '@angular/router';
import { DelboyserviceService } from 'src/app/service/rider/delboyservice.service'
import { FdatabaseService } from '../../service/firebase/fdatabase.service';

@Component({
  selector: 'app-merchantstep2',
  templateUrl: './merchantstep2.component.html',
  styleUrls: ['./merchantstep2.component.css']
})
export class Merchantstep2Component implements OnInit {
  LanguageText: any;
  isLanguageLoaded = false;
  merchantid: any
  params: any
  tobacco: File = null;
  alcohol: File = null;
  hasfiletobacco = false
  hasfilealcohol = false
  provinceList = []
  province = "0"
  districtList = []
  district = "0"
  subdistrictList = []
  storename = ""
  subdistrict = "0"
  contact_person = ""
  position = ""
  phonenumber = ""
  email = ""
  vatno = ""
  taxid = ""
  buildingtype = ""
  buildingname = ""
  houseno = ""
  address = ""
  soi = ""
  moo = ""
  branchid=""
  postalcode = ""

  constructor(private router: Router, private StringTServiceL: StringTService, private actRoute: ActivatedRoute, public DelboyserviceService: DelboyserviceService,
    public FdatabaseService: FdatabaseService) {
    this.StringTServiceL.getLanguageString().subscribe((data: any) => {
      this.isLanguageLoaded = true;
      this.LanguageText = data;

    })

    if(localStorage.mer){
      this.merchantid = parseInt(atob(localStorage.mer)) || 0;
      this.branchid =  localStorage.merbranch
      if (this.merchantid == 0) {
        this.router.navigate(['/merchantsignup']);

      }
    }else{
      if (this.actRoute.snapshot.params.hasOwnProperty("id")) {

        this.params = this.actRoute.snapshot.params.id;
        this.branchid =  this.actRoute.snapshot.queryParams.b
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
    this.getMeta('province', '', 0)
  }

  handleFileInputtobacco(files: FileList) {

    this.hasfiletobacco = true
    this.tobacco = files.item(0);


  }
  handleFileInputalcohol(files: FileList) {

    this.hasfilealcohol = true
    this.alcohol = files.item(0);


  }
  updateStoreInfo() {



    const formData: FormData = new FormData();
    if (this.tobacco != null) {
      formData.append('tobacco', this.tobacco, this.tobacco.name);
    }
    if (this.alcohol != null) {
      formData.append('alcohol', this.alcohol, this.alcohol.name);
    }
    formData.append('lang', 'en');
    formData.append('storename', this.storename);
    formData.append('phonenumber', this.phonenumber);
    formData.append('email', this.email);
    formData.append('position', this.position);
    formData.append('contact_person', this.contact_person);

    formData.append('address', this.address);
    formData.append('soi', this.soi);
    formData.append('moo', this.moo);
    formData.append('province', this.province);
    formData.append('district', this.district);
    formData.append('subdistrict', this.subdistrict);
    formData.append('postalcode', this.postalcode);
    formData.append('branch_id', this.branchid);
    formData.append('mer_id', this.merchantid);


    this.DelboyserviceService.merchantset_storeinfo(formData).subscribe((data: any) => {
      console.log(data)
      if (data.code == 200) {


        location.href = '/merchantsignup/apply/ownerinfo/' + this.params + "?b=" + data.data
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

}
