import { Injectable, signal } from '@angular/core'; // Import signal (or BehaviorSubject)

export interface Project {
  id: number;
  title: string;
  description: string;
  focus: string; 
  technologies: string[];
  category: string;
  image: string;
}

// 
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private projects: Project[] = [
    {
      id: 1,
      title: 'Calculator App',
      description:
        'A compact calculator project focused on a clear interface, responsive layout, and everyday arithmetic interactions.',
      focus: 'Responsive interface and basic calculator operations.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      category: 'tools web',
      image: 'img/projects/calculator.webp',
    },
    {
      id: 2,
      title: 'Citizen Report App',
      description:
        'A civic-engagement app concept for reporting community issues such as potholes or damaged roads, with space for location, images, and report status.',
      focus:
        'Community reporting and issue tracking. Confirm which features are implemented before presenting it as finished.',
      technologies: ['Angular', 'TypeScript'],
      category: 'mobile',
      image: 'img/projects/citizen-report.webp',
    },
    {
      id: 3,
      title: 'Blog Application',
      description:
        'A blog application focused on publishing and managing posts through a clean, readable interface.',
      focus: 'Content management and database-backed web development.',
      technologies: ['HTML', 'CSS', 'JavaScript', 'Api', 'WordPress'],
      category: 'web',
      image: 'img/projects/blog.webp',
    },
    {
      id: 4,
      title: 'Manga Translator',
      description:
        'An Android manga-reading project exploring OCR text extraction and translation support while keeping the reading experience clear.',
      focus:
        'Manga reading, OCR, translation workflow, and mobile UI. Label features that are still in development clearly.',
      technologies: ['Kotlin', 'Python', 'OCR'],
      category: 'mobile tools',
      image: 'img/projects/manga-translator.webp',
    },
  ];

  currentFilter = signal<string>('all');

  getProjects(): Project[] {
    return this.projects;
  }

  setFilter(filter: string): void {
    this.currentFilter.set(filter);
  }
}