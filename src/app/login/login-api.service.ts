import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NativeStorage } from '@ionic-native/native-storage/ngx';

@Injectable({
  providedIn: 'root',
})
export class LoginApiService {
  //endpoint da Api
  private url: String = '/users/';
  private url_info: String = '/userInfo/';
  private url_add_turist: String = '/userInfo/add_to_turist_role';
  private url_login: String = '/login/';
  private url_get_user_id: String = '/getUserid/';
  private isLoggedin = false; //TODO ALTERAR

  constructor(
    private http: HttpClient,
    private router: Router,
    public alertController: AlertController,
    private nativeStorage: NativeStorage
  ) {}

  public login_user(email: String, password: String, login_automatic: Boolean) {
    let data = {
      email: email,
      password: password,
    };

    this.http.post(environment.apiUrl + this.url_login, data).subscribe(
      (data) => {
        console.log(data)
        localStorage.setItem(
          'token',
          data['token']
        );

        //Login made it !!

        if (login_automatic) {
          localStorage.setItem('automatic_login', 'true');
        }

        //get user id
        this.http
          .get(environment.apiUrl + this.url_get_user_id + email)
          .subscribe(
            (elem) => {
              localStorage.setItem('userID', elem[0].iduser);
              localStorage.setItem('isSocialLogin', 'false');
            },
            (erro) => {
              console.log(erro);
            }
          );
        this.isLoggedin = true;
        this.router.navigate(['/home_tab']);
      },
      (error) => {
        this.showAlert('Invalid Credentials', error['error'], 'Try Again');
      }
    );
  }

  public async social_sign_in(code: string) {
    const post_url =
      'https://bestride.auth.us-east-2.amazoncognito.com/oauth2/token?' +
      'grant_type=authorization_code&client_id=' +
      environment.aws_client_id +
      '&code=' +
      code +
      '&redirect_uri=' +
      environment.redirect_uri;

    const result = await this.http
      .post(
        post_url,
        {},
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      )
      .subscribe(
        (response) => {
          console.log('OK....');
          console.log(response['access_token']);
          localStorage.setItem('token', response['access_token']);
          localStorage.setItem('isSocialLogin', 'true');
          this.router.navigate(['/home_tab']);
        },
        (err) => {
          console.log('Erro');
        }
      );
  }

  async showAlert(header: string, message: string, button_text: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: [button_text],
    });

    await alert.present();
  }

  public isAuthenticated(){
    return this.isLoggedin;
  }
}
