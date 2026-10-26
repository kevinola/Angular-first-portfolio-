import { Component, inject } from '@angular/core';
import { ProjectService } from '../../services/projects';

@Component({
  selector: 'app-skills',
  imports: [],
  templateUrl: './skills.html',
  styleUrl: './skills.css',
})
export class Skills {
  private projectService = inject(ProjectService);

  // ids of the cards that are currently expanded
  private openSkills = new Set<string>();

  isSkillOpen(id: string): boolean {
    return this.openSkills.has(id);
  }

  toggleSkill(id: string): void {
    if (this.openSkills.has(id)) {
      this.openSkills.delete(id);
    } else {
      this.openSkills.add(id);
    }
  }

  // Used by the "View related projects" links: sets the filter in the Projects section
  showProjects(filter: string): void {
    this.projectService.setFilter(filter);
  }
}
