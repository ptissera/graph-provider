import { ShowLoadingAction, HideLoadingAction, UpdateLoadingLabelAction, ShowLoadingProgressAction, HideLoadingProgressAction, UpdateLoadingProgressAction } from "../actions/loading.actions";
import { Selector, State, StateContext, Action, Store } from "@ngxs/store";

export interface LoadingStateModel {
  show: boolean,
  showProgress: boolean,
  progress: number,
  label: string
}

export const getAppInitialState = (): LoadingStateModel => ({
  show: false,
  showProgress: false,
  progress: 0,
  label: ''
});

@State<LoadingStateModel>({
  name: 'loading',
  defaults: getAppInitialState()
})
export class LoadingState {

  
  constructor(private store: Store) {}

  @Selector()
  static showLoading(state: LoadingStateModel) {
    return state.show;
  }

  @Selector()
  static showProgress(state: LoadingStateModel) {
    return state.showProgress;
  }
  
  @Selector()
  static progress(state: LoadingStateModel) {
    return state.progress;
  }

  @Selector()
  static label(state: LoadingStateModel) {
    return state.label;
  }

  @Action(ShowLoadingAction)
  ShowLoadingState(ctx: StateContext<LoadingStateModel>, action: ShowLoadingAction) {
    const state = ctx.getState();
    const current = {
      show: true,
      label: action.label || null
    };
    ctx.patchState({
      ...state,
      ...current
    });
   }

   @Action(ShowLoadingProgressAction)
   ShowLoadingProgressState(ctx: StateContext<LoadingStateModel>, action: ShowLoadingProgressAction) {
     const state = ctx.getState();
     const current = {
       showProgress: true,
       progress: 0
     };
     ctx.patchState({
       ...state,
       ...current
     });
    }

   @Action(UpdateLoadingLabelAction)
   UpdateLoadingLabelState(ctx: StateContext<LoadingStateModel>, action: UpdateLoadingLabelAction) {
    const state = ctx.getState();
    const current = {
      label: action.label
    };
    ctx.patchState({
      ...state,
      ...current
    });
   }

   @Action(UpdateLoadingProgressAction)
   UpdateLoadingProgressState(ctx: StateContext<LoadingStateModel>, action: UpdateLoadingProgressAction) {
    const state = ctx.getState();
    const current = {
      progress: action.progress
    };
    ctx.patchState({
      ...state,
      ...current
    });
   }


   @Action(HideLoadingAction)
  HideLoadingState(ctx: StateContext<LoadingStateModel>, action: HideLoadingAction) {
    const state = ctx.getState();
    const current = {
      show: false,
      showProgress: false,
      progress: 0,
      label: ''
    };
    ctx.patchState({
      ...state,
      ...current
    });
   }

   @Action(HideLoadingProgressAction)
   HideLoadingProgressState(ctx: StateContext<LoadingStateModel>, action: HideLoadingProgressAction) {
     const state = ctx.getState();
     const current = {
       showProgress: false
     };
     ctx.patchState({
       ...state,
       ...current
     });
    }
}