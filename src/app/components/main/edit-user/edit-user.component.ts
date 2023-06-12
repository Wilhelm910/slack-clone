import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {

  name;
  email;

  selectedFile = null;

  onFileSelected(event) {
    console.log(event)
    this.selectedFile = event.target.files[0]
  }

  editUser() {

  }

}
