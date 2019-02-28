import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DragulaService} from 'ng2-dragula';
import {LoginService} from '../services/login.service';

@Component({
  selector: 'app-sections',
  templateUrl: './sections.component.html',
  styleUrls: ['./sections.component.css']
})
export class SectionsComponent implements OnDestroy {
  private sectionUrl = 'sections';
  sections: Section[] = [];
  private activeSection: string;
  @Output() sectionChanged: EventEmitter<string> = new EventEmitter<string>();
  sectionReplaceUrl = '/sections/replace';
  filterValue = '';

  onDrop(value) {
    const [bag, elementMoved, targetContainer, srcContainer] = value;
    if (targetContainer.children) {
      const arr = Array.from(targetContainer.children);
      this.sections = arr.map((li: HTMLElement) => {
        return {title: li.textContent.trim()};
      });
    }
  }

  getSections(): Promise<Section[]> {
    return this.http.get<Section[]>(this.sectionUrl).toPromise();
  }

  async readSections() {
    this.sections = await this.getSections();
    if (!this.activeSection && this.sections.length > 0) {
      this.showSection(this.sections[0]);
    }
  }

  constructor(private http: HttpClient, private dragulaService: DragulaService, private loginService: LoginService) {
    this.loginService.userLogin$.subscribe(user => this.readSections());
    this.readSections();
    dragulaService.drop().subscribe(this.onDrop.bind(this));
    dragulaService.createGroup('sections', {moves: () => this.filterValue.length === 0});
  }

  showSection(section: Section) {
   // this.activeSection = section.title;
    this.sectionChanged.emit(section.title);
  }

  addSection(newSection: HTMLInputElement) {
    const title = newSection.value;
    if (!title) {
      return;
    }
    if (this.sections.map(s => s.title).find(t => t === title)) {
      return;
    }
    const section: Section = {title};
    this.sections.unshift(section);
    this.showSection(section);
    this.writeSections().subscribe(res => newSection.value = '');
  }

  private writeSections() {
    return this.http.post(this.sectionReplaceUrl, this.sections);
  }
  @Input()
  set section(section: string) {
    if (section && section.length > 0) {
      this.activeSection = section;
    }
  }

  ngOnDestroy(): void {
    this.dragulaService.destroy('sections');
  }
}

export interface Section {
  _id?: string;
  title: string;
}
