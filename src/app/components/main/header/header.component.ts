import { Component, OnInit } from '@angular/core';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/core/services/auth.service';
import { SearchFilterService } from 'src/app/core/services/search-filter.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']

})
export class HeaderComponent implements OnInit {
  inputValue: string;

  ngOnInit(): void {

  }

  constructor(
    public dialog: MatDialog,
    public authService: AuthService,
    public searchService: SearchFilterService,
  ) { }

  openDialog() {
    this.dialog.open(EditUserComponent);
  }


  onSearch(value) {
    this.searchService.searchValue.next(value)
  }
}

