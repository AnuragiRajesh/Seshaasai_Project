import { Component, ViewChild, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { DataService } from 'src/app/customServices/data.service';
import { userRolesTableColumns } from 'src/app/_interfaces/appInterfaces';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['./user-roles.component.scss']
})
export class UserRolesComponent implements OnInit {
    searchText:any
  // searchValue: any;
  filteredData: any[];
  data:any
  displayedColumns1 = ['User Name','User ID', 'Branch ID', 'Location',    'Roll assigned','Date of roll assigned',]
  displayedColumns = [...this.displayedColumns1, 'action'];
  dataSource:any
  @ViewChild('Table') table: ElementRef;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  expandedElement: any;
  constructor(private service: DataService,private router: Router,) {
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
      return item['User Name'].toLowerCase().includes(filterValue.toLowerCase()) || item['Roll assigned'].toLowerCase().includes(filterValue.toLowerCase()) || JSON.stringify(item['Date of roll assigned']).toLowerCase().includes(filterValue.toLowerCase()) || JSON.stringify(item['User ID']).toLowerCase().includes(filterValue.toLowerCase())|| JSON.stringify(item['Branch ID']).toLowerCase().includes(filterValue.toLowerCase())|| JSON.stringify(item.Email).toLowerCase().includes(filterValue.toLowerCase())|| JSON.stringify(item.Location).toLowerCase().includes(filterValue.toLowerCase())
    });
    this.dataSource.data =this.filteredData
    console.log('Filtered data:', this.filteredData);}
  editRow(element:any){
    console.log(element)
    this.router.navigate(['/home/userRolesComponent/editUsereRole'], {
      queryParams: element
    });}

  ngOnInit(): void {
    const res = [
      {
        "Id": "2c23263e-e484-4b67-afd2-d218ff3c794e",
        "UserName": "Harigovinda H",
        "Email": "Arun.nir@seshaasai.com",
        "BranchID": "1000125",
        "UserID": "1000125",
        "Location": "North",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Assistant"
      },
      {
        "Id": "76eb1cff-7035-411a-a9ef-4287833dfe0b",
        "UserName": "Sushil kumar",
        "Email": "Sushil@seshaasai.com",
        "BranchID": "1000126",
        "UserID": "1000126",
        "Location": "North",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Assistant"
      },
      {
        "Id": "9bd3b274-fc11-4bba-9af0-39370310cee4",
        "UserName": "Hareesh kumar.M",
        "Email": "Hareesh.kumar@seshaasai.com",
        "BranchID": "1000124",
        "UserID": "1000124",
        "Location": "South",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Assistant"
      },
      {
        "Id": "b5d0b9f1-fd30-484c-bb30-14cfbc0aed89",
        "UserName": "ert kkk",
        "Email": "rajeshanuragi2003@gmail.com",
        "BranchID": "1000124",
        "UserID": "1000124",
        "Location": "West",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Staff"
      },
      {
        "Id": "bab73449-dc7e-46ed-a4cc-0ef7c3627b15",
        "UserName": "Arun S Nair",
        "Email": "Arun.nair@seshaasai.com",
        "BranchID": "1000125",
        "UserID": "1000125",
        "Location": "West",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Manager"
      },
      {
        "Id": "df0fa0b9-ba0a-4036-b3a5-729c81c25eb4",
        "UserName": "Subash Lama",
        "Email": "Subash.lama@seshaasai.com",
        "BranchID": "1000123",
        "UserID": "1000123",
        "Location": "North",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "hr-admin"
      },
      {
        "Id": "eee9767e-60c0-4da3-bf2b-a2e0417ef88d",
        "UserName": "Rajesh Anuragi",
        "Email": "Rajesh.anuragi@seshaasai.com",
        "BranchID": "1000123",
        "UserID": "1000123",
        "Location": "North",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Staff"
      },
      {
        "Id": "fa43e9a2-142e-4230-877a-cf9239348dc9",
        "UserName": "Vipin Vidyadharan",
        "Email": "vipin.v@gmail.com",
        "BranchID": "1000123",
        "UserID": "1000123",
        "Location": "North",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "CEO"
      },
      {
        "Id": "fed60855-6025-43bc-ab39-85ee657c9de9",
        "UserName": "Harigovind H",
        "Email": "Harigovind.h@seshaasai.com",
        "BranchID": "1000126",
        "UserID": "1000126",
        "Location": "North",
        "Created_Date": "02/05/2023",
        "Roll_Assigned": "Staff-01"
      }
    ]
    res.forEach((obj: any) => renameKey(obj, 'Roll_Assigned', 'Roll assigned'));
    res.forEach((obj: any) => renameKey(obj, 'BranchID', 'Branch ID'));
    res.forEach((obj: any) => renameKey(obj, 'UserID', 'User ID'));
    res.forEach((obj: any) => renameKey(obj, 'Created_Date', 'Date of roll assigned'));
    res.forEach((obj: any) => renameKey(obj, 'UserName', 'User Name'));
    // res.forEach((obj: any) => renameKey(obj, 'Serial_No', 'Serial No'));
    console.log(res, "service is beeing called?")
    this.data=res
    this.dataSource = new MatTableDataSource<userRolesTableColumns>(this.data);
    this.dataSource.paginator = this.paginator;
  this.dataSource.sort = this.sort;
    // this.service.getUserRoleData().subscribe((ress:any)=>{
      

    // })
  }
 
  
}
function renameKey(obj: any, oldKey: any, newKey: any) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}