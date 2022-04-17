import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLogged:boolean = false;

  constructor(private auth:AuthService) { }

  ngOnInit() {
    this.auth.status().subscribe( (res) => {
      this.isLogged = res;
    }, error => {
      console.log(error);
    });
  }

  logout(){
    this.auth.logout();
  }

}
