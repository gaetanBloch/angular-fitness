import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor() {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null),
      password: new FormControl(null)
    });
  }

}
