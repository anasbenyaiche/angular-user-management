import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  public signUpForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      firstName: [''],
      lastName: [''],
      emailAdress: [''],
      phoneNumber: [''],
      password: [''],
    });
  }
  onSignUp() {
    this.http
      .post<any>('http://localhost:3000/comments', this.signUpForm.value)
      .subscribe(
        (res) => {
          console.log(res);
          alert('SignUp succefully  ');

          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
  onLogin() {}
}
