import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
public notifications:any
user:string | null
 constructor(private router: Router, ){

 }
 ngOnInit(): void {
this.user =localStorage.getItem('username')
 }
Logout(){
  localStorage.clear()
  this.router.navigate(['/login']);
}
}
