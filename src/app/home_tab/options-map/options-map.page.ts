import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { RoadMap } from '../roadMap';

interface City {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-options-map',
  templateUrl: './options-map.page.html',
  styleUrls: ['./options-map.page.scss'],
})
export class OptionsMapPage implements OnInit {
  public ionicForm: FormGroup;
  public trips: Array<RoadMap> = [];
  public locationOption: any;
  isSubmitted = false;
  public registrationForm = this.formBuilder.group({
    location: ['', Validators.required],
  });

  cities: City[] = [
    { value: 'Near', viewValue: 'Near Me' },
    { value: 'lisboa', viewValue: 'Lisbon' },
    { value: 'leiria', viewValue: 'Leiria' },
  ];

  constructor(
    public modalController: ModalController,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      location: ['', Validators.required],
    });
  }

  onChange(selectedValue: any) {
    this.ionicForm.get('location').setValue('' + selectedValue.value);
    this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      const location_value = this.ionicForm.get('location').value;

      const dismiss_data = {
        local: location_value,
      };

      this.modalController.dismiss(dismiss_data);
    }
  }

  public submit() {
    /*this.isSubmitted = true;
    if (!this.ionicForm.valid) {
      return false;
    } else {
      const location_value = this.ionicForm.get('location').value;

      const dismiss_data = {
        local: location_value,
      };

      this.modalController.dismiss(dismiss_data);
    }*/
  }

  get errorControl() {
    return this.ionicForm.controls;
  }
}
