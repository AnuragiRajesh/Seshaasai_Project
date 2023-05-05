import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validator, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { DataService } from 'src/app/customServices/data.service';
import { NgbModal ,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from 'src/app/pop-ups/toast/toast.component';
interface IUser {
  Name: string;
  lastName: string;
  email: string;
  region: string;
  phone:number;
  branch: boolean;
}
@Component({
  selector: 'app-add-role',
  templateUrl: './add-role.component.html',
  styleUrls: ['./add-role.component.scss']
})
export class AddRoleComponent implements OnInit {
  hover=false
  dropdownSettings: IDropdownSettings = {};
  dropdownSettingsForView:IDropdownSettings = {};
  public roll_access: any
  public view: any
  public rights: any
  public selectedItems:string[]

  public reactiveForm: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private service: DataService,
    private modalService: NgbModal,
    private router: Router,) {

  }
  //  = [
  //   { item_id: 1, item_text: 'Mumbai' },
  //   { item_id: 2, item_text: 'Bangalore' },
  //   { item_id: 3, item_text: 'Pune' }
  // ];
  ngOnInit(): void {
    this.initForm()
    this.roll_access = [
   'All Access' ,
     "Mobile number access" 
   , "Email access" 
    ];
    this.view = ['Acc Opened' ,
    'Acc Closed' ,
     'Active Accounts' ,
    'Audit Completed' ,
    'Branch Recon Completed' ]
    
    this.rights = [
     'View' ,
 "View and edit all",
     "View and edit limited" 

    ];




    this.dropdownSettings = {
      idField: 'item_id',
      textField: 'item_text',
      // showSelectedItemsAtTop: 5,
      limitSelection:1,
      itemsShowLimit: 1,
    };
    this.dropdownSettingsForView = {
      idField: 'item_id',
      textField: 'item_text',
      // showSelectedItemsAtTop: 5,
      itemsShowLimit: 1,
    };

  }
  initForm() {
    this.reactiveForm = this.formBuilder.group({
      Name: [,  
        Validators.required,
       ],
      RoleAccess: [, Validators.required],
      View: [, Validators.required],
      Rights: [, Validators.required],
      Description: [, Validators.required],

    })

  }
  get Name() {
    return this.reactiveForm.get('Name')!;
  }

  get View() {
    return this.reactiveForm.get('View')!;
  }

  get RoleAccess() {
    return this.reactiveForm.get('RoleAccess')!;
  }
  get Rights() {
    return this.reactiveForm.get('Rights')!;
  }
  get Description() {
    return this.reactiveForm.get('Description')!;
  }
  submitbutton() {

    for (const controlName of Object.keys(this.reactiveForm.controls)) {
      const control = this.reactiveForm.controls[controlName];
      control.markAsTouched();
    }
  
    if (this.reactiveForm.valid) {
      console.log(this.reactiveForm.value)
      this.service.postRoleData(this.reactiveForm.value).subscribe((res:any)=>{
        const config: NgbModalOptions = {
          backdrop:false,
          keyboard: true,
          centered: true,
          size:'s,'
          
        };
        const modalRef = this.modalService.open(ToastComponent,config);
        modalRef.componentInstance.data =res.message
        this.reactiveForm.reset()
          console.log(res,"response from the role post api")
          this.router.navigate(['/home/rolesComponent/role'])
      },
      
    
      err => {
        console.log(err)
        const config: NgbModalOptions = {
          backdrop:false,
          keyboard: true,
          centered: true,
          size:'s,'
          
        };
        const modalRef = this.modalService.open(ToastComponent,config);
        modalRef.componentInstance.data =err.error.message
      },
      
      )
      
    }
  }
  








}
