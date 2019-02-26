import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {
  constructor(private http: HttpClient, public datepipe: DatePipe) {
    this.readNotes();
  }
  notes: Note[] = [
    {text: 'Note One', date: this.datepipe.transform(new Date(), 'HH:mm dd.MM.yyyy'), order: 1},
    {text: 'Note Two', date: this.datepipe.transform(new Date(), 'HH:mm dd.MM.yyyy'), order: 2}
  ];
  text: string;
  private order = this.notes.length - 2;

  private notesUrl = 'notes';
  add() {
    const note = {text: this.text, date: this.datepipe.transform(new Date(), 'HH:mm dd.MM.yyyy'), order: this.order + 1};
    this.text = '';
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
  getNotes(): Promise<Note[]> {
    return this.http.get<Note[]>(this.notesUrl).toPromise();
  }
  readNotes() {
    this.getNotes().then(notes => {
      this.notes = notes;
    });
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
  ngOnInit() {
  }

}

interface Note {
  _id?: string;
  text: string;
  date: string;
  order: number;
}

