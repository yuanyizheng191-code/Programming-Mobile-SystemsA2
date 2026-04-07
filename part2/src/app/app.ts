/**
 * app.ts
 * @description Angular Root Component for the Inventory Management System
 * @author Yizheng Yuan
 * @assignment Programming Mobile Systems - Part 2 (Angular Implementation)
 */

// Import necessary Angular core modules and dependencies
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],// Import RouterModule to use routerLink and router-outlet
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
// Export the App class as the root component
export class App {}