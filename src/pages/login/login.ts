import { Component } from '@angular/core';
import {
  IonicPage,
  NavController,
  NavParams,
  LoadingController
} from 'ionic-angular';
import { HomePage } from '../home/home'

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    this.formData = {}
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login() {
    let loader = this.loadingCtrl.create();
    loader.present();

    setTimeout(() => {
      loader.dismiss();
      this.navCtrl.setRoot(HomePage, {}, { animate: true });
    }, 1000);
  }

  goToRegister() {
    
  }

}
