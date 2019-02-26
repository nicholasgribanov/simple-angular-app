import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  section: string;
  title = 'notes-app';
  name = 'John';
  setSection(section: string) {
    this.section = section;
  }
}
