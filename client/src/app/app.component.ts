import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "./components/nav/nav.component";
import { NavBottomComponent } from "./components/nav-bottom/nav-bottom.component";


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavComponent, NavBottomComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'מתוקוש';

}
