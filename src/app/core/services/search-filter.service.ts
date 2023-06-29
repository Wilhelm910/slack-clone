import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SearchFilterService {
  searchValue: string = '';
  
  constructor() {}

}
