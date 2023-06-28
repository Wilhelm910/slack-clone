import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from 'src/app/core/services/auth.service';
import { LegalComponent } from '../legal/legal.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {

  ngOnInit(): void {
      
  }

  constructor(
    private firestore: AngularFirestore,
    public dialog: MatDialog,
    public authService: AuthService,
  ) { }

opened: boolean = true;
openMenu: boolean = false;

  @Output()
  sidenavToggled: EventEmitter<boolean> = new EventEmitter<boolean>();

  onSidenavToggled() {
    if(this.opened == true) {
      this.opened = false;
    } else {
      this.opened = true;
    }
    this.sidenavToggled.emit(this.opened)
  }

  openDialog() {
    this.dialog.open(EditUserComponent);
  }



}
