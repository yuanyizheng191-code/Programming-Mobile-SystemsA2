import { Routes } from '@angular/router';
import { HomePage } from './home/home';
import { InventoryPage } from './inventory/inventory';
import { SearchPage } from './search/search';
import { HelpPage } from './help/help';
import { PrivacyPage } from './privacy/privacy';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomePage },
  { path: 'inventory', component: InventoryPage },
  { path: 'search', component: SearchPage },
  { path: 'help', component: HelpPage },
  { path: 'privacy', component: PrivacyPage },
];