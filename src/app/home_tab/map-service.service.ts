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

@Injectable({
  providedIn: 'root',
})
export class MapServiceService {
  private url = '/itineary/showRoadMap/';
  private urlGetPoints = '/itineary/showItineary/';
  private urlVehicles = '/itineray/showRoadVehicles/';
  private urlGetRoadCity = '/showRoadMapsCity/';
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

  public get_roads_near_me(): Observable<any> {
    this.roads = this.http.post(environment.apiUrl + this.url, {
      lat: 38.72786267006623,
      lng: -9.12640841035285,
      distanciaMax: 20000,
    });
    return this.roads;
  }

  public get_roads_by_city(city: string): Observable<any> {
    this.roads = this.http.get(environment.apiUrl + this.urlGetRoadCity + city);
    return this.roads;
  }

  public get_points_interest(id: number): Observable<any> {
    this.interest = this.http.get(environment.apiUrl + this.urlGetPoints + id);
    return this.interest;
  }

  public get_vehicles_road(id: number): Observable<any> {
    this.vehicles = this.http.get(environment.apiUrl + this.urlVehicles + id);
    return this.vehicles;
  }
}
