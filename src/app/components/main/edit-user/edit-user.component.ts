import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage, ref, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ImagesService } from 'src/app/core/services/images.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  imgSrc: string = './assets/gender.png'
  selectedImage: any = null;
  isSubmitted: boolean = false;

  formTemplate = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    imageUrl: new FormControl(''),
  })

  constructor(/*public storage: Storage,*/ private storage: AngularFireStorage, private service: ImagesService) { }

  ngOnInit(): void {

  }

  onFileSelected(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader;
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0])
      this.selectedImage = event.target.files[0]
    } else {
      this.imgSrc = './assets/gender.png';
      this.selectedImage = null;
    }
    //console.log(event.target.files[0])
    //this.selectedFile = event.target.files[0]
  }

  submit(formValue) {
    this.isSubmitted = true;
    if (this.formTemplate.valid) {
      const filePath = `${formValue.name}/${this.selectedImage.name.split('').slice(0, -1).join('.')}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize(() => {
          fileRef.getDownloadURL().subscribe((url) => {
            formValue['imageUrl'] = url;
            this.service.insertImageDetails(formValue);
          })
        })).subscribe();
    }
  }


  /*
    name;
    email;
    userData: string[] = [];
    imgURL;
  
    selectedFile: any = {};
  */
  /*
    editUser(userData) {
      this.userData = userData.value
      //this.userData.push(this.selectedFile)
      console.log(this.userData)
      console.log(this.selectedFile)
     // this.addData()
     this.addImg(this.userData)
    }
  
    addImg(userData:any) {
      const filePath = `${userData.name}/${this.selectedFile.name.split('.').slice(0,-1).join('.')}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath,this.selectedFile).snapshotChanges().pipe(
      finalize(() =>{
        fileRef.getDownloadURL().subscribe((url) => {
          this.imgURL = url;
          console.log(this.imgURL)
        })
      })).subscribe();
    }
  */
  /*
    addData() {
      const storageRef = ref(this.storage, `user_name/${this.selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, this.selectedFile);
      uploadTask.on('state_changed', (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes);
        console.log('Upload is ' + progress + '%done')
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
        })
      }
      )
    }
  */
}


