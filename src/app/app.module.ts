import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckboxModule } from '@angular/material/checkbox';

// ag-grid
import { AgGridModule } from 'ag-grid-angular';
import { AppComponent } from './app.component';

import { CheckboxRenderer } from './checkbox-renderer.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AgGridModule.withComponents([CheckboxRenderer]),
    MatCheckboxModule,
  ],
  declarations: [AppComponent, CheckboxRenderer],
  bootstrap: [AppComponent],
})
export class AppModule {}
