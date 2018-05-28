import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { WelcomePage } from '../welcome/welcome';
import { ForgotPage } from '../forgot/forgot';
import { SignupPage } from '../signup/signup';
import { LoginData } from '../../app/data';
import { DataService } from '../../app/data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

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
  providers: [LoginData, DataService, MessageService]
})

export class LoginPage implements OnInit {
  loginform : FormGroup;
  userData = { "siteName": "xCoins","email": "", "password": "" };
  msgs: Message[] = [];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    formBuilder: FormBuilder, 
    private dataService: DataService,
    private messageService: MessageService
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
    this.msgs = [];

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
            this.messageService.add({severity:'error', summary:error.statusText, detail:'Email / password combination is not valid. Please try again'});
            break;
          case 403: //Forbidden
            this.messageService.add({severity:'error', summary:error.statusText, detail:error.message});
            break;
          case 500: //Internal error
            this.messageService.add({severity:'error', summary:error.statusText, detail:error.message});
            break;
          default:
            this.messageService.add({severity:'error', summary:error.statusText, detail:'It may be busy or temporarily unavailable.'});
            break;
        }
        this.msgs.push({severity:'error', summary:'Error Message', detail:'Validation failed'});
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
