import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {FormGroup, FormBuilder, Validators, NgForm, FormControl} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-include',
  templateUrl: './include.component.html',
  styleUrls: ['./include.component.css']
})
export class IncludeComponent implements OnInit {

  includeForm!:FormGroup;
  submitted = false;
  checkCPF  = true;

  constructor(private http:HttpClient, private formBuilder:FormBuilder, private auth:AuthService, private router:Router) { }

  ngOnInit(): void {
    this.auth.status().subscribe( (res) => {
      if(!res){
        this.router.navigate(['login'])
      }else{

      }
    }, error => {
      console.log(error);
    });

    this.includeForm = this.formBuilder.group({
      name:   ['', [Validators.required, Validators.maxLength(255)]],
      cpf:    ['', [Validators.required, Validators.minLength(11), Validators.maxLength(11), this.cpfValidator]],
      email:  ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
      phone:  ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      product:['', [Validators.required, Validators.maxLength(255)]],
    });
  }

  onSubmit(form:FormGroup){
    this.submitted = true;

    if(!this.includeForm.invalid && this.checkCPF){
      const user:any = localStorage.getItem('user');
      const userObj  = JSON.parse(user);

      const data ={
        name:form.value.name,
        cpf: form.value.cpf,
        email: form.value.email,
        phone: form.value.phone,
        product: form.value.product,
        token:userObj.token
      }
      this.http.post(`${environment.base_url}/indications/store`, data).subscribe( (res) => {
        this.router.navigate(['/'])
      }, error => {
        console.log(error)
      });
    }
  }

  onBlurCheckCpf(){
    const user:any = localStorage.getItem('user');
    const userObj  = JSON.parse(user);

    const data = {
      cpf: this.includeForm.value.cpf,
      token:userObj.token
    }

    this.http.post(`${environment.base_url}/indications/check-cpf`, data).subscribe( (res) => {
      this.checkCPF = true;

    }, error => {
      this.checkCPF = false;
    });
  }

  cpfValidator(control:FormControl){

    let value = control.value.replace( /([~!@#$%^&*()_+=`{}\[\]\-|\\:;'<>,.\/? ])+/g, "" );

    if ( value.length !== 11 ) {
      return {cpfValidator:true};
    }

    let sum = 0,
      firstCN, secondCN, checkResult, i;

    firstCN   = parseInt( value.substring( 9, 10 ), 10 );
    secondCN = parseInt( value.substring( 10, 11 ), 10 );

    checkResult = function( sum:any, cn:any ) {
      let result = ( sum * 10 ) % 11;
      if ( ( result === 10 ) || ( result === 11 ) ) {
        result = 0;
      }

      return ( result === cn );
    };

    if ( value === "" ||
      value === "00000000000" ||
      value === "11111111111" ||
      value === "22222222222" ||
      value === "33333333333" ||
      value === "44444444444" ||
      value === "55555555555" ||
      value === "66666666666" ||
      value === "77777777777" ||
      value === "88888888888" ||
      value === "99999999999"
    ) {
      return {cpfValidator:true};
    }

    for ( i = 1; i <= 9; i++ ) {
      sum = sum + parseInt( value.substring( i - 1, i ), 10 ) * ( 11 - i );
    }

    if ( checkResult( sum, firstCN ) ) {
      sum = 0;
      for ( i = 1; i <= 10; i++ ) {
        sum = sum + parseInt( value.substring( i - 1, i ), 10 ) * ( 12 - i );
      }
      return checkResult( sum, secondCN ) ? null : {cpfValidator:true};
    }

    return {cpfValidator:true};
  }



}
