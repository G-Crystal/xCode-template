import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { WelcomePage } from '../welcome/welcome';
import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';
import { LoginData } from '../../app/data';
import { DataService } from '../../app/data.service';
import { Message } from 'primeng/components/common/api';
import { MessageService } from 'primeng/components/common/messageservice';

/**
 * Generated class for the ForgotPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html',
  providers: [LoginData, DataService, MessageService]
})

export class ForgotPage {
  forgotform : FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    formBuilder: FormBuilder, 
    private dataService: DataService,
    private messageService: MessageService
  ) {
    // Create the form and define fields and validators.
    this.forgotform = formBuilder.group({
      forgotform: ['', Validators.pattern('[0-9]{8}/[0-9]{2}')]
    });
  }

  ngOnInit() {
    let EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    this.forgotform = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(EMAILPATTERN)])
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ForgotPage');
  }

  send() {
    let data = {
      siteName: "xCoins",
      login: "test1234567"
    }
    
    this.dataService.forgot(data as LoginData)
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

  signup() {
    this.navCtrl.push(SignupPage);
  }

}
