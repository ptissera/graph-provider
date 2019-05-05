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
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { ItemProviderState } from './item-provider/states/item-provider.states';
import { LeftNavMenuComponent } from './shared/components/left-nav-menu/left-nav-menu.component';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './shared/components/home-page/home-page.component';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';
import { ItemProviderModule } from './item-provider/item-provider.module';

const CONTAINERS = [];
const COMPONENTS = [];

const appRoutes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: '**', component: PageNotFoundComponent }
];

const appModules = [
  ItemProviderModule
];

// tslint:disable-next-line: whitespace
@NgModule({
  declarations: [
    AppComponent,
    ...CONTAINERS,
    ...COMPONENTS,
    LeftNavMenuComponent,
    HomePageComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot([ItemProviderState], {developmentMode: true}),
    NgxsReduxDevtoolsPluginModule.forRoot(),
    NgxsLoggerPluginModule.forRoot(),
    NgxsRouterPluginModule.forRoot(),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    ReactiveFormsModule,
    ...appModules,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
