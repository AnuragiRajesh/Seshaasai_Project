import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../customServices/data.service';
import { SharedService } from '../customServices/shared.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  metrics: []
  showError = ""
  profileForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.minLength(6)),
  });
  form: FormGroup;
  constructor(private router: Router,
    private sharedService: SharedService,
    private service: DataService) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }
  ngOnInit(): void {
  }
  submitbutton() {
    if (this.profileForm.value.UserName=="Seshaasai"&& this.profileForm.value.Password=="Asdf@1234") {
      localStorage.setItem("username","Seshaasai")
      this.sharedService.setMetrics("Acc Opened,Acc Closed,Active Accounts,Audit Completed,Branch Recon Completed");
      this.sharedService.setUserData('userData');
      localStorage.setItem("view", 'Acc Opened,Acc Closed,Active Accounts,Audit Completed,Branch Recon Completed');
      // localStorage.setItem("accessToken", res.accessToken);
      // console.log(res.views, "metrics")
      this.router.navigate(['/home'])

    }else{
      this.showError = "wrong username or password"
          setTimeout(() => {
            this.showError = ''
          }, 2000);
    }
    // this.service.loginApi(this.profileForm.value).subscribe(
    //   (res: any) => {
    //     console.log(res, "username")
    //     localStorage.setItem("username","Seshaasai")
    //     this.sharedService.setMetrics("Acc Opened,Acc Closed,Active Accounts,Audit Completed,Branch Recon Completed");
    //     this.sharedService.setUserData('userData');
    //     localStorage.setItem("view", 'Acc Opened,Acc Closed,Active Accounts,Audit Completed,Branch Recon Completed');
    //     // localStorage.setItem("accessToken", res.accessToken);
    //     console.log(res.views, "metrics")
    //     this.router.navigate(['/home'])

    //   },
    //   err => {
    //     console.log(err)
    //     this.showError = err.error
    //     setTimeout(() => {
    //       this.showError = ''
    //     }, 2000);
    //   },
    // )
  }
}
