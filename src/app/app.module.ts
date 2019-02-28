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
import { NotesEditorComponent } from './notes-editor/notes-editor.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import {RouterModule, Routes} from '@angular/router';
import { ViewSectionComponent } from './view-section/view-section.component';
import {CanDeactivateNoteService} from './can-deactivate-note.service';
import { UserFormComponent } from './user-form/user-form.component';
import { EqualToValidatorDirective } from './directives/equal-to-validator.directive';
import { UserUniqueValidatorDirective } from './directives/user-unique-validator.directive';
import { LoginFormComponent } from './login-form/login-form.component';

const appRoutes: Routes = [
  {path: '', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService]},
  {path: 'viewSection/:name', component: ViewSectionComponent},
  {path: 'register', component: UserFormComponent},
  {path: ':name', component: NotesEditorComponent, canDeactivate: [CanDeactivateNoteService]},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    NotesComponent,
    SectionsComponent,
    SectionFilterPipe,
    NotesEditorComponent,
    PageNotFoundComponent,
    ViewSectionComponent,
    UserFormComponent,
    EqualToValidatorDirective,
    UserUniqueValidatorDirective,
    LoginFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    DragulaModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [DatePipe, DragulaService, CanDeactivateNoteService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
