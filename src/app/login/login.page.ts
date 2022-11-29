import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoadingController, isPlatform, AlertController } from '@ionic/angular';
import { Plugins, registerWebPlugin } from '@capacitor/core';
//facebook login
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

//api
import { LoginApiService } from './login-api.service';
import { CriaContaApiService } from '../create-account/create-account-api.service';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AppComponent } from '../app.component';
import { InAppBrowserEvent } from '@ionic-native/in-app-browser';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  public hide = true;
  public passwordIconToggle = 'eye';
  public ionicForm: FormGroup;
  public name: string;

  //facebook
  private user = null;
  private token = null;

  //google
  private userInfo = null;
  // Form Builder -> parametros
  private profileForm = this.formBuilder.group({
    email: '',
    password: '',
  });

  public registrationForm = this.formBuilder.group({
    email: [
      '',
      Validators.compose([
        Validators.maxLength(70),
        Validators.pattern(
          '^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'
        ),
        Validators.required,
      ]),
    ],
    password: [
      '',
      Validators.compose([Validators.required, Validators.minLength(8)]),
    ],
  });

  private login_alert_text = {};
  public checked: Boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private http: HttpClient,
    private alertCtrl: AlertController,
    private loginApi: LoginApiService,
    private storage: NativeStorage,
    private comp: AppComponent,
    private account_api: CriaContaApiService,
    private iab: InAppBrowser
  ) {
    comp.hide_tab = true;
  }

  ngOnInit() {}

  public login(): void {
    if (!this.registrationForm.valid) {
      this.showDialog('Error', 'Invalid Credentials', 'Try Again');
      return;
    } else {
      let email = this.registrationForm.get('email').value;
      let password = this.registrationForm.get('password').value;
      this.loginApi.login_user(email, password, this.checked);
    }
  }

  addValue(e): void {
    this.checked = e.currentTarget.checked;
  }

  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }

  async showDialog(header, message, buttons) {
    const alert = await this.alertCtrl.create({
      header: '' + this.login_alert_text['header'],
      cssClass: 'my-custom-class',
      message: '' + this.login_alert_text['message'],
      buttons: ['' + this.login_alert_text['buttons']],
    });
    alert.present();
  }

  public createAccount(): void {
    this.router.navigate(['/create-account']);
  }

  public recover_account(): void {
    this.router.navigate(['/recover_account']);
  }

  public socialLogin(social: string): void {
    const url =
      'https://bestride.auth.us-east-2.amazoncognito.com/oauth2/authorize?' +
      'response_type=code&' +
      'identity_provider=' +
      social +
      '&' +
      'redirect_uri=' +
      environment.redirect_uri +
      '&client_id=' +
      environment.aws_client_id +
      '&' +
      'scope=email+openid+profile';

    const browser = this.iab.create(url, '_blank');
    if (browser.on('loadstart').subscribe)
      browser.on('loadstart').subscribe((e: InAppBrowserEvent) => {
        const url_code = e.url.split('?');
        if (e.url === url_code[0] + '?' + url_code[1]) {
          const code = url_code[1].split('=')[1].trim();
          browser.close();
          this.loginApi.social_sign_in(code);
        }
      });
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Please enter a valid email address' },
    ],
    password: [
      { type: 'required', message: 'Password is required' },
    ],
  };
}
