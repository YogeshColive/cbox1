import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
readonly APIUrl ="https://localhost:44360/api";
readonly PhotoUrl = "https://localhost:44360/photos/"
  constructor(private http:HttpClient) { }

//Department Service

  getDepList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ColiveDepartment')
  }

  addDepartment(val:any){
    return this.http.post(this.APIUrl+'/ColiveDepartment',val)
  }

  updateDepartment(val:any){
    return this.http.put(this.APIUrl+'/ColiveDepartment',val)
  }

  deleteDepartment(val:any){
    return this.http.delete(this.APIUrl+'/ColiveDepartment/'+val)
  }

//Employee Service

  getEmpList():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ColiveEmployee')
  }

  addEmployee(val:any){
    return this.http.post(this.APIUrl+'/ColiveEmployee',val)
  }

  updateEmployee(val:any){
    return this.http.put(this.APIUrl+'/ColiveEmployee',val)
  }

  deleteEmployee(val:any){
    return this.http.delete(this.APIUrl+'/ColiveEmployee/'+val)
  }


  //photo

  UploadPhoto(val:any){
    return this.http.post(this.APIUrl+'/ColiveEmployee/SaveFile',val)
  }

  getAllDepartmentNames():Observable<any[]>{
    return this.http.get<any>(this.APIUrl+'/ColiveEmployee/GetAllDepartmentNames')
  }
}
