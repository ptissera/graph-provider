import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { AddItemProviderAction, EditItemProviderAction } from 'src/app/actions/item-provider.actions';
import { ItemProviderState } from 'src/app/states/item-provider.states';

@Component({
  selector: 'app-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.sass']
})
export class ItemFormComponent implements OnInit {

  @Select(ItemProviderState.selectedItemProvider)
  selectedItemProvider;

  selectedId = null;

  itemProviderForm;

  
  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.createForm();
    this.selectedId = null;
    this.selectedItemProvider.subscribe((data) => {
      if (data) {
        this.selectedId = data.id;
        this.itemProviderForm.patchValue({
          name: data.name,
          address: data.address,
          phone: data.phone,
          isGold: data.isGold
        });
      }
    });
  }

  ngOnInit() {}

  createForm() {
    this.itemProviderForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        isGold: [false, Validators.required]
      });
}


  cancel() {
    this.clearForm();
  }

  async add() {    
    this.itemProviderForm.disable();
    await this.store.dispatch(new AddItemProviderAction({
      name: this.itemProviderForm.value.name,
      address: this.itemProviderForm.value.address, 
      phone: this.itemProviderForm.value.phone,
      isGold: this.itemProviderForm.value.isGold || false,
      id: null
    }));
    this.clearForm();
  }

  edit() {
    this.store.dispatch(new EditItemProviderAction({
      name: this.itemProviderForm.value.name,
      address: this.itemProviderForm.value.address, 
      phone: this.itemProviderForm.value.phone,
      isGold: this.itemProviderForm.value.isGold || false,
      id: this.selectedId
    })).subscribe(() => {
      this.clearForm();
    });
  }

  private clearForm() {
    this.itemProviderForm.reset();
    this.itemProviderForm.enable();
    this.selectedId = null;
  }
}

