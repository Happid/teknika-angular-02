import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './utils/button/button.component';
import { SpinnerComponent } from './utils/spinner/spinner.component';
import { InputSearchComponent } from './utils/input-search/input-search.component';
import { HttpClientModule } from '@angular/common/http';
import { ToasterComponent } from './utils/toaster/toaster.component';


@NgModule({
  declarations: [
    SpinnerComponent,
    ButtonComponent,
    InputSearchComponent,
    ToasterComponent
  ],
  exports: [
    SpinnerComponent,
    ButtonComponent,
    InputSearchComponent,
    ToasterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule
  ]
})
export class SharedModule { }
