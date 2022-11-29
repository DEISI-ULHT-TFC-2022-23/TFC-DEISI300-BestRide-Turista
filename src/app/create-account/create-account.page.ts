import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { CriaContaApiService } from './create-account-api.service';
import { AppComponent } from '../app.component';
import { CountryCode } from './countryCode';

@Component({
  selector: 'app-cria-conta',
  templateUrl: './create-account.page.html',
  styleUrls: ['./create-account.page.scss'],
})
export class CriaContaPage implements OnInit {
  public hide = true;
  public hide2 = true;
  public passwordIconToggle: String = 'eye';
  public passwordIconToggle2: String = 'eye';
  public ionicForm: FormGroup;

  countryCode: Array<CountryCode>;

  isSubmitted = false;

  public phoneIndicative: any = [
    {
      country: 'Portugal',
      indicative: '+351',
    },
    {
      country: 'France',
      indicative: '+33',
    },
    {
      country: 'Spain',
      indicative: '+34',
    },
    {
      country: 'United Kingdom',
      indicative: '+44',
    },
  ];

  public gender: any = [
    {
      gender: 'Male',
    },
    {
      gender: 'Female',
    },
    {
      gender: 'Rather not say',
    },
  ];

  public city: any = [
    {
      city: 'Lisbon',
    },
    {
      city: 'Sintra',
    },
  ];

  constructor(
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    private api: CriaContaApiService,
    private comp: AppComponent
  ) {
    comp.hide_tab = true;
  }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        dob: ['', Validators.required],
        phone: ['', Validators.required],
        phone_ind: ['+351', Validators.required],
        address: ['', Validators.required],
        postal: ['', Validators.required],
        gender: ['', Validators.required],
        city: ['', Validators.required],
        check: [false],
        email: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ]),
        ],
        pass: [
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{8,}).*$'
            ),
          ]),
        ],
        passRepeat: [
          '',
          Validators.compose([Validators.required, Validators.minLength(8)]),
        ],
      },
      { validator: this.matchingPasswords('pass', 'passRepeat') }
    );

    this.api.getCountryCode().subscribe((res) => {
      this.countryCode = res;
    });
  }

  matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: FormGroup): { [key: string]: any } => {
      let password = group.controls[passwordKey];
      let confirmPassword = group.controls[confirmPasswordKey];

      if (password.value !== confirmPassword.value) {
        return {
          mismatchedPasswords: true,
        };
      }
    };
  }

  getDate(e) {
    let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm.get('dob').setValue(date, {
      onlyself: true,
    });
  }

  public submit() {
    this.isSubmitted = true;

    if (!this.ionicForm.valid || !this.ionicForm.get('check').value) {
      return false;
    } else {
      const indicative = this.ionicForm.get('phone_ind').value;
      const createAccount = {
        name: this.ionicForm.get('name').value,
        dob: this.ionicForm.get('dob').value,
        phone: indicative + this.ionicForm.get('phone').value,
        address: this.ionicForm.get('address').value,
        postal: this.ionicForm.get('postal').value,
        gender: this.ionicForm.get('gender').value,
        city: this.ionicForm.get('city').value,
        email: this.ionicForm.get('email').value,
        pass: this.ionicForm.get('pass').value,
        passRepeat: this.ionicForm.get('passRepeat').value,
      };
      console.log(createAccount);

      this.api.createAccount(createAccount);
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
