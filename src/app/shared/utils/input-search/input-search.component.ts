import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html'
})
export class InputSearchComponent {
  
  @Output() searchTrigger = new EventEmitter<any>();

  onSearch(event:any){
    this.searchTrigger.emit(event);
  }

}
