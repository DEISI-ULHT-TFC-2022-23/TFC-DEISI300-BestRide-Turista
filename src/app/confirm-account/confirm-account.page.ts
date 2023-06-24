import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../app.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { CustomTranslateService } from '../shared/services/custom-translate.service';
@Component({
  selector: 'app-confirm-account',
  templateUrl: './confirm-account.page.html',
  styleUrls: ['./confirm-account.page.scss'],
})
export class ConfirmAccountPage implements OnInit {
  ionicForm: FormGroup;
    registrationForm = this.formBuilder.group({
      code: [
        '',
        Validators.compose([Validators.minLength(7), Validators.required]),
      ],
    });
  private url: String = '/verifyAccount/';
  private url_resend: String = '/resend_code/';

  constructor(
    private comp: AppComponent,
    private formBuilder: FormBuilder,
    public alertController: AlertController,
    private http: HttpClient,
    private router: Router,
    public ct: CustomTranslateService
  ) {
    comp.hide_tab = true;
  }

  ngOnInit() {}

  public validateUser(): void {
    let code = this.registrationForm.get('code').value;
    console.log(localStorage.getItem('email'));

    const data = {
      email: localStorage.getItem('email'),
      code: '' + code,
    };
    console.log(data)
    this.http.post(environment.apiUrl + this.url, data).subscribe(
      (data) => {
        this.router.navigate(['/login']);
      },
      (error) => {
        this.showAlertError('Error', error.error);
      }
    );
  }

  public resend_code(): void {
    const data = {
      email: localStorage.getItem('email'),
    };

    this.http.post(environment.apiUrl + this.url_resend, data).subscribe(
      (data) => {
        console.log(data);
        this.showAlertError('Alert', 'Code Resended!');
      },
      (error) => {
        this.showAlertError('Error', error.error);
      }
    );
  }

  async showAlertError(header: string, msg: string) {
    console.log(this.ct.translateText(header));
    this.ct.translateText(header).subscribe((res) => {
      header = res;
    });

    this.ct.translateText(msg).subscribe((res) => {
      msg = res;
    });

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '' + header,
      message: '' + msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
}
