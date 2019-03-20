import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
//import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
/* email: string;
password: string; */

  constructor(private Afauth: AngularFireAuth) {}
  login(email: string, password: string) {
    return new Promise((resolve, rejected) => {
      this.Afauth.auth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user);
      }).catch(err => rejected(err));
    });
  }


  forgotPass(email: string) {
    this.Afauth.auth.sendPasswordResetEmail(email).then(function() {
      //console.log('Message envoyé avec succès');
    }).catch(function(err) {
      //console.log('problème d\'envoi de message:' + err);
    });
  }

  register(email: string, password: string) {
    this.Afauth.auth.createUserWithEmailAndPassword(email, password).then(res => {
      console.log('Notre Message: ' + res);
    }).catch(err => console.log('Notre erreur: ' + err));
  }

}
