import { Component, OnInit } from "@angular/core";
import { DataService } from "../services/data.service";

@Component({
  selector: "app-weather-app",
  templateUrl: "./weather-app.component.html",
  styleUrls: ["./weather-app.component.scss"]
})
export class WeatherAppComponent implements OnInit {
  //getting the arrays in which the response would be written
  wheather = [];
  newWeather = [];
  todayWeather = [];
  restofTheWeekWeather = [];
  value: string = "Varna";
  cityError: string = "";
  cityErrorStatus: boolean = false;
  //getting today date
  day: string;
  month: string;
  todayDate: string;
  today = new Date();

  dd: number = this.today.getDate();
  mm: number = this.today.getMonth() + 1;
  yyyy: number = this.today.getFullYear();
  getTodayDate() {
    this.dd < 10 ? (this.day = "0" + this.dd) : (this.day = this.dd.toString());
    this.mm < 10 ? (this.month = "0" + this.mm) : (this.month = this.mm.toString());
    this.todayDate = this.yyyy + "-" + this.month + "-" + this.day;
    return this.todayDate;
  }

  getExactDayOfTheWeek() {
    let dayOfTheWeek: number = this.today.getDay();
    let nameOfTheDay: string = "";
    switch (dayOfTheWeek) {
      case 0:
        nameOfTheDay = "Sun";
        break;
      case 1:
        nameOfTheDay = "Mon";
        break;
      case 2:
        nameOfTheDay = "Tue";
        break;
      case 3:
        nameOfTheDay = "Wed";
        break;
      case 4:
        nameOfTheDay = "Thu";
        break;
      case 5:
        nameOfTheDay = "Fri";
        break;
      default:
        nameOfTheDay = "Sat";
        break;
    }
    return nameOfTheDay;
  }

  constructor(private dataService: DataService) {}

  
  GetWeatherData() {
    //sending the value of the input to the API service
    //need to add failovers
    this.dataService.onEnterCity(this.value).subscribe((data: any[]) => {
      //it returns as an object need an array
      this.wheather = [data];
      //get name of the today date
      let exactDayOfTheWeek = this.getExactDayOfTheWeek();
      //cleat the arrays
      this.newWeather.length = 0;
      this.todayWeather.length = 0;
      this.restofTheWeekWeather.length = 0;
      //writing only the data I need
      this.wheather.forEach(element => {
        let city = element.city.name;
        element.list.forEach(el => {
          this.newWeather.push({
            temp: el.main.temp,
            date: el.dt_txt,
            humidity: el.main.humidity,
            weather: el.weather[0].main,
            weather_desc: el.weather[0].description,
            wind: el.wind.speed,
            exactDayOfTheWeek: exactDayOfTheWeek,
            city: city
          });
        });
      });
      let todayDate = this.getTodayDate();
      //separate today's temperature and for the rest 5 days in order to display them on the page
      this.newWeather.forEach(el => {
        if (el.date.slice(0, 10) == todayDate) {
          this.todayWeather.push({
            temp: el.temp,
            time: el.date.slice(11),
            humidity: el.humidity,
            weather: el.weather,
            weather_desc: el.weather_desc,
            wind: el.wind
          });
        }
        if (el.date.slice(11) == "12:00:00") {
          this.restofTheWeekWeather.push({
            temp: el.temp,
            date: el.date,
            humidity: el.humidity,
            weather: el.weather,
            weather_desc: el.weather_desc,
            wind: el.wind
          });
        }
      });
      //just for test
      console.log(this.todayWeather);
      console.log(this.restofTheWeekWeather);
    });
  }

  //addEventListener
  onKeydown(event) {
    if (event.key === "Enter") {
      this.GetWeatherData();
    }
  }
 //just to see the particals 
  ngOnInit() {
    //this.GetWeatherData()
  }
}
