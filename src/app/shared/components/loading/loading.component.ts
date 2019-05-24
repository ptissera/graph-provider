import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { LoadingState } from '../../states/loading.states';

@Component({
  selector: 'gp-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  @Select(LoadingState.showLoading)
  show$;

  @Select(LoadingState.showProgress)
  showProgress$;

  @Select(LoadingState.progress)
  progress$;
  
  @Select(LoadingState.label)
  label$;

  constructor() { }

  ngOnInit() {
  }

}
