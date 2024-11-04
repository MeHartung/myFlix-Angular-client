import { Component } from '@angular/core';

/**
 * Root component of the application.
 * Acts as a container for other components.
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}