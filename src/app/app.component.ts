/* eslint-disable @typescript-eslint/comma-dangle */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/quotes */
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./header/header.component";
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [
      CommonModule,
      HttpClientModule,
      RouterOutlet,
      HeaderComponent
    ]
})
export class AppComponent {
  title = 'ng-spring-blog-frontend';
}
