import { Component } from '@angular/core';
import { CreazionePartitaService } from './creazione-partita.service';
import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './creazione-partita.component.html',
  providers: [CreazionePartitaService]
})
export class CreazionePartitaComponent {
  
/*
  constructor(private CreazionePartitaService: CreazionePartitaService, private router: Router) {
    
  }
  */
 
}