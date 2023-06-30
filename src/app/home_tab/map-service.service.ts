import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { RoadMap, InterestPoints } from './roadMap';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import {
  Geolocation,
  GeolocationOptions,
  Geoposition,
  PositionError,
} from '@ionic-native/geolocation/ngx';
import { User } from './user';
import { map } from 'rxjs/operators';
import { Tour } from './trip-details/Tour';

interface tourData{
  id: number;
  description: string;
  price: string;
  duration: string;
  image: string;
  title: string;
  route: {
    type: string;
    coordinates: [number, number][];
  };
  arquivado: string;
  city_id: number;
  enterprise: number;
  driver: number;
}



@Injectable({
  providedIn: 'root',
})
export class MapServiceService {
  private url = '/itineary/showRoadMap/';
  private urlGetPoints = '/itineary/showItineary/';
  private urlVehicles = '/itineray/showRoadVehicles/';
  private urlGetRoadCity = '/showRoadMapsCity/';
  private urlGetRoadById = '/getRoadMapsById/'
  user: User;

  constructor(private http: HttpClient, private geolocation: Geolocation) {}

  ngOnInit() {
    this.getUserPosition();
  }

  ionViewDidEnter() {}

  private getUserPosition(): void {
    this.geolocation
      .getCurrentPosition()
      .then((res) => {
        this.user = new User(res.coords.latitude, res.coords.longitude);
      })
      .catch((error) => {});
  }

  public roads: Observable<any>;
  public interest: Observable<any>;
  public vehicles: Observable<any>;

  public getRoads(city: string): Observable<any> {
    if (city == 'Near me'){
      this.roads = this.http.post(environment.apiUrl + this.url, {
        lat: 38.72786267006623,
        lng: -9.12640841035285,
        distanciaMax: 20000,
      });
      return this.roads;
    }else{
      this.roads = this.http.get(environment.apiUrl + this.urlGetRoadCity + city);
      return this.roads;
    }
  }

  public get_points_interest(id: number): Observable<any> {
    this.interest = this.http.get(environment.apiUrl + this.urlGetPoints + id);
    return this.interest;
  }

  public get_vehicles_road(id: number): Observable<any> {
    this.vehicles = this.http.get(environment.apiUrl + this.urlVehicles + id);
    return this.vehicles;
  }

  public getRoadById(id: string): Observable<any> {
    return this.http.get<tourData>(environment.apiUrl + this.urlGetRoadById + id).pipe(map((tourData) => {
      return new Tour(
        parseInt(id),
        tourData.description,
        tourData.price,
        tourData.duration,
        tourData.image,
        tourData.title,
        tourData.route.coordinates,
        tourData.arquivado,
        tourData.city_id,
        tourData.enterprise,
        tourData.driver
      );
    }))
  }
}
