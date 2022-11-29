import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { CustomTranslateService } from '../shared/services/custom-translate.service';
import { Observable } from 'rxjs';
import { CountryCode } from './countryCode';

@Injectable({
  providedIn: 'root',
})
export class CriaContaApiService {
  private url: String = '/users/';
  private url_info: String = '/userInfo/';
  private url_create_user_db = '/saveUser/';
  private url_add_turist: String = '/userInfo/add_to_turist_role';

  constructor(
    private http: HttpClient,
    private router: Router,
    private modalController: ModalController,
    public alertController: AlertController,
    public ct: CustomTranslateService
  ) {}

  public createAccount(data_dict): void {
    let postDataInfo = {
      email: data_dict['email'],
      name: data_dict['name'],
      dob: data_dict['dob'],
      city: data_dict['city'],
      gender: data_dict['gender'],
      phone_number: data_dict['phone'],
      adress: data_dict['address'],
      postal_code: data_dict['postal'],
      password: data_dict['pass'],
    };

    this.http.post(environment.apiUrl + this.url, postDataInfo).subscribe(
      (data) => {
        localStorage.setItem('email', data_dict['email']);
        this.http
          .post(environment.apiUrl + this.url_create_user_db, {
            email: data_dict['email'],
            image: '',
          })
          .subscribe(
            (data) => {},
            (error) => {
              console.log(error);
            }
          );

        this.router.navigate(['/confirm-account']);
      },
      (error) => {
        this.showAlertError('Error', error.error);
      }
    );
  }

  public criaContaGoogle(dados_dict: any): void {
    let postData = {
      password: dados_dict['password'],
      login_type: '1',
    };

    console.log(dados_dict);
    this.http.post(environment.apiUrl + this.url, postData).subscribe(
      (data) => {
        let id_user = data['iduser'];

        let postRoles = {
          user_iduser: id_user,
          roles_id_roles: 0,
        };
        //guarda em user_roles
        this.http
          .post(environment.apiUrl + this.url_add_turist, postRoles)
          .subscribe(
            (data) => {},
            (error) => {}
          );

        let postDataInfo = {
          user_iduser: id_user,
          email: dados_dict['dados_email'],
          name: dados_dict['dados_nome'],
          dob: null,
          city: null,
          gender: null,
          phone_number: null,
          adress: null,
          postal_code: null,
        };
        //guardar em userInfo
        this.http
          .post(environment.apiUrl + this.url_info, postDataInfo)
          .subscribe(
            (data) => {
              this.router.navigate(['/home_tab']);
            },
            (error) => {}
          );
      },
      (error) => {}
    );
  }

  public getCountryCode(): Observable<CountryCode[]> {
    return this.http.get<CountryCode[]>('./../assets/countries_phone.json');
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
