import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  notes: Note[] = [
    {text: 'Note One'},
    {text: 'Note Two'}
  ];
  text: string;
  private notesUrl = 'notes';
  add() {
    const note = {text: this.text};
    this.notes.push(note);
    this.text = '';
    this.addNote(note);
  }
  remove(ind) {
    this.notes.splice(ind, 1);
  }
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
      .then(response => console.log('note sent, response', response));
  }
  getNotes(): Promise<Note[]> {
    return this.http.get<Note[]>(this.notesUrl).toPromise();
  }
  constructor(private http: HttpClient) {
    this.getNotes().then(notes => {
      this.notes = notes;
      console.log(notes);
    });
  }
  ngOnInit() {
  }

}

interface Note {
  text: string;
}

