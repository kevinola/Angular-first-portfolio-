import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true, // To allow for imported directly into another component's
  templateUrl: './footer.html',
  styleUrl: './footer.css',
  imports: [],
})
export class Footer {}
