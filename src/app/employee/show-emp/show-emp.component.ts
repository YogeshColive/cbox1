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
    })
  }

}