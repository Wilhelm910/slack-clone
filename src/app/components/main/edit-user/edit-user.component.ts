import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Storage, ref, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

  constructor(/*public storage: Storage,*/ private storage: AngularFireStorage) { }

  name;
  email;
  userData: string[] = [];
  imgURL;

  selectedFile: any = {};

  ngOnInit(): void {
    
  }

  onFileSelected(event) {
    console.log(event.target.files[0])
    this.selectedFile = event.target.files[0]
  }

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


