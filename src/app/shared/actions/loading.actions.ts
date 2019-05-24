
export class ShowLoadingAction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             {
  static readonly type = '[Loading Component] show loading';
  constructor(public label: string) {}
}

export class ShowLoadingProgressAction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             {
  static readonly type = '[Loading Component] show loading progress';
  constructor() {}
}

export class UpdateLoadingLabelAction                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             {
  static readonly type = '[Loading Component] update loading label';
  constructor(public label: string) {}
}

export class HideLoadingAction {
  static readonly type = '[Loading Component] hide loading';
  constructor() {}
}

export class HideLoadingProgressAction {
  static readonly type = '[Loading Component] hide loading progress';
  constructor() {}
}

export class UpdateLoadingProgressAction {
  static readonly type = '[Loading Component] update progress';
  constructor(public progress: number) {}
}
