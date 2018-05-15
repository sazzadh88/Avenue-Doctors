import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController, IonicPage } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatePicker } from '@ionic-native/date-picker';
import { ApiServiceProvider } from '../../providers/api-service/api-service';
import { MyBookingsPage } from '../my-bookings/my-bookings';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers:[DatePicker]
})
export class HomePage {
  loading:any;
  data:any;
  timeEnable:string = "disabled";
  date:any = new Date().toJSON().slice(0,10);
  datex:any = new Date().toJSON().slice(0,10);
  
  userData = { subject:'',timeslotSelected:'', fullname : '', email : '', id : '', mobile: '', datex : this.datex,timeSlots : {}};
  constructor( private toastCtrl: ToastController,private api:ApiServiceProvider,public navCtrl: NavController, public loadingCtrl:LoadingController) {
    
  }

  goLogin(){
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewCanEnter(){
    let userdata = JSON.parse(localStorage.getItem('user_data'));
    this.userData.email = userdata.email;
    this.userData.fullname = userdata.fullname;
    this.userData.id = userdata.id;
    this.userData.mobile = userdata.mobile;
    this.changeDate();
  }
  
  changeDate(){

    this.loader('Fetching time slots...');
    this.userData.timeSlots = [];
    this.api.getSlots(this.userData.datex).then((result) => {

      this.data = result;
      if(this.data.code == 401){
        this.showToast('No slots are available');
      }else if(this.data.code == 200){
        // this.showToast("Success : " + JSON.stringify(this.data.data));
        this.userData.timeSlots = [];
        this.userData.timeSlots = this.data.data;   
        this.timeEnable = "enabled";
       
        
      }

      this.loading.dismiss();
     
    }, (err) => {
      this.showToast('Error :(');
      this.loading.dismiss();
      
    });
  }
  loader(msg) {
    this.loading = this.loadingCtrl.create({
      spinner:'crescent',
      content: msg
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

  bookSlot() {
    console.log('Btn clicked');

    this.loader('Booking...');
    this.api.bookSlots(this.userData).then((result) => {

      this.data = result;
      if(this.data.code == 401){
        this.showToast('Selected slot is not available now');
      }else if(this.data.code == 200){
        this.userData.timeslotSelected = '';
        this.navCtrl.setRoot(MyBookingsPage);
        this.showToast('Greate ! You have booked your time slot');
      }

      this.loading.dismiss();
     
    }, (err) => {
      this.showToast('Error :(');
      this.loading.dismiss();
      
    });
  }

  

  

}
