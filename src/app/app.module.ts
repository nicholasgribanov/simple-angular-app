import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {FormsModule} from '@angular/forms';
import { NotesComponent } from './notes/notes.component';
import {HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';
import { SectionsComponent } from './sections/sections.component';
import {DragulaModule, DragulaService} from 'ng2-dragula';
import { SectionFilterPipe } from './section-filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragulaModule
  ],
  providers: [DatePipe, DragulaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
