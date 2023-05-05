import { Component, ViewChild, OnInit, AfterViewInit, ElementRef, ViewEncapsulation, ChangeDetectorRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/customServices/data.service';
import { rolesTableColumns } from 'src/app/_interfaces/appInterfaces';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { Rollpoop_upInterface } from 'src/app/_interfaces/appInterfaces';
import * as XLSX from 'xlsx';
import { ToastComponent } from 'src/app/pop-ups/toast/toast.component';
import { Router } from '@angular/router';
import { DialogComponent } from 'src/app/pop-ups/dailog-box/dialog.component';

@Component({
  selector: 'app-roles',
  // standalone: true,
  templateUrl: './roles.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./roles.component.scss'],

  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class RolesComponent implements OnInit {
  hover: boolean
  poop_up: Rollpoop_upInterface = { Roll_Title: "Staff", Roll_Description: "description is yet to be updated from the backend", Roll_Access: "Eamil only access", View_Access: "All metrics", Rights_Permissions: "View only" }
  data: any
  //  = [{"Roll Title":" Sales Head","Date Added":"19/112022", "Roll Access":"All Access","View":"No. of closed accounts only","Rights/Permissions":"View and edit limited", "Phone Number":5678092354},{"Roll Title":"Admin","Date Added":"19/112022", "Roll Access":"E-mail only","View":"Audit only","Rights/Permissions":"View only", "Phone Number":5678092354},{"Roll Title":"Technical","Date Added":"19/112022", "Roll Access":"All Access","View":"Inventory check only","Rights/Permissions":"View and edit all", "Phone Number":5678092354},{"Roll Title":"Marketting Manager","Date Added":"19/112022", "Roll Access":"Mobile phone no. only","View":"No. of open accounts only","Rights/Permissions":"View and edit all", "Phone Number":5678092354},{"Roll Title":"Staff","Date Added":"19/112022", "Roll Access":"E-mail only","View":"All metrics","Rights/Permissions":"View and edit limited", "Phone Number":5678092354},{"Roll Title":"Staff","Date Added":"19/112022", "Roll Access":"Mobile phone no. only","View":"Branch recon only ","Rights/Permissions":"View only", "Phone Number":5678092354},{"Roll Title":"Staff","Date Added":"19/112022", "Roll Access":"Mobile phone no. only","View":"Branch recon only ","Rights/Permissions":"View only", "Phone Number":5678092354},{"Roll Title":"Staff","Date Added":"19/112022", "Roll Access":"Mobile phone no. only","View":"Branch recon only ","Rights/Permissions":"View only", "Phone Number":5678092354},{"Roll Title":"Staff","Date Added":"19/112022", "Roll Access":"Mobile phone no. only","View":"Branch recon only ","Rights/Permissions":"View only", "Phone Number":5678092354},{"Roll Title":"Staff","Date Added":"19/112022", "Roll Access":"Mobile phone no. only","View":"Branch recon only ","Rights/Permissions":"View only", "Phone Number":5678092354},]
  displayedColumns1: string[] = ['Role Title', 'Date Added', 'Role Access', 'View', 'Rights/Permissions',]
  displayedColumns: string[] = [...this.displayedColumns1, 'action'];
  dataSource: any
  @ViewChild('content', { static: true }) content: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('Table') table: ElementRef;
  @ViewChild(MatSort) sort: MatSort;
  searchText: any
  // searchValue: any;
  filteredData: any[];
  expandedElement: any;

  constructor(private service: DataService,
    private router: Router,
    private modalService: NgbModal,
  ) {
    this.dataSource = new MatTableDataSource();
  }

  deleteRole(id: any) {
    this.service.deleteRoleData(id).subscribe((res: any) => {
    })
    // this.cdr.detectChanges();
  }

  exportAsExcelFile(excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, excelFileName + '.xlsx');
  }
  applyFilter() {
    const filterValue = this.searchText
    console.log('Filter:', filterValue); // check if the filter value is correct
    this.filteredData = this.data.filter((item: any) => {
      return item['Role Title'].toLowerCase().includes(filterValue.toLowerCase()) || item['Date Added'].toLowerCase().includes(filterValue.toLowerCase())|| item['Rights/Permissions'].toLowerCase().includes(filterValue.toLowerCase())|| item['Role Access'].toLowerCase().includes(filterValue.toLowerCase())
    });
    this.dataSource.data = this.filteredData
    console.log('Filtered data:', this.filteredData);

  }




  openDialogOfDelete(element: any) {
    const config: NgbModalOptions = {
      backdrop: false,
      keyboard: true,
      centered: true,
      size: 's,'

    };
    const modalRef = this.modalService.open(DialogComponent, config);
    modalRef.componentInstance.data = element
    modalRef.result.then((result) => {
      result ? this.service.deleteRoleData(element.Id).subscribe((res: any) => {
        const config: NgbModalOptions = {
          backdrop: false,
          keyboard: true,
          centered: true,
          size: 's,'

        };
        const modalRef = this.modalService.open(ToastComponent, config);
        modalRef.componentInstance.data = res.message
        this.getDataFromGetRoleApi()
        console.log(res, "response from delete role api")
      }) : console.log(result)
    }).catch((error) => {
      console.log(error);
    });
  }
  openDialogOfRead(content: any, element: any): void {
    this.poop_up.Roll_Title = element['Role Title']
    this.poop_up.Roll_Description = element['Description']
    this.poop_up.Roll_Access = element['Role Access']
    this.poop_up.View_Access = element['View']
    this.poop_up.Rights_Permissions = element['Rights/Permissions']
    console.log(element, "jjjjjjjjjj")
    const config: NgbModalOptions = {
      backdrop: false,
      keyboard: true,
      centered: true,
      size: 'sl'

    };
    const modalRef = this.modalService.open(content, config);
    modalRef.result.then((result) => {
      console.log(result);
    }).catch((error) => {
      console.log(error);
    });
  }
  editRow(element: any) {
    console.log(element)
    this.router.navigate(['/home/rolesComponent/editRole'], {
      queryParams: element
    });
  }






  ExportTOExcel() {
    // Get the table data from the MatTableDataSource
    // const data = this.dataSource.data;
    // // Filter out the excluded columns and include the included columns
    // const filteredData = data.map(row => {
    //   return Object.keys(row)
    //     .filter(key => !ignoreColumns.includes(key))
    //     .filter(key => includeColumns.length ? includeColumns.includes(key) : true)
    //     .reduce((obj, key) => {
    //       obj[key] = row[key];
    //       return obj;
    //     }, {});
    // });
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, "Excel" + '.xlsx');
  }
  ngOnInit(): void {
    this.getDataFromGetRoleApi()

    // this.getDataFromGetRoleApi()

  }



  getDataFromGetRoleApi() {
    // console.log("hhhh")
    const res = [
      {
        "Id": "29F87D96-C562-4BD8-9115-01B77988708B",
        "Name": "HR",
        "Created_Date": "23/03/2023",
        "RoleAccess": "All Access",
        "View": [
          "Audit Completed",
          "Branch Recon Completed"
        ],
        "Rights": "View and edit all",
        "Description": "HR has given access to all"
      },
      {
        "Id": "1F83D8F0-57D8-4CE4-BD70-9EF4533826BD",
        "Name": "Super User",
        "Created_Date": "05/04/2023",
        "RoleAccess": "All Access",
        "View": [
          "Acc Opened",
          "Acc Closed",
          "Active Accounts",
          "Audit Completed",
          "Branch Recon Completed"
        ],
        "Rights": "View and edit all",
        "Description": "Super User has given admin access"
      },
      {
        "Id": "CB20FBB7-9772-42F0-94AC-EFEC967B4861",
        "Name": "Business Development Manager",
        "Created_Date": "05/04/2023",
        "RoleAccess": "All Access",
        "View": [
          "All metrics",
          "Audit "
        ],
        "Rights": "View and edit all",
        "Description": "All Access"
      },
      {
        "Id": "D3CF0394-A5AB-4D45-B780-55DA2D42834B",
        "Name": "Technical Admin",
        "Created_Date": "05/04/2023",
        "RoleAccess": "All Access",
        "View": [
          "Acc Opened",
          "Acc Closed"
        ],
        "Rights": "View and edit limited",
        "Description": "yy"
      },
      {
        "Id": "293204C7-D705-462C-A4CD-B05198D246EA",
        "Name": "hr-admin",
        "Created_Date": "02/05/2023",
        "RoleAccess": "Mobile number access",
        "View": [
          "Active Accounts",
          "Audit Completed",
          "Branch Recon Completed"
        ],
        "Rights": "View and edit all",
        "Description": "admin - HR"
      },
      {
        "Id": "06B565FA-84CB-407B-8907-290DB71E2E33",
        "Name": "Manager",
        "Created_Date": "02/05/2023",
        "RoleAccess": "Email access",
        "View": [
          "Audit Completed",
          "Branch Recon Completed",
          "Acc Closed",
          "Active Accounts"
        ],
        "Rights": "View and edit limited",
        "Description": "Manager has given access to email only"
      },
      {
        "Id": "11B9F53B-C98E-47AD-A7F8-CA89DFE1F1AA",
        "Name": "CEO",
        "Created_Date": "02/05/2023",
        "RoleAccess": "All Access",
        "View": [
          "Audit Completed"
        ],
        "Rights": "View and edit limited",
        "Description": "CEO has given all access"
      },
      {
        "Id": "5BDE41FF-320A-498A-B37C-4A9576707421",
        "Name": "Staff",
        "Created_Date": "02/05/2023",
        "RoleAccess": "Email access",
        "View": [
          "Audit Completed"
        ],
        "Rights": "View",
        "Description": "Staff has given access to email only"
      },
      {
        "Id": "5FBCC51A-1B10-4FD2-8556-23F431C3F037",
        "Name": "Assistant",
        "Created_Date": "02/05/2023",
        "RoleAccess": "Mobile number access",
        "View": [
          "Branch Recon Completed",
          "Acc Opened",
          "Acc Closed"
        ],
        "Rights": "View",
        "Description": "The assistant has given access to  mobilephone only"
      },
      {
        "Id": "9A402900-A56A-49D7-854A-8A65B27DBD2F",
        "Name": "Development Manager",
        "Created_Date": "02/05/2023",
        "RoleAccess": "Email access",
        "View": [
          "Acc Opened",
          "Branch Recon Completed"
        ],
        "Rights": "View and edit limited",
        "Description": "The Development Manager has given access to Mobile number access only\n"
      },
      {
        "Id": "9E4E2B51-8A1E-4D2C-9C8E-54707B430DA7",
        "Name": "Staff-01",
        "Created_Date": "02/05/2023",
        "RoleAccess": "Mobile number access",
        "View": [
          "Acc Opened",
          "Acc Closed",
          "Active Accounts",
          "Audit Completed",
          "Branch Recon Completed"
        ],
        "Rights": "View and edit all",
        "Description": "Asdf"
      }
    ]
    console.log(res, "hareesh")
    res.forEach((obj: any) => renameKey(obj, 'Name', 'Role Title'));
    res.forEach((obj: any) => renameKey(obj, 'Created_Date', 'Date Added'));
    res.forEach((obj: any) => renameKey(obj, 'RoleAccess', 'Role Access'));
    res.forEach((obj: any) => renameKey(obj, 'Rights', 'Rights/Permissions'));
    // console.log(res)
    this.data = res
    this.dataSource = new MatTableDataSource<rolesTableColumns>(this.data);
    this.implementationOfPaginatorAndMatsort()
    // this.service.getRoleData().subscribe((ress: any) => {
      
    // })
  }
  implementationOfPaginatorAndMatsort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }



}

function renameKey(obj: any, oldKey: any, newKey: any) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}