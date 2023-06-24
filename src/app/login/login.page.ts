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
import { CustomTranslateService } from '../shared/services/custom-translate.service';


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
    private translate: CustomTranslateService,
    private comp: AppComponent,
    private iab: InAppBrowser
  ) {
    comp.hide_tab = true;
  }

  ngOnInit() {
    const form = document.getElementById('login_form') as HTMLFormElement;
    const submitButton = document.getElementById('btn_login') as HTMLButtonElement;
    submitButton.addEventListener('click', (event) => {
      event.preventDefault(); // Evita o comportamento padrão de envio do botão
      this.login(); // Submissão manual do formulário
    });
  }



  public login(): void {
    if (!this.registrationForm.valid) {
      console.log("Entrou")
      this.alertCtrl.create({
        header: "Error",
        message: "Invalid Credentials",
        buttons: [
          {
            text: 'Try Again'
          }
        ]
      }).then((alertEl) => {
        alertEl.present();
      });
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



  public createAccount(): void {
    this.router.navigate(['/create-account']);
  }

  public recover_account(): void {
    this.router.navigate(['/recover_account']);
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
