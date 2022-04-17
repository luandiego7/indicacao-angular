import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() { }

  public success(title:string, message:string):void{
    this.showAlert(title, message, 'success');
  }

  public error(title:string, message:string):void{
    this.showAlert(title, message, 'error');
  }

  private showAlert(title:string, message:string, icon:SweetAlertIcon):void{
    Swal.fire(title, message, icon);
  }

}
