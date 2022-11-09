import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-emp',
  templateUrl: './show-emp.component.html',
  styleUrls: ['./show-emp.component.css']
})
export class ShowEmpComponent implements OnInit {

  constructor(private service:SharedService) { }

  EmployeeList: any = [];
  ModalTitle: any;
  ActivateAddEditEmpComp: boolean = false;
  emp: any;

  EmployeeIDFilter: string ="";
  EmployeeNameFilter: string="";
  DepartmentFilter : string="";
  DateOfJoiningFilter :string="";
  EmployeeListWithoutFilter: any=[];


  ngOnInit(): void {
    this.refreshEmpList();
  }

  addClick() {
    this.emp = {
      EmployeeID: 0,
      EmployeeName: "",
      Department:"",
      DateOfJoining:"",
      PhotoFileName:"anonymous23.png"

    }
    this.ModalTitle = "Add Employee";
    this.ActivateAddEditEmpComp = true;
  }

  closeClick() {
    this.ActivateAddEditEmpComp = false;
    this.refreshEmpList();
  }
  editClick(item: any) {
    console.log(item);
    this.emp = item;
    this.ModalTitle = "Edit Employee";
    this.ActivateAddEditEmpComp = true;

  }

  deleteClick(item: any) {
    if (confirm("Are you sure??")) {
      this.service.deleteEmployee(item.EmployeeID).subscribe(data => {
        alert(data.toString());
        this.refreshEmpList();
      })
    }
  }

  refreshEmpList() {
    this.service.getEmpList().subscribe(data => {
      this.EmployeeList = data;
      this.EmployeeListWithoutFilter =data;
    })
  }

  FilterFn(){
    var EmployeeIDFilter = this.EmployeeIDFilter;
    var EmployeeNameFilter = this.EmployeeNameFilter;
    var DepartmentFilter = this.DepartmentFilter;
    var DateOfJoiningFilter = this.DateOfJoiningFilter;
    this.EmployeeList =this.EmployeeListWithoutFilter.filter(function(el: any){
      return el.EmployeeID.toString().toLowerCase().includes(
        EmployeeIDFilter.toString().trim().toLowerCase()
      )&&
      el.EmployeeName.toString().toLowerCase().includes(
        EmployeeNameFilter.toString().trim().toLowerCase()
      )&&
      el.Department.toString().toLowerCase().includes(
        DepartmentFilter.toString().trim().toLowerCase()
      )&&
      el.DateOfJoining.toString().toLowerCase().includes(
        DateOfJoiningFilter.toString().trim().toLowerCase()
      )
    })
  }


  sortResult(prop:any,asc:any){
    this.EmployeeList = this.EmployeeListWithoutFilter.sort(function(a:any,b:any){
      if(asc){
return (a[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1 : 0);
      }else{
        return (b[prop]>b[prop])?1 : ((a[prop]<b[prop])?-1 : 0);
      }
    })
  }



}
