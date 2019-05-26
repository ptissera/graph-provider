import { Component, OnInit } from '@angular/core';
import { ItemProviderState } from 'src/app/item-provider/states/item-provider.states';
import { Select, Store } from '@ngxs/store';
import { LoadItemProviderListAction } from 'src/app/item-provider/actions/item-provider.actions';

@Component({
  selector: 'gp-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  @Select(ItemProviderState.itemProviderList)
  itemProviderList$: any
  
  constructor(private store: Store) { }

  ngOnInit() {
    this.store.dispatch(new LoadItemProviderListAction());
  }

}
