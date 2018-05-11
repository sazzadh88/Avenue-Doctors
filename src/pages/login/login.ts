import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { HomePage } from '../home/home';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers:[ApiServiceProvider]
})
export class LoginPage {

  loginData = { email:'sazzadh88@gmail.com', password:'sazzad' };
  loading: any;
  data : any;
  constructor(
    private toastCtrl: ToastController,
    public loadingCtrl:LoadingController,private api:ApiServiceProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

 
  login(){
     this.loader();
     

    this.api.login(this.loginData).then((result) => {
      console.log("Success: " + JSON.stringify(result));
      this.data = result;
      if(this.data.code == 401){
        this.showToast('Invalid Login');
      }else if(this.data.code == 200){
        this.navCtrl.setRoot(HomePage);
        this.showToast('Login Successful');
      }
      this.loading.dismiss();
    }, (err) => {
      this.loading.dismiss();
      this.showToast('Invalid Login');
      
    });
  }

  goToSignup(){
    alert('Signup Clicked');
  }

  loader() {
    this.loading = this.loadingCtrl.create({
      spinner:'crescent',
      content: 'Authenticating...'
    });
    this.loading.present();
    
  }


  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }


  

}
