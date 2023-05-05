import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { DataService } from 'src/app/customServices/data.service';
import { usersTableColumns } from 'src/app/_interfaces/appInterfaces';
import * as XLSX from 'xlsx';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { DialogComponent } from 'src/app/pop-ups/dailog-box/dialog.component';
import { NgbModal ,NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { ToastComponent } from 'src/app/pop-ups/toast/toast.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  data:any
  searchText:any
  // searchValue: any;
  filteredData: any[];
  // = [{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Kizziz","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Manoj","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Kajal","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Pankaj","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Raju","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Vinod","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'},{"Name":"Harees","Date Added":"19/112022", "Region":"East","Branch ID":1000123,"Phone Number":8989674523,"Email ID":'garima.jain@outlook.com'}]
  displayedColumns1:string[] = ['User','Date Added', 'Region',  'Branch ID',  'Email ID','Phone Number',]
  displayedColumns:string[] = [...this.displayedColumns1, 'action'];
  dataSource:any
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('Table') table: ElementRef;
  VOForm: FormGroup;
  pageSizes = [3, 5, 7];
  expandedElement: any;
  constructor(private service: DataService,private router: Router, private modalService: NgbModal,
) {
    
  }
  clicked(){
    this.router.navigate(['/addUser']);
  }
  exportAsExcelFile(excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataSource.data);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, excelFileName + '.xlsx');
  }
  applyFilter() {
    const filterValue = this.searchText
    console.log('Filter:', filterValue); // check if the filter value is correct
    this.filteredData = this.data.filter((item:any)=> {
      return item['Branch ID'].toLowerCase().includes(filterValue.toLowerCase()) || item.User.toLowerCase().includes(filterValue.toLowerCase()) || JSON.stringify(item['Phone Number']).toLowerCase().includes(filterValue.toLowerCase()) || JSON.stringify(item['Email ID']).toLowerCase().includes(filterValue.toLowerCase())|| JSON.stringify(item['Date Added']).toLowerCase().includes(filterValue.toLowerCase())|| JSON.stringify(item.Region).toLowerCase().includes(filterValue.toLowerCase())
    });
    this.dataSource.data =this.filteredData
    console.log('Filtered data:', this.filteredData);
    // this.filteredData = this.data.filter((item: dashboardTableColumns) => {
    //   return item.State.toLowerCase().includes(this.searchText.toLowerCase()) ||
    //          item.Region.toLowerCase().includes(this.searchText.toLowerCase())||
    //          item.Date.toLowerCase().includes(this.searchText.toLowerCase());
    // });
  }
  
  ngOnInit(): void {
    this.getDataFromGetUserApi()
  }



  openDialogOfDelete(element:any){
    const config: NgbModalOptions = {
      backdrop:false,
      keyboard: true,
      centered: true,
      size:'s,'
      
    };
    const modalRef = this.modalService.open(DialogComponent,config);
    modalRef.componentInstance.data =element
    modalRef.result.then((result) => {
      result?this.service.deleteUserApi(element.Id).subscribe((res:any)=>{
        const config: NgbModalOptions = {
          backdrop:false,
          keyboard: true,
          centered: true,
          size:'s,'
          
        };
        const modalRef = this.modalService.open(ToastComponent,config);
        modalRef.componentInstance.data =res.message
        this.getDataFromGetUserApi()
        console.log(res)
      }):console.log(result)
    }).catch((error) => {
      console.log(error);
    });
  }



  editRow(element:any){
    console.log(element)
    this.router.navigate(['/home/userComponent/editUser'], {
      queryParams: element
    });}
    deleteRow(element:any){
      // console.log(element.Id)
this.service.deleteUserApi(element.Id).subscribe((res:any)=>{
  console.log(res,"response from user delete api ")
})
    }
 
getDataFromGetUserApi(){
  const res = [
    {
      "Id": "2c23263e-e484-4b67-afd2-d218ff3c794e",
      "UserName": "Harigovinda H",
      "FirstName": "Harigovinda",
      "LastName": "H",
      "Created_Date": "24/03/2023",
      "Region": "North",
      "BranchID": "1000125",
      "PhoneNumber": "7676123433",
      "Email": "Arun.nir@seshaasai.com"
    },
    {
      "Id": "76eb1cff-7035-411a-a9ef-4287833dfe0b",
      "UserName": "Sushil kumar",
      "FirstName": "Sushil",
      "LastName": "kumar",
      "Created_Date": "24/03/2023",
      "Region": "North",
      "BranchID": "1000126",
      "PhoneNumber": "9876666665",
      "Email": "Sushil@seshaasai.com"
    },
    {
      "Id": "9bd3b274-fc11-4bba-9af0-39370310cee4",
      "UserName": "Hareesh kumar.M",
      "FirstName": "Hareesh",
      "LastName": "kumar.M",
      "Created_Date": "24/03/2023",
      "Region": "South",
      "BranchID": "1000124",
      "PhoneNumber": "9745961906",
      "Email": "Hareesh.kumar@seshaasai.com"
    },
    {
      "Id": "bab73449-dc7e-46ed-a4cc-0ef7c3627b15",
      "UserName": "Arun S Nair",
      "FirstName": "Arun",
      "LastName": "S Nair",
      "Created_Date": "24/03/2023",
      "Region": "West",
      "BranchID": "1000125",
      "PhoneNumber": "8075403783",
      "Email": "Arun.nair@seshaasai.com"
    },
    {
      "Id": "eee9767e-60c0-4da3-bf2b-a2e0417ef88d",
      "UserName": "Rajesh Anuragi",
      "FirstName": "Rajesh",
      "LastName": "Anuragi",
      "Created_Date": "24/03/2023",
      "Region": "North",
      "BranchID": "1000123",
      "PhoneNumber": "9685412185",
      "Email": "Rajesh.anuragi@seshaasai.com"
    },
    {
      "Id": "fed60855-6025-43bc-ab39-85ee657c9de9",
      "UserName": "Harigovind H",
      "FirstName": "Harigovind",
      "LastName": "H",
      "Created_Date": "24/03/2023",
      "Region": "North",
      "BranchID": "1000126",
      "PhoneNumber": "9718998616",
      "Email": "Harigovind.h@seshaasai.com"
    },
    {
      "Id": "df0fa0b9-ba0a-4036-b3a5-729c81c25eb4",
      "UserName": "Subash Lama",
      "FirstName": "Subash",
      "LastName": "Lama",
      "Created_Date": "04/04/2023",
      "Region": "North",
      "BranchID": "1000123",
      "PhoneNumber": "9876543210",
      "Email": "Subash.lama@seshaasai.com"
    },
    {
      "Id": "fa43e9a2-142e-4230-877a-cf9239348dc9",
      "UserName": "Vipin Vidyadharan",
      "FirstName": "Vipin",
      "LastName": "Vidyadharan",
      "Created_Date": "03/04/2023",
      "Region": "North",
      "BranchID": "1000123",
      "PhoneNumber": "8433423423",
      "Email": "vipin.v@gmail.com"
    },
    {
      "Id": "b5d0b9f1-fd30-484c-bb30-14cfbc0aed89",
      "UserName": "ert kkk",
      "FirstName": "ert",
      "LastName": "kkk",
      "Created_Date": "02/05/2023",
      "Region": "West",
      "BranchID": "1000124",
      "PhoneNumber": "2347783455",
      "Email": "rajeshanuragi2003@gmail.com"
    }
  ]
  res.forEach((obj: any) => renameKey(obj, 'PhoneNumber', 'Phone Number'));
  res.forEach((obj: any) => renameKey(obj, 'Created_Date', 'Date Added'));
  res.forEach((obj: any) => renameKey(obj, 'BranchID', 'Branch ID'));
  res.forEach((obj: any) => renameKey(obj, 'Email', 'Email ID'));
  res.forEach((obj: any) => renameKey(obj, 'UserName', 'User'));
  this.data=res
  console.log(this.data)
  this.dataSource = new MatTableDataSource<usersTableColumns>(this.data);
  this.implementationOfPaginatorAndMatsort()
  // this.service.getUserData().subscribe((ress:any)=>{
  
  // })
}
implementationOfPaginatorAndMatsort(){
  this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
}

}
function renameKey(obj: any, oldKey: any, newKey: any) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}