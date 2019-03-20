import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  //public onRegisterForm: FormGroup;
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public authService: AuthService
  ) { }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    //this.onRegisterForm = this.formBuilder.group({
      /*'fullName': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]*/
    //});
  }

  onSubmitRegister() {
    this.authService.register(this.email, this.password);
  }

  /*async signUp() {
     const {email, password} = this;
    try {
      //const res = this.signupServiceService.signUp(this.onRegisterForm['email'], this.onRegisterForm['password']);
      const res = await this.afAuth.auth.createUserWithEmailAndPassword(email , password);
      console.log(res);
    } catch (err) {
      console.dir(err);
    } */

    /* const loader = await this.loadingCtrl.create({
      duration: 2000
    }); 

    loader.present();
    loader.onWillDismiss().then(() => {
      this.navCtrl.navigateRoot('/home-results');
    });*/


  // // //
  goToLogin() {
    this.navCtrl.navigateRoot('/');
  }
}
