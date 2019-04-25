import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';

const CONTAINERS = [];
const COMPONENTS = [];

// tslint:disable-next-line: whitespace
@NgModule({
  declarations: [
    AppComponent,
    ...CONTAINERS,
    ...COMPONENTS,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    NgxsModule.forRoot([], {developmentMode: true}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
