import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  searchValue: Subject<string> = new Subject;
  
  constructor() {}

}
