import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/compat/database';

@Injectable({
  providedIn: 'root'
})
export class ImagesService {

  imageDetailList: AngularFireList<any>;
  imgUrl;

  constructor(private firebase:AngularFireDatabase) { }

  getImageDetails() {
    this.imageDetailList = this.firebase.list('wilhelm/');
  }

  insertImageDetails(imageDetails) {
    this.imageDetailList = this.firebase.list('wilhelm/');
    this.imageDetailList.push(imageDetails.imageUrl);
    console.log(imageDetails)
    console.log(this.imageDetailList)
    console.log(imageDetails.imageUrl)
    this.imgUrl = imageDetails.imageUrl
  }

  showImg() {
    return this.imgUrl
  }
}
