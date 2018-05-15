import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { ApiServiceProvider } from '../../providers/api-service/api-service';


@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {
  loginData = { email:'sazzadh88@gmail.com', password:'sazzad', fullname:'Sazzad Hussain',phone:'9937032785',address:'BBSR',pin:'751024' };
  loading:any;
  data:any;
  constructor(private api:ApiServiceProvider,public loadingCtrl:LoadingController,public toastCtrl:ToastController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignUpPage');
  }

  goToLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  signup(){
   
      this.loader();
     this.api.register(this.loginData).then((result) => {
     
      this.data = result;

      // alert(this.data.code);
       if(this.data.code == 401){
         this.showToast(this.data.msg);
       }else if(this.data.code == 200){
         this.navCtrl.setRoot(LoginPage);
         this.showToast(this.data.msg);
       }
       this.loading.dismiss();
     }, (err) => {
       this.loading.dismiss();
       this.showToast(this.data.msg);
       
     });

  }

  loader() {
    this.loading = this.loadingCtrl.create({
      spinner:'crescent',
      content: 'Registering...'
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
