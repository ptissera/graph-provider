import { State, Store, StateContext, Action, Selector, createSelector } from '@ngxs/store';
import { state } from '@angular/animations';
import { ItemProviderFirestore } from '../services/item-provider.firestore';
import { ItemProvider } from '../models/item-provider.model';
import { AddItemProviderAction, EditItemProviderAction, DeleteItemProviderAction, SelectItemProviderToEditAction, LoadItemProviderListAction, UploadImageItemProviderAction } from '../actions/item-provider.actions';
import { Navigate } from '@ngxs/router-plugin';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service';

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

  @Action(UploadImageItemProviderAction)
  async UploadImageItemProviderState(ctx: StateContext<ItemProviderStateModel>, action: UploadImageItemProviderAction) {
    const file = action.upload.file;
    const fileName = action.upload.name;
    let referencia = this.firebaseStorage.referenciaCloudStorage(fileName);
    let tarea = this.firebaseStorage.tareaCloudStorage(fileName, file);
    
    await tarea.percentageChanges().subscribe((porcentaje) => {
     if (Math.round(porcentaje) == 100) {
        referencia.getDownloadURL().subscribe((URL) => {
          return URL;    
        });
     }
    });
  }

  @Action(AddItemProviderAction)
  async AddItemProviderState(ctx: StateContext<ItemProviderStateModel>, action: AddItemProviderAction) {

    const y = await this.store.dispatch(new UploadImageItemProviderAction(action.itemProvider.archivo));
    console.log()
    const file = action.itemProvider.archivo.file;
    const fileName = action.itemProvider.archivo.name;
    let referencia = this.firebaseStorage.referenciaCloudStorage(fileName);
    let tarea = this.firebaseStorage.tareaCloudStorage(fileName, file);
    //Cambia el porcentaje
    tarea.percentageChanges().subscribe((porcentaje) => {
     if (Math.round(porcentaje) == 100) {
        referencia.getDownloadURL().subscribe((URL) => {
          action.itemProvider.archivo.url = URL;
        });
     }
    });

    // const state = ctx.getState();
    // this.itemProviderFirestore.create(action.itemProvider).then(
    //   res => {
    //     console.log(res);
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    // const current = {
    //   itemProviderList: [...state.itemProviderList, action.itemProvider]
    // };
    // ctx.patchState({
    //   ...state,
    //   ...current
    // });
    // this.store.dispatch(new Navigate([this.listPath]));
  }

  @Action(EditItemProviderAction)
  EditItemProviderState(ctx: StateContext<ItemProviderStateModel>, action: EditItemProviderAction) {
    const state = ctx.getState();
    this.itemProviderFirestore.update(action.itemProvider).then(
      res => {
        console.log(res);
      },
      error => {
        console.log(error);
      }
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

