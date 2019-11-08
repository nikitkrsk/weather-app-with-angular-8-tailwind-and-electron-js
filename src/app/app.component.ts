import { Component, OnInit } from "@angular/core";
import { DataService } from "./services/data.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  myStyle: object = {};
myParams: object = {};
width: number = 100;
height: number = 100;

  ngOnInit() {
      this.myStyle = {
          'position': 'fixed',
          'width': '100%',
          'height': '100%',
          'z-index': -1,
          'top': 0,
          'left': 0,
          'right': 0,
          'bottom': 0,
      };

this.myParams = {
          particles: {
              number: {
                  value: 80,
                  "density.enable": true
              },
              color: {
                  value: '#313131'
              },
              shape: {
                  type: 'circle',
              },
              line_linked:{
                color: '#313131'
              }
    }
};
  }
}