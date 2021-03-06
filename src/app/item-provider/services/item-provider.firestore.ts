import { Injectable } from '@angular/core';
import { ItemProvider } from '../models/item-provider.model';
import { FirestoreService } from '../../shared/states/firestore.service';

@Injectable({
    providedIn: 'root'
})
export class ItemProviderFirestore extends FirestoreService<ItemProvider> {
    protected basePath: string = 'itemProviders';
}