import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [''],
      password: [''],
    });
  }
  onlogin() {
    this.http
      .get<any>('http://localhost:3000/comments', this.loginForm.value)
      .subscribe(
        (res) => {
          alert('SignUp succefully  ');

          this.loginForm.reset();
          this.router.navigate(['employeeDashbord']);
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
