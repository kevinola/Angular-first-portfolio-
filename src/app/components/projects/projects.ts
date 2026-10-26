import { Component, ElementRef, HostListener, OnDestroy, ViewChild, inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common'; // needed to run the late version of injection [*ngFor]
import { Project, ProjectService } from '../../services/projects';  // Importing "service" file location from this

@Component({
  selector: 'app-projects',
  standalone: true, // To allow for imported directly into another component's
  templateUrl: './projects.html',
  styleUrl: './projects.css',
  imports: [CommonModule],
})

export class Projects implements OnDestroy {
  private projectService = inject(ProjectService);
  private doc = inject(DOCUMENT);

  // Data now comes from the service
  projects: Project[] = this.projectService.getProjects();

  // ----- Filter -----
  filters = [
    { value: 'all', label: 'All' },
    { value: 'web', label: 'Web apps' },
    { value: 'mobile', label: 'Mobile apps' },
    { value: 'tools', label: 'Tools' },
  ];
  activeFilter = 'all';

  setFilter(value: string): void {
    this.activeFilter = value;
  }

  isVisible(p: Project): boolean {
    return (
      this.activeFilter === 'all' ||
      p.category.trim().split(/\s+/).includes(this.activeFilter)
    );
  }

  // ----- Modal -----
  selected: Project | null = null;
  isModalOpen = false;
  private previousFocus: HTMLElement | null = null;

  @ViewChild('closeBtn') closeBtn?: ElementRef<HTMLButtonElement>;

  openProject(p: Project): void {
    this.previousFocus = this.doc.activeElement as HTMLElement | null;
    this.selected = p;
    this.isModalOpen = true;
    this.doc.body.style.overflow = 'hidden';
    setTimeout(() => this.closeBtn?.nativeElement.focus());
  }

  closeProject(): void {
    this.isModalOpen = false;
    this.doc.body.style.overflow = '';
    this.previousFocus?.focus();
    this.previousFocus = null;
  }

  onBackdropClick(e: MouseEvent): void {
    if (e.target === e.currentTarget) this.closeProject();
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.isModalOpen) this.closeProject();
  }

  ngOnDestroy(): void {
    this.doc.body.style.overflow = '';
  }
}