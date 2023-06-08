import { Component, EventEmitter, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  public sidebar: boolean = false;

  @Output() sender = new EventEmitter<boolean>();

  toggleSidebar() {
    if (this.sidebar == true) {
      this.sidebar = false;
    } else {
      this.sidebar = true;
    }
    this.sender.emit(this.sidebar)
  }

}
