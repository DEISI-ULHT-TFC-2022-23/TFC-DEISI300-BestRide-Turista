import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { ModalController, PickerController } from '@ionic/angular';
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError,
} from '@ionic-native/geolocation/ngx';
import { InterestPoints, RoadMap } from '../roadMap';
import { MapServiceService } from '../map-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { retry } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { BookServiceService } from './book-service.service';
import { PaymentPage } from 'src/app/payment/payment.page';
import { PickerOptions } from '@ionic/core';
declare var google: any;

@Component({
  selector: 'app-modal-mapa',
  templateUrl: './book-trip-modal.page.html',
  styleUrls: ['./book-trip-modal.page.scss'],
})
export class BookTripModalPage implements OnInit {
  private ZOOM_LEVEL: number = 16.5; // Zoom do mapa
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  private map: any;
  @Input() circuito_rec: InterestPoints;
  public circuito: any;

  public isSubmitted = false;
  private interest: any;
  public vehicles: Observable<any>;
  public ionicForm: FormGroup;
  public progress: boolean = false;
  private numberPeople: number;

  constructor(
    private modalCtr: ModalController,
    private map_service: MapServiceService,
    private booking_service: BookServiceService,
    private http: HttpClient,
    public formBuilder: FormBuilder,
    private pickerCtrl: PickerController
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      dateInitial: ['', Validators.required],
      people: ['', Validators.required],
      book_hour: ['', Validators.required],
      vehicle: ['' /*Validators.required*/],
    });

    this.circuito = this.circuito;
    this.vehicles = this.map_service.get_vehicles_road(this.circuito['id']);
    setTimeout(() => {
      this.progress = true;
      this.vehicles.forEach((element) => {
        console.log(element);
      });
    }, 2000);

    console.log(this.circuito);
  }

  ionViewDidEnter() {}

  getDate(e) {
    //let date = new Date(e.target.value).toISOString().substring(0, 10);
    this.ionicForm
      .get('dateInitial')
      .setValue(this.ionicForm.get('dateInitial').value, {
        onlyself: true,
      });
  }

  getTime(e) {
    console.log(e.target.value);

    this.ionicForm
      .get('book_hour')
      .setValue(this.ionicForm.get('book_hour').value, {
        onlyself: true,
      });
  }

  public book_hour: string;

  public booking() {
    this.isSubmitted = true;

    if (!this.ionicForm.valid) {
      return;
    } else {
      const turist_id = localStorage.getItem('userID');
      const dateInitial = this.ionicForm.get('dateInitial').value;
      const book_hour = this.ionicForm.get('book_hour').value;

      const data_booking = {
        Pagamento_idPagamento: 1,
        dataViagem: dateInitial,
        turist_id: turist_id,
        trip_date: dateInitial,
        trip_time: book_hour,
        road_map_id: this.circuito.id,
        driver_id: 1,
      };
      //const response = this.booking_service.booking_trip(data_booking);
      this.openPaymentModal(
        data_booking,
        this.circuito.price,
        this.circuito.title
      );
    }
  }

  async openPaymentModal(data: any, total, name: any) {
    const modal = await this.modalCtr.create({
      component: PaymentPage,
      cssClass: 'my-custom-class',
      componentProps: {
        data: data,
        paymentAmount: total,
        tripName: name,
      },
    });
    return await modal.present();
  }

  async close() {
    const closeModal: string = 'Modal Closed';
    await this.modalCtr.dismiss(closeModal);
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async openPicker() {
    let opts: PickerOptions = {
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Confirm',
        }

      ],
      columns: [
        {
          name: 'number',
          options: [
            {text: '1',value: 1},
            {text: '2',value: 2},
            {text: '3',value: 3},
            {text: '4',value: 4},
            {text: '5',value: 5},
            {text: '6',value: 6},
            {text: '7',value: 7},
            {text: '8',value: 8},
            {text: '9',value: 9},
            {text: '10',value: 10},
            {text: '11',value: 11},
            {text: '12',value: 12},
            {text: '13',value: 13},
            {text: '14',value: 14},
            {text: '15',value: 15},
            {text: '16',value: 16},
            {text: '17',value: 17},
            {text: '18',value: 18},
            {text: '19',value: 19},
            {text: '20',value: 20},
          ],
        },
      ]
    };
    let picker = await this.pickerCtrl.create(opts);
    picker.present();
    picker.onDidDismiss().then(async data => {
      let col = await picker.getColumn('number');
      console.log(col);
      this.numberPeople = col.options[col.selectedIndex].value;
    });
  }

  get pickerValue(){
    return this.numberPeople;
  }

}
