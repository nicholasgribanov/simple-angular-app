import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from './notes/notes.component';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private notesUrl = 'notes';
  constructor(private http: HttpClient) { }

  getNotes(section: string): Observable<Note[]> {
    return this.http.get<Note[]>(this.notesUrl, {params: {section}});
  }
}
