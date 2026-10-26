import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

// Import all the child components you are using in app.html
import { Header } from './components/header/header'; // (Adjust path as needed)
import { About } from './components/about/about';
import { Experiences } from './components/experiences/experiences';
import { Skills } from './components/skills/skills';
import { Projects } from './components/projects/projects';
import { Contact } from './components/contact/contact';
import { Footer } from './components/footer/footer';


@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrl: './app.css',
  imports: [// import should only be define onces
    RouterOutlet, 
    // Add them(the imported child component) to the imports array
    Header,
    About,
    Experiences,
    Skills,
    Projects,
    Contact,
    Footer
  ]
})
export class App {
  protected readonly title = signal('angular-first-project');

  protected readonly menuOpen = signal(false);

  openNav(): void {
    this.menuOpen.set(true);
    document.body.style.overflow = 'hidden';
  }

  closeNav(): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
  }

  onWindowResize(): void {
    if (window.innerWidth > 799) {
      this.closeNav();
    }
  }
}