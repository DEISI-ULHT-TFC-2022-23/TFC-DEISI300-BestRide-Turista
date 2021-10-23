import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { InterestPoints, RoadMap } from '../roadMap';
import { MapServiceService } from '../map-service.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

declare var google: any;

import * as Leaflet from 'leaflet';
import { antPath } from 'leaflet-ant-path';

@Component({
  selector: 'app-trip-details',
  templateUrl: './trip-details.page.html',
  styleUrls: ['./trip-details.page.scss'],
})
export class TripDetailsPage implements OnInit {
  private ZOOM_LEVEL: number = 16.5; // Zoom do mapa
  @ViewChild('map', { static: false }) mapElement: ElementRef;
  //private map: any;
  map: Leaflet.Map;
  @Input() circuito_rec: InterestPoints;
  public circuito: any;
  public language: string = this.translate.currentLang;
  propertyList = [];
  private interest: Array<any> = [];

  constructor(
    private modalCtr: ModalController,
    private translate: TranslateService,
    private map_service: MapServiceService,
    private http: HttpClient,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  ionViewDidEnter() {
    this.map = new Leaflet.Map('mapId').setView(
      [this.circuito.lat, this.circuito.lng],
      16
    );

    const leaf_icon = Leaflet.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    });

    Leaflet.marker([this.circuito.lat, this.circuito.lng], { icon: leaf_icon })
      .addTo(this.map)
      .openPopup();

    Leaflet.tileLayer(
      'http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',
      {
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        attribution: 'BestRide.com',
      }
    ).addTo(this.map);

    this.loadingCtrl
      .create({
        duration: 2500,
      })
      .then((response) => {
        response.present();
        /* Background Processing */
        fetch('./assets/data.json')
          .then((res) => res.json())
          .then((data) => {
            this.propertyList = data.properties;
            //this.leafletMap();
          })
          .catch((err) => console.error(err));
        this.circuito = this.circuito;
        this.map_service
          .get_points_interest(/*this.circuito['id']*/ 1)
          .subscribe((data) => {
            for (let pos in data) {
              this.interest.push(
                new InterestPoints(
                  data[pos]['interest_points'].description,
                  data[pos]['interest_points'].location['coordinates'][0],
                  data[pos]['interest_points'].location['coordinates'][1],
                  data[pos]['interest_points'].image
                )
              );
            }
          });
        response.onDidDismiss().then((response) => {
          /* Data */
        });
      });
  }

  private leafletMap() {
    const leaf_icon = Leaflet.icon({
      iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
    });

    for (const property of this.propertyList) {
      Leaflet.marker([property.lat, property.long], { icon: leaf_icon })
        .addTo(this.map)
        .bindPopup(property.city)
        .openPopup();
    }
  }

  /** Remove map when we have multiple map object */
  ngOnDestroy() {
    this.map.remove();
  }

  async close() {
    const closeModal: string = 'Modal Closed';
    await this.modalCtr.dismiss(closeModal);
  }
  /*
  private showMap(road: RoadMap, points: Array<InterestPoints>): void {
    const lat_initial = road.lat;
    const lng_initial = road.lng;

    const location = new google.maps.LatLng(lat_initial, lng_initial);

    const options = {
      center: location,
      zoom: this.ZOOM_LEVEL,
      disableDefaultUI: false,
      mapTypeId: google.maps.MapTypeId.TERRAIN,
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, options);

    const flightPlanCoordinates = [];
    //    Add markers to the map
    for (let pos in points) {
      flightPlanCoordinates.push(points[pos].lat, points[pos].lng);
      let posMarker = new google.maps.LatLng(points[pos].lat, points[pos].lng);

      let marker = new google.maps.Marker({
        map: this.map,
        position: posMarker,
        animation: 'DROP',
        title: this.circuito.title,
        latitude: points[pos].lat,
        longitude: points[pos].lng,
      });

      let content =
        '<p> ' +
        points[pos].title +
        '</p>' +
        '<img style="width:50%;height:25%" src="' +
        points[pos].image +
        '"</img>';
      let infoWindow = new google.maps.InfoWindow({
        content: content,
      });

      google.maps.event.addListener(marker, 'click', () => {
        infoWindow.open(this.map, marker);
      });
    }
  }*/
}
