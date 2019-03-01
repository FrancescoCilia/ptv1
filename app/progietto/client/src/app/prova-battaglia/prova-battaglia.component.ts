import { Component, ViewChild, ElementRef } from "@angular/core";
import { CommonService } from "../service/common.service";
import { Router } from "@angular/router";
// import { LoginService } from './login.service';
import { provabattagliaService } from './prova-battaglia.service';


@Component({
  selector: "app-prova-battaglia",
  templateUrl: "./prova-battaglia.component.html",
  providers: [provabattagliaService]
})

export class ProvaBattagliaComponent {
  ngOnInit(){
    //window.open("http://localhost:8900/?configurazione=a&foo=provafoo&diosanto=osvaldo", "_blank");
    var username = localStorage.getItem("loggedInUser");
    window.open("http://localhost:8900/index2.html"+"?username="+username);
    // http://localhost:8900/index2.html?configurazione=a&foo=provafoo&diosanto=osvaldo
  }
}