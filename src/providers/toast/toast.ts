import { Injectable } from '@angular/core'
import { ToastController, Toast } from 'ionic-angular'

@Injectable()
export class ToastProvider {
  toast: Toast = null

  constructor(public toastCtrl: ToastController) {
    
  }

  presentToast(text: string):void{
    let toastData = {
      message: text,
      duration: 3000,
      position: 'bottom'
    }

    this.showToast(toastData)
  }

  private showToast(data:any):void{
    this.toast ? this.toast.dismiss() : false
    this.toast = this.toastCtrl.create(data)

    this.toast.present()
  }

}
