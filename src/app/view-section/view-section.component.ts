import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NotesService} from '../notes.service';
import {Note} from '../notes/notes.component';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-view-section',
  templateUrl: './view-section.component.html',
  styleUrls: ['./view-section.component.css']
})
export class ViewSectionComponent implements OnInit {
  private section: string;
  notes: Note[];
  notes$: Observable<Note[]>;

  constructor(private route: ActivatedRoute, private notesService: NotesService) {}
  getNotes() {
    return this.notesService.getNotes(this.section);
  }
    ngOnInit() {
    this.section = this.route.snapshot.params.name;
    this.getNotes().subscribe(notes => this.notes = notes);
    this.notes$ = this.getNotes();
  }

}
