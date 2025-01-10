import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'admin-lte-imports';
}
