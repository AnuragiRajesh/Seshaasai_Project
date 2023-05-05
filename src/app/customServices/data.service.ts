import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Url } from 'url';

// var headers_object = new HttpHeaders();
// headers_object.append('Content-Type', 'application/json');
// headers_object.append("Authorization", "Bearer " + localStorage.getItem("accessToken") );
// han
@Injectable({
  providedIn: 'root'
})
export class DataService {
  public _Login_API: string = 'http://172.17.131.162:3200/api/Login'
  public _Dashboard_API: string = "http://172.17.131.162:8100/api/PushData/GetData";
  public _Dashboard_API_Activities: string = "http://172.17.131.162:8100/api/PushData";
  public _Dashboard_API_Activities_Download: any = "http://172.17.131.162:8100/api/PushData/DownloadFile";
  public _User_role_API: string = "http://172.17.131.162:3200/api/Users/GetClaims"
  public _User_API: string = "http://172.17.131.162:3200/api/Users"
  public _User_withOut_Role__API: string = "http://172.17.131.162:3200/api/Users/NewUser"
  public _Role_API: string = "http://172.17.131.162:3200/api/Roles"

  // httpOptions = {
  //   headers: new HttpHeaders().set("Authorization","Bearer "+ localStorage.getItem("accessToken"))
  // };

  constructor(public http: HttpClient) { }
  loginApi(parmas: any) {
    return this.http.post(this._Login_API, parmas);
  }
  logOut() {
    localStorage.removeItem("accessToken")

  }
  getDashboardData() {
    return this.http.get(this._Dashboard_API);
  }
  getDashboardDataActivities(branchID: string) {
    return this.http.get(`${this._Dashboard_API_Activities}/${branchID}`,);
  }
  downloadDashboardDataActivities(data: any) {
    return this.http.post<Blob>(this._Dashboard_API_Activities_Download, data, { responseType: 'blob' as 'json' })
  }


  /* 
  @  Handled all the User component Apis
   */

  getUserData() {

    return this.http.get(this._User_API,);
  }
  postUserData(data: any) {
    return this.http.post(`${this._User_API}/AddUser`, data,)
  }
  updateUserData(data: any) {
    return this.http.put(`${this._User_API}`, data,);
  }
  deleteUserApi(Id: any) {
    console.log(Id, "hhhh")
    return this.http.delete(`${this._User_API}/${Id}`,);
  }

  getUserWithOutRoleData() {
    return this.http.get(this._User_withOut_Role__API,);
  }
  getRoleData() {
    console.log(localStorage.getItem('accessToken'), "from roles")
    return this.http.get(this._Role_API,);
  }
  postRoleData(data: any) {
    return this.http.post(`${this._Role_API}/AddRole`, data,);
  }
  updateRoleData(data: any) {
    return this.http.put(this._Role_API, data,);
  }
  deleteRoleData(id: any) {
    return this.http.delete(`${this._Role_API}/${id}`,);
  }
  getUserRoleData() {
    return this.http.get(this._User_role_API,)
  }
  assignNewRole(data: any) {
    return this.http.post(`${this._Role_API}/AssignRole`, data,)
  }
  updateAssignedRole(data: any) {
    return this.http.put(`${this._Role_API}/UpdateAssignRoleById`, data,)
  }

  //   isLoggedIn(){
  // console.log(localStorage.getItem("accessToken"),"hh")
  //     return localStorage.getItem("accessToken")? true:false
  //   }

  getBranchIds() {
    return ["1000123",
      "1000124",
      "1000125",
      "1000126",
      "1000127",
      "1000128",
      "1000129",
      "1000130",
      "1000131",
      "1000132",]
  }
}





