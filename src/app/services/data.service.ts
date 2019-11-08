import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }
  //sending the request
  onEnterCity(value){
    let REST_API_SERVER = `https://api.openweathermap.org/data/2.5/forecast?q=${value}&APPID=bf98e6a4e845857ee44ab57f4f2b7526`;
    return this.httpClient.get(REST_API_SERVER)
  }
}