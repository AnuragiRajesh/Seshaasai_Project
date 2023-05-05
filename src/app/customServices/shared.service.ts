import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  // pu
  // private dataSubject = new BehaviorSubject<string[]>([]);
  private activityDataSource: Subject<any> = new Subject<any>();
  activityDataSource$: Observable<any> = this.activityDataSource.asObservable();
  //   private metrics: Subject<any> = new Subject<any>();
  //  metrics$: Observable<any> = this.metrics.asObservable();

  private dataSubject= new BehaviorSubject<any>(null);
  //  data$: Observable<any> = this.dataSubject.asObservable();
   private userData = new BehaviorSubject<any>(null);
  constructor() { }

 setMetrics(data: any) {
  
  this.dataSubject.next(data);
}


getMetrics(): BehaviorSubject<any> {
  return this.dataSubject;
}


// setMetrics(data:any){
//   this.metrics.next(data);
// }

  setData(Data:any) {
    this.activityDataSource.next(Data);
  }
  setUserData(data: any): void {
    this.userData.next(data);
  }

  getUserData(): BehaviorSubject<any> {
    return this.userData;
  }
  // private arrayOfValuesSubject = new BehaviorSubject<string[]>([]);
  // private filterValueSubject = new BehaviorSubject<string>('');

  // arrayOfValues$ = this.arrayOfValuesSubject.asObservable();
  // filterValue$ = this.filterValueSubject.asObservable();

  // updateArrayOfValues(values: string[]) {
  //   this.arrayOfValuesSubject.next(values);
  // }

  // updateFilterValue(value: string) {
  //   this.filterValueSubject.next(value);
  // }
}