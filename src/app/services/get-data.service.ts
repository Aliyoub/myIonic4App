import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class GetDataService {

  constructor(/* private AfDatabase: AngularFireDatabase */) {}

  getData(){

    const users = firebase.database().ref().child('users');
    users.on('value', function(snapshot) {
      snapshot.forEach(function(myUsers) {
        console.log('Mes cles : ' + myUsers.key);
        console.log('Mes data snapshot : ' + myUsers.val().nom);
     });
    });
  }

}
