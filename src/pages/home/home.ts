import { Component } from '@angular/core'
import { NavController, LoadingController } from 'ionic-angular'
import { Storage } from '@ionic/storage'
import { LoginPage } from '../login/login'
import { ApiProvider } from '../../providers/api/api'
import { UtilsProvider } from '../../providers/utils/utils'
import { ToastProvider } from '../../providers/toast/toast'

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

  userData = {
    id: '',
    name: '',
  }
  credentials = {
    http_user: '',
    http_pass: ''
  }
  accidentTypes:any = []
  formData = {
    accidentType: '',
    comments: ''
  }

	constructor(
    public navCtrl: NavController,
    public storage: Storage,
    public apiProvider: ApiProvider,
    public utilsProvider: UtilsProvider,
    public toastProvider: ToastProvider,
    public loadingCtrl: LoadingController,
  ) {

	}

  async ionViewDidLoad() {
    this.userData.id = await this.storage.get('id')
    this.userData.name = await this.storage.get('name')
    this.credentials.http_user = await this.storage.get('http_user')
    this.credentials.http_pass = await this.storage.get('http_pass')

    if (!this.userData.id) {
      this.navCtrl.setRoot(LoginPage, {}, { animate: true })
    }

    await this.setAccidentTypes()
  }

  async logout() {
    await this.storage.clear()

    this.navCtrl.setRoot(LoginPage, {}, { animate: true })
  }

  async setAccidentTypes() {
    const { data } = await this.apiProvider.getAccidentTypes(this.credentials)

    if (data) {
      this.accidentTypes = data.record
    }
  }

  async registerAccident() {
    const loader = this.loadingCtrl.create({ content: 'Espere...' })
    loader.present()

    const data = {
      user: this.userData.id,
      accident_type: this.formData.accidentType,
      comments: this.formData.comments,
      date: this.utilsProvider.getCurrentDate(),
      http_user: this.credentials.http_user,
      http_pass: this.credentials.http_pass
    }

    const resp:any = await this.apiProvider.sendAccident(data)

    loader.dismiss()

    if (resp.result === 'success') {
      this.formData.accidentType = ''
      this.formData.comments = ''
      this.toastProvider.presentToast('Accidente reportado con exito')
    } else {
      this.toastProvider.presentToast('Ha ocurrido un error al reportar el accidente')
    }
  }

}
