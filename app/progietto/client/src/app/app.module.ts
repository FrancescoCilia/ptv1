import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ShowPostComponent } from './show-post/show-post.component';
import { AddPostComponent } from './add-post/add-post.component';
import { CommonService } from './service/common.service';
import { RegistationComponent } from './registation/registation.component';

import { ProvaBattagliaComponent } from './prova-battaglia/prova-battaglia.component';
import { ScriptHackComponent } from './scripthack/scripthack.component';
import { CreazionePartitaComponent } from './creazione-partita/creazione-partita.component'
import { ChatService } from './prova-chat/prova-chat.service';



@NgModule({
  declarations: [
  RootComponent,
  LoginComponent,
  HomeComponent,
  ShowPostComponent,
  AddPostComponent,
  RegistationComponent,
  ProvaBattagliaComponent,
  ScriptHackComponent,
  CreazionePartitaComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule
  ],
  providers: [CommonService,ChatService],
  bootstrap: [RootComponent]
})
export class AppModule { }
