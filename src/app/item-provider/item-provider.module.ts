import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { ItemListComponent } from './components/item-list/item-list.component';
import { ItemFormComponent } from './components/item-form/item-form.component';
import { ItemProviderState } from './states/item-provider.states';
import { Routes, RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ClarityModule } from '@clr/angular';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadingState } from '../shared/states/loading.states';

const CONTAINERS = [];
const COMPONENTS = [ItemListComponent, ItemFormComponent];

const appRoutes: Routes = [  
  {
    path: 'item-provider',
    component: ItemListComponent    
  }, {
    path: 'item-provider/add',
    component: ItemFormComponent
  }, {
    path: 'item-provider/edit',
    component: ItemFormComponent
  }
];


// tslint:disable-next-line: whitespace
@NgModule({
  declarations: [
    ...CONTAINERS,
    ...COMPONENTS,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    ClarityModule,
    RouterModule.forRoot(appRoutes),
    NgxsRouterPluginModule.forRoot(),
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [
    RouterModule
  ]
})
export class ItemProviderModule { }
