import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
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

export class LoginPage implements OnInit {
  loginform : FormGroup;
  userData = { "email": "", "password": "" };

  // Validation error messages that will be displayed for each form field with errors.
  validation_messages = {
    'email': [
      { type: 'pattern', message: 'Please enter a number like 12345678/00.' }
    ]
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, formBuilder: FormBuilder) {
    // Create the form and define fields and validators.
    this.loginform = formBuilder.group({
      loginform: ['', Validators.pattern('[0-9]{8}/[0-9]{2}')]
    });
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.loginform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
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
    this.navCtrl.push(ForgotPage);
  }

}
