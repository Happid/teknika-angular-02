import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html'
})
export class ButtonComponent implements OnInit{
  @Input() buttonConfig:any;
  @Output() btnTringger = new EventEmitter<any>();
  
  constructor(){}

  ngOnInit(): void {
  }

  clickBtn(){
    console.log('ok');
    this.btnTringger.emit();
  }
}
