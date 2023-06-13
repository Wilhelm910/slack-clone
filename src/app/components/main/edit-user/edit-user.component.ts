import { Component } from '@angular/core';
import { Storage, ref, getDownloadURL, uploadBytesResumable } from '@angular/fire/storage'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  constructor(public storage: Storage) { }

  name;
  email;
  userData: string[] = [];

  selectedFile: any = {};

  onFileSelected(event) {
    console.log(event.target.files[0])
    this.selectedFile = event.target.files[0]
  }

  editUser(userData) {
    this.userData = userData.value
    //this.userData.push(this.selectedFile)
    console.log(this.userData)
    console.log(this.selectedFile)
    this.addData()
  }


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

}


