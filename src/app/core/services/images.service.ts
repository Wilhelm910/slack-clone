import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  imageDetailList: AngularFireList<any>;

  constructor(private firebase:AngularFireDatabase) { }

  getImageDetails() {
    this.imageDetailList = this.firebase.list('imageDetails');
  }

  insertImageDetails(imageDetails) {
    console.log(imageDetails)
    console.log(this.imageDetailList)
    this.imageDetailList.push(imageDetails);
  }
}
