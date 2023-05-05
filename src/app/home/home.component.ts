import { Component } from '@angular/core';
// import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent   {
  // constructor(private location: Location) {
  //   this.location.subscribe((url: string) => {
  //     if (url.indexOf('/dashboard') === -1) {
  //       this.location.replaceState('/dashboard');
  //     }
  //   });
  constructor(){

  }
  // myFunction(){
  //   const x = this.renderer.selectRootElement('#myTopnav');
  //   console.log("ooo",x)
  //       if (x.className == "sidebar") {
  //         x.className += " responsive";
  //        return
  //       } else {
  //         // x.className = "sidebar";
  //       }
  }
  // ngAfterViewInit() {
  //   const anchor = this.renderer.selectRootElement('#myTopnav');
  //   this.renderer.listen(anchor, 'click', () => this.myFunction());
  // }
// }
