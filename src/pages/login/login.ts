import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { ForgotPage } from '../forgot/forgot';
import { SignupPage } from '../signup/signup';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(){
    this.navCtrl.push(WelcomePage);
  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  forgot(){
    this.navCtrl.push(WelcomePage);
  }

}
