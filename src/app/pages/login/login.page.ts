import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, MenuController, ToastController, AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { GetDataService } from '../../services/get-data.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public onLoginForm: FormGroup;
  email: string;
  password: string;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private formBuilder: FormBuilder,
    public authService: AuthService,
    public getDataService: GetDataService,
  ) {
      this.onLoginForm = this.formBuilder.group({
      'email': ['', Validators.compose([
        Validators.required
      ])],
      'password': ['', Validators.compose([
        Validators.required
      ])]
    });
  }

  ionViewWillEnter() {
    this.menuCtrl.enable(false);
  }

  ngOnInit() {
    /* this.onLoginForm = this.formBuilder.group({
      'email': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required
      ])]
    }); */
    //this.getDataService.getData();
  }

  async onForgotPass() {
    const alert = await this.alertCtrl.create({
      //!!!header: 'Forgot Password?',
      // !!!message: 'Enter you email address to send a reset link password.',
      header: 'Mot de Passe oublié?',
      message: 'Entrez votre address email pour recevoir un lien de réinitialisation.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'Email'
        }
      ],
      buttons: [
        {
          //!!!text: 'Cancel',
          text: 'Annuler',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        }, {
          //!!!text: 'Confirm',
          text: 'Confirmer',
          handler: async  data => {
            this.authService.forgotPass(data.email);
          //handler: async () => {
           // const loader = await this.loadingCtrl.create({
            const loader = await this.loadingCtrl.create({
              duration: 2000,
            });
            loader.present();

            loader.onWillDismiss().then(async l => {
              const toast = await this.toastCtrl.create({
                showCloseButton: true,
                //!!!message: 'Email was sended successfully.',
                message: 'Le lien vous a été envoyé.',
                duration: 3000,
                position: 'bottom'
              });
              toast.present();
            });
          }
        }
      ]
    });
    await alert.present();
  }


  /* async signIn() {
    const { email, password } = this;
     try {
      //const res = this.signupServiceService.signUp(this.onRegisterForm['email'], this.onRegisterForm['password']);
      const res = await this.afAuth.auth.signInWithEmailAndPassword(email, password);
      console.log(res);
    } catch (err) {
      console.dir(err);
  } */

  async onLogin(loginForm: FormGroup): Promise<void> {
    this.onLoginForm = loginForm;
    if (!this.onLoginForm.valid) {
      console.log('Form is not valid yet, current value:', this.onLoginForm.value);
    } else {
      const loading = await this.loadingCtrl.create();
      await loading.present();
      const email = this.onLoginForm.value.email;
      const password = this.onLoginForm.value.password;
      this.authService.login(email, password).then(
        () => {
          loading.dismiss().then(() => {
            //this.router.navigateByUrl('home');
            this.navCtrl.navigateRoot('/about');
          });
        },
        error => {
          loading.dismiss().then(async () => {
            const alert = await this.alertCtrl.create({
              message: error.message,
              buttons: [{ text: 'Ok', role: 'cancel' }],
            });
            await alert.present();
          });
        }
      );
    }
  }

  /* onSubmitLogin() {
    this.authService.login(this.email, this.password).then(res => {
      //console.log(res);
      this.goToHome();
      //console.log(this.getAdverts());
    }).catch(err => alert('Les données sont erronées ou le user nexiste pas'));
  } */

  /* onForgotPass(){
    this.authService.forgotPass(this.email);
  } */

  // // //
  goToRegister() {
    this.navCtrl.navigateRoot('/register');
  }
  goToAbout() {
    this.navCtrl.navigateRoot('/about');
  }

  goToHome() {
    this.navCtrl.navigateRoot('/home-results');
  }

}
