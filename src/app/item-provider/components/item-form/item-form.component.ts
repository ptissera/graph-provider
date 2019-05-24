import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Store, Select } from '@ngxs/store';
import { ItemProviderState } from '../../states/item-provider.states';
import { AddItemProviderAction, EditItemProviderAction } from '../../actions/item-provider.actions';
import { Navigate } from '@ngxs/router-plugin';
import { FirebaseStorageService } from 'src/app/shared/services/firebase-storage.service';
import { Upload } from 'src/app/shared/models/upload.model';

@Component({
  selector: 'gp-item-form',
  templateUrl: './item-form.component.html',
  styleUrls: ['./item-form.component.scss']
})
export class ItemFormComponent implements OnInit {

  @Select(ItemProviderState.selectedItemProvider)
  selectedItemProvider;

  selectedId = null;
  itemProviderForm;
  uploadFile: File; 
  imgURL: any;
  
  constructor(private store: Store, private formBuilder: FormBuilder,
    private firebaseStorage: FirebaseStorageService) {
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
        this.imgURL = data.url;
      }
    });
  }

  ngOnInit() {}

  public fileChange(files) {
    if (files.length === 1) {      
      this.loadImage(files[0]);
    }
  }

  loadImage(file) {
    var reader = new FileReader();
    this.uploadFile = file;

    reader.readAsDataURL(file); 
    reader.onload = (_event) => { 
      this.imgURL = reader.result; 
    }
  }

  createForm() {
    this.itemProviderForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        isGold: [false, Validators.required],
        image: [null]
      });
  }

  cancel() {
    this.clearForm();
    this.store.dispatch(new Navigate(['/item-provider']));
  }

  async add() {    
    this.itemProviderForm.disable();
    await this.store.dispatch(new AddItemProviderAction({
      name: this.itemProviderForm.value.name,
      address: this.itemProviderForm.value.address, 
      phone: this.itemProviderForm.value.phone,
      isGold: this.itemProviderForm.value.isGold || false,    
      url: null,  
      id: null
    }, this.uploadFile));
    this.clearForm();
  }

  edit() {
    this.store.dispatch(new EditItemProviderAction({
      name: this.itemProviderForm.value.name,
      address: this.itemProviderForm.value.address, 
      phone: this.itemProviderForm.value.phone,
      isGold: this.itemProviderForm.value.isGold || false,
      url: this.imgURL,
      id: this.selectedId
    }, this.uploadFile)).subscribe(() => {
      this.clearForm();
    });
  }

  private clearForm() {
    this.itemProviderForm.reset();
    this.itemProviderForm.enable();
    this.selectedId = null;
  }
}

