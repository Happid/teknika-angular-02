import { Component, Input, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-toaster',
  templateUrl: './toaster.component.html'
})
export class ToasterComponent implements OnInit {

  @Input() toasterConfig:any;

  ngOnInit(): void {
    initFlowbite();//js tailwindcss
    setTimeout(()=>{
      this.toasterConfig.isShow = false;
    }, 3000)
  }

  close(){
    this.toasterConfig.isShow = false;
  }

}
