import { Component } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular'
import { HomePage } from '../home/home'
import api from '../../api'

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
    public loadingCtrl: LoadingController
  ) {
    console.log('hola')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage')
  }

  async login() {
    let loader = this.loadingCtrl.create()
    loader.present()

    let data = await api.user.login({email: this.formData.email, password: this.formData.pass})

    console.log(data)

    loader.dismiss()
    // this.navCtrl.setRoot(HomePage, {}, { animate: true })
  }

  goToRegister() {
    
  }

}
