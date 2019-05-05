import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ItemProviderState } from '../../states/item-provider.states';
import { LoadItemProviderListAction, SelectItemProviderToEditAction, DeleteItemProviderAction } from '../../actions/item-provider.actions';
import { Navigate } from '@ngxs/router-plugin';

@Component({
  selector: 'gp-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.scss']
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

  add() {
    this.store.dispatch(new Navigate(['/item-provider/add']));
  }

}
