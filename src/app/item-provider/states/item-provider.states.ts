import { State, Store, StateContext, Action, Selector, createSelector } from '@ngxs/store';
import { state } from '@angular/animations';
import { ItemProviderFirestore } from '../services/item-provider.firestore';
import { ItemProvider } from '../models/item-provider.model';
import { AddItemProviderAction, EditItemProviderAction, DeleteItemProviderAction, SelectItemProviderToEditAction, LoadItemProviderListAction } from '../actions/item-provider.actions';
import { Navigate } from '@ngxs/router-plugin';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service';
import { ShowLoadingAction, UpdateLoadingProgressAction, UpdateLoadingLabelAction, HideLoadingAction, ShowLoadingProgressAction, HideLoadingProgressAction } from 'src/app/shared/actions/loading.actions';

export interface ItemProviderStateModel {
  itemProvider: ItemProvider,
  itemProviderList: ItemProvider[],
  selectedItemProvider: ItemProvider,
}

export const getAppInitialState = (): ItemProviderStateModel => ({
  itemProvider: null,
  itemProviderList: [],
  selectedItemProvider: null
});

@State<ItemProviderStateModel>({
  name: 'itemProvider',
  defaults: getAppInitialState()
})
export class ItemProviderState {

  routePath = '/item-provider';
  listPath = `${this.routePath}`;
  editPath = `${this.routePath}/edit`;

  constructor(private store: Store, private itemProviderFirestore: ItemProviderFirestore,
    private firebaseStorage: FirebaseStorageService) {}

  @Selector()
  static itemProviderList(state: ItemProviderStateModel) {
    return state.itemProviderList;
  }
  
  @Selector()
  static selectedItemProvider(state: ItemProviderStateModel) {
    return state.selectedItemProvider;
  }

  @Action(AddItemProviderAction)
  AddItemProviderState(ctx: StateContext<ItemProviderStateModel>, action: AddItemProviderAction) {    
    if (action.image != null) { 
      this.store.dispatch(new ShowLoadingAction('Uploading image...'));
      this.uploadImage(ctx, action.image, action.itemProvider, this.addItemProvider)    
    } else {
      this.addItemProvider(ctx, action.itemProvider);
    }
  }

  addItemProvider(ctx, itemProvider: ItemProvider) {
    const state = ctx.getState();
    this.itemProviderFirestore.create(itemProvider).then(
      res => this.store.dispatch(new HideLoadingAction()),
      error => this.store.dispatch(new HideLoadingAction())
    );
    const current = {
      itemProviderList: [...state.itemProviderList, itemProvider]
    };
    ctx.patchState({
      ...state,
      ...current
    });
    this.store.dispatch(new HideLoadingAction());
    this.store.dispatch(new Navigate([this.listPath]));
  }

  uploadImage(ctx: StateContext<ItemProviderStateModel>, file: File, itemProvider: ItemProvider, saveFunction) {
    
    const fileName = file.name;
    let referencia = this.firebaseStorage.referenciaCloudStorage(fileName);
    let tarea = this.firebaseStorage.tareaCloudStorage(fileName, file);
    
    this.store.dispatch(new ShowLoadingProgressAction());

    tarea.percentageChanges().subscribe((porcentaje) => {
      this.store.dispatch(new UpdateLoadingProgressAction(Math.round(porcentaje)));
     if (Math.round(porcentaje) == 100) {
        referencia.getDownloadURL().subscribe((URL) => {
          itemProvider.url = URL;
          this.store.dispatch(new HideLoadingProgressAction());
          this.store.dispatch(new UpdateLoadingLabelAction('Saving item provider'));
          saveFunction(itemProvider);
        });
     }
    });
  }

  @Action(EditItemProviderAction)
  EditItemProviderState(ctx: StateContext<ItemProviderStateModel>, action: EditItemProviderAction) {

    if (action.image != null) { 
      this.uploadImage(ctx, action.image, action.itemProvider, this.updateItemProvider)    
    } else {
      this.updateItemProvider(ctx, action.itemProvider);
    }
  }

  updateItemProvider(ctx: StateContext<ItemProviderStateModel>, itemProvider: ItemProvider) {
    const state = ctx.getState();
    this.itemProviderFirestore.update(itemProvider).then(
      res => this.store.dispatch(new HideLoadingAction()),
      error => this.store.dispatch(new HideLoadingAction())
    );
    const current = {
      selectedItemProvider: null
    };
    ctx.patchState({
      ...state,
      ...current
    });
    this.store.dispatch(new Navigate([this.listPath]));
  }


  @Action([])
  ErrorHandlerState(ctx: StateContext<ItemProviderStateModel>, actions) {
    console.log(actions);
  }

  @Action(DeleteItemProviderAction)
  EditItemProviderActionState(ctx: StateContext<ItemProviderStateModel>, action: DeleteItemProviderAction) {
    const state = ctx.getState();
    const current = {
      itemProviderList: [...state.itemProviderList.filter(item => item.id !== action.idItemProvider)]
    };
    ctx.patchState({
      ...state,
      ...current
    });
    this.store.dispatch(new Navigate([this.listPath]));
  }

  @Action(SelectItemProviderToEditAction)
  SelectItemProviderToEditState(ctx: StateContext<ItemProviderStateModel>, action: SelectItemProviderToEditAction) {
    const state = ctx.getState();
    const current = {
      selectedItemProvider: state.itemProviderList.filter(item => item.id === action.idItemProvider)[0]
    };
    ctx.patchState({
        ...state,
        ...current
      });
      this.store.dispatch(new Navigate([this.editPath]));
    }

    @Action(LoadItemProviderListAction)
    LoadItemProviderListState(ctx: StateContext<ItemProviderStateModel>) {
      this.itemProviderFirestore.collection$().subscribe(list => {
        const state = ctx.getState();
        const current = {
          itemProviderList: list
        };
        ctx.patchState({
          ...state,
          ...current
        });
      });
  }
}

