import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  searchValue: Subject<any> = new Subject;

  constructor(

  ) {
    this.searchValue.subscribe((value) => {
    console.log('Subscription:', value);
    
    })
   }
}
