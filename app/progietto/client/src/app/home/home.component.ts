import { Component, ViewChild, ElementRef, OnInit } from "@angular/core";
import { CommonService } from "../service/common.service";
import { Router } from "@angular/router";
import { homeService } from "./home.service";
import { User } from '../models/user.model';
import { ChatService } from "../prova-chat/prova-chat.service";



@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: [homeService]
})
export class HomeComponent {
  @ViewChild("addPost")
  addBtn: ElementRef;

  public lista;


  public user: User;
  private token;
  constructor(private commonService: CommonService, private router: Router, private homeService: homeService,private chatservice:ChatService) {
    this.user = new User();
    // chatservice.inviaAlServer("ghesborooo");
    if (!localStorage.getItem("loggedInUser")) {
      this.router.navigate(["/"]);
    }

    //alert('username '+localStorage.getItem("loggedInUser"));
    this.user.username = localStorage.getItem("loggedInUser");
    this.commonService.postEdit_Observable.subscribe(res => {
      this.addBtn.nativeElement.click();
    });
    this.token = localStorage.getItem('token');

  }

ngOnInit(){

  /* Comunico al server che voglio ricevere la lista degli utenti online */

  this.invioAlServer();

  /*  Ricevo dal server la lista degli utenti online (Ogni volta che un utente crea un socket) */
  this.chatservice.ricevoDalServer().subscribe((listaUtenti: String[])=>{
    console.log("ricevo dal server:");
    for(var i=0;i<listaUtenti.length;i++){
      console.log(listaUtenti[i]);
    }
    this.lista = listaUtenti;
  });
  

  /* Comunico al server che voglio ricevere la lista delle partite aperte */
  this.ricevoListaPartite();

  
  console.log("[ho appena chiamato riceviListaPartite]");

  /* Ricevo dal server la lista delle partite aperte (Ogni volta che un utente crea una partita) */ 
  
  this.chatservice.ricevoDalServerListaPartite().subscribe((listaPartite)=>{
    console.log("ricevo dal server LE PARTITE:");
    for(var i=0;i<listaPartite.length;i++){
      // utentiPartiteMap[i].nomeStanza === partita
      
      if(listaPartite[i].creatore === this.user.username){
        console.log("Questa partita la ho creata io: "+listaPartite[i].nome+" caput");
      }
      else{
        console.log(listaPartite[i].nome);
      }
      
    }
  });
  
  
}


  joinPartita(idPartita){
    
  }

  invioAlServer(){
    this.chatservice.invioAlServer(this.token);

  }

  ricevoListaPartite(){
    this.chatservice.ricevoListaPartite();
  }

  creaPartita(){
    /* invio a broadcast la lista delle partite aperte (+ la nuova appena creata) */
    this.chatservice.creaPartita(this.user.username);
  }

  eliminaPartita(){
    this.chatservice.eliminaPartita(this.token);
  }

  provaUnione(){
    this.chatservice.provaUnione("waitingRoom0");
  }


  logout() {

    this.chatservice.cancellaUtenteOnline(this.token);
      alert('il valore esiste'+localStorage.getItem("isOnline"));
      this.homeService.updateIsOnlineToFalse(this.user).subscribe(res => { }); //MODIFICA
      localStorage.removeItem("loggedInUser");
      this.router.navigate(['/']);

  }
}
