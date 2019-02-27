import {Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';
import {NotesService} from '../notes.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnChanges {
  constructor(private http: HttpClient, public datepipe: DatePipe, private notesService: NotesService) {

  }
  @ViewChild('noteText') noteText: ElementRef<HTMLTextAreaElement>;
  @Input() section: string;
  notes: Note[] = [
    {text: 'Note One', date: this.datepipe.transform(new Date(), 'HH:mm dd.MM.yyyy'), order: 1},
    {text: 'Note Two', date: this.datepipe.transform(new Date(), 'HH:mm dd.MM.yyyy'), order: 2}
  ];
  notes$: Observable<Note[]>;
  text: string;
  private order = this.notes.length - 2;

  private notesUrl = 'notes';
  setSection(section: string) {
    this.section = section;
  }
  add(noteText: HTMLTextAreaElement) {
    const note = {text: noteText.value,
      date: this.datepipe.transform(new Date(), 'HH:mm dd.MM.yyyy'),
      order: this.order + 1,
      section: this.section};
    noteText.value = '';
    this.order++;
    this.addNote(note);
  }
  /*remove(ind) {
    this.notes.splice(ind, 1);
  }*/
  top(idx) {
    /*const note2 = this.notes[idx];
    this.notes = note2 + this.notes;*/
    const ferstEl = this.notes[0];
    const elInx = this.notes[idx];
    this.notes[0] = elInx;
    this.notes[idx] = ferstEl;
  }
  addNote(note: Note) {
    this.http.post(this.notesUrl, note).toPromise()
      .then(response => this.readNotes());
  }
   readNotes() {
    this.notesService.getNotes(this.section).subscribe(notes => this.notes = notes);
    this.notes$ = this.notesService.getNotes(this.section);
   }
  remove(id: string) {
    this.http.delete<{ok: boolean}>(this.notesUrl, {params: {id}})
      .toPromise()
      .then(response => {
        if (response.ok) {
          console.log('note with id ${id} removed, response', response);
          this.readNotes();
        } else {
          console.error('server-side error when removing note ${id}');
        }
      }).catch(err => console.error(err));
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.readNotes();
  }

}

export interface Note {
  _id?: string;
  text: string;
  date: string;
  order: number;
}

