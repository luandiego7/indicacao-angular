import { Component, OnInit } from '@angular/core';
import {NgForm} from "@angular/forms";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errors:any;
  constructor(private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(form:NgForm){
    const name                 = form.value.name;
    const email                = form.value.email;
    const password             = form.value.password;
    const password_confirmation = form.value.password_confirmation;

    this.auth.register(name, email, password, password_confirmation).subscribe( (res) => {
      localStorage.setItem('user', JSON.stringify(res));
      this.router.navigate(['/']);
    }, error => {
      console.log(error);
      this.errors = error.error.error;
    });
  }
}
