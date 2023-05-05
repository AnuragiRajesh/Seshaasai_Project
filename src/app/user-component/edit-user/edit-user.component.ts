import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, startWith } from 'rxjs';
import { DataService } from 'src/app/customServices/data.service';
import { Branches } from 'src/app/_interfaces/appInterfaces';
import { emailValidator } from 'src/app/form-validator.directive';
import { phoneValidator } from 'src/app/form-validator.directive';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from 'src/app/pop-ups/toast/toast.component';
interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  region: string;
  phone: number;
  branch: boolean;
}
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  user: IUser;
  states: any
  branches: any
  Branches: string[]
  selectedBranch: Observable<Branches[]>;
  hover = false
  public reactiveForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: DataService,
    private modalService: NgbModal,
    private route: ActivatedRoute,) {

  }
  ngOnInit(): void {
    this.route.queryParams.subscribe((res: any) => {
      this.reactiveForm = this.formBuilder.group({
        Id: [res.Id, Validators.required],
        firstName: new FormControl(res.FirstName, [
          Validators.required,
          Validators.maxLength(250),
        ]),
        lastName: new FormControl(res.LastName, [
          Validators.required,
          Validators.maxLength(250),
        ]),
        phone: new FormControl(res['Phone Number'], [
          Validators.required,
          Validators.minLength(10),
          phoneValidator()
        ]),
        email: new FormControl(res['Email ID'], [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(250),
          emailValidator(),
        ]),
        region: new FormControl(res.Region, [
          Validators.required,
        ]),
        branchId: new FormControl(res['Branch ID'], [
          Validators.required,
        ]),
      })
    })
    this.branches = this.service.getBranchIds();
    this.states = ['East', 'West', 'North', 'South']
    this.Branches = this.service.getBranchIds().map((res: any) => {
      return res
    })
  }
  get firstName() {
    return this.reactiveForm.get('firstName')!;
  }
  get lastName() {
    return this.reactiveForm.get('lastName')!;
  }
  get email() {
    return this.reactiveForm.get('email')!;
  }
  get phone() {
    return this.reactiveForm.get('phone')!;
  }
  get region() {
    return this.reactiveForm.get('region')!;
  }
  get branchId() {
    return this.reactiveForm.get('branchId')!;
  }
  submitbutton() {
    for (const controlName of Object.keys(this.reactiveForm.controls)) {
      const control = this.reactiveForm.controls[controlName];
      control.markAsTouched();
    }
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value)
      this.service.updateUserData(this.reactiveForm.value).subscribe((res: any) => {

        const config: NgbModalOptions = {
          backdrop: false,
          keyboard: true,
          centered: true,
          size: 's,'
        };
        const modalRef = this.modalService.open(ToastComponent, config);
        modalRef.componentInstance.data = res.message
        console.log(res, "response from the update api ")
      })
    }
  }
}
