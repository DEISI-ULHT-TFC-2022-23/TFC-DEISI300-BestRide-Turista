import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { RoadMap } from '../roadMap';
import { Subscription } from 'rxjs';
import { MapServiceService } from '../map-service.service';
import { map } from 'rxjs/operators';
import { Tour } from '../trip-details/Tour';
import { CustomTranslateService } from 'src/app/shared/services/custom-translate.service';
import { TripDetailsPage } from '../trip-details/trip-details.page';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import { BookTripModalPage } from '../book-trip-modal/book-trip-modal.page';



@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  tour: Tour;
  driver_profile_image: string;
  driver_languages: string;
  driver_name: string;
  isLoading = false;
  private tourSub: Subscription;
  constructor(
    private http: HttpClient,
    private modalCtr: ModalController,
    private navCtrl: NavController,
    private mapService: MapServiceService,
    private route: ActivatedRoute,
    private translate: CustomTranslateService,
    private alertCtrl: AlertController,
    private appComp: AppComponent,
    private router: Router,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap) => {
      if (!paramMap.has('tripId')){
        this.navCtrl.navigateBack('home_tab')
      }
      this.isLoading = true;
      this.tourSub = this.mapService.getRoadById(paramMap.get('tripId')).subscribe(
        (tour) => {
          this.tour = tour;
          this.getDriver();
        },
        (error) => {
          this.alertCtrl
            .create({
              header: 'An error ocurred!',
              message: 'Could not load place.',
              buttons: [
                {
                  text: 'Okay',
                  handler: () => {
                    this.router.navigate(['/home_tab']);
                  },
                },
              ],
            })
            .then((alertEl) => alertEl.present());
        }
      )
    })
  }

  ionViewWillEnter() {
    this.appComp.hide_tab = true;
  }

  async close() {
    const closeModal: string = 'Modal Closed';
    await this.modalCtr.dismiss(closeModal);
  }


  async openMap(tour: Tour) {
    const modal = await this.modalController.create({
      component: TripDetailsPage,
      componentProps: {
        circuito: tour.coordinates,
      },
    });
    return await modal.present();
  }

  getDriver() {
    this.http.get(environment.apiUrl + '/getDriverInfo/' + this.tour.driver).subscribe(
      (data) => {
        this.driver_profile_image = data['profile_image'];
        this.driver_languages = data['languages'];
        this.driver_name = data['name'];
        this.isLoading = false;
        console.log(this.driver_languages);
      },
      (err) => {
        console.log(err);
      }
    )
  }

  public showRoteiro(): void {
    this.presentModal(new RoadMap(
      this.tour.id,
      this.tour.title,
      this.tour.duration,
      parseInt(this.tour.price),
      this.tour.description,
      this.tour.image,
      this.tour.coordinates
    ));
  }

  //  Open the page for the trip booking
  async presentModal(road: RoadMap) {
    const modal = await this.modalController.create({
      component: BookTripModalPage,
      componentProps: {
        circuito: road,
      },
    });
    return await modal.present();
  }
}
