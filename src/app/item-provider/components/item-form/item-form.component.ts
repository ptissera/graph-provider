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
  uploadFile: Upload; 
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
          isGold: data.isGold,
          archivo: data.archivo
        });
      }
    });
  }

  ngOnInit() {}

  //Evento que se gatilla cuando el input de tipo archivo cambia
  public cambioArchivo(files) {
    if (files.length === 1) {      
        var reader = new FileReader();
        this.uploadFile = new Upload(files[0]);

        reader.readAsDataURL(files[0]); 
        reader.onload = (_event) => { 
          this.imgURL = reader.result; 
        }
       // this.datosFormulario.delete('archivo');
       // this.datosFormulario.append('archivo', files[0], files[0].name)
    }
  }

  //Sube el archivo a Cloud Storage
  public subirArchivo() {
    // let archivo = this.datosFormulario.get('archivo');
    // let referencia = this.firebaseStorage.referenciaCloudStorage(this.nombreArchivo);
    // let tarea = this.firebaseStorage.tareaCloudStorage(this.nombreArchivo, archivo);
    // //Cambia el porcentaje
    // tarea.percentageChanges().subscribe((porcentaje) => {
    //   this.porcentaje = Math.round(porcentaje);
    //   if (this.porcentaje == 100) {
    //     this.finalizado = true;
    //   }
    // });

    // referencia.getDownloadURL().subscribe((URL) => {
    //   this.URLPublica = URL;
    // });
  }

  createForm() {
    this.itemProviderForm = this.formBuilder.group({
        name: ['', Validators.required],
        address: ['', Validators.required],
        phone: ['', Validators.required],
        isGold: [false, Validators.required],
        archivo: [null, Validators.required]
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
      archivo: this.uploadFile,
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
      archivo: this.itemProviderForm.value.archivo,
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

