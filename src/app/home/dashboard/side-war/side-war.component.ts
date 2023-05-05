import { Component, OnInit, Renderer2 } from '@angular/core';
import { DataService } from 'src/app/customServices/data.service';
import {  Router } from '@angular/router';
@Component({
  selector: 'app-side-war',
  templateUrl: './side-war.component.html',
  styleUrls: ['./side-war.component.scss']
})
export class SideWarComponent implements OnInit {

  constructor(private service:DataService, private router:Router,
    private renderer: Renderer2) { }
    Logout(){
      this.service.logOut()
      this.router.navigate(['/login']);
    }
    myFunction(){
      const x = this.renderer.selectRootElement('#myTopnav');
      if (x.className == "sidebar") {
        x.className = "responsive";
        console.log("ooo",x)
           return
          } else {
            x.className = "sidebar";
          }
    }
  ngOnInit() {
  
   
  }

}
