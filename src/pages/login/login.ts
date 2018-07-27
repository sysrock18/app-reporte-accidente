import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController,
  ToastController
} from 'ionic-angular'
import { HomePage } from '../home/home'
import { RegisterPage } from '../register/register'
import { ApiProvider } from '../../providers/api/api'
import { ToastProvider } from '../../providers/toast/toast'
import { Storage } from '@ionic/storage'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  formData = {
    email: '',
    pass: ''
  }

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public api: ApiProvider,
    public toastCtrl: ToastController,
    public toastProvider: ToastProvider,
    public storage: Storage
  ) {

  }

  async ionViewDidLoad() {
    const user_id = await this.storage.get('id')
    if (user_id) {
      this.navCtrl.setRoot(HomePage, {}, { animate: true })
    }
  }

  async login() {
    const loader = this.loadingCtrl.create({ content: 'Espere...' })
    loader.present()

    const { data: resp } = await this.api.login({email: this.formData.email, password: this.formData.pass})

    loader.dismiss()

    console.log(resp)

    if (resp.result === 'success') {
      this.toastProvider.presentToast('Autenticación exitosa')

      const { record, credentials } = resp
      await this.storage.ready()
      this.storage.set('name', record.name)
      this.storage.set('email', record.email)
      this.storage.set('id', record.id)
      this.storage.set('http_user', credentials.user)
      this.storage.set('http_pass', credentials.pass)

      this.navCtrl.setRoot(HomePage, {}, { animate: true })

    } else if (resp.result === 'error') {
      this.toastProvider.presentToast('Usuario o contraseña incorrectos')
    } else {
      this.toastProvider.presentToast('Servicio temporalmente no disponible')
    }
  }

  goToRegister() {
    this.navCtrl.push(RegisterPage)
  }

}
