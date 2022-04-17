import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth/auth.service";
import {NavbarComponent} from "../navbar/navbar.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  isLogged = true;
  constructor(private router:Router, private auth:AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm) {
    let email    = form.value.email;
    let password = form.value.password;

    this.auth.login(email, password).subscribe( (res) => {
        localStorage.setItem('user', JSON.stringify(res));
        this.isLogged = true;
        this.router.navigate(['/']);
      },
      error => {
        console.log(error);
        this.isLogged = false;

      });
  }

}
