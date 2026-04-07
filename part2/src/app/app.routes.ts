/**
 * app.routes.ts
 * @description Angular Routing Configuration
 * @author Yizheng Yuan
 * @assignment Programming Mobile Systems - Part 2 (Angular Implementation)
 */

// Import the Routes type from Angular Router and all page components
import { Routes } from '@angular/router';
import { HomePage } from './home/home';
import { InventoryPage } from './inventory/inventory';
import { SearchPage } from './search/search';
import { HelpPage } from './help/help';
import { PrivacyPage } from './privacy/privacy';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },// Ensure full match for empty path redirection
  { path: 'home', component: HomePage },
  { path: 'inventory', component: InventoryPage },
  { path: 'search', component: SearchPage },
  { path: 'help', component: HelpPage },
  { path: 'privacy', component: PrivacyPage },
];