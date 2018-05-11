import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatePicker } from '@ionic-native/date-picker';
import { ApiServiceProvider } from '../../providers/api-service/api-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[DatePicker]
})
export class HomePage {
  loading:any;
  date:any;
  constructor(private datePicker: DatePicker,public navCtrl: NavController, private api:ApiServiceProvider, public loadingCtrl:LoadingController) {
  }

  goLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewCanEnter(){

    // this.api.login(this.loginData).then((result) => {
    //   console.log("Success: " + JSON.stringify(result));
    //   this.data = result;
    //   if(this.data.code == 401){
    //     this.showToast('Invalid Login');
    //   }else if(this.data.code == 200){
    //     this.navCtrl.setRoot(HomePage);
    //     this.showToast('Login Successful');
    //   }
    //   this.loading.dismiss();
    // }, (err) => {
    //   this.loading.dismiss();
    //   this.showToast('Invalid Login');
      
    // });
  }
  showDatePicker(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_DARK
    }).then(
      date => this.date = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  loader() {
    this.loading = this.loadingCtrl.create({
      spinner:'crescent',
      content: 'Loading...'
    });
    this.loading.present();
    
  }

}
