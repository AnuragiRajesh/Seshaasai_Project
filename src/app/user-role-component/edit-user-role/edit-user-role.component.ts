import { FormControl} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/customServices/data.service';
import { map, Observable, of, startWith } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Role, User } from 'src/app/_interfaces/appInterfaces';
import { NgbModal ,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from 'src/app/pop-ups/toast/toast.component';
@Component({
  selector: 'app-edit-user-role',
  templateUrl: './edit-user-role.component.html',
  styleUrls: ['./edit-user-role.component.scss']
})
export class EditUserRoleComponent implements OnInit {

  // protected users:User[] = [{Id:"333","Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{Id:"333","Name":"Kizziz","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},]
  hover=false
  user = ''
  role = new FormControl<string | {Role:string}>('');
  roleID=undefined
  roleUserID=''
  optionsOfRoles: Role[] 
  filteredOptionsOfRoles: Observable<Role[]>;
  // optionsOfUsers: User[] 
  // filteredOptionsOfUsers: Observable<User[]>;

  constructor(
    private service: DataService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
   ) {


  }
  ngOnInit() {

    this.route.queryParams.subscribe((res:any)=>{
      this.roleUserID=res.Id
      this.user= `${res['User Name']} | ${res["Branch ID"]}`

      // this.roleID=
      this.role.setValue({  Role:res['Roll assigned']});  
console.log(res)
    })

    this.service.getRoleData().subscribe((res: any) => {
      this.optionsOfRoles = res.map((ele:any)=>{
        return { Role: ele.Name, RoleId:ele.Id}
      })
      console.log(this.optionsOfRoles, "gg")
      // this.initForm()
      this.filteredOptionsOfRoles = this.role.valueChanges.pipe(
        startWith(''),
        map((value:any) => {
          const Role = typeof value === 'string' ? value : value?.role;
          return Role ? this._filterOfRoles(Role as string) : this.optionsOfRoles.slice();
        }),
      );
    });



    
  }




  displayFnOfRoles(role: Role): string {
  
    return role && role.Role ? role.Role : '';
  }

  private _filterOfRoles(UserName: string): Role[] {
    const filterValue = UserName.toLowerCase();
    return this.optionsOfRoles.filter(option => option.Role.toLowerCase().includes(filterValue));
  }
  selectOptionOfRole(option:any){
    console.log(option)
    this.roleID=option.RoleId
  }

 
  submitbutton() {
    let data = {UserId:this.roleUserID,RoleId:this.roleID}
   console.log( )
    this.service.updateAssignedRole(data).subscribe((res:any)=>{
      const config: NgbModalOptions = {
        backdrop:false,
        keyboard: true,
        centered: true,
        size:'s,'
        
      };
      const modalRef = this.modalService.open(ToastComponent,config);
      modalRef.componentInstance.data =res.message
      console.log(res,"response from edit assigned role")
    })
      
    // })
  }





}
