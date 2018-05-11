import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

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

}
