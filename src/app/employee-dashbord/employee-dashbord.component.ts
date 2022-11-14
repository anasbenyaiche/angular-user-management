import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { subscribeOn } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { EmployeeModel } from './employee-dashbord.model';

@Component({
  selector: 'app-employee-dashbord',
  templateUrl: './employee-dashbord.component.html',
  styleUrls: ['./employee-dashbord.component.css'],
})
export class EmployeeDashbordComponent implements OnInit {
  formValue!: FormGroup;
  employeeModelObj: EmployeeModel = new EmployeeModel();
  employeeData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailAdress: [''],
      phoneNumber: [''],
      salary: [''],
    });

    this.getAllEmplyee();
  }

  clickAddEmployee() {
    this.formValue.reset();
    this.showUpdate = false;
    this.showAdd = true;
  }
  deleteEmployee(row: any) {
    alert('hi here');
    this.api.deleteEmployee(row.id).subscribe(
      (res) => {
        console.log(res);
        alert('Employee deleted ');
        this.getAllEmplyee();
      },

      (err) => {
        alert('Something went wrong');
      }
    );
  }
  postEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.emailAdress = this.formValue.value.EmailAdress;
    this.employeeModelObj.mobile = this.formValue.value.phoneNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api.postEmployee(this.employeeModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Employee Added ');

        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllEmplyee();
      },
      (err) => {
        alert('Something went wrong');
      }
    );
  }
  getAllEmplyee() {
    this.api.getEmployee().subscribe((res) => {
      this.employeeData = res;
    });
  }
  onEdit(row: any) {
    this.showUpdate = true;
    this.showAdd = false;
    this.employeeModelObj.id = row.id;
    this.formValue.controls['firstName'].setValue(row.firstName);
    this.formValue.controls['lastName'].setValue(row.lastName);
    this.formValue.controls['emailAdress'].setValue(row.emailAdress);
    this.formValue.controls['phoneNumber'].setValue(row.phoneNumber);
    this.formValue.controls['salary'].setValue(row.salary);
  }
  updateEmployeeDetails() {
    this.employeeModelObj.firstName = this.formValue.value.firstName;
    this.employeeModelObj.lastName = this.formValue.value.lastName;
    this.employeeModelObj.emailAdress = this.formValue.value.EmailAdress;
    this.employeeModelObj.mobile = this.formValue.value.phoneNumber;
    this.employeeModelObj.salary = this.formValue.value.salary;
    this.api
      .updateEmployee(this.employeeModelObj, this.employeeModelObj.id)
      .subscribe(
        (res) => {
          console.log(res);
          alert('Employee Updated ');
          let ref = document.getElementById('cancel');
          ref?.click();
          this.formValue.reset();
          this.getAllEmplyee();
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
