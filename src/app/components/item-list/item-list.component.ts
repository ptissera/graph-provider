import { Component, OnInit } from '@angular/core';
import { ItemProviderState } from 'src/app/states/item-provider.states';
import { Select, Store } from '@ngxs/store';
import { LoadItemProviderListAction, SelectItemProviderToEditAction, DeleteItemProviderAction } from 'src/app/actions/item-provider.actions';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.sass']
})
export class ItemListComponent implements OnInit {

  @Select(ItemProviderState.itemProviderList)
  itemProviderList$

  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadItemProviderListAction());
  }

  edit(id: string) {
    this.store.dispatch(new SelectItemProviderToEditAction(id));
  }

  delete(id: string) {
    this.store.dispatch(new DeleteItemProviderAction(id));
  }

}
