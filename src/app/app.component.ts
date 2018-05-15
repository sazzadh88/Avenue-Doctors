import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { MyBookingsPage } from '../pages/my-bookings/my-bookings';
import { LoginPage } from '../pages/login/login';
import { LogoutPage } from '../pages/logout/logout';
// import { LoginPage } from '../pages/login/login';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage:any;
  userData:any = {
      email : '',
      fullname : ''
  }

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    let data = JSON.parse(localStorage.getItem('user_data'));

    if(data == undefined || data == null){
        this.rootPage = LoginPage;
    }else{
        this.userData.email = data.email;
        this.userData.fullname = data.fullname;
        this.rootPage = HomePage;
    }
    
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }


  myHome(){
      this.nav.setRoot(HomePage);
  }

  myAppointments(){
      this.nav.setRoot(MyBookingsPage);
  }

  logout(){
    this.nav.setRoot(LogoutPage);
  }

  
}
