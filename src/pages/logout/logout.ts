import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from '../login/login';

/**
 * Generated class for the LogoutPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    localStorage.removeItem('user_data');
    console.log('ionViewDidLoad LogoutPage');
  }

  goToLogin(){
    
    this.navCtrl.setRoot(LoginPage);
  }

}
