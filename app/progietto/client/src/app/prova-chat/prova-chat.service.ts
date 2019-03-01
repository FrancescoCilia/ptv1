
import * as io from 'socket.io-client';

import { Observable } from 'rxjs/Observable';


export class ChatService {
    private url = 'http://localhost:3001';
    private socket;
    private token;

    constructor() {
        this.socket = io(this.url);
        this.token = localStorage.getItem('token');
    }

    invioAlServer(str: String){
        this.socket.emit("message",str);
        /*
        console.log("                  Ricevo le partite dal SERVER");
        this.socket.emit("ricevoPartite", str);
        */
    }

    // socket.on("ricevoPartite", function(tokenUtente) {
    ricevoListaPartite(){
        this.socket.emit("ricevoPartite",this.token);
    }

    eliminaPartita(mtoken: String){
        this.socket.emit("eliminaPartita", this.token);
    }

    creaPartita(username: String){
        console.log("CREO PARTITA token: "+this.token);
        this.socket.emit("creaPartita", this.token);
    }
    cancellaUtenteOnline(username: String){
        this.socket.emit("cancellaUtenteOnline", username);
    }

    joinPartita(idPartita){
        
    }


    provaUnione(stanza: String){
        this.socket.emit("joinPartita", this.token, stanza);
        
    }

    public ricevoDalServer = () => {
        return Observable.create((observer) => {
            this.socket.on('listaUtentiOnline', (message) => {
                /*
                for(var i=0;i<message.length;i++){
                    console.log("utente: "+message[i]);
                }
                */
                observer.next(message);
            });

        });
    }

    public ricevoDalServerListaPartite = () =>{
        return Observable.create((observer)=>{
            this.socket.on('listaPartite',(message)=>{
                observer.next(message);
            });
        });
    }

/*
    public ricevoDalServer = () => {

            this.socket.on('listaUtentiOnline', (message) => {

                console.log("--------------------------------------");
                //console.log("ho ricevuto dal server la lista degli utenti: "+message);
                for(var i=0;i<message.length;i++){
                    console.log("Utente: "+message[i]);
                }
            });

    }
   */
}
