import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

let apiUrl = 'https://avenuedoctors.co.uk/api/'

@Injectable()
export class ApiServiceProvider {


  constructor(public http: Http) {
   
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+'login.php', JSON.stringify(credentials), { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  register(userData){
      return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+'register.php', JSON.stringify(userData), { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }
  

  loadAppointments(email) {
    return new Promise((resolve, reject) => {
        let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+'myappointments.php', JSON.stringify({email:email}), { headers: headers })
          .subscribe(res => {
            resolve(res.json());
          }, (err) => {
            reject(err);
          });
    });
  }

  test(userData){
    console.log("Tets from api service");
    let headers = new Headers();
        headers.append('Content-Type', 'application/json');
        this.http.post(apiUrl+'book.php', JSON.stringify(userData), { headers: headers })
          .subscribe(res => {
            console.log(res.json());
          }, (err) => {
            console.log(err);
          });
  }

  bookSlots(userData){
    console.log('Called api');
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      // headers.append('Content-Type', 'application/x-www-form-urlencoded');
      this.http.post(apiUrl+'book.php', JSON.stringify(userData), { headers: headers })
      .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  getSlots(date){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      headers.append('Content-Type', 'application/json');
      this.http.post(apiUrl+'gettime.php', JSON.stringify({date:date}), { headers: headers })
        .subscribe(res => {
          resolve(res.json());
        }, (err) => {
          reject(err);
        });
    });
  }

  // loggetin(credentials) {
  //   return new Promise((resolve, reject) => {
  //       let headers = new Headers();
  //       headers.append('Content-Type', 'application/json');
  //       this.http.post(apiUrl+'login.php', JSON.stringify(credentials), { headers: headers })
  //         .subscribe(res => {
  //           resolve(res.json());
  //         }, (err) => {
  //           reject(err);
  //         });
  //   });
  // }

}
