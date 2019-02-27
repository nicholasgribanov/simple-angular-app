import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot} from '@angular/router';
import {NotesEditorComponent} from './notes-editor/notes-editor.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class CanDeactivateNoteService implements CanDeactivate<NotesEditorComponent> {
  constructor() {
  }
  canDeactivate(
    notesEditorComponent: NotesEditorComponent,
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const note = notesEditorComponent.notesComponent.noteText.nativeElement.value;
    if (note && note.length > 0) {
      return window.confirm('You have entered the note. Do you really want to change section?');
    } else {
      return true;
    }
  }
}


