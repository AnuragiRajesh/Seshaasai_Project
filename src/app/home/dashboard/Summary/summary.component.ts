import { Component, OnInit, HostBinding, AfterViewInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { MatTableDataSource, } from '@angular/material/table';
import {
  MatPaginator
} from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { SharedService } from 'src/app/customServices/shared.service';




@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class SummaryComponent implements OnInit {
  today = Date.now()
  date: string
  gernateDate: Date = new Date()
  // @Output() toShowTableComponent = new EventEmitter<boolean>();
  public No_of_Accounts_Closed: number = 0
  public No_of_Accounts_Opened: number = 0
  public Audits_completed: number = 0
  public Branch_recon_completed: number = 0
  public Currrent_Inventory: number = 0
  public data: any
  displayedColumns = ['position', 'name', 'weight', 'action'];
  dataSource: MatTableDataSource<Element>;
  @ViewChild('MatPaginator', { static: false }) paginator!: MatPaginator;
  @ViewChild('sort', { static: false }) sort!: MatSort;


  constructor(private sharedService: SharedService) {
    this.dataSource = new MatTableDataSource();
  }

  ngOnInit() {
    this.sharedService.activityDataSource$
      .subscribe(res => {
        this.No_of_Accounts_Closed = 0
        this.No_of_Accounts_Opened = 0
        this.Audits_completed = 0
        this.Branch_recon_completed = 0
        this.Currrent_Inventory = 0
        this.data = res
        this.data.map((ele: any) => {
          // console.log(ele.Acc_Closed)
          this.No_of_Accounts_Closed += ele['Acc Closed']
          this.No_of_Accounts_Opened += ele['Acc Opened']
          this.Audits_completed += ele['Audit Completed']
          this.Branch_recon_completed += ele['Branch Recon Completed']
          this.Currrent_Inventory += ele['Active Accounts']
        })
      })
  }

}

