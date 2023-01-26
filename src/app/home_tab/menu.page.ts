import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { Router } from '@angular/router';
import { RoadMap } from './roadMap';
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError,
} from '@ionic-native/geolocation/ngx';

import { OptionsMapPage } from './options-map/options-map.page';
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

declare var google: any;

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement: ElementRef;

  public selected: RoadMap;
  private distance: any;
  private currentPos: Geoposition;
  user: User;
  public contentLoad = false;
  public trips: Array<RoadMap> = [];
  public place: string;
  public searchedItem: RoadMap[];

  constructor(
    private geolocation: Geolocation,
    private router: Router,
    private model_controller: ModalController,
    private appComp: AppComponent,
    private map_service: MapServiceService,
    private trans: CustomTranslateService,
    public modalController: ModalController
  ) {
    appComp.hide_tab = false;
    map_service.ngOnInit();
  }

  ionViewWillEnter() {}

  ngOnInit() {
    //this.presentModalMapDefinitions();
    this.placesInit();
    console.log(this.searchedItem);
  }

  ngAfterViewInit() {}

  placesInit() {
    this.place = "Near Me";
    this.map_service.get_roads_near_me().subscribe((data) => {
      for (let pos in data) {
        this.trips.push(
          new RoadMap(
            data[pos].id,
            data[pos].title,
            data[pos].duration,
            data[pos].price,
            data[pos].description,
            data[pos].image,
            data[pos].location['coordinates'][0],
            data[pos].location['coordinates'][1]
          )
        );
      }
    });
    this.searchedItem = this.trips;
  }

  async presentModalMapDefinitions() {
    const modal = await this.modalController.create({
      component: OptionsMapPage,
      cssClass: 'options-map.page.scss',
    });

    modal.onDidDismiss().then((data) => {
      // Using Skeleton Text
      setTimeout(() => {
        this.place = data['data'].local;
        if (this.place == 'Near Me') {
          this.map_service.get_roads_near_me().subscribe((data) => {
            for (let pos in data) {
              this.trips.push(
                new RoadMap(
                  data[pos].id,
                  data[pos].title,
                  data[pos].duration,
                  data[pos].price,
                  data[pos].description,
                  data[pos].image,
                  data[pos].location['coordinates'][0],
                  data[pos].location['coordinates'][1]
                )
              );
            }
          });
        } else {
          this.map_service.get_roads_by_city(this.place).subscribe((data) => {
            for (let pos in data) {
              this.trips.push(
                new RoadMap(
                  data[pos].id,
                  data[pos].title,
                  data[pos].duration,
                  data[pos].price,
                  data[pos].description,
                  data[pos].image,
                  data[pos].location['coordinates'][0],
                  data[pos].location['coordinates'][1]
                )
              );
            }
          });
        }
        this.contentLoad = true;
      }, 3000);
      this.searchedItem = this.trips;
    });

    modal.present();
  }

  doRefresh(event) {
    this.trips = [];
    setTimeout(() => {
      if (this.place == 'Near Me') {
        this.map_service.get_roads_near_me().subscribe((data) => {
          for (let pos in data) {
            this.trips.push(
              new RoadMap(
                data[pos].id,
                data[pos].title,
                data[pos].duration,
                data[pos].price,
                data[pos].description,
                data[pos].image,
                data[pos].location['coordinates'][0],
                data[pos].location['coordinates'][1]
              )
            );
          }
        });
      } else {
        this.map_service.get_roads_by_city(this.place).subscribe((data) => {
          for (let pos in data) {
            this.trips.push(
              new RoadMap(
                data[pos].id,
                data[pos].title,
                data[pos].duration,
                data[pos].price,
                data[pos].description,
                data[pos].image,
                data[pos].location['coordinates'][0],
                data[pos].location['coordinates'][1]
              )
            );
          }
        });
      }
      event.target.complete();
    }, 2000);
  }

  public showRoteiro(road: RoadMap): void {
    this.selected = road;
    this.presentModal(road);
  }

  //  Open the page for the trip booking
  async presentModal(road: RoadMap) {
    const modal = await this.model_controller.create({
      component: BookTripModalPage,
      componentProps: {
        circuito: road,
      },
    });
    return await modal.present();
  }

  //  Open the page for the trip booking
  async trip_map_details(road: RoadMap) {
    const modal = await this.model_controller.create({
      component: TripDetailsPage,
      componentProps: {
        circuito: road,
      },
    });
    return await modal.present();
  }

  public async comments(road: RoadMap) {
    const modal = await this.model_controller.create({
      component: CommentsListPage,
      componentProps: {
        road_map_id: road.id,
        road_map_name: road.title,
        road_map_image: road.image,
      },
    });
    return await modal.present();
  }

  public ionChange(event) {
    const val = event.target.value;

    this.searchedItem = this.trips;
    if (val && val.trim() != '') {
      this.searchedItem = this.searchedItem.filter((item: any) => {
        return item.title.toLowerCase().indexOf(val.toLowerCase()) > -1;
      });
    }
  }

  public onCityChange(event) {
    console.log(event.source._value);
    this.trips = [];
    setTimeout(() => {
      if (event.source._value == 'Near Me') {
        this.map_service.get_roads_near_me().subscribe((data) => {
          for (let pos in data) {
            this.trips.push(
              new RoadMap(
                data[pos].id,
                data[pos].title,
                data[pos].duration,
                data[pos].price,
                data[pos].description,
                data[pos].image,
                data[pos].location['coordinates'][0],
                data[pos].location['coordinates'][1]
              )
            );
          }
        });
      } else {
        this.map_service
          .get_roads_by_city(event.source._value)
          .subscribe((data) => {
            for (let pos in data) {
              this.trips.push(
                new RoadMap(
                  data[pos].id,
                  data[pos].title,
                  data[pos].duration,
                  data[pos].price,
                  data[pos].description,
                  data[pos].image,
                  data[pos].location['coordinates'][0],
                  data[pos].location['coordinates'][1]
                )
              );
            }
          });
      }
    }, 2000);
    this.searchedItem = this.trips;
  }
}
