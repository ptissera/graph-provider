import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxsModule } from '@ngxs/store';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';

import { ClarityModule } from '@clr/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';

import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule, AngularFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemProviderState } from './item-provider/states/item-provider.states';
import { LeftNavMenuComponent } from './shared/components/left-nav-menu/left-nav-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ItemProviderModule } from './item-provider/item-provider.module';
import { FirestoreService } from './shared/services/firestore.service';
import { FirebaseStorageService } from './shared/services/firebase-storage.service';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { LoadingComponent } from './shared/components/loading/loading.component';
import { LoadingState } from './shared/states/loading.states';
import { LoginComponent } from './shared/components/login/login.component';
import { HeaderComponent } from './shared/components/header/header.component';

const CONTAINERS = [];
const COMPONENTS = [
  LeftNavMenuComponent,
  HomePageComponent,
  PageNotFoundComponent,
  LoadingComponent,
  LoginComponent,
  HeaderComponent
];

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent }
];

const APP_MODULES = [
  ItemProviderModule
];

// tslint:disable-next-line: whitespace
@NgModule({
  declarations: [
    AppComponent,
    ...CONTAINERS,
    ...COMPONENTS
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([ItemProviderState, LoadingState], {developmentMode: true}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AngularFireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    ReactiveFormsModule,
    ...APP_MODULES,
  ],
  providers: [
    AngularFirestore    
  ],
  exports: [
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
