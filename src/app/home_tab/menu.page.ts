import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoadMap } from './roadMap';
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError,
} from '@ionic-native/geolocation/ngx';

import { BookTripModalPage } from './book-trip-modal/book-trip-modal.page';
import { ModalController } from '@ionic/angular';
import { AppComponent } from '../app.component';
import { MapServiceService } from './map-service.service';
import { AlertController } from '@ionic/angular';
import { CustomTranslateService } from '../shared/services/custom-translate.service';
import { User } from './user';
import { TripDetailsPage } from './trip-details/trip-details.page';
import { CommentTripPage } from '../comment-trip/comment-trip.page';
import { CommentsListPage } from '../comments-list/comments-list.page';
import { delay } from 'rxjs/operators';
import { DetailsPage } from './details/details.page';

declare var google: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  public selected: RoadMap;
  isLoading = false;
  user: User;
  selectedCity = 'Lisboa';
  public contentLoad = false;
  public loadedTrips: Array<RoadMap> = [];
  public searchedItem: RoadMap[];

  constructor(
    private geolocation: Geolocation,
    private router: Router,
    private appComp: AppComponent,
    private map_service: MapServiceService,
    private trans: CustomTranslateService,
    public modalController: ModalController
  ) {

    map_service.ngOnInit();
  }

  ionViewWillEnter() {
    this.appComp.hide_tab = false;
  }

  ngOnInit() {
    //this.presentModalMapDefinitions();
    this.appComp.hide_tab = false;
    this.placesInit();
  }

  ngAfterViewInit() {}

  placesInit() {
    this.isLoading = true;
    this.map_service.getRoads(this.selectedCity).subscribe((data) => {
      for (let pos in data) {
        this.loadedTrips.push(
          new RoadMap(
            data[pos].id,
            data[pos].title,
            data[pos].duration,
            data[pos].price,
            data[pos].description,
            data[pos].image,
            data[pos].route.coordinates
          )
        );
      }
      this.isLoading = false;
    });
    this.searchedItem = this.loadedTrips;
  }

  doRefresh(event) {
    this.loadedTrips = [];
    setTimeout(() => {
        this.map_service.getRoads(this.selectedCity).subscribe((data) => {
          for (let pos in data) {
            this.loadedTrips.push(
              new RoadMap(
                data[pos].id,
                data[pos].title,
                data[pos].duration,
                data[pos].price,
                data[pos].description,
                data[pos].image,
                data[pos].route.coordinates
              )
            );
          }
        });
      event.target.complete();
    }, 2000);
  }

  public showRoteiro(road: RoadMap): void {
    this.selected = road;
    this.presentModal(road);
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



  public ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.loadedTrips;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  public onCityChange(event) {
    console.log(event.source._value);
    this.loadedTrips = [];
    this.isLoading = true;
    setTimeout(() => {
      this.map_service
        .getRoads(this.selectedCity)
        .subscribe((data) => {
          for (let pos in data) {
            this.loadedTrips.push(
              new RoadMap(
                data[pos].id,
                data[pos].title,
                data[pos].duration,
                data[pos].price,
                data[pos].description,
                data[pos].image,
                data[pos].route.coordinates
              )

            );
          }
          this.isLoading = false;
          console.log(this.loadedTrips)
        });
    }, 2000);
    this.searchedItem = this.loadedTrips;
  }
}
