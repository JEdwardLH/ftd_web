import { Component, OnInit } from '@angular/core';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
@Component({
  selector: 'app-skeletonloader',
  templateUrl: './skeletonloader.component.html',
  styleUrls: ['./skeletonloader.component.css']
})
export class SkeletonloaderComponent implements OnInit {
  animation = 'pulse';
  contentLoaded = false;
  intervalId;

  constructor() { }

  ngOnInit(): void {
    setTimeout(() => {
      this.contentLoaded = true;
    }, 2000);

  }


}
