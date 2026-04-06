import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Inventory } from './inventory/inventory';
import { Search } from './search/search';
import { Privacy } from './privacy/privacy';
import { Help } from './help/help';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'inventory', component: Inventory },
  { path: 'search', component: Search },
  { path: 'privacy', component: Privacy },
  { path: 'help', component: Help },
  { path: '**', redirectTo: '' }
];