import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';

import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { RegistationComponent } from './registation/registation.component';

import { ProvaBattagliaComponent } from './prova-battaglia/prova-battaglia.component';
import { CreazionePartitaComponent } from './creazione-partita/creazione-partita.component';


export const AppRoutes: Routes = [
{ path: '', component: RegistationComponent},
{ path: 'login', component: LoginComponent },
{ path: 'home', component: HomeComponent },
{ path: 'prova-battaglia', component: ProvaBattagliaComponent },
{ path: 'creazione-partita', component: CreazionePartitaComponent }
];

export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
