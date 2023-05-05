export interface dashboardTableColumns {
  'Acc Opened': number;
  'Acc Closed': number;
  'State': string;
  'Region': string;
  Date: string;
  'Branch ID': number;
  'Active Accounts': number;
  'Audit Completed': number;
  'Branch Recon Completed': number;
  "moreDetails":any
}
export interface usersTableColumns {
  "Id":string
  "Name": string;
  'Date Added': string;
  "Region": string;
  'Branch ID': number;
  'Phone Number': number;
  "Email ID": string;

}

export interface rolesTableColumns {
  "Roll Title": string;
  'Date Added': string;
  "Roll Access": string;
  'View': string;
  "Rights/Permissions": string;

}


export interface userRolesTableColumns {
  "User Name": string;
  'User ID': number;
  'Branch ID': number;
  'Location': string;
  "Roll assigned": string;
  'Date of roll assigned': string;

}



export interface User {

  UserName:string,
  UserId:string
}
export interface Role {

  Role:string,
  RoleId:string
}
export interface States {

  state:string
}
export interface Branches {

  branchId:string
}


export interface Rollpoop_upInterface {Roll_Title:string, Roll_Description:string, Roll_Access:string, View_Access:string,Rights_Permissions:string}
