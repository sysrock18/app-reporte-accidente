import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular'
import { ToastProvider } from '../../providers/toast/toast'
import { ApiProvider } from '../../providers/api/api'
import { LoginPage } from '../login/login'

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  formData = {
    name: '',
    email: '',
    password: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public toastProvider: ToastProvider,
    public apiProvider: ApiProvider
  ) {

  }

  ionViewDidLoad() {

  }

  async registerUser() {
    const loader = this.loadingCtrl.create({ content: 'Espere...' })
    loader.present()

    const data = {
      name: this.formData.name,
      email: this.formData.email,
      password: this.formData.password
    }

    const resp:any = await this.apiProvider.register(data)

    loader.dismiss()

    if (resp.result === 'success') {
      this.toastProvider.presentToast('Registro completado')
      this.navCtrl.pop();
    } else {
      this.toastProvider.presentToast('Ha ocurrido un error al realizar el registro')
    }
  }

  goToLogin() {
    this.navCtrl.pop()
  }

}
