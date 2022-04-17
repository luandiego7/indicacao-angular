import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {AuthService} from "../../services/auth/auth.service";
import {Router} from "@angular/router";
import {AlertService} from "../../services/alert/alert.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  indications:any;
  user:any;
  status = ['INICIADA', 'EM PROCESSO', 'FINALIZADA'];

  STATUS_INICIADO   = 1;
  STATUS_PROCESSO   = 2;
  STATUS_FINALIZADO = 3;

  constructor( private http:HttpClient, private auth:AuthService, private router:Router, private alert:AlertService ) { }

  ngOnInit(): void {
    this.auth.status().subscribe( (res) => {
      if(!res){
        this.router.navigate(['login'])
      }else{
        this.getIndications();
      }
    }, error => {
      console.log(error);
    });
  }

  getIndications(){
    const user:any = localStorage.getItem('user');
    const userObj  = JSON.parse(user);

    this.http.get(`${environment.base_url}/indications?token=${userObj.token}`).subscribe( (res) => {
        this.indications = res;
      },
      error => {
        console.log(error);
      });
  }

  inProcess(id:any){
    Swal.fire({
      title:'Deseja realmente evoluir esta indicação?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const user:any = localStorage.getItem('user');
        const userObj  = JSON.parse(user); console.log(userObj.token);

        this.http.put(`${environment.base_url}/indications/in-process/${id}`, {token:userObj.token}).subscribe( (res) => {
          this.alert.success('Evoluída com sucesso', '')
          this.getIndications();
        }, error => {
          console.log(error);
        } );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.alert.error('Erro', 'Erro ao evlouir');
      }
    });
  }

  finish(id:any){
    Swal.fire({
      title:'Deseja realmente finalizar esta indicação?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const user:any = localStorage.getItem('user');
        const userObj  = JSON.parse(user); console.log(userObj.token);

        this.http.put(`${environment.base_url}/indications/finish/${id}`, {token:userObj.token}).subscribe( (res) => {
          this.alert.success('Finalizada com sucesso', '')
          this.getIndications();
        }, error => {
          console.log(error);
        } );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.alert.error('Erro', 'Erro ao evlouir');
      }
    });
  }

  deleteIndication(id:any){
    Swal.fire({
      title:'Deseja realmente excluir esta indicação?',
      text: 'Indicações excluídas não podem ser recuperadas',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sim',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        const user:any = localStorage.getItem('user');
        const userObj  = JSON.parse(user); console.log(userObj.token);

        this.http.delete(`${environment.base_url}/indications/delete/${id}`, {body:{token:userObj.token}}).subscribe( (res) => {
          this.alert.success('Deletado com sucesso', '')
          this.getIndications();
        }, error => {
          console.log(error);
        } );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.alert.error('Erro', 'Erro ao deletar');
      }
    });
  }

}
