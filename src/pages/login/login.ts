import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { ForgotPage } from '../forgot/forgot';
import { SignupPage } from '../signup/signup';
import { LoginData } from '../../app/data';
import { DataService } from '../../app/data.service';

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
  providers: [LoginData, DataService]
})

export class LoginPage implements OnInit {
  loginform : FormGroup;
  userData = { "siteName": "xCoins","email": "", "password": "" };
  
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    formBuilder: FormBuilder, 
    private dataService: DataService
  ) {
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

  login() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let data = {
      siteName: "xCoins",
      login: this.loginform.get('email').value, //"test1234567",
      password: this.loginform.get('password').value //"aaaabbbb"
    }
    
    this.dataService.login(data as LoginData)
    .subscribe(
      data => {
        this.navCtrl.push(WelcomePage);
      }, error => {
        switch(error.status) {
          case 401: //Unauthoried
            break;
          case 403: //Forbidden
            break;
          case 500: //Internal error
            break;
        }
      }
    );

  }

  signup(){
    this.navCtrl.push(SignupPage);
  }

  forgot(){
    this.navCtrl.push(ForgotPage);
  }

}
