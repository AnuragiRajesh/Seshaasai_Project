import { Component, OnInit, AfterViewInit, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { DataService } from '../../../customServices/data.service';
import { SharedService } from 'src/app/customServices/shared.service';
import { dashboardTableColumns } from '../../../_interfaces/appInterfaces';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class TableComponent implements OnInit, AfterViewInit {
  @ViewChild('Table') table: ElementRef;
  public data: any
  @Output() dataEvent = new EventEmitter<any>();
  @Input() slectedItemsFromSlectionComponent: any = <any>[]
  predefineFields:any = ['Date', 'Region', 'State', 'Branch ID',]
  // showComponent = false
  expandableColumn: Array<string> = ['Activity', 'User', 'ActivityTime', 'Count', "action"];
  displayedColumns1:any=[]
  // = ['Acc Opened', 'Acc Closed', 'Active Accounts', 'Audit Completed', 'Branch Recon Completed',]
  displayedColumns = [...this.predefineFields,...this.displayedColumns1, 'action'];
  dataSource: MatTableDataSource<dashboardTableColumns>;
  activitydataSource: any;
  searchText: any
  // searchValue: any;
  filteredData: any[];
  @ViewChild('MatPaginator', { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumnsWithOutDownloadButton: string[] = ['Activity', 'User', 'ActivityTime', 'Count'];
  displayedColumnsWithDownloadButton: string[] = [...['Activity', 'User', 'ActivityTime', 'Count'], "action"];
  hover = false;
  expandedElement: any;
  cellWidth: string = 'auto';
  constructor(private service: DataService, private sharedService: SharedService) {
    this.dataSource = new MatTableDataSource();
  }

  downloadActivity(element: any) {
    const paramas = { SessionId: `${element.SessionId}`, activity: `${element.Activity}` }
    console.log(element, "goat", paramas)
    this.service.downloadDashboardDataActivities(paramas).subscribe(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = element.Activity + '.xlsx';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    });

  }
  exportAsExcelFile(excelFileName: string): void {
    let data1 = this.data
    let filteredDatasource = data1.map((item: any) => {
      for (const key in item) {
        if (!this.displayedColumns1.includes(key)) {
          delete item[key]
        }
      }
      return item
    })
    console.log(this.data)
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(filteredDatasource
    );
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    XLSX.writeFile(workbook, excelFileName + '.xlsx');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(this.table.nativeElement);
    delete (ws['Acc Opened'])

  }









  applyFilter() {
    const filterValue = this.searchText
    console.log('Filter:', filterValue); // check if the filter value is correct
    this.filteredData = this.data.filter((item: any) => {
      return item.State.toLowerCase().includes(filterValue.toLowerCase()) || item.Region.toLowerCase().includes(filterValue.toLowerCase()) || JSON.stringify(item['Branch ID']).toLowerCase().includes(filterValue.toLowerCase())
    });
    this.dataSource.data = this.filteredData
    console.log('Filtered data:', this.filteredData);

  }



  ngOnInit() {
    // console.log(localStorage.getItem("view")?.split(','),"opopop")
    this.displayedColumns1 =localStorage.getItem("view")?.split(',').concat(this.predefineFields)
    // [...this.predefineFields, ]
    this.getdata()
    console.log(this.displayedColumns1,"kokokokok")

   
  }
  getActivities(branchID: any) {
    console.log(branchID['Branch ID'], "....")
    this.activitydataSource= [
      {
        "Activity": "Recon",
        "User": "Japit K R",
        "SessionId": 88,
        "ActivityTime": "13-01-2022",
        "BranchID": 1000123,
        "Count": 1
      },
      {
        "Activity": "Recon",
        "User": "Hareesh kumar",
        "SessionId": 67,
        "ActivityTime": "13-01-2022",
        "BranchID": 1000123,
        "Count": 1
      },
      {
        "Activity": "Recon",
        "User": "Japit K R",
        "SessionId": 54,
        "ActivityTime": "16-01-2022",
        "BranchID": 1000123,
        "Count": 1
      },
      {
        "Activity": "Recon",
        "User": "Hareesh kumar",
        "SessionId": 37,
        "ActivityTime": "12-01-2022",
        "BranchID": 1000123,
        "Count": 1
      },
      {
        "Activity": "Recon",
        "User": "Harigovind H",
        "SessionId": 98,
        "ActivityTime": "11-01-2022",
        "BranchID": 1000123,
        "Count": 1
      },
      {
        "Activity": "Recon",
        "User": "Harigovind H",
        "SessionId": 32,
        "ActivityTime": "13-01-2022",
        "BranchID": 1000123,
        "Count": 1
      }
    ]
    // this.service.getDashboardDataActivities(branchID['Branch ID']).subscribe((res: any) => {
    //   this.activitydataSource = res
    //   console.log(res, "data from activityApi")
    // })
  }
  ngOnChanges(changes: any) {
    this.dataSource.sort = this.sort;
    if (this.slectedItemsFromSlectionComponent.metric! || this.slectedItemsFromSlectionComponent.metric == null) {
      this.displayedColumns1 =this.predefineFields.concat(localStorage.getItem("view")?.split(','))
      this.displayedColumns = [...this.displayedColumns1, 'action'];
    }
    console.log("THis for chnage,", this.slectedItemsFromSlectionComponent)
    if (this.slectedItemsFromSlectionComponent !== false) {
      this.dataSource.data = this.data.filter((ele: any) => {
        //////////////////converting Dates for filtering the datasource/////
        const startDate = new Date(this.slectedItemsFromSlectionComponent.date?.start)
        const endDate = new Date(this.slectedItemsFromSlectionComponent.date?.end)
        const dateToCheck = new Date(ele['Date']);
        // console.log(ele['Date'],dateToCheck,"1st",startDate,"yuyu",endDate,'dateToCheck is within the specified range');
        //////////Filter for all the fields //////////////////////////////////////////////////
        if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) &&
            dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        //////////////For slecting only singal field //////////////////////////////////
        //////////////Region //////////////////////////////////
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region)) {
            return ele
          }
        }
        ////////////// State  //////////////////////////////////
        else if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State)) {
            return ele
          }
        }
        ////////////// Branch Id  //////////////////////////////////
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele['Branch ID'])) {
            return ele
          }
        }
        ////////////// Metric//////////////////////////////////
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          return ele
        }
        ////////////// Date//////////////////////////////////
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {


          if (dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }

        }
        //////////////////////////////////////////////////////////////////////////Selecting 2 times region ////////////////////////////////////
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID'])) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region)) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region)) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        //////////////////////////////////////////////////////////////////////////Selecting 3 times for region ////////////////////////////////////
        else if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State)) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID'])) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          // 
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State)) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State)) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        else if (this.slectedItemsFromSlectionComponent.region && this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {

          if (this.slectedItemsFromSlectionComponent.region.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele.Region) &&
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) &&
            this.slectedItemsFromSlectionComponent.state.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele.State) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        ////////selecting fields for Branch Id //////////////////////////////
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && !this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
            return ele2.item_text
          }).includes(ele['Branch ID'])) {
            return ele
          }
        }
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && !this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          if (
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (
            this.slectedItemsFromSlectionComponent.branch_Id.map((ele2: any) => {
              return ele2.item_text
            }).includes(ele['Branch ID']) && dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
        else if (!this.slectedItemsFromSlectionComponent.region && !this.slectedItemsFromSlectionComponent.state && !this.slectedItemsFromSlectionComponent.branch_Id && this.slectedItemsFromSlectionComponent.metric && this.slectedItemsFromSlectionComponent.date) {
          this.displayedColumns1 = [...this.predefineFields, ...this.slectedItemsFromSlectionComponent.metric.map((ee: any) => {
            return ee
          })]
          this.displayedColumns = [...this.displayedColumns1, 'action'];
          if (dateToCheck.getTime() >= startDate.getTime() && dateToCheck.getTime() <= endDate.getTime()) {
            return ele
          }
        }
      })
    } else {
      this.getdata()
    }
    this.dataSource.sort = this.sort;
    this.sharedService.setData(this.dataSource.data);
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getdata(){



    
    this.dataSource.sort = this.sort;
    let res = [
      {
        "State": "Punjab",
        "Region": "North",
        "Date": "2023-03-08",
        "Acc_Opened": 4108,
        "Acc_Closed": 4030,
        "Branch_ID": 1000123,
        "Active_Accounts": 78,
        "Audit_Completed": 7,
        "Branch_Recon_Completed": 6
      },
      {
        "State": "Uttarakhand",
        "Region": "North",
        "Date": "2022-11-03",
        "Acc_Opened": 211,
        "Acc_Closed": 132,
        "Branch_ID": 1000124,
        "Active_Accounts": 79,
        "Audit_Completed": 5,
        "Branch_Recon_Completed": 9
      },
      {
        "State": "Uttarakhand",
        "Region": "North",
        "Date": "2022-10-03",
        "Acc_Opened": 3732,
        "Acc_Closed": 3670,
        "Branch_ID": 1000132,
        "Active_Accounts": 62,
        "Audit_Completed": 3,
        "Branch_Recon_Completed": 7
      },
      {
        "State": "Haryana",
        "Region": "North",
        "Date": "2022-05-11",
        "Acc_Opened": 3029,
        "Acc_Closed": 2959,
        "Branch_ID": 1000131,
        "Active_Accounts": 70,
        "Audit_Completed": 1,
        "Branch_Recon_Completed": 10
      },
      {
        "State": "Punjab",
        "Region": "North",
        "Date": "2022-09-13",
        "Acc_Opened": 3947,
        "Acc_Closed": 3883,
        "Branch_ID": 1000130,
        "Active_Accounts": 64,
        "Audit_Completed": 6,
        "Branch_Recon_Completed": 7
      },
      {
        "State": "Punjab",
        "Region": "North",
        "Date": "2022-04-15",
        "Acc_Opened": 648,
        "Acc_Closed": 637,
        "Branch_ID": 1000129,
        "Active_Accounts": 11,
        "Audit_Completed": 8,
        "Branch_Recon_Completed": 7
      },
      {
        "State": "Punjab",
        "Region": "North",
        "Date": "2022-12-03",
        "Acc_Opened": 1400,
        "Acc_Closed": 1337,
        "Branch_ID": 1000128,
        "Active_Accounts": 63,
        "Audit_Completed": 9,
        "Branch_Recon_Completed": 4
      },
      {
        "State": "Punjab",
        "Region": "North",
        "Date": "2022-11-03",
        "Acc_Opened": 53,
        "Acc_Closed": 30,
        "Branch_ID": 1000127,
        "Active_Accounts": 83,
        "Audit_Completed": 3,
        "Branch_Recon_Completed": 7
      },
      {
        "State": "Punjab",
        "Region": "North",
        "Date": "2022-09-21",
        "Acc_Opened": 1069,
        "Acc_Closed": 1042,
        "Branch_ID": 1000125,
        "Active_Accounts": 27,
        "Audit_Completed": 6,
        "Branch_Recon_Completed": 3
      },
      {
        "State": "Jammu & Kashmir",
        "Region": "North",
        "Date": "2022-03-03",
        "Acc_Opened": 183,
        "Acc_Closed": 99,
        "Branch_ID": 1000123,
        "Active_Accounts": 84,
        "Audit_Completed": 3,
        "Branch_Recon_Completed": 3
      },
      {
        "State": "Nagaland",
        "Region": "East",
        "Date": "2022-02-03",
        "Acc_Opened": 2710,
        "Acc_Closed": 2672,
        "Branch_ID": 1000126,
        "Active_Accounts": 38,
        "Audit_Completed": 4,
        "Branch_Recon_Completed": 8
      },
      {
        "State": "Maharashtra",
        "Region": "West",
        "Date": "2022-07-06",
        "Acc_Opened": 2998,
        "Acc_Closed": 2961,
        "Branch_ID": 1000125,
        "Active_Accounts": 37,
        "Audit_Completed": 4,
        "Branch_Recon_Completed": 10
      }
    ]
    res.forEach((obj: any) => renameKey(obj, 'Branch_Recon_Completed', 'Branch Recon Completed'));
    res.forEach((obj: any) => renameKey(obj, 'Audit_Completed', 'Audit Completed'));
    res.forEach((obj: any) => renameKey(obj, 'Active_Accounts', 'Active Accounts'));
    res.forEach((obj: any) => renameKey(obj, 'Branch_ID', 'Branch ID'));
    res.forEach((obj: any) => renameKey(obj, 'Acc_Opened', 'Acc Opened'));
    res.forEach((obj: any) => renameKey(obj, 'Acc_Closed', 'Acc Closed'));
    console.log(res, "service is beeing called?")
    this.data = res
    this.dataSource.data = this.data
    this.sharedService.setData(this.dataSource.data);
    // this.service.getDashboardData().subscribe((ress: any) => {
    //   // console.log(res,"jkjjkjk")
   
    // })
  }
}






function renameKey(obj: any, oldKey: any, newKey: any) {
  obj[newKey] = obj[oldKey];
  delete obj[oldKey];
}

