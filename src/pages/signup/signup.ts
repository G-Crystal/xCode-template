import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WelcomePage } from '../welcome/welcome';
import { LoginPage } from '../login/login';
import { ForgotPage } from '../forgot/forgot';
import { LoginData } from '../../app/data';
import { DataService } from '../../app/data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
  providers: [LoginData, DataService, MessageService]
})

export class SignupPage {
  signupform : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    formBuilder: FormBuilder, 
    private dataService: DataService,
    private messageService: MessageService
  ) {
    // Create the form and define fields and validators.
    this.signupform = formBuilder.group({
      signupform: ['', Validators.pattern('[0-9]{8}/[0-9]{2}')]
    });
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.signupform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      cfm_password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  signup() {
    let data = {
      siteName: "xCoins",
      login: "test1234567",
      password: this.signupform.get('password').value //"aaaabbbb"
    }
    
    this.dataService.signup(data as LoginData)
    .subscribe(
      data => {
        this.navCtrl.push(WelcomePage);
      }, error => {
        switch(error.status) {
          case 401: //Unauthoried
            this.messageService.add({severity:'warn', summary:error.statusText, detail:'Email / password combination is not valid. Please try again'});
            break;
          case 403: //Forbidden
            this.messageService.add({severity:'warn', summary:error.statusText, detail:error.message});
            break;
          case 500: //Internal error
            this.messageService.add({severity:'warn', summary:error.statusText, detail:'It may be busy or temporarily unavailable.'});
            break;
          default:
            this.messageService.add({severity:'warn', summary:error.statusText, detail:error.message});
            break;
        }
      }
    );
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  forgot() {
    this.navCtrl.push(ForgotPage);
  }

}
