// import { Component } from '@angular/core'
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common'; // injection 
import { FormsModule } from '@angular/forms';// allows access to Angular's built-in directives and data-binding features.
import { HttpClient } from '@angular/common/http';//


type Status = 'idle' | 'sending' | 'success' | 'error';


@Component({
  selector: 'app-contact',
  standalone: true, //// To allow for imported directly into another component's
  templateUrl: './contact.html',
  styleUrl: './contact.css',
  imports: [CommonModule, FormsModule],
})


export class Contact {
  private http = inject(HttpClient);

  // Your Formspree form (no access key needed, the form ID is the key)
  private readonly endpoint = 'https://formspree.io/f/mgaaaoqq';

  name = '';
  email = '';
  message = '';
  website = ''; // honeypot: real visitors never see or fill this

  status: Status = 'idle';
  errorText = '';
  sentName = '';

  sendMessage(): void {
    if (this.status === 'sending') return;

    if (!this.name.trim() || !this.email.trim() || !this.message.trim()) {
      return;
    }

    // Honeypot filled in = bot: pretend it worked, send nothing
    if (this.website) {
      this.sentName = this.name.trim();
      this.status = 'success';
      return;
    }

    this.status = 'sending';
    this.errorText = '';

    this.http
      .post(
        this.endpoint,
        {
          name: this.name.trim(),
          email: this.email.trim(),
          message: this.message.trim(),
          _subject: 'Portfolio message from ' + this.name.trim(),
        },
        { headers: { Accept: 'application/json' } }
      )
      .subscribe({
        next: () => {
          this.sentName = this.name.trim();
          this.status = 'success';
          this.name = this.email = this.message = '';
        },
        error: (err) =>
          this.fail(err?.error?.errors?.[0]?.message || err?.error?.error),
      });
  }

  private fail(msg?: string): void {
    this.errorText = msg || 'Something went wrong. Please try again.';
    this.status = 'error';
  }
}






/*
*********** CommonModule *****************
CommonModule gives you access to Angular's most common built-in 
directives that you use directly inside your HTML templates (.html files).
Without importing CommonModule, directives like structural directives and
pipes won't work. It includes:

Structural Directives:
1. *ngIf (for conditional rendering)
2. *ngFor (for looping through lists/arrays)
3. [ngSwitch], *ngSwitchCase, *ngSwitchDefault (for switch-case logic)

Attribute Directives:
1. [ngClass] (for dynamically adding/removing CSS classes)
2. [ngStyle] (for dynamically applying inline styles)

Pipes:
1. | async (for handling Observables/Promises)
2. | json (for debugging objects as JSON strings)
3. | date, | currency, | uppercase, | lowercase, etc.




*************** FormsModule ***************
FormsModule gives you access to tools required for handling template-driven
 forms and two-way data binding.Without FormsModule, Angular will throw an
error when it encounters form-related syntax in your HTML. It includes:

Two-Way Data Binding:
-  [(ngModel)]: This is the most common reason to import FormsModule. It connects an HTML form input element (like an <input>, <select>, or <textarea>) directly to a property in your TypeScript component class so they stay in sync.

Form Directives:
- ngForm, ngModel, and ngModelGroup (used for tracking form state, validity, and submission in template-driven forms).

*/