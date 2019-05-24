import { ItemProvider } from "../models/item-provider.model";
import { Upload } from "src/app/shared/models/upload.model";

export class LoadDefaultValuesItemProviderAction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             {
  static readonly type = '[ItemProvider Component] Load default values';
  constructor() {}
}

export class SelectFieldItemProviderAction {
  static readonly type = '[ItemProvider Component] Select Field';
  constructor(public id: string) {}
}

export class LoadFieldsSuccessItemProviderAction {
  static readonly type = '[ItemProvider Component] Load Field Success';
  constructor(public fields: ItemProvider[]) {}
}

export class LoadItemProviderListAction{
  static readonly type = '[ItemProvider Component] Load List of items Success';
  constructor() {}
}

export class LoadFieldsErrorItemProviderAction {
  static readonly type = '[ItemProvider Component] Load Field Error';
  constructor(public error: any) {}
}

export class LoadListOfValuesErrorItemProviderAction {
  static readonly type = '[ItemProvider Component] Load List of values Error';
  constructor(public error: any) {}
}

export class AddItemProviderAction {                                                                                                                                                                                        
  static readonly type = '[ItemProvider Component] Add ItemProvider';
  constructor(public itemProvider: ItemProvider, public image: File) {}
}

export class EditItemProviderAction {
  static readonly type = '[ItemProvider Component] Edit ItemProvider';
  constructor(public itemProvider: ItemProvider, public image: File) {}
}

export class DeleteItemProviderAction {
  static readonly type = '[ItemProvider List Component] Delete ItemProvider';
  constructor(public idItemProvider: string) {}
}

export class SelectItemProviderToEditAction {
  static readonly type = '[ItemProvider List Component] Select ItemProvider to Edit';
  constructor(public idItemProvider: string) {}
}
