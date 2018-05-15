import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { LoginPage } from '../login/login';

/**
 * Generated class for the MyBookingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-bookings',
  templateUrl: 'my-bookings.html',
})
export class MyBookingsPage {
  loading:any;
  email:string;
  data:any;
  appointments:any;
  constructor(public toastCtrl:ToastController, private api:ApiServiceProvider,public loadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewCanEnter(){
    let userdata = JSON.parse(localStorage.getItem('user_data'));
    this.email = userdata.email;
    if(this.email == '' || this.email == undefined){
      this.navCtrl.setRoot(LoginPage);
    }else{
      this.loadAppointments(this.email);
    }




  }

  loader(msg) {
    this.loading = this.loadingCtrl.create({
      spinner:'crescent',
      content: msg
    });
    this.loading.present();
    
  }

  loadAppointments(email){
    this.loader('Loading Appointments');
    this.api.loadAppointments(email).then((result) => {
      
      this.data = result;
      if(this.data.code == 401){
        this.showToast('Nothing Found');
        
      }else if(this.data.code == 200){
        this.appointments = this.data.data;
      }

      this.loading.dismiss();
     
    }, (err) => {
      this.showToast('Error :(');
      this.loading.dismiss();
      
    });
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
